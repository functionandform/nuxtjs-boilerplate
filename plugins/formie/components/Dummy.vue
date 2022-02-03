<template>
    <div></div>
</template>

<script>
/**
 * This component is used to ensure that content placed before is ready to be used.
 */
export default {
    async mounted () {
        // does not always work with only one
        await this.$nextTick();
        await this.$nextTick();
        this.$emit('mounted');
    },
};
</script>
