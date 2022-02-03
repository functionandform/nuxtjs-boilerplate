<template>
    <component :is="field.displayType" :field="field" :namespace-suffix="suffix" />
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

import Checkboxes from './Checkboxes.vue';
import Dropdown from './Dropdown.vue';
import Radio from './Radio.vue';

export default {
    components: {
        Checkboxes,
        Dropdown,
        Radio,
    },

    mixins: [FieldMixin],

    computed: {
        suffix() {
            if (this.field.displayType !== 'checkboxes') {
                return [''];
            }

            return [];
        },
    },

    created() {
        this.field.options = this.field.categories.map((option) => {
            return { label: option.title, value: option.id };
        });
    },
};

</script>
