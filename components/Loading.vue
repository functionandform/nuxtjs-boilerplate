<template>
	<transition name="pop-transition" appear mode="in-out">
		<div class="loading">
			<div class="loading__icon">
				
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
		min-height:vr(3);
		width:100%;
		height:100%;
		display:flex;
		align-items: center;
		justify-content: center;
		flex-direction:column;
		padding:vr(1);
		z-index:100;
		&__icon {
			width:vr(1.5);
			height:vr(1.5);
			display:block;
			margin:0 auto vr(1) auto;
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