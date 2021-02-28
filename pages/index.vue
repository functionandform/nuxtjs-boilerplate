<template>
  
</template>

<script>
import GET_HOMEPAGE from '~/apollo/queries/getHomepage.gql';
export default {
  data(){
    return {
      baseUrl: process.env.BASE_URL,
    }
  },
  apollo: {
      homepage: {
        query: GET_HOMEPAGE,
        //prefetch: ({ $i18n }) => ({ site: $i18n.locale }),
        variables () {
          return { site: 'default' }
        },
        error (error) {
          console.log("error", error);
        },
        result ({ data, loading, networkStatus }) {
          if (!loading) {
          }
        }
      }
    },
}
</script>


<style lang="scss" scoped>

</style>