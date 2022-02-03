<template>
    <div>
        <client-only>
            <form v-show="form" ref="form" novalidate class="formie formie--default" @submit.prevent="onSubmit">
                <div v-if="form && form.settings.displayFormTitle">
                    <h2>{{ form.title }}</h2>
                </div>
                <alert v-if="form" v-model="alertState" @close="onAlertClose" :success-text="form.settings.submitActionMessageHtml" :error-text="form.settings.errorMessageHtml"></alert>

                <!-- <div v-if="form && form.settings.displayPageTabs && activePage !== -1">
                    <nav aria-label="Tabs" class="formie__tabs">
                        <template v-for="(page, index) in form.pages">
                            <a v-if="!isPageHidden(index)" :key="index" href="#" class="formie__tabs__tab" :class="{ 'formie__tabs__tab--active':index == activePage }" @click.prevent="onTabClick(index)">
                                {{ page.name }}
                            </a>
                        </template>
                    </nav>
                </div> -->

                <div v-if="form && form.settings.displayPageProgress && activePage !== -1" class="formie__progress">
                    <container class="formie__progress__container">
                        <div class="formie__progress__element">
                            <span class="formie__progress__value">{{ stepPercentage }}<sup class="formie__progress__value__percent">%</sup></span>
                            <div class="formie__progress__bar">
                                <div class="formie__progress__bar__fill" :style="'--progress: ' + stepPercentage + '%'" role="progressbar" :aria-valuenow="stepPercentage" aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                        </div>
                    </container>
                </div>

                <template v-if="form">
                    <formie-page
                        v-for="(page, index) in form.pages"
                        :key="index"
                        ref="pages"
                        :active-page="activePage"
                        :page="page"
                        :is-last-page="index === form.pages.length -1"
                        :page-index="index"
                        :form="form"
                        :loading="loading"
                        :direction="direction"
                        @formie-show="onPageShow($event, index)"
                        @formie-hide="onPageHide($event, index)"
                        @previous-page="previousPage"
                        @submit="onSubmit"
                    />
                </template>
            </form>

            <p v-if="form === null" class="alert alert--error align-center">
                Unable to find form <strong>{{ handle }}</strong>.
            </p>

            <div v-else-if="error" class="formie__dialogue">
                <div class="alert alert--error">
                    {{ error }}
                </div>
            </div>

            <dummy v-if="form" @mounted="initConditions"></dummy>
        </client-only>
    </div>
</template>

<script>
import Pristine from 'pristinejs';

import { FormQuery } from '../graphql/forms';
import { getFormMutation, getMutationVariables } from '../utils/mutations';
import { resetValidation, runValidation, applyServerValidation } from '../utils/validation';
import FormieConditions from '../utils/conditions';

import Alert from './Alert.vue';
import FormiePage from './FormiePage.vue';
import Dummy from './Dummy.vue';

