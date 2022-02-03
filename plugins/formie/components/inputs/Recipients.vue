<template>
    <component :is="field.displayType" :field="field" />
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

import Checkboxes from './Checkboxes.vue';
import Dropdown from './Dropdown.vue';
import Hidden from './Hidden.vue';
import Radio from './Radio.vue';

export default {
    components: {
        Checkboxes,
        Dropdown,
        Hidden,
        Radio,
    },

    mixins: [FieldMixin],
};

</script>
