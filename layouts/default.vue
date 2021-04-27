<template>
  <div class="app">
  	<main class="main">
  		<transition name="fade" appear>
		    <Nuxt />
		</transition>
	</main>
  </div>
</template>

<script>
	export default {
		
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