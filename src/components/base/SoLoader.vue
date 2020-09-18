<template>
	<div class='so-loader full' v-if='loading' @click.native.stop.prevent=''>
		<div class="spinner">
			<div class="rect1"></div>
			<div class="rect2"></div>
			<div class="rect3"></div>
			<div class="rect4"></div>
			<div class="rect5"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SoLoader',
	props: {
		loading: {
			type: Boolean,
			default: true
		}
	}
};
</script>

<style lang="scss" scoped>
.so-loader {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	background-color: #5541ffcc;
	display: flex;
	justify-content: center;
	align-items: center;

	.spinner {
		width: 100px;
		height: 80px;
	}
	.spinner>div {
		background-color: #67CF22;
		height: 60px;
		width: 6px;
		display: inline-block;
		-webkit-animation: stretchdelay 1.2s infinite ease-in-out;
		animation: stretchdelay 1.2s infinite ease-in-out;
	}
	.spinner .rect2 {
		-webkit-animation-delay: -1.1s;
		animation-delay: -1.1s;
	}
	.spinner .rect3 {
		-webkit-animation-delay: -1.0s;
		animation-delay: -1.0s;
	}
	.spinner .rect4 {
		-webkit-animation-delay: -0.9s;
		animation-delay: -0.9s;
	}
	.spinner .rect5 {
		-webkit-animation-delay: -0.8s;
		animation-delay: -0.8s;
	}
	@-webkit-keyframes stretchdelay {
		0%, 40%, 100% {
			-webkit-transform: scaleY(0.4)
		}
		20% {
			-webkit-transform: scaleY(1.0)
		}
	}
	@keyframes stretchdelay {
		0%, 40%, 100% {
			transform: scaleY(0.4);
			-webkit-transform: scaleY(0.4);
		}
		20% {
			transform: scaleY(1.0);
			-webkit-transform: scaleY(1.0);
		}
	}
}
</style>