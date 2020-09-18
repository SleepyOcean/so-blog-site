<template>
	<div class='so-loading full' v-if="show">
		<div class='sl-tool-loading'>
			<img class="image" src='../../assets/img/gif/loading.gif' alt=''/>
			<div v-if='text' class='text'>
				{{text}}
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'SoLoading',
	props: {
		show: {
			type: Boolean,
			default: false
		},
		text: {
			type: String,
			default: '加载中 ...'
		},
		type: {
			type: String,
			default: ''
		}
	},
	methods: {

	}
};
</script>

<style lang="scss">
	.so-loading {
		position: absolute;
		top: 0;
		.sl-tool-loading {
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 8;
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			background: white;
			.image {
				height: 200px;
				object-fit: cover;
				width: 200px;
			}
			.text {
				width: auto;
				color: #0b0907;
				padding: 0;
			}
		}
	}

</style>
