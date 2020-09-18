<template>
	<div class="statistic-info-card word-cannot-selected">
		<div class="info-frame full" :style="info ? `color: ${info.color || ''}; background: ${info.background || ''}` : ''">
			<div class="icon-box"><i :class="info.icon"></i></div>
			<div class="content-box">
				<div class="label">{{info.label}}</div>
				<div class="value num-font">{{info.value}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StatisticInfoCard',
	props: {
		info: {
			type: Object,
			default: function () {
				return {
					label: '标题',
					value: '内容',
					icon: 'icon-ios-paper',
					color: '#3b4b61',
					background: '#BBD2F2'
				};
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	.statistic-info-card {
		padding: 10px;
		cursor: pointer;
		min-width: 220px;
		flex-grow: 1;
		.info-frame {
			background: #5a4199;
			color: white;
			border-radius: 5px;
			display: flex;
			align-items: center;
			padding: 20px 10% 20px 5%;
			transition: all .3s ease;

			&:hover {
				filter: brightness(1.1);
			}

			.icon-box {
				height: 100%;
				width: 80px;
				display: flex;
				align-items: center;
				justify-content: center;
				i {

					font-size: 42px;
				}
			}

			.content-box {
				width: calc(100% - 60px);
				.label, .value {
					text-align: right;
					height: 30px;
					line-height: 30px;
				}
				.label {
					font-size: 16px;
				}
				.value {
					font-size: 28px;
				}
			}
		}
	}
</style>
