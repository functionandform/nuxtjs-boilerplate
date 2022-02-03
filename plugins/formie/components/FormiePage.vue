<template>
    <transition
        appear
        :css="false"
        @enter="onTransitionEnter"
        @leave="onTransitionLeave"
    >
        <div v-show="pageIndex === activePage" v-bind="attrs" class="formie-page" @formie-show="$emit('formie-show', $event)" @formie-hide="$emit('formie-hide', $event)">
            <div>
                <div v-if="form.settings.displayCurrentPageTitle">
                    <h3>
                        {{ page.name }}
                    </h3>
                </div>
                <h3 v-if="singleField && firstLabel">{{firstLabel}}</h3>
                <div v-for="(row, rowIndex) in page.rows" :key="rowIndex" class="formie-page__row">
                    <formie-field v-for="(field, fieldIndex) in row.fields" :key="'field-'+fieldIndex" :field="field" :single-select="singleField" :hide-label="singleField && firstLabel ? true : false" @single-select="onSingleSelect" />
                </div>
            </div>

            <div class="formie-page__nav">
                <div class="formie-page__nav__container" :class="position">
                    <section v-if="page.settings.showBackButton && pageIndex !== 0" class="formie-page__nav__section">
                        <v-button weight="tertiary" leading-icon="arrow-left" :trailing-icon="false" type="button" @click.native.prevent="onBack"  :data-layer-enabled="false">
                            {{ page.settings.backButtonLabel }}
                        </v-button>
                    </section>
                    <section v-show="!singleSelectField" class="formie-page__nav__section align-right">
                        <v-button weight="primary" :disabled="loading" type="submit" :loading="loading" :data-layer-enabled="false" :trailing-icon="isLastPage ? 'send' : null">
                            {{ page.settings.submitButtonLabel }}
                        </v-button>
                    </section>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import FormieField from './FormieField.vue';

export default {
    components: {
        FormieField,
    },

    props: {
        form: {
            type: Object,
            default: () => {},
        },
        page: {
            type: Object,
            default: () => {},
        },
        pageIndex: {
            type: Number,
            default: 0,
        },
        activePage: {
            type: Number,
            default: 0,
        },
        isLastPage: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        direction: {
            type: String,
            default: 'forward',
        },
    },

    computed: {
        attrs () {
            const attrs = {};

            if (this.page.settings.enablePageConditions) {
                attrs['data-page-conditions'] = this.page.settings.pageConditions;
            }

            return attrs;
        },
        firstLabel() {
            return this.page.rows && this.page.rows.length === 1 && this.page.rows[0].fields && this.page.rows[0].fields.length && this.page.rows[0].fields[0].label.length ? this.page.rows[0].fields[0].label : null;
        },
        singleField() {
            return this.page.rows && this.page.rows.length === 1 && this.page.rows[0].fields && this.page.rows[0].fields.length === 1;
        },
        singleSelectField() {
            return this.page.rows && this.page.rows.length === 1 && this.page.rows[0].fields && this.page.rows[0].fields.length === 1 && (this.page.rows[0].fields[0].displayName === 'Radio');
        },
        position() {
            if (this.page.settings.buttonsPosition === 'left-right') {
                return 'justify-between';
            }

            if (this.page.settings.buttonsPosition === 'center') {
                return 'justify-center';
            }

            if (this.page.settings.buttonsPosition === 'right') {
                return 'justify-end';
            }

            return '';
        },
    },

    methods: {
        onSingleSelect () {
            if (this.singleSelectField) {
                this.$emit('submit');
            }
        },
        onBack () {
            this.$emit('previous-page', this.pageIndex);
        },
        onTransitionEnter (el, done) {
            const sign = this.direction === 'forward' ? '' : '-';
            el.style.position = 'absolute';
            el.style.opacity = 0;
            el.style.transform = `translateY(${sign}50px)`;
            setTimeout(() => {
                el.style.position = '';
                el.style.opacity = '';
                el.style.transform = '';
                done();
            }, 250);
        },
        onTransitionLeave (el, done) {
            const sign = this.direction === 'forward' ? '-' : '';
            el.style.opacity = 0;
            el.style.transform = `translateY(${sign}50px)`;
            setTimeout(done, 250);
        },
    },
};

</script>

<style lang="scss">

.formie-page {
    display:block;
    margin:0 auto;

    transition: all 0.25s ease-in-out;
    opacity: 1;
    transform: none;

    @include breakpoint(md) {
        max-width:35rem;
        margin:0 auto;
        text-align:center;
    }
    &__nav {
        position:relative;
        bottom:0; left:0;
        width:100%;
        display:flex;
        align-items: center;
        &__container {
            display:flex;
            align-items:center;
            width:100%;
            margin:0 auto;
            justify-content: space-between;
        }
        &__section {

            &:only-child {
                margin:0 auto;
            }
        }
    }
    &__row {
        @include breakpoint(md) {
            width:calc(100% + var(--baseline));
            display:flex;
            margin:0 vr(-0.5);
            .formie-field {
                padding:0 vr(0.5);
                flex:0 1 100%;
            }
        }
    }
}

</style>
