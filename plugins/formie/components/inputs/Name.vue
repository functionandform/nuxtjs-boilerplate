<template>
    <div>
        <template v-if="field.useMultipleFields">
            <fieldset :aria-labelledby="getId()">
                <label v-if="!hideLabel" class="field__label">{{ field.label }}<span class="red" v-if="field.required || hasRequiredFields">*</span></label>

                <field-instructions :field="field"/>

                <field-merge v-for="(fields, i) in getSubFields()" :key="i">
                    <template v-for="(subField, index, fieldIndex) in fields">
                        <field v-if="index === 'prefix'" :id="getId()" :name="getName([index])" :autocomplete="autocomplete[index]" type="select" :required="subField.required" :disabled="subField.disabled" :placeholder="subField.required ? subField.label + '*' : subField.label" :instructions="subField.instructions" :options="subField.options" :value="subField.value" :icon="fieldIndex === 0 ? 'profile' : null"></field>
                        <field v-else :id="getId()" v-bind="attrs(subField, [index])" :autocomplete="autocomplete[index]" type="text" :disabled="subField.disabled" :placeholder="subField.required ? subField.label + '*' : subField.label" :instructions="subField.instructions" :value="subField.value" :icon="fieldIndex === 0 ? 'profile' : null"></field>
                    </template>
                </field-merge>
            </fieldset>
        </template>

        <template v-else>
            <field :id="getId()" v-bind="attrs()" type="text" :required="field.required" :disabled="field.disabled" :placeholder="field.label" :instructions="field.instructions" :options="field.options"></field>
        </template>
    </div>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],

    data() {
        return {
            subFields: [
                ['prefix', 'firstName', 'middleName', 'lastName'],
            ],

            autocomplete: {
                prefix: 'honorific-prefix',
                firstName: 'given-name',
                middleName: 'additional-name',
                lastName: 'family-name',
            },
        };
    },
    methods: {
        hasRequiredFields() {
            const fields = this.getSubFields();
            return fields.some(field => { return field.required });
        }
    }
};

</script>
