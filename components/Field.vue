<template>
    <div class="field"
         :class="[typeClass(), {'field--invert': invert, 'field--minimal': minimal , 'field--inline': inline, 'field--required':required, 'field--block':block}, classes]" ref="field">
        <template v-if="type != 'radio' && type != 'checkbox'">
            <template v-if="label">
                <label :for="id" class="field__label">{{ label }}<strong v-if="required" class="red">*</strong></label>
            </template>
            <div class="field__wrapper">
                <div class="field__hint-icon" v-if="icon">
                    <icon :name="icon"></icon>
                </div><!-- icon -->

                <template v-if="type === 'select'">
                    <select :type="type" :name="name" :disabled="disabled"
                            :readonly="readonly"  @focus="focus" @blur="validateAndBlur" @change="active" ref="input"
                            class="field__select" @input="$emit('input', $event.target.value)" :required="required">
                        <option disabled :selected="value && value.length ? false : true"><template v-if="placeholder">{{placeholder}}</template><template v-else>Please select</template></option>
                        <option v-for="(option, index) in options" :value="option.value" :selected="value && value === option.value" :key="index">{{
                            option.label ? option.label : option.value}}
                        </option>
                    </select>
                    <div class="field__select-icon">
                        <icon name="chev-down-small" size="small"></icon>
                    </div>
                </template>

                <template v-else-if="type === 'textarea'">
                    <textarea :type="type" :name="name" :placeholder="placeholder" :disabled="disabled"
                              :readonly="readonly" :required="required" @focus="focus" @blur="validateAndBlur" @change="onChange" @keyup="active, textarea"
                              ref="input" class="field__textarea" :value="value"
                              @input="$emit('input', $event.target.value)"></textarea>
                </template>

                <template v-else-if="type === 'date'">
                    <input :type="type" :name="name" :placeholder="placeholder" :disabled="disabled"
                           :readonly="readonly" :required="required" :value="value" @focus="focus" @blur="validateAndBlur" @keyup="active"
                           ref="input" :class="'field__input ' + inputClasses" :pattern="pattern" :title="title"
                           @input="$emit('input', $event.target.value)">
                </template>

                <template v-else>
                    <input :type="type" :name="name" :placeholder="placeholder" :disabled="disabled"
                           :readonly="readonly" :required="required" :value="value" @focus="focus" @blur="validateAndBlur" @keyup="active"
                           ref="input" :class="'field__input ' + inputClasses" :pattern="pattern" :title="title"
                           @input="$emit('input', $event.target.value)">
                </template>
                <template v-if="submitButton">
                    <button type="submit" class="field__submit">
                        <icon name="arrow-right"></icon>
                    </button><!-- submit -->
                </template>
            </div><!-- wrapper -->
        </template>

        <template v-if="type === 'checkbox' || type === 'radio'">
            <input :class="'field__' + type" :type="type" :name="name" :placeholder="placeholder" :disabled="disabled"
                   :readonly="readonly" :required="required" @focus="focus" @blur="validateAndBlur" @change="onChange" ref="input"
                   :value="value" :id="name+'_'+value|paramCase" :checked="shouldBeChecked">
            <label :for="name+'_'+value|paramCase" :class="'field__'+ type +'-label'">
                <span v-html="label"></span>
                <strong v-if="required" class="red">*</strong>
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
                required:false
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
            },
            block: {
                required:false,
                type:Boolean
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
                //this.$emit('input', this.value)
                this.active()
            },
            focus() {
                const input = this.$refs.input;
                const field = this.$refs.field;
                if (input && field) {
                    field.classList.add("field--focus");
                }
            },
            typeClass() {
                return 'field--' + this.type;
            },
            active() {
                const input = this.$refs.input;
                const field = this.$refs.field;
                if (input && field) {
                    if (input.value && input.value.length > 0) {
                        field.classList.add("field--active");
                    } else {
                        field.classList.remove("field--active");
                    }
                }
            },
            validateAndBlur() {
                this.validate();
                this.blur();
            },
            blur() {
                const input = this.$refs.input;
                const field = this.$refs.field;
                if (input && field) {
                    field.classList.remove("field--focus");
                }
            },
            validate() {
                const input = this.$refs.input;
                const field = this.$refs.field;
                if (input && field) {
                    if (!input.validity.valid) {
                        input.closest(".field").classList.add("field--invalid");
                    } else {
                        input.closest(".field").classList.remove("field--invalid");
                    }
                }
            },
            textarea() {
                const input = this.$refs.input;
                if (input) {
                    input.style.height = "48px";
                    input.style.height = (input.scrollHeight) + "px";
                }
            },
            adaptiveSelectWidth() {
                let select = this.$refs.input;
                const field = this.$refs.field;
                if (select && field) {
                    const selectedOption = select.options[select.selectedIndex ?? 0];
                    if (selectedOption) {
                        let value = select.value;
                        let label = selectedOption.text;
                        select.style.width = (label.length) + "ch";
                    }
                }
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
        //padding-bottom:vr(0.5);
        box-sizing: border-box;
        position:relative;
        text-align:left;
        &__label {
            display:block;
            margin-bottom:vr(0.5);
            text-align:left;
        }
        &--required {
            // .field__label, .field__checkbox {
            //     &::after {
            //         display:inline;
            //         content:"*";
            //         color:$red;
            //         font-weight:700;
            //     }
            // }
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
                box-sizing:border-box;
                bottom:0;
                left:0;
                height:100%;
                width:100%;
                pointer-events:none;
                content:"";
            }
            &::before {
                background-color: white;
                border:2px solid black;
            }

            &::after {
                opacity:0;
                transition:0.2s $ease-in-out-expo;
                border:2px solid blue;
            }
            & > * {
                position:relative;
                z-index: 1;
            }

        }
        &__error {
            list-style: none;
            line-height:line-height(1);
            font-size:0.55rem;
            text-align:right;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            pointer-events:none;
            margin-bottom:vr(1);
             @include breakpoint(lg) {
                font-size:0.6rem;
            }
            li {
                display:inline;
            }
        }
        &__wrapper {
            .field__error, .ff-errors {
                position:absolute;
                top:100%;
                left:0; right:0;
                animation:error-fade-in 0.6s $ease-in-out-expo;
               
            }
        }
        &__input, &__select, &__textarea {

            padding:vr(0.5) vr(0.5);
            font-size:1rem;
            line-height:line-height(1);
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
            option {
                &:disabled {

                }
            }
        }
        &__select-icon {
            pointer-events:none;
            padding-right:vr(0.5);
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
            .icon {

            }
        }
        &__textarea {
            display:block;
            min-height:vr(4);
            line-height:vr(1);
            resize: none;
        }
        &__submit {
            margin:0 vr(0.5);
            z-index: 2;
            pointer-events:all;
            -webkit-appearance: none;
            background-color:transparent;
            border:none;
            cursor:pointer;
            border-radius:0px;
            .icon {
                
            }
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
            &::before {
                margin-left:0;
                background-color: white;
                border:1px solid transparent;
            }

            &::after {
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
            &::before {
                border-radius:50%;
            }
            &::after {
                border-radius:50%;
                background-color:blue;
                box-sizing:border-box;

            }
        }
        &__checkbox-label {
            &::before {

            }
            &::after {
                background-size:contain;
                background-position:center;
                background-repeat:no-repeat;
                background-color:blue;
                content:'';
                mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' width='24' viewBox='0 0 24 24'%3E%3Cg stroke-linecap='square' stroke-width='2' fill='none' stroke='black' stroke-linejoin='miter' class='nc-icon-wrapper' stroke-miterlimit='10'%3E%3Cpolyline points='6,12 10,16 18,8 '%3E%3C/polyline%3E%3C/g%3E%3C/svg%3E") center center no-repeat;
            }

        }
        &__radio:checked + .field__radio-label,
        &__checkbox:checked + .field__checkbox-label,
        .field__radio-label.is-checked,
        .field__checkbox-label.is-checked,
        {
            &::after {
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
                    opacity:1;
                }
            }
            .field__checkbox-label, .field__radio-label {
                &::before {
                    border:1px solid blue;
                }
            }
        }
        &--focus, &--active, &--select {
            .field__label {
                //transform:translateY(calc(-1 * var(--baseline))) scale(0.6);
            }
            .field__wrapper {
                
            }
        }
        &--error {
            margin-bottom:vr(1) !important;
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


    .call-out-box:not(.call-out-box--light) .field, .section--light-grey .field, .field--invert {
        .field__wrapper {
            &::before {
                
            }
        }
        .field__radio-label, .field__checkbox-label {
            &::before {
                
            }
        }
    }
</style>
