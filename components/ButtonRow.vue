<template>

	<div class="button-row">
		<slot/>
	</div>

</template>

<style lang="scss">
	.button-row {
		display:flex;
		align-items:center;
		flex-wrap:wrap;
		margin:0 vr(-0.5) vr(1) vr(-0.5);
		.button {
			margin:0 vr(0.5) 0 vr(0.5);
			&--category {
				margin-right:vr(0.25);
				margin-left:vr(0.25);
				&:first-child {
					margin-left:vr(0.5);
				}
				&:last-child {
					margin-right:vr(0.5);
				}
			}
		}
	}

	.align-center .button-row, .button-row.align-center {
		justify-content: center;
	}
	.align-right .button-row, .button-row.align-right {
		justify-content: flex-end;
	}
	</style>