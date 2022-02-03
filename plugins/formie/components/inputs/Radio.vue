<template>
    <fieldset :aria-labelledby="getId()">
        <legend v-if="!hideLabel">
            {{ field.label }}<span v-if="field.required && !singleSelect" class="red">*</span>
        </legend>

        <field-instructions :field="field" />
        <template v-if="singleSelect">
            <button-row block-mobile>
                <v-button v-for="(option, index) in field.options" :id="getId([index])" :key="index" :name="getName()" :value="option.value" :required="field.required" type="radio" weight="primary" @click.native="onClick">{{option.label}}</v-button>
            </button-row>
        </template>
        <template v-else>
            <field v-for="(option, index) in field.options" :id="getId([index])" :key="index" :name="getName()" :value="option.value" :required="field.required" type="radio" :label="option.label"></field>
        </template>
    </fieldset>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
    methods: {
        onClick(e) {
            if (e.target.nodeName === 'INPUT') {
                this.$emit('single-select');
            }
        },
    },
};
</script>
