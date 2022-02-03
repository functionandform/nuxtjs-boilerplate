<template>
    <field :id="getId()" v-bind="attrs()" type="text" :required="field.required" :disabled="field.disabled" :label="field.label && !hideLabel ? field.label : null" :instructions="field.instructions" :value="field.defaultValue" @keydown.native="wordCheck" :maxlength="maxlength"></field>
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],

    computed: {
        maxlength() {
            if (this.field.limit && this.field.limitType === 'characters') {
                return this.field.limitAmount;
            }

            return null;
        },
    },

    methods: {
        wordCheck(e) {
            if (!this.field.limit || this.field.limitType != 'words') {
                return;
            }

            setTimeout(() => {
                const { value } = e.target;
                const wordCount = value.split(/\S+/).length - 1;
                const regex = new RegExp(`^\\s*\\S+(?:\\s+\\S+){0,${this.field.limitAmount - 1}}`);

                if (wordCount >= this.field.limitAmount) {
                    e.target.value = value.match(regex);
                }
            }, 1);
        },
    },
};

</script>
