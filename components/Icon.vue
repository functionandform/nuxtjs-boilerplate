<template>
	<svg :class="'icon '+addClass+' icon--'+size"><use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="require('~/assets/iconography/icons.svg')+'#icon-'+ name"></use></svg>
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

	.icon {
	  display: inline-block;
	  /* icon primary color */
	  color: black;
	  height:1em; width:1em;
	  stroke-width:2px;
	  vertical-align: middle;
	}

	.icon use {
	  /* icon secondary color - fill */
	  fill: inherit;
	  stroke:currentColor;
	}

	.icon.icon--outline use {
	  /* icon secondary color - stroke */
	  stroke: inherit;
	}

	.icon.icon--solid use {
	  /* icon secondary color - stroke */
	  stroke: none;
	  fill:currentColor;
	}


	.icon.icon--duo use {
	  /* icon secondary color - stroke */
	  stroke: red;
	}
	/* --------------------------------

	Change icon size

	-------------------------------- */

	.icon--xs {
	  height: 0.5em;
	  width: 0.5em;
	}

	.icon--sm {
	  height: 0.8em;
	  width: 0.8em;
	}

	.icon--lg {
	  height: 1.6em;
	  width: 1.6em;
	}

	.icon--xl {
	  height: 2em;
	  width: 2em;
	}

	/* -------------------------------- 

	Align icon and text 

	-------------------------------- */

	.icon-text-aligner {
	  /* add this class to parent element that contains icon + text */
	  display: flex;
	  align-items: center;
	}

	.icon-text-aligner .icon {
	  color: inherit;
	  margin-right: 0.4em;
	  flex-shrink: 0;
	}

	.icon-text-aligner .icon.icon--align-right {
	  margin-right: 0;
	  margin-left: 0.4em;
	}

	.icon-text-aligner .icon use {
	  color: inherit;
	  fill: currentColor;
	}

	.icon-text-aligner .icon.icon--outline use {
	  stroke: currentColor;
	}

	/* -------------------------------- 

	Icon reset values - used to enable color customizations

	-------------------------------- */

	// .icon {
	//   fill: currentColor;
	//   stroke: none;
	// }

	// .icon.icon--outline {
	//   stroke: currentColor;
	// }

	// .icon use {
	//   stroke: none;
	// }

	/* -------------------------------- 

	Stroke effects - Nucleo outline icons

	- 16px icons -> up to 1px stroke (16px outline icons do not support stroke changes)
	- 24px, 32px icons -> up to 2px stroke
	- 48px, 64px icons -> up to 4px stroke

	-------------------------------- */

	.icon--outline.icon--stroke-1 {
	  stroke-width: 1px;
	}

	.icon--outline.icon--stroke-2 {
	  stroke-width: 2px;
	}

	.icon--outline.icon--stroke-3 {
	  stroke-width: 3px;
	}

	.icon--outline.icon--stroke-4 {
	  stroke-width: 4px;
	}

	.icon--outline.icon--stroke-1 use,
	.icon--outline.icon--stroke-3 use {
	  -webkit-transform: translateX(0.5px) translateY(0.5px);
	  -moz-transform: translateX(0.5px) translateY(0.5px);
	  -ms-transform: translateX(0.5px) translateY(0.5px);
	  -o-transform: translateX(0.5px) translateY(0.5px);
	  transform: translateX(0.5px) translateY(0.5px);
	}
</style>