export default {
    components: {
        Alert,
        FormiePage,
        Dummy,
    },

    props: {
        handle: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            form: false,
            activePage: 0,
            hiddenPages: [],
            error: false,
            loading: true,
            alertState: null,
            validator: null,
            direction: 'forward',
        };
    },

    apollo: {
        form: {
            query: FormQuery,
            variables () {
                return { handle: this.handle };
            },
            error (error) {
                this.error = error.message;
            },
            result () {
                console.log(this.form);
                this.loading = false;
                if (process.client) {
                    this.initRecapcha();
                }
            },

            // Figure out why fragments don't work without this??
            fetchPolicy: 'no-cache',
        },
    },

    computed: {
        stepPercentage () {
            return parseInt(((this.activePageIndex - 1) / this.pagesCount) * 100, 10);
        },

        // get active page index (based on non hidden pages)
        activePageIndex () {
            let index = 1;
            for (let i = 0; i < this.activePage; i++) {
                if (!this.isPageHidden(i)) { index++; }
            }
            return index;
        },

        pagesCount () {
            return this.form.pages.length - this.hiddenPages.length;
        },

        isLastPage () {
            return this.activePageIndex === this.pagesCount;
        },

        recaptchaEnabled () {
            let enabled = false;
            if (this.form && this.form.settings.integrations) {
                this.form.settings.integrations.forEach((integration) => {
                    const settings = JSON.parse(integration.settings);
                    if (settings && settings.handle === 'recaptcha' && settings.enabled) {
                        enabled = true;
                    }
                });
            }
            return enabled;
        },
    },

    beforeDestroy() {
        this.$recaptcha.destroy();
    },

    methods: {
        async initRecapcha () {
            if (this.recaptchaEnabled) {
                try {
                    await this.$recaptcha.init();
                } catch (e) {
                    console.error(e);
                }
            }
        },

        initConditions () {
            // console.log('initConditions');
            this.hiddenPages = [];
            this.conditions = new FormieConditions({ $form: this.$refs.form });
        },

        isPageHidden (index) {
            return this.hiddenPages.includes(index);
        },

        onPageShow (e, index) {
            const i = this.hiddenPages.indexOf(index);
            if (i > -1) {
                this.hiddenPages.splice(i, 1);
            }
        },

        onPageHide (e, index) {
            const i = this.hiddenPages.indexOf(index);
            if (i === -1) {
                this.hiddenPages.push(index);
            }
        },

        onAlertClose () {
            if (this.activePage === -1) {
                this.activePage = 0;
            }
        },

        previousPage () {
            this.direction = 'backward';
            for (let i = this.activePage - 1; i >= 0; i--) {
                if (!this.isPageHidden(i)) {
                    this.activePage = i;
                    return;
                }
            }
        },

        nextPage () {
            this.direction = 'forward';
            if (this.isLastPage) { return; }
            for (let i = this.activePage + 1; i < this.form.pages.length; i++) {
                if (!this.isPageHidden(i)) {
                    this.activePage = i;
                    return;
                }
            }
        },

        onTabClick (index) {
            this.activePage = index;
        },

        async onSubmit (e) {
            this.loading = true;
            this.alertState = false;

            // Always validate the current page only, not the entire form
            const $form = this.$refs.form;
            const $page = this.$refs.pages[this.activePage].$el;

            // Setup a validator
            this.validator = new Pristine($form);

            // append to datalayer
            this.dataLayerSubmit();

            // Clear out validation errors
            resetValidation($form);

            const valid = runValidation(this.validator, $page);

            // Validate the form - for each page
            if (!valid) {
                this.loading = false;
                this.alertState = 'error';
                return;
            }

            // Are we on the last page, or on a multi-step page?
            if (!this.isLastPage) {
                this.loading = false;
                this.nextPage();
                return;
            }

            // Prepare an object from FormData
            const formData = getMutationVariables(this.form, $form);

            // Generate a mutation string, with all the input types sorted
            const formMutation = getFormMutation(this.form);

            // context
            // const mutation = {
            //     mutation: formMutation,
            //     variables: formData,
            // };

            const params = {
                operationName: 'FormMutation',
                query: formMutation.loc.source.body,
                variables: formData,
            };

            if (this.recaptchaEnabled) {
                const token = await this.$recaptcha.execute(this.form.handle);
                params['g-recaptcha-response'] = token;
            }

            const { apiBaseUrl, graphqlPath, graphqlToken } = this.$config;

            fetch(apiBaseUrl + graphqlPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${graphqlToken}`,
                },
                body: JSON.stringify(params),
            }).then((data) => {
                this.loading = false;
                const response = data[`save_${this.handle}_Submission`];
                this.onSuccess(response);
            }).catch((error) => {
                this.loading = false;
                this.alertState = 'error';

                // Apply server-side errors
                applyServerValidation(this.validator, $form, error);

                console.error(error);
            });

            // this.$apollo.mutate(mutation).then(({ data }) => {
            //     this.loading = false;

            //     const response = data[`save_${this.handle}_Submission`];
            //     this.onSuccess(response);
            // }).catch((error) => {
            //     this.loading = false;
            //     this.alertState = 'error';

            //     // Apply server-side errors
            //     applyServerValidation(this.validator, $form, error);

            //     console.error(error);
            // });
        },

        onSuccess (response) {
            if (this.form.settings.submitAction === 'message') {
                this.alertState = 'success';
                this.activePage = -1;
            }

            this.$refs.form.reset();
        },
        dataLayerSubmit() {
            const baseVariables = {
                event: 'formAction',
                action: 'formStepComplete',
                totalSteps:this.form.pages.length,
                completedStepNumber: this.activePage + 1,
                form: this.handle,
            };
            if (this.form.pages && this.form.pages.length && this.form.pages[this.activePage] && this.form.pages[this.activePage].name) {
                baseVariables.completedStepName = this.form.pages[this.activePage].name;
            }

            if (this.isLastPage) {
                baseVariables.action = 'formComplete';
            } else if (this.form.pages && this.form.pages.length && this.form.pages[this.activePage + 1] && this.form.pages[this.activePage + 1].name) {
                baseVariables.nextActiveStepName = this.form.pages[this.activePage +1].name;
                baseVariables.nextActiveStepNumber = this.activePage +2;
            }
            // console.log(baseVariables);
            this.pushDataLayer(baseVariables);
        },
    },
};
</script>

<style lang="scss">
.formie {
    display:block;
    margin-bottom:vr(1);
    &__tabs {
        display:flex;
        align-items:center;
        &__tab {
            flex:0 0 auto;
            padding:0 vr(0.5);
        }
    }
    &__progress {
        pointer-events:none;
        position:fixed;
        top:vr(4);
        bottom:vr(4);
        left:0;
        --progress:0%;
        &__container {
            height:100%;
            display:flex;
            flex-direction: column;
            align-items:center;
            padding:0;
            @include breakpoint(md) {
                align-items: flex-start;
            }
        }
        &__element {
            display:flex;
            flex-direction: column;
            align-items:center;
            height:100%;
            width:vr(3);
            @include breakpoint(lg) {
                width:vr(3.5);
            }
        }
        @include breakpoint(md) {
            width:100%;
            left:0;
        }
        & ~ .formie-page {
            @include breakpoint-less-than(md) {
                margin-left:vr(2);
            }
        }
        &__bar {
            background-color: black;
            height:100%;
            width:3px;
            display:block;
            flex:0 1 100%;
            flex:0 1 auto;
            transition:0.5s $ease-in-out-expo;
            &__fill {
                width:3px;
                height:var(--progress);
                display:block;
                background-color: blue;
                transition:0.5s $ease-in-out-expo;
                position:relative;
                &::after {
                    position:absolute;
                    top:100%;
                    left:50%;
                    transform:translateX(-50%);
                    border-radius:50%;
                    background-color:blue;
                    display:block;
                    width:9px; height:9px;
                    content:"";
                }
            }
        }
        &__value {
            font-size:0.8rem;
            text-align:center;
            letter-spacing: 0.1em;
            margin-bottom:vr(0.5);
            &__percent {
                margin-right:-0.5rem;
            }
            @include breakpoint(md) {
                font-size:1rem;
            }
        }
    }
}

.formie-field[data-conditionally-hidden] {
  display: none;
}
</style>
