<template>
    <div class="field"
         :class="[typeClass(), {'field--invert': invert, 'field--minimal': minimal , 'field--inline': inline, 'field--required':required}, classes]">
        <template v-if="type != 'radio' && type != 'checkbox'">
            <div class="field__wrapper">
                <div class="field__hint-icon" v-if="icon">
                    <icon :name="icon"></icon>
                </div><!-- icon -->

                <template v-if="type === 'select'">
                    <select :type="type" :name="name" :placeholder="placeholder" :disabled="disabled"
                            :readonly="readonly"  :required="required" @focus="focus" @blur="validateAndBlur" @change="active" ref="input"
                            class="field__select" :value="value" @input="$emit('input', $event.target.value)">
                        <option disabled>Please select</option>
                        <option v-for="(option, index) in options" :value="option.value" :selected="option.checked" :key="index">{{
                            option.label ? option.label : option.value}}
                        </option>
                    </select>
                    <div class="field__select-icon">
                        <icon name="chev-down-small" size="small"></icon>
                    </div>
                </template>

                <template v-else-if="type === 'textarea'">
                    <textarea :type="type" :name="name" :placeholder="placeholder" :disabled="disabled"
                              :readonly="readonly" @focus="focus" @blur="validateAndBlur" @change="onChange" @keyup="active, textarea"
                              ref="input" class="field__textarea" :value="value"
                              @input="$emit('input', $event.target.value)" :required="required"></textarea>
                </template>

                <template v-else>
                    <input :type="type" :name="name" :placeholder="placeholder" :disabled="disabled"
                           :readonly="readonly" :value="value" @focus="focus" @blur="validateAndBlur" @keyup="active"
                           ref="input" :class="'field__input ' + inputClasses" :pattern="pattern" :title="title"
                           @input="$emit('input', $event.target.value)" :required="required">
                </template>
                <template v-if="submitButton">
                    <div class="field__submit">
                        <icon name="arrow-right"></icon>
                    </div><!-- submit -->
                </template>
            </div><!-- wrapper -->
            <template v-if="label">
                <label :for="id" class="field__label h5">{{ label }}</label>
            </template>
        </template>

        <template v-if="type === 'checkbox' || type === 'radio'">
            <input :class="'field__' + type" :type="type" :name="name" :placeholder="placeholder" :disabled="disabled"
                   :readonly="readonly" @focus="focus" @blur="validateAndBlur" @change="onChange" ref="input"
                   :true-value="value" :id="name+'_'+value" :checked="shouldBeChecked" :required="required">
            <label :for="name+'_'+value" :class=" 'field__'+ type +'-label' ">
                <template v-if="labelLogoPath">
                    <img class="field__label-logo" :src="labelLogoPath" :alt="label">
                </template>
                <template v-else>
                    {{ label }}
                </template>
            </label>
        </template>
        <span class="field__error" v-if="error">{{error}}</span>
    </div><!-- field -->
</template>


