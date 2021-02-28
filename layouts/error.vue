<template>
  <div class="app app--error">
  	<main>
  		<template v-if="error.statusCode === 404">

  		// 404 page not found
  		<h1>We can't seem to find this page</h1>
  		<p>It may have been removed.</p>
	    </template>
	    <template v-else>

  		// other undefined error
  		<h1>Sorry, we seem to be having difficulty rendering this page.</h1>
  		<p>Try refreshing or visiting our homepage</p>

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