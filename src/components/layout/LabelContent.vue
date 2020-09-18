<template>
	<div class='label-content'>
		<div class="lc-title" v-if="title">{{title}}</div>
		<div class="lc-label-box" v-if="label" :class="type">
			<div class="lc-ll-label">{{label}}</div>
			<div class="lc-ll-content multi-text-ellipsis-2 word-cannot-selected" :title="content" v-if="content">{{content}}</div>
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LabelContent',
	components: {
	},
	props: {
		label: {
			type: String
		},
		content: {
			type: String
		},
		title: {
			type: String
		},
		type: {
			type: String,
			default: 'horizontal'
		}
	},
	methods: {
	}
};
</script>

<style lang="scss">
.label-content {
	.lc-title {
		width: 100%;
		text-align: left;
		padding: 10px 5px;
		font-size: 14px;
		font-weight: bolder;
		margin-top: 10px;
	}

	.lc-label-box {
		width: 100%;
		padding: 10px 5px;
		font-size: 14px;
		display: flex;
		.lc-ll-label {
			color: #cbccce;
		}
		&.horizontal {
			align-items: center;
			justify-content: space-between;
			.lc-ll-content {
				max-width: calc(100% - 100px - 20px);
			}
		}
		&.vertical {
			flex-direction: column;
			align-items: flex-start;
			line-height: 28px;
			.lc-ll-content {
				width: 100%;
			}
		}
	}
}
</style>
