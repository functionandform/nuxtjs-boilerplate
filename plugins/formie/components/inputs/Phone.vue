<template>

        <field v-bind="attrs()" type="tel" icon="phone" :disabled="field.disabled" :label="field.label && !hideLabel ? field.label : null" :instructions="field.instructions"></field>

</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
};

</script>
