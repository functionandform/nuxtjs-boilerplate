<template>
  
</template>

<script>
import GET_ENTRY from '~/apollo/queries/getEntry.gql';
export default {
  data(){
    return {
      
    }
  },
  apollo: {
      entry: {
        query: GET_ENTRY,
        //prefetch: ({ $i18n }) => ({ site: $i18n.locale }),
        variables () {
          return { site: 'default', section:'homepage' }
        },
        error (error) {
          console.error(error);
        },
        result ({ data, loading, networkStatus }) {
          if (data && data.entry) {
            // Entry exists
          }
          else {
            console.error('Entry does not existing')
            return this.$nuxt.error({ statusCode: 404 });
          }
        }
      }
    },
}
</script>


<style lang="scss" scoped>

</style>