<template>
    <div class="field"
         :class="[typeClass(), {'field--invert': invert, 'field--minimal': minimal , 'field--inline': inline, 'field--required':required}, classes]">
        <template v-if="type != 'radio' && type != 'checkbox'">

            <template v-if="label">
                <div class="row between-xs middle-xs">
                    <div class="col-xs align-left">
                        <label :for="id" class="field__label">{{ label }}</label>
                    </div><!-- col -->
                    <div class="col-xs align-right" v-if="adjacentLabelContent" :html="adjacentLabelContent"></div>
                    <!-- col -->
                </div><!-- row -->
            </template>

            <div class="field__wrapper">
                <div class="field__hint-icon" v-if="icon">
                    <svg class="icon icon--grid-24 icon--outline">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink"
                             :xlink:href=" '/assets/icons/icons.svg#icon-' + icon"/>
                    </svg>
                </div><!-- icon -->

                <template v-if="type === 'select'">
                    <select :type="type" :name="name" :placeholder="placeholder" :disabled="disabled"
                            :readonly="readonly"  :required="required" @focus="focus" @blur="validateAndBlur" @change="active" ref="input"
                            class="field__select" :value="value" @input="$emit('input', $event.target.value)">
                        <option v-for="(option, index) in options" :value="option.value" :selected="option.selected" :key="index">{{
                            option.label ? option.label : option.value}}
                        </option>
                    </select>
                </template>

                <template v-else-if="type === 'textarea'">
                    <textarea :type="type" :name="name" :placeholder="placeholder" :disabled="disabled"
                              :readonly="readonly" @focus="focus" @blur="validateAndBlur" @keyup="active(); textarea()"
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
                        <v-button type="submit" weight="primary" :loading="loading">
                            <template v-if="submitButtonLabel">
                                {{submitButtonLabel}}
                            </template>
                        </v-button>
                    </div><!-- submit -->
                </template>
            </div><!-- wrapper -->
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
            onChange: function(e) {
                this.$emit('input', this.value)
                this.active()
            },
            focus: function () {
                this.$el.closest(".field").classList.add("field--focus");
            },
            typeClass: function () {
                return 'field--' + this.type;
            },
            active: function () {
                if (this.$refs.input.value.length > 0) {
                    this.$refs.input.closest(".field").classList.add("field--active");
                } else {
                    this.$refs.input.closest(".field").classList.add("field--active");
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
                if (!this.$refs.input.validity.valid) {
                    this.$refs.input.closest(".field").classList.add("field--invalid");
                } else {
                    this.$refs.input.closest(".field").classList.remove("field--invalid");
                }
            },
            textarea: function () {
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
        margin-bottom:$multiple;
        //padding-bottom:$multiple / 2;
        box-sizing: border-box;
        position:relative;
        &__label {
            display:block;
            margin-bottom:$multiple / 2;
            line-height:$multiple;
            color:$black;
            font-weight:500;
        }
        &--required {
            .field__label {
                &::after {
                    display:inline;
                    content:"*";
                }
            }
        }
        &__label-logo {
            height:$multiple * 1;
            display:inline-block;
            width:auto;
            vertical-align: middle;
        }
        &__wrapper {
            position:relative;
            display:flex;
            align-items:center;
            width:100%;
            box-sizing: border-box;
            border:2px solid transparent;
            border-radius:$radius + 2px;
            transition:0.2s $ease-in-out-expo;
            &::before {
                position:absolute;
                top:0; right:0; bottom:0; left:0;
                border:$border;
                border-radius:$radius;
                pointer-events:none;
                background:transparent;
                content:"";
            }

        }
        &__error, .ff-errors {
            position:absolute;
            list-style:none;
            top:100%;
            left:0; right:0;
            line-height:$multiple;
            pointer-events:none;
            animation:error-fade-in 0.6s $ease-in-out-expo;
            text-align:right;
            color:$red;
            font-size:10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            @include breakpoint(lg) {
                font-size:11px;
            }
            li {
                display:inline;
            }
        }
        &__input, &__select, &__textarea {
            padding:($multiple / 2) 0 ($multiple / 2) ($multiple / 2);
            font-size:14px;
            line-height:$multiple;
            font-family:$body-font-family;
            color:$black;
            font-weight:400;
            display:block;
            background-color:transparent;
            border-radius:0;
            min-height:$multiple * 2;
            width:100%;
            flex:0 1 100%;
            min-width:0;
            @include breakpoint(lg) {
                font-size:16px;
            }
            &:focus {
                outline:none;
            } 
            &::placeholder {
                color: $grey;
            }
        }
        &__input {
            height:$multiple * 2;
        }
        &__select {
            height:$multiple * 2;
        }
        &--select {
            .field__wrapper {
                .field__select {
                    padding-right:$multiple * 1.25;
                }
                &::after {
                    @include chev('down', 8px, $green);
                    display:inline-block;
                    vertical-align: middle;
                    content:"";
                    position:absolute;
                    right:$multiple / 2;
                    top:$multiple / 2;
                }
            }
        }
        &__function-icon, &__hint-icon {
            height:$multiple; width:$multiple;
            pointer-events:none;
            flex:0 0 $multiple;
            margin-top:-2px;
        }
        &__function-icon {
            margin-right:$multiple / 2;
            top:$multiple / 4;
            position:absolute;
            right:0;
        }
        &__hint-icon {
            margin-left:$multiple / 2;
        }
        &__textarea {
            display:block;
            min-height:$multiple * 4;
            line-height:$multiple;
            padding:$multiple / 2;
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
            visibility: hidden;
            opacity:0;
        }
        &__radio-label, &__checkbox-label {
            display:block;
            line-height:$multiple;
            padding-left:$multiple * 1.25;
            position:relative;
            cursor:pointer;
            text-align:left;
            &::after {
                position:absolute;
                left:0;
                top:0;
                content:"";
                margin:((($multiple) - ($multiple * 0.75)) / 2);
                margin-left:0;
                width:$multiple * 0.75;
                height:$multiple * 0.75;
                display:block;
                border:$border;
                background-color:transparent;
            }
            &::before {
                position:absolute;
                content:"";
                opacity:0;
                top:0; left:0;
                border:1px solid transparent;
                display:block;
                margin:(((($multiple) - ($multiple * 0.75)) / 2) + 1px);
                margin-left:1px;
                width:$multiple * 0.75;
                height:$multiple * 0.75;
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
                background-color:$green;
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
                //background-image:url('/assets/images/other/tick-hot-pink.png');
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
                color:$grey;
                //text-decoration:line-through;
                &::after {
                    border-color:$grey;
                }
                &::before {
                    

                }
            }
        }
        &--focus {
            .field__wrapper {
                border-color:$green;
            }
            .field__radio-label, .field__checkbox-label {
                &::after {
                    outline:2px solid $green;
                }
            }
        }
        &--error {
            margin-bottom:$multiple !important;
        }
        &--invert {
            .field__input, .field__select, .field__textarea {
                color:$white;
            }
            .field__wrapper::before {
                border-color:$white;
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
                margin-right:$multiple / 2;
            }
        }
        &--pointer {
            input, select, textarea {
                cursor:pointer;
            }
        }
    }
</style>
