<template>

    <fieldset :aria-labelledby="getId()">
        <legend v-if="!hideLabel">{{ field.label }}</legend>

        <field-instructions :field="field" position="fieldset-start"/>

        <div class="field-row" v-for="(fields, i) in getSubFields()" :key="i">
            <template v-for="(subField, index) in fields">
                <field type="select" v-if="subField.options" :key="index" :label="subField.label" :required="subField.required" :id="getId([index])" :options="subField.options" :autocomplete="autocomplete[index]" :name="getName([index])" :value="subField.defaultValue"></field>

                <field v-else type="text" :key="index" :label="subField.label" :id="getId([index])" :autocomplete="autocomplete[index]" v-bind="attrs(subField, [index])"></field>
            </template>
        </div>
    </fieldset>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],

    data() {
        return {
            subFields: [
                ['address1'],
                ['address2'],
                ['address3'],
                ['city', 'zip'],
                ['state', 'country'],
            ],

            autocomplete: {
                address1: 'address-line1',
                address2: 'address-line2',
                address3: 'address-line3',
                city: 'address-level2',
                zip: 'postal-code',
                state: 'address-level1',
                country: 'country',
            },
        };
    },
};

</script>
