<template>
	<div class="logo-container">
		<div class="logo-container__content">
			<img v-lazy="logo.url" :alt="logo.title" :title="logo.title">
		</div><!-- content -->
	</div>
</template>

<script>
	export default {
		props: {
			logo: {
				required:true,
				type:Object
			}
		}
	}

</script>


<style lang="scss">
	.logo-container {
		@include aspect-ratio(5,3);
		width:100%;
		display:block;
		margin-bottom:vr(1);
		&__content {
			position:absolute;
			top:0; right:0; bottom:0; left:0;
			display:flex;
			align-items:center;
			img {
				width:100%;
				height:100%;
				object-fit:contain;
			}
			&::after {
				position:absolute;
				top:0; left:0; width:100%; height:100%;
				display:block;
				background-color:transparent;
				content:"";
				mix-blend-mode: screen;
			}
		}
	}

</style>