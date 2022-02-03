<template>
    <field :id="getId()" v-bind="attrs()" type="email" icon="email" :required="field.required" :disabled="field.disabled" :label="field.label && !hideLabel ? field.label : null" :instructions="field.instructions" :value="field.defaultValue"></field>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
};

</script>
