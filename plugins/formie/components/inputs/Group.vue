<template>
    <fielset>
        <legend v-if="!hideLabel" :id="getId()" :field="field">{{field.label}}<span class="red" v-if="field.required">*</span></legend>

        <field-instructions :field="field" />

        
        <div v-for="(nestedField, fieldIndex) in field.fields" :key="fieldIndex">
            <component
                :is="nestedField.displayName"
                :field="nestedField"
                :namespace="[field.handle]"
            />
        </div>
    </fielset>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

import AllInputs from './';

export default {
    components: AllInputs,

    mixins: [FieldMixin],
};

</script>
