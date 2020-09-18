<template>
	<div class="setting-group">
		<div class="title"><i :class="icon"></i>{{title}}</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'SettingGroup',
	props: {
		title: {
			type: String,
			default: '设置'
		},
		icon: {
			type: String,
			default: 'icon-ios-cog'
		}
	}
};
</script>

<style lang="scss" scoped>
	.setting-group {
		width: 100%;
		padding: 20px;
		border-bottom: 1px solid #edeced;

		.title {
			height: 60px;
			font-size: 18px;
			color: #1b1919;
			display: flex;
			align-items: center;
			justify-content: left;
			padding-left: 10px;
			user-select: none;

			i {
				font-size: 24px;
				color: #6495ed;
				margin-right: 10px;
				animation-name: rotate;
				animation-duration: 6s;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
			}
		}
		.item {
			width: 100%;
			height: 60px;
			font-size: 14px;
			color: #546262;
			letter-spacing: 2px;
			user-select: none;

			&:hover {
				background: #f0f8ff;
			}

			.name, .option {
				height: 100%;
				display: flex;
				align-items: center;
			}
			.name {
				padding-left: 20px;
				float: left;

				.info-box {
					.sub, .obj {
						text-align: left;
					}

					.obj {
						padding-top: 5px;
						font-size: 12px;
						color: #bcbbc2;
					}
				}
			}
			.option {
				padding-right: 20px;
				float: right;
			}
		}
	}
</style>
