<template>
	<div class="setting-item">
		<div class="name" :class="{'disabled': disable}">
			<div class="info-box">
				<div class="sub">{{name}}</div>
				<div class="obj">{{desc}}</div>
			</div>
		</div>
		<div class="option">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SettingItem',
	props: {
		name: {
			type: String,
			default: '默认配置'
		},
		desc: {
			type: String,
			default: '无需解释，你懂的'
		},
		disable: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="scss" scoped>

	.setting-item {
		width: 100%;
		height: 60px;
		font-size: 14px;
		color: #546262;
		letter-spacing: 2px;
		user-select: none;
		display: flex;
		justify-content: space-between;

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

			.info-box {
				.sub, .obj {
					text-align: left;
					transition: color .2s linear;
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
		}

		.disabled {
			.sub {
				color: #bcbbc2;
			}
		}
	}
</style>
