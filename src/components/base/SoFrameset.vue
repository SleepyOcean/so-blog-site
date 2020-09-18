<template>
  <div :class='soFrameset'>
    <slot></slot>
  </div>
</template>

<script>
export default {
	name: 'SoFrameset',
	props: {
		cols: {
			type: String,
			default: ''
		},
		rows: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			colsArray: [],
			rowsArray: [],
			soFrameset: ['so-frameset']
		};
	},
	methods: {
		resize () {
			let fontSize = document.body.clientWidth / (1920 / 20);
			document.documentElement.style.fontSize = fontSize + 'px';
		},
		init () {
			let children = this.$children;
			if (this.cols) {
				this.colsArrays = this.cols.split(',');
				let leftIndex = [];
				for (let i = 0; i < this.colsArrays.length; i++) {
					this.colsArrays[i] = this.colsArrays[i].trim();
					if (!isNaN(this.colsArrays[i])) {	// 数字，没有提供单位
						this.colsArrays[i] = this.colsArrays[i] + '%';	//	默认单位是%
					} else if (this.colsArrays[i] === '*') {	// * 表示剩余的空间全给它，只能出现一个*
						leftIndex.push(i);
					}
				}
				for (let i = 0; i < this.colsArrays.length; i++) {
					if (i < children.length) {
						children[i].$el.style.height = '100%';	//	默认高度都设置为100%
						if (leftIndex.indexOf(i) < 0) {
							children[i].$el.style.width = this.colsArrays[i];
						} else {	// i in leftIndex
							let calcExp = '100%';	//	calc expression
							for (let j = 0; j < this.colsArrays.length; j++) {
								if (leftIndex.indexOf(j) < 0) {
									calcExp = calcExp + ' - ' + this.colsArrays[j];
								}
							}
							calcExp = `(${calcExp}) / ${leftIndex.length}`;
							children[i].$el.style.width = `calc(${calcExp})`;
						}
					}
				}
			} else if (this.rows) {
				this.soFrameset = ['so-frameset', 'vertical'];
				this.rowsArray = this.rows.split(',');
				let leftIndex = [];
				for (let i = 0; i < this.rowsArray.length; i++) {
					this.rowsArray[i] = this.rowsArray[i].trim();
					if (!isNaN(this.rowsArray[i])) {	//	数字，没有提供单位
						this.rowsArray[i] = this.rowsArray[i] + '%';	//	默认单位是%
					} else if (this.rowsArray[i] === '*') {	// * 表示剩余的空间全给它，只能出现一个*
						leftIndex.push(i);
					}
				}
				for (let i = 0; i < this.rowsArray.length; i++) {
					if (i < children.length) {
						children[i].$el.style.width = '100%';	//	默认高度都设置为100%
						if (leftIndex.indexOf(i) < 0) {
							children[i].$el.style.height = this.rowsArray[i];
						} else {	// i in leftIndex
							let calcExp = '100%';	//	calc expression
							for (let j = 0; j < this.rowsArray.length; j++) {
								if (leftIndex.indexOf(j) < 0) {
									calcExp = calcExp + ' - ' + this.rowsArray[j];
								}
							}
							calcExp = `(${calcExp}) / ${leftIndex.length}`;
							children[i].$el.style.height = `calc(${calcExp})`;
						}
					}
				}
			}
		}
	},
	mounted () {
		this.init();
	},
	watch: {
		cols: function () {
			this.init();
		},
		row: function () {
			this.init();
		}
	},
	created () {
		this.resize();
		let self = this;
		window.onresize = function () {
			self.resize();
		};
	}
};
</script>

<style scoped>
.so-frameset {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  position: relative;
  display: -webkit-box;
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
}
.so-frameset.vertical{
  box-orient: vertical;
	/*! autoprefixer: off */
	-webkit-box-orient: vertical;
	/* autoprefixer: on */
}
html, body {
  width: 100%;
  height: 100%;
  background: #f8f8fc;
}
* {
  padding: 0;
  margin: 0;
}
</style>