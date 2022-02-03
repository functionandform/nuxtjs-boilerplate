<template>
    <field :id="getId()" v-bind="attrs()" type="file" :name="getName()" :required="field.required" :disabled="field.disabled" :label="field.label && !hideLabel ? field.label : null" :instructions="field.instructions" :options="field.options"></field>

</template>
<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
};

</script>
