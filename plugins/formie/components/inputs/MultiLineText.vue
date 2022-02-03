<template>
    <field :id="getId()" v-bind="attrs()" type="textarea" :name="getName()" :disabled="field.disabled" :label="field.label && !hideLabel ? field.label : null" :instructions="field.instructions"></field>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
};

</script>
