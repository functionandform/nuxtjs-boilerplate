<template>
    <field v-bind="attrs()" type="number" :disabled="field.disabled" :label="field.label && !hideLabel ? field.label : null" :instructions="field.instructions" :min="field.min" :max="field.max"></field>
</template>
<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
};

</script>
