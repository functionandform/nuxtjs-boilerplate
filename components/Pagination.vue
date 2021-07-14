<template>
    <div class="pagination" v-if="entryCount">
      <div class="pagination__button">
          <nuxt-link v-if="getPreviousLink" :to="getPreviousLink">
          <v-button weight="tertiary" leading-icon="arrow-left">Previous</v-button>
        </nuxt-link>
      </div>
      
      <div class="pagination__pages">
        <p class="meta"><strong>{{$route.params.page}}</strong> of {{getPages}}</p>
      </div>
      <div class="pagination__button">
        <nuxt-link v-if="hasNextLink" :to="getNextLink">
          <v-button weight="tertiary" trailing-icon="arrow-right">Next</v-button>
        </nuxt-link>
      </div>
    </div>
</template>

<script>

  import GET_ENTRY_COUNT from '~/apollo/queries/getEntryCount.gql';

  export default {
    props: {
      title: {
        type: String,
        default: null,
      },
      variables: {
        type:Object,
        required:false
      },
      limit: {
        required:true,
        type:Number
      },
      section:{
        required:true
      }
    },
    apollo: {
      entryCount: {
        query: GET_ENTRY_COUNT,
        prefetch: true,
        variables() {
          const ctx = this;
          if (ctx.variables) {
             return {...ctx.variables, section:ctx.section}
          } else {
            return {section:ctx.section}
          }
        },
        error (error) {
          console.error(error);
        },
        result ({ data, loading, networkStatus }) {
        }
      }
    },
    computed: {
      getPages() {
        const pages = parseInt(this.entryCount) / this.limit;
        return Math.ceil(pages)
      },
      getPreviousLink() {
        const ctx = this;
        const page = parseInt(ctx.$route.params.page);
        const fullPath = ctx.$route.fullPath;

        if (page && page > 1) {
          const newPage = page - 1;
          const newFullPath = fullPath.replace(page.toString(), newPage.toString());
          return newFullPath;
        } else {
          return false;
        }
      },
      getNextLink() {
        const ctx = this;
        const page = parseInt(ctx.$route.params.page);
        const fullPath = ctx.$route.fullPath;
        const newPage = page + 1;
        const newFullPath = fullPath.replace(page.toString(), newPage.toString());
        return newFullPath;
      },
      hasNextLink() {
        const ctx = this;
        return parseInt(ctx.$route.params.page) < ctx.getPages;
      }
    },
  }
  </script>

<style lang="scss" scoped>
  .pagination {
    margin:0 auto vr(1) auto;
    display:flex;
    align-items:center;
    justify-content: center;
    &__button {
      margin:0 vr(1);
    }

  }

</style>