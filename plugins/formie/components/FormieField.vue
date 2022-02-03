<template>
    <div v-if="canInclude" v-show="canShow" v-bind="attrs" class="formie-field">
        <component :is="field.displayName" :field="field" :single-select="singleSelect" :hide-label="hideLabel" @single-select="$emit('single-select')" />
    </div>
</template>

<script>
import { attributesTable } from '../utils/helpers';

import AllInputs from './inputs';

// Import separately, as they can't be nested
import Group from './inputs/Group.vue';
import Repeater from './inputs/Repeater.vue';

export default {
    components: {
        ...AllInputs,
        Group,
        Repeater,
    },

    props: {
        field: {
            type: Object,
            default: () => {},
        },
        singleSelect: {
            required: false,
            type: Boolean,
        },
        hideLabel: {
            required: false,
            type: Boolean,
        },
    },
    computed: {
        canInclude () {
            return this.field.visibility !== 'disabled';
        },

        canShow () {
            return this.field.visibility !== 'hidden' && this.field.displayName !== 'Hidden';
        },

        attrs () {
            const attrs = {
                class: this.field.cssClasses,
                ...attributesTable(this.field.containerAttributes),
            };

            if (this.field.enableConditions) {
                attrs['data-field-conditions'] = this.field.conditions;
            }

            return attrs;
        },
    },
};

</script>
<style lang="scss">
.formie-field {
    display:block;
}
</style>
