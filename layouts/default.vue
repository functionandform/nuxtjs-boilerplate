<template>
  <div class="app">
  	<header-nav></header-nav>
  	<main class="main">
  		<transition name="fade" appear>
		    <Nuxt />
		</transition>
	    <step-nav v-if="showNav"></step-nav>
	    <overlay-entry></overlay-entry>
	</main>
  </div>
</template>

<script>
	export default {
		head() {
			return this.$nuxtI18nSeo()
		},
		computed: {
			showNav() {
				if (this.$route.params.styleCode) {
					return true
				}
				else {
					return false
				}
			}
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

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s $ease-in-out-expo 0.1s;
	}
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
</style>