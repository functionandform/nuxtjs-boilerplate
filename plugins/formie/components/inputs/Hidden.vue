<template>
    <input v-bind="attrs()" type="hidden">
</template>

<script>
import FieldMixin from '../../mixins/FieldMixin';

export default {
    mixins: [FieldMixin],
};

</script>
