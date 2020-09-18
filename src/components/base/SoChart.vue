<template>
	<div ref="chartRef"
	class='so-chart full'></div>
</template>

<script>
// 引入 ECharts 主模块
import echarts from 'echarts';
import elementResizeDetectorMaker from 'element-resize-detector';

export default {
	name: 'SoChart',
	data () {
		return {
			chart: null,
			data: {}
		};
	},
	props: {
		option: Object
	},
	mounted () {
		this.$nextTick(() => {
			if (this.chart) {
				return;
			}
			this.init();
		});
	},
	watch: {
		// 图表数据改变后的回调
		option: {
			handler (newVal, oldVal) {
				if (this.chart) {
					this.chart.clear();
					if (newVal) {
						this.chart.setOption(newVal);
					} else {
						this.chart.setOption(oldVal);
					}
				}
			},
			deep: true
		}
	},
	methods: {
		init () {
			this.chart = echarts.init(this.$refs['chartRef'], 'light');
			var self = this;
			this.chart.setOption(this.option);
			this.chart.on('click', function (param) {
				self.data = {
					date: param.name,
					value: param.data
				};
				self.$emit('dataClicked', self.data);
			});

			let erd = elementResizeDetectorMaker();
			erd.listenTo(this.$refs['chartRef'], () => {
				if (this.chart) {
					this.chart.resize();
				}
			});
		}
	}
};
</script>
