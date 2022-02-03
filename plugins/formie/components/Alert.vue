<template>
    <div>
        <transition name="alert" appear @enter="start" @after-enter="end" @before-leave="start" @after-leave="end">
            <div v-if="value" :class="'formie-alert formie-alert'+value">
                <template v-if="value === 'success'">
                    <div class="formie-alert__container">
                        <div class="formie-alert__icon">
                            <icon name="tick-circle"></icon>
                        </div>
                        <div class="formie-alert__message">
                            <p class="alert alert--success" v-html="successText"></p>
                        </div>

                        <div class="formie-alert__action">
                            <v-button type="tertiary" @click.native.prevent="onClose" weight="tertiary" trailing-icon="remove">Dismiss</v-button>
                        </div>
                    </div>
                </template>

                <template v-if="value === 'error'">
                    <div class="formie-alert__container">
                        <div class="formie-alert__icon">
                            <icon name="error"></icon>
                        </div>
                        <div class="formie-alert__message">
                            <p class="alert alert--success" v-html="errorText"></p>
                        </div>

                        <div class="formie-alert__action">
                            <v-button type="tertiary" @click.native.prevent="onClose" weight="tertiary" trailing-icon="remove">Dismiss</v-button>
                        </div>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    props: {
        successText: {
            type: String,
            required: true,
        },

        errorText: {
            type: String,
            required: true,
        },

        value: {
            type: [String, Boolean],
            default: null,
        },
    },

    methods: {
        onClose() {
            this.$emit('input', null);
            this.$emit('close');
        },
        start(el) {
            if (el) {
                el.style.height = el.scrollHeight + 'px';
            }
        },
        end(el) {
            if (el) {
                el.style.height = '';
            }
        },
    },
};

</script>

<style lang="scss">
.formie-alert {
    display:block;
    max-width:40rem;
    margin:0 auto;
    &__container {
        display:flex;
        align-items:center;
        padding:vr(0.5);
        margin-bottom: vr(1);
        text-align:left;
    }
    &__icon, &__message, &__action {
        padding:vr(0.5);
        p {
            margin-bottom:0;
        }
    }
    &__icon, &__action {
        flex:0 0 auto;
    }
    &__action {
        .button {
            margin-bottom:0;
        }
    }
    &__icon {
        .icon {
            height:2rem;
            width:2rem;
        }
    }
    &__message {
        flex:0 1 100%;
    }
}

.alert-enter-active {
    transition:transform 0.4s $ease-in-out-expo, height 0.4s $ease-in-out-expo, opacity 0.4s $ease-in-out-expo;
    overflow: hidden;
}

.alert-leave-active {
    transition:transform 0.4s $ease-in-out-expo 0.4s, height 0.4s $ease-in-out-expo 0.4s, opacity 0.4s $ease-in-out-expo;
    overflow: hidden;
}

.alert-enter,
.alert-leave-to {
    height: 0 !important;
    opacity: 0;
    transform:rotate3d(1,0,0,-10deg) scale(0.9);
    transform-origin:left bottom;
}
</style>
