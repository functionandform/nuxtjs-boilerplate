<template>
  <div class="app app--error">
    <client-only>
      <main>
        <container>
          <row center-xs>
            <column xs="12" lg="10" xl="8">
              <template v-if="error.statusCode === 404">
              <h4>Error 404</h4>
              <h1>We can't seem to find that page.</h1>
              <p>It may have been moved or deleted. Not to worry, maybe our homepage will lead you to what you're looking for.</p>
              <v-button to="/" weight="primary">Homepage</v-button>
              </template>
              <template v-else>

              <h4>Internal server error</h4>
              <h1>Sorry, we seem to be having difficulty rendering this page.</h1>
              <p>Try refreshing or visiting our homepage</p>
              </template>
            </column>
          </row>
        </container>
      </main>
    </client-only>
  </div>
</template>

<script>
  
  import GET_REDIRECT from '~/apollo/queries/getRedirect.gql';
  
  export default {
    props:['error'],
    apollo: {
      retour: {
        query: GET_REDIRECT,
        prefetch: true,
        variables() {
          return {
            uri: this.$route.fullPath,
          };
        },
        error(error) {
          
          console.error(error);
        },
        result(data, loading, networkStatus) {
          const ctx  = this;
           if (ctx.retour && ctx.retour.redirectDestUrl && ctx.retour.redirectDestUrl.length) {
            let url = ctx.retour.redirectDestUrl;
            let destUrl = url;
            const firstChar = url.charAt(0);
            
            if (destUrl.startsWith('http')) {
          
            } else if (firstChar != '/') {
              destUrl = '/'+url;
            }
            return ctx.$nuxt.context.redirect(ctx.retour.redirectHttpCode, destUrl);
          }
        }
      },
    },
    mounted() {
      console.error(this.error);
    }
  }
</script>
