<template>
	<div class='full layout-lab'>
		<div class='row'>
			<div class='col'>
				<div class='layout' style="display: table;">
					<div class='left layout-table' :style='{"width": sizeParam + "%"}'>table cell</div>
					<div class='right layout-table'>{{article}}<br><br>table cell</div>
				</div>
				<div class='title'>table布局（左侧可变，右侧随左侧自适应）</div>
			</div>
			<div class='col'>
				<div class='layout'>
					<div class='left layout-float' :style='{"width": sizeParam + "%"}'>float left</div>
					<div class='right layout-float' :style='{"width": "calc(100% - " + sizeParam + "%)"}'>{{article}}<br><br>float right</div>
				</div>
				<div class='title'>float布局（左侧可变，右侧随左侧自适应）</div>
			</div>
			<div class='col'>
				<div class='layout' style="display: flex; flex-direction: column">
					<div class='top layout-float' :style='{"height": sizeParam + "%"}'>顶部</div>
					<div class='bottom layout-float' style="height: -webkit-fill-available;">{{article}}<br><br>底部</div>
				</div>
				<div class='title'>flex布局（顶部可变，底部随顶部自适应）</div>
			</div>
			<div class='col'></div>
		</div>
		<div class='row'>
			<div class='col'></div>
			<div class='col'></div>
			<div class='col'></div>
			<div class='col'></div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			article: '前面我们分别通过Spring Cloud Ribbon和Spring Cloud Hystrix实现了客户端负载均衡和服务容错，而Spring Cloud Feign不但整合了这两者的功能，而且还提供了一种比Ribbon更简单的服务调用方式 ——— 声明式服务调用。',
			sizeParam: 20,
			task: ''
		};
	},
	mounted () {
		let self = this;
		self.task = setInterval(() => {
			if (self.sizeParam === 20) {
				self.sizeParam = 0;
			} else {
				self.sizeParam = 20;
			}
		}, 1500);
	},
	destroyed () {
		clearInterval(this.task);
	}
};
</script>

<style lang="scss" scoped>
.layout-lab {
	.row {
		width: 100%;
		height: 25%;
		display: table;

		.col {
			width: 25%;
			height: 100%;
			display: table-cell;
			border: 10px solid white;

			.layout {
				width: 100%;
				height: calc(100% - 32px);
				float: left;

				.layout-table {
					display: table-cell;
					vertical-align: middle;
				}

				.layout-float {
					display: flex;
					align-items: center;
					justify-content: center;
					&.left {
						float: left;
					}
					&.right {
						float: right;
						width: 100%;
					}
				}

				.left, .right {
					height: 100%;
					transition: all 1.5s linear;
					color: white;
					font-size: 14px;
					text-align: center;
				}

				.top, .bottom {
					width: 100%;
					transition: all 1.5s linear;
					color: white;
					font-size: 14px;
					text-align: center;
				}

				.left, .top {
					background-color: #5c3a3a;
				}
				.right, .bottom {
					background-color: #217fdd;
				}
			}

			.title {
				width: 100%;
				height: 32px;
				float: left;
				line-height: 32px;
				text-align: center;
				font-size: 14px;
				background-color: #e39;
				color: white;
			}
		}
	}
}
</style>
