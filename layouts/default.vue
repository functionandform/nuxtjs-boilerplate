<template>
  <div class="app">
  	<main class="main">
		    <Nuxt />
		</main>
		<cookie-consent :decline-allowed="false" position="bottom-left"/>
  </div>
</template>

<script>
	import GET_SEOMATIC_CONTAINERS from '~/apollo/queries/getSeomaticContainers.gql';
	export default {
		name:"default",
		data() {
			return {
				seomaticContainers:null
			}
		},
		head() {
			if (this.seomaticContainers) {
				return this.seomaticContainers;
			}
		},
		transition: {
			name: 'fade',
			mode: 'out-in'
		},
		created() {
			const ctx = this;
			if (process.client) {
				document.addEventListener('scroll', ctx.applyScrollPosition);
			}
		},
		destroyed() {
			const ctx = this;
			if (process.client) {
				document.removeEventListener('scroll', ctx.applyScrollPosition);
			}
		},
		apollo: {
			seomatic: {
			  query: GET_SEOMATIC_CONTAINERS,
			  prefetch: ({ route }) => ({
			    uri: route.fullPath,
			    site: "default",
			  }),
			  variables() {
			    return {
			      uri: this.$route.fullPath,
			      site: "default",
			    };
			  },
			  error(error) {
			    console.error(error);
			  },
			  result(data, loading, networkStatus) {
			   	this.seomaticContainers = this.$options.methods.compileSeomatic(this.seomatic); 
			   }
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		display:flex;
		flex-direction:column;
		justify-content: center;
		align-items: center;
		min-height:100vh;
		width:100%;
	}
	.main {
		width:100%;
		flex:1 0 100%;
	    //display: flex;
	    //flex-direction: column;
	    //justify-content: center;
	}
</style>