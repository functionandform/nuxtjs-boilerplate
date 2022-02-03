<template>
    <fieldset>
        <!-- <legend :id="getId()" :field="field" position="above-input">{{field.label}}<span v-if="field.required" class="red">*</span></legend> -->
        <field-instructions :field="field" position="above-input" />
        <input type="hidden" aria-checked="false" aria-hidden="true" :name="getName()" value="">
        <field :id="getId()" :name="getName()" value="1" type="checkbox" :required="field.required" :label="field.descriptionHtml"></field>
    </fieldset>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
};

</script>
