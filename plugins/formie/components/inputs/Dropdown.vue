<template>
    <div>
        <field :id="getId()" type="select" :name="getName()" :multiple="field.multiple" :required="field.required" :disabled="field.disabled" :label="field.label && !hideLabel ? field.label : null" :instructions="field.instructions" :options="field.options" :value="field.defaultValue"></field>
    </div>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
};

</script>