<script>

    export default {
        name: 'Field',
        props: {
            adjacentLabelContent: {
                required: false,
            },
            value: {
                required: false,
            },
            modelValue: {
                default: ""
            },
            type: {
                required: true,
                type: String
            },
            loading: {
                required:false,
                type:Boolean,
                default:false
            },
            name: {
                required: true,
                type: String
            },
            title: {
                required: false
            },
            pattern: {
                required: false
            },
            invert: {
                required: false,
                default: false,
                type: Boolean
            },
            minimal: {
                required: false,
                default: false,
                type: Boolean
            },
            inline: {
                required: false,
                default: false,
                type: Boolean
            },
            placeholder: {
                required: false
            },
            error: {
                required: false
            },
            labelLogoPath: {
                required: false
            },
            falseValue: {
                required: false,
                default: false,
            },
            trueValue: {
                required: false,
                default: true,
            },
            id: {
                required: false
            },
            label: {
                required: false,
                type: String
            },
            disabled: {
                default: false,
                required: false
            },
            readonly: {
                default: false,
                required: false,
                type: Boolean,
            },
            options: {
                required: false,
                type: Array
            },
            icon: {
                required: false
            },
            classes: {
                required: false
            },
            inputClasses: {
                required:false
            },
            required: {
                type:Boolean,
                required:false,
                default:false
            },
            submitButton: {
                required:false,
                type:Boolean,
                default:false
            },
            submitButtonLabel: {
                required:false,
                type:String
            },
            autocomplete: {
                required:false,
                type:String
            },
            ariaLabel: {
                required:false,
                type:String
            }
        },
        data() {
            return {
                checkedProxy: false
            };
        },
        mounted() {
            if (this.type == 'select') {
                this.adaptiveSelectWidth();
            } else if (this.type == 'textarea') {
                this.textarea();
            }

            this.$emit('input', this.value);
        },
        created() {

        },
        methods: {
            onChange(e) {
                this.$emit('input', this.value)
                this.active()
            },
            focus() {
                this.$el.closest(".field").classList.add("field--focus");
            },
            typeClass() {
                return 'field--' + this.type;
            },
            active() {
                const input = this.$refs.input;
                if (input.value.length > 0) {
                    input.closest(".field").classList.add("field--active");
                } else {
                    input.closest(".field").classList.remove("field--active");
                }
            },
            validateAndBlur() {
                this.validate();
                this.blur();
            },
            blur: function () {
                this.$refs.input.closest(".field").classList.remove("field--focus");
            },
            validate: function () {
                const input = this.$refs.input;
                if (!input.validity.valid) {
                    input.closest(".field").classList.add("field--invalid");
                } else {
                    input.closest(".field").classList.remove("field--invalid");
                }
            },
            textarea: function() {
                this.$refs.input.style.height = "48px";
                this.$refs.input.style.height = (this.$refs.input.scrollHeight) + "px";
            },
            adaptiveSelectWidth: function () {
                let select = this.$refs.input;
                let field = select.closest('.field');
                let selectedOption = select.options[select.selectedIndex ?? 0];
                let value = select.value;
                let label = selectedOption.text;
                select.style.width = (label.length) + "ch";
            }
        },
        computed: {
            checked: {
                get () {
                    return this.value
                },
                set (val) {
                    this.checkedProxy = val
                }
            },
            shouldBeChecked() {
                return this.modelValue == this.value
            }
        }
    }
</script>


