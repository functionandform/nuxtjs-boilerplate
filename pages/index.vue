<template>
  
</template>

<script>
import GET_HOMEPAGE from '~/apollo/queries/getHomepage.gql';
export default {
  data(){
    return {
      
    }
  },
  apollo: {
      entry: {
        query: GET_HOMEPAGE,
        //prefetch: ({ $i18n }) => ({ site: $i18n.locale }),
        variables () {
          return { site: 'default' }
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