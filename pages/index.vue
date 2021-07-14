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
          if (!data.entry) {
              return this.$nuxt.error({ statusCode: 404 });
            }     
        }
      }
    },
}
</script>


<style lang="scss" scoped>

</style>