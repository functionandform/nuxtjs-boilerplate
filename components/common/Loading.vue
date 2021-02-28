<template>
	<transition name="loading-transition" appear>
		<div class="loading">
			<div class="loading__icon">
				<loading-icon></loading-icon>
			</div>
			<div class="loading__dialogue" v-if="dialogue">
				<p class="small">{{dialogue}}</p>
			</div>
		</div>
	</transition>

</template>
<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			dialogue: {
				required:false,
				type:String
			}
		}
	}
</script>

<style lang="scss">
	.loading {
		position:absolute;
		top:0; left:0;
		width:100%;
		height:100%;
		background-color:$light-grey;
		display:flex;
		align-items: center;
		justify-content: center;
		flex-direction:column;
		padding:$multiple;
		z-index:100;
		&__icon {
			width:$multiple * 2;
			height:$multiple * 2;
			display:block;
			margin:0 auto $multiple auto;
		}
		.loading-transition-enter-active, .loading-transition-leave-active {
		    transition:transform 0.5s $ease-in-out-expo 0s, opacity 0.5s $ease-in-out-expo;
		    transform:scale(1);
		    opacity:1;
		    position:absolute;
		    width:100%;
		    top:0; left:0;
		  }

		  .loading-transition-enter, .loading-transition-leave-to {
		    //transition:5s $ease-in-out-expo;
		    transform:scale(0.8);
		    opacity:0;
		  }

	}

</style>