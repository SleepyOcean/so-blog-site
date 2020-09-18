<template>
	<div class="so-tag center-box" :class="type">
		<span class="text-ellipsis" :title="name">{{name}}</span><i class="icon-ios-close-circle-out st-close-bt" v-if="showClose" @click="closeClick"></i>
	</div>
</template>

<script>
export default {
	name: 'SoTag',
	props: {
		name: {
			type: String
		},
		type: {
			type: String
		},
		showClose: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		closeClick () {
			this.$emit('close', name);
		}
	}
};
</script>

<style lang="scss">
	.so-tag {
		float: left;
		padding: 0 16px;
		margin: 5px;
		font-size: 12px;
		color: #888c89;
		background: #eef1ef;
		height: 26px;
		border-radius: 30px;
		cursor: pointer;
		.st-close-bt {
			padding-left: 6px;
			margin-right: -8px;
			&:hover {
				color: #0084ff;
			}
		}
		.st-name {
			width: 20px;
		}

		&:active {
			background: #e1ece5;
		}

		&.text {
			padding: unset;
			background: unset;
			border-radius: unset;
			color: #7aa7d1;

			&:hover {
				color: #0084ff;
			}
		}

	}
</style>
