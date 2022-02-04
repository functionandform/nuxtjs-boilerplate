<template>
	<svg :class="'social-icon '+addClass+' social-icon--outline social-icon--'+size"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="require('~/assets/iconography/social.svg')+'#icon-'+ name"></use></svg>
</template>


<script>
	export default {
		props: {
			name: {
				required:true,
				type:String
			},
			addClass: {
				required:false,
				type:String,
				default:''
			},
			size: {
				required:false,
				type:String,
				default:'regular'
			}
		},
		methods: {
			
		}
	}
	
</script>


<style lang="scss">

	/* Generated using nucleoapp.com */
	/* --------------------------------

	Icon colors

	-------------------------------- */

	.social-icon {
	  display: inline-block;
	  /* icon primary color */
	  height:1em; width:1em;
	  stroke-width:2px;
	  vertical-align: middle;
	}

	.social-icon use {
	  /* icon secondary color - fill */
	  fill: currentColor;
	}


</style>