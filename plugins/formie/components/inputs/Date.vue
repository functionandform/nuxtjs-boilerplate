<template>
    <field :id="getId()" type="date" icon="calendar" v-bind="attrs()" :label="field.label && !hideLabel ? field.label : null" :instructions="field.instructions" :disabled="field.disabled"></field>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
};

</script>