<style lang="scss">

    input,textarea,select {
        &:focus {
            outline:none;
        }

    }

    @keyframes error-fade-in {
      0% {
        opacity:0;
      }
      50% {
        opacity:0;
      }
      100% {
        opacity:1;
      }
    }

    .field {
        display:block;
        margin-bottom:vr(1);
        padding-bottom:vr(0.5);
        box-sizing: border-box;
        position:relative;
        &__label {
            display:block;
            margin-bottom:vr(0.5);
            position:absolute;
            top:0;
            left:0;
            padding:vr(0.5) 0;
            text-transform:uppercase;
            transform-origin:left top;
            transition:0.2s $elastic;
            pointer-events:none;
        }
        &--required {
            .field__label {
                &::after {
                    display:inline;
                    content:"*";
                }
            }
        }
        &__wrapper {
            position:relative;
            display:flex;
            align-items:center;
            width:100%;
            box-sizing: border-box;
            transition:0.2s $ease-in-out-expo;
            &::before, &::after {
                position:absolute;
                bottom:0;
                left:0;
                width:100%;
                height:1px;
                pointer-events:none;
                background:transparent;
                transform-origin:left center;
                content:"";
            }
            &::before {
               
            }
            &::after {
                
                //opacity:0;
                transform:scaleX(0);
                transition:0.5s $ease-out-expo;
            }

        }
        &__error, .ff-errors {
            position:absolute;
            list-style:none;
            top:100%;
            left:0; right:0;
            line-height:line-height(1);
            pointer-events:none;
            text-align:right;
            color:$red;
            font-size:0.55rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            @include breakpoint(lg) {
                font-size:0.6rem;
            }
            li {
                display:inline;
            }
        }
        &__input, &__select, &__textarea {
            padding:vr(0.5) 0;
            font-size:0.8rem;
            line-height:line-height(1);
            font-weight:400;
            display:block;
            background-color:transparent;
            border-radius:0;
            min-height:vr(2);
            width:100%;
            flex:0 1 100%;
            min-width:0;
            @include breakpoint(lg) {
                font-size:1rem;
            }
            &:focus {
                outline:none;
            } 
            &::placeholder {
                //color: $grey;
            }
        }
        &__input {
            height:vr(2);
        }
        &__select {
            height:vr(2);
        }
        &--select {
            .field__wrapper {
                .field__select {
                    padding-right:vr(1.25);
                }
            }
        }
        &__select-icon {
            pointer-events:none
        }
        &__function-icon, &__hint-icon {
            height:vr(1); width:vr(1);
            pointer-events:none;
            flex:0 0 vr(1);
            margin-top:-2px;
        }
        &__function-icon {
            margin-right:vr(0.5);
            top:vr(0.25);
            position:absolute;
            right:0;
        }
        &__hint-icon {
            margin-left:vr(0.5);
        }
        &__textarea {
            display:block;
            min-height:vr(4);
            line-height:vr(1);
            resize: none;
        }
        &__submit {
            .button {
                margin-bottom:0;
                &--primary, &--secondary {
                    border-top-left-radius:0;
                    border-bottom-left-radius:0;
                }
            }
        }
        &__checkbox, &__radio {
            position:absolute;
            left:-9999px;
            top:0;
            pointer-events:none;
            opacity:0;
        }
        &__radio-label, &__checkbox-label {
            display:block;
            line-height:vr(1);
            padding-left:vr(1.25);
            position:relative;
            cursor:pointer;
            text-align:left;
            &::after, &::before {
                position:absolute;
                left:0;
                top:0;
                content:"";
                margin:calc(var(--baseline) * 0.25 / 2);
                width:vr(0.75);
                height:vr(0.75);
                display:block;
                background-color:transparent;
            }
            &::after {
                margin-left:0;
            }

            &::before {
                opacity:0;
                top:-1px; left:0;
                border:1px solid transparent;
                margin-left:1px;
                transition:0.2s $elastic;
                transform:scale(0.5);
            }
        }
        &--small {
            .field__radio-label, .field__checkbox-label {
                font-size:14px;
            }
        }
        &__radio-label {
            &::after {
                border-radius:50%;
                background-color:transparent;
            }
            &::before {
                border-radius:50%;

                box-sizing:border-box;

            }
        }
        &__checkbox-label {
            &::after {
                
            }
            &::before {
                background-size:contain;
                background-position:center;
                background-repeat:no-repeat;
                background-image:url('/images/other/tick-black.png');
            }
        }
        &__radio:checked + .field__radio-label,
        &__checkbox:checked + .field__checkbox-label,
        .field__radio-label.is-checked,
        .field__checkbox-label.is-checked,
        {
            &::before {
                opacity:1;
                transform:scale(1);

            }
        }
        &--disabled {
            cursor:not-allowed;
            .field__radio-label {
                //color:$grey;
                //text-decoration:line-through;
                &::after {
                    //border-color:$grey;
                }
                &::before {
                    

                }
            }
        }
        &--focus {
            .field__wrapper {
                &::after {
                    transition:0.5s $ease-in-expo;
                    transform:scaleX(1);
                }
            }
            .field__radio-label, .field__checkbox-label {
                &::after {
                    border:1px solid $red;
                }
            }
        }
        &--focus, &--active, &--select {
            .field__label {
                transform:translateY(calc(-1 * var(--baseline))) scale(0.6);
            }
        }
        &--error {
            margin-bottom:vr(1) !important;
        }
        &--invert {
            .field__input, .field__select, .field__textarea {
                //color:$white;
            }
            .field__wrapper::before {
                //border-color:$white;
            }
        }
        &--minimal {
            .field__wrapper {
                &::before {
                    display:none;
                }
            }
            .field__select, .field__input {
                padding-right:0; padding-left:0;
            }
        }
        &--inline {
            display:inline-block;
            &.field--radio, &.field--checkbox {
                margin-right:vr(0.5);
            }
        }
        &--pointer {
            input, select, textarea {
                cursor:pointer;
            }
        }
    }
</style>
