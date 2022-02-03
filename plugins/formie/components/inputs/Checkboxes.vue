<template>
    <fieldset :aria-labelledby="getId()">
        <legend v-if="!hideLabel">
            {{ field.label }}<span v-if="field.required" class="red">*</span>
        </legend>

        <field-instructions :field="field" />

        <field v-for="(option, index) in field.options" :id="getId([index])" :key="index" :name="getName([''])" :value="option.value" :required="field.required" type="checkbox" :label="option.label"></field>
    </fieldset>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
};
</script>
