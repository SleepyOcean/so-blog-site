<template>
	<ul class="run-number-ul" ref="numberRef">
		<template v-for="(item, index)  in dataArr">
			<li :style="{'height': height*10 + 'px','top': getTop(item)}">
				<div v-for="(number, numIndex)  in numberList" :key="numIndex" :style="{'height': height + 'px','line-height': height + 'px'}">{{number}}</div>
			</li>
			<div class="sep" v-if="(dataArr.length -1 - index) % 3 === 0 && (dataArr.length -1 - index) !== 0 && showSep" :style="{'height': height + 'px','top': '-' + height*9 + 'px'}">,</div>
			<!--必须要串联代码，不然li会识别tab从而打印空白-->
		</template>
	</ul>
</template>

<script>
export default {
	name: 'RunNumber',
	data () {
		return {
			dataArr: [],
			numberList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			height: 0
		};
	},
	props: {
		// 值
		value: {
			type: Number,
			default: 0
		},
		// 是否每三位显示逗号
		showSep: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		value () {
			this.valueChange();
		}
	},
	methods: {
		valueChange () {
			let numStr = this.value.toString();
			let resArr = [];
			for (let i = 0; i < numStr.length; i++) {
				resArr.push(numStr.charAt(i));
			}
			this.dataArr = resArr;
		},
		getTop (val) {
			let res = '0';
			if (!isNaN(Number(val))) {
				res = '-' + this.height * parseInt(val) + 'px';
			}
			return res;
		}
	},
	mounted () {
		this.valueChange();
		this.$nextTick(() => {
			this.height = this.$refs['numberRef'].clientHeight;
		});
	}
};
</script>
<style scoped>
.run-number-ul {
	margin: 0 auto;
	padding: 0;
	overflow: hidden;
	height: 100%;
	position: relative;
}
.run-number-ul > li {
	list-style: none;
	width: auto;
	position: relative;
	display: inline-block;
	transition: all 1s ease-in-out;
}
.run-number-ul .sep {
	list-style: none;
	position: relative;
	top: 0;
	display: inline-block;
	transition: all 1s ease-in-out;
	width: auto;
}
</style>
