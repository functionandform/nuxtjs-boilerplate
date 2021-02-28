<template>
	<div :class="'logo-container logo-container--'+hue">
		<div class="logo-container__content">
			<img v-lazy="logo.url" :alt="logo.title" :title="logo.title">
		</div><!-- content -->
	</div>
</template>

<script>
	export default {
		name:"LogoContainer",
		props: {
			logo: {
				required:true,
				type:Object
			},
			hue: {
				required:false,
				type:String,
				default:'original'
			}
		}
	}

</script>


<style lang="scss">
	.logo-container {
		@include aspect-ratio(5,3);
		width:100%;
		display:block;
		margin-bottom:$multiple;
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
		&--green {
			.logo-container__content::after {
				background-color:$green;

			}
		}
		&--purple {
			.logo-container__content::after {
				background-color:$purple;

			}
		}
	}

</style>