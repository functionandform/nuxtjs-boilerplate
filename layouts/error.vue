<template>
  <div class="app app--error">
  	<main>
  		<template v-if="error.statusCode === 404">
  		<h1>Error 404</h1>
  		<p>We can't seem to find the page you're looking for.</p>
	    </template>
	    <template v-else>

  		<h1>Sorry, we seem to be having some technical issues.</h1>
  		<p>Try refreshing the page or try again later</p>

	    </template>
    </main>
  </div>
</template>

<script>
	export default {
		props:['error'],
    created() {
      console.log(this.error);
    }
	}
</script>

<style lang="scss" scoped>

</style>