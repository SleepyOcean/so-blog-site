<template>
    <div class="type-fun-for-chinese full word-cannot-selected">
        <div class="info-box">
            <div class="time"><i class="icon-ios-alarm"></i> {{time}} s</div>
            <div class="score-panel">
                <i class="icon-ios-stats score" style="color: darkslateblue;font-weight: normal;"></i>
                <div class="score">{{score}}</div>
            </div>
            <div class="begin-icon">
                <i class="icon-ios-rocket" @click="tryAgain"></i>
            </div>
        </div>
        <div id="typePanelId" class="type-panel">
            <div class="single-chinese" v-for="(single, index) in chinese" :key="index">
                <div class="target-box" :class="{'error': inputChinese[index] && single != inputChinese[index],
				'right': inputChinese[index] && single === inputChinese[index]}">
                    {{single}}
                </div>
                <div class="input-box">
                    <el-input class="chinese-input" :class="{'focusing': currentIndex === index}" v-model="inputChinese[index]" maxlength="1" @input.native="nextFocus(index)"></el-input>
                </div>
            </div>
        </div>
        <div class="option-box">
            <div class="history-box">
                <div class="title"><i class="icon-ios-medal"></i>历史记录</div>
                <div class="item" style="margin-bottom: 10px;background-color: white;">
                    <div class="time num-font">打榜时间</div>
                    <div>
                        <span class="score">手速</span>
                    </div>
                </div>
                <div class="item" v-for="(item, index) in history" :key="index">
                    <div class="time num-font">{{item.time}}</div>
                    <div>
                        <span class="score">{{item.score}}</span>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog width="400px" :visible.sync="dialShowing" :show-close="false">
			<div class="dialog-box">
				<div class="content-box">
					本次手速
					<span class="current-score">{{score}}</span>
				</div>
			</div>
			<div slot="footer">
				<el-button type="primary" @click="tryAgain" round>再来一次</el-button>
				<el-button @click="dialShowing=false" plain round>休息一会</el-button>
			</div>
        </el-dialog>
    </div>
</template>

<script>
import { getChinese } from '../../service/typeFunService';
import Utils from '../../../utils/util';
import DateUtils from '../../../utils/date';
export default {
	name: 'TypeFunForChinese',
	data () {
		return {
			originalChinese: [],
			chinese: [],
			inputChinese: [],
			inputElements: [],
			currentIndex: -1,
			typeSize: 200,
			time: 0,
			defaultTime: 60 * 3,
			score: 0,
			history: [],
			timeTask: '',
			dialShowing: false
		};
	},
	created () {
		let self = this;
		getChinese().then(data => {
			self.originalChinese = data.name;
			for (let i = 0; i < self.typeSize; i++) {
				self.chinese.push(
					self.originalChinese[Utils.randomNum(0, 567)]
				);
			}
		});
	},
	mounted () {
		let self = this;
		self.history = JSON.parse(
			sessionStorage.getItem('typing-chinese-history')
		);
		if (self.history === null) {
			self.history = [];
		}
		self.inputElements = document
			.getElementById('typePanelId')
			.getElementsByTagName('input');
		document.onkeyup = function keyUp (event) {
			const e = event || window.event || keyUp.caller.arguments[0];
			if (e.keyCode === 8) {
				if (
					!self.inputChinese[self.currentIndex] &&
					self.currentIndex > 0
				) {
					self.currentIndex--;
					self.inputElements[self.currentIndex].focus();
				}
				self.inputChinese[self.currentIndex] = '';
			}
			if (e.keyCode === 13) {
				self.tryAgain();
			}
		};
	},
	methods: {
		tryAgain () {
			let self = this;
			clearInterval(this.timeTask);
			self.reset();
			self.time = self.defaultTime;
			self.dialShowing = false;
			self.inputElements[self.currentIndex].focus();
			self.timeTask = setInterval(() => {
				self.time--;
				self.score =
					self.currentIndex === 0
						? 0
						: ((self.currentIndex + 1) * 60) /
                        (self.defaultTime - self.time);
				self.score = self.score.toFixed(1) + '/分钟';
				if (self.time === 0) {
					let item = {
						time: DateUtils.formatDate(
							new Date(),
							'yyyy-MM-dd hh:mm:ss'
						),
						score: self.score
					};
					self.history.push(item);
					sessionStorage.setItem(
						'typing-chinese-history',
						JSON.stringify(self.history)
					);
					self.gaming = false;
					clearInterval(self.timeTask);
					self.dialShowing = true;
				}
			}, 1000);
		},
		reset () {
			let self = this;
			self.chinese = [];
			self.currentIndex = 0;
			self.inputChinese = [];
			self.inputElements[self.currentIndex].focus();
			for (let i = 0; i < self.typeSize; i++) {
				self.chinese.push(
					self.originalChinese[Utils.randomNum(0, 567)]
				);
			}
		},
		nextFocus (index) {
			let value = document.getElementsByClassName('el-input__inner')[index].value;
			if (!new RegExp('[\u4E00-\u9FA5]+').test(value)) {
				return;
			}
			value = value.substring(0, 1);
			console.log(`nextFocus[${index}]：${value}`);
			if (value != this.inputChinese[index]) {
				this.inputChinese[index] = value;
				return;
			}
			this.inputChinese[index] = value;
			if (
				this.inputChinese &&
				this.inputChinese.length > index &&
				this.inputChinese[index].length > 0
			) {
				this.currentIndex = index + 1;
				this.inputElements[index + 1].focus();
			}
		}
	},
	destroyed () {
		clearInterval(this.timeTask);
	}
};
</script>

<style lang="scss" scoped>
.type-fun-for-chinese {
	.info-box {
		height: 60px;
		width: 80%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background: transparent;
		position: fixed;

		.time {
			width: 280px;
			text-align: left;
			padding: 5px;
			font-size: 28px;
			color: #2c3e50;

			i {
				color: darkslateblue;
				font-size: 32px;
				margin-right: 10px;
			}
		}

		.score-panel {
			width: 200px;
			.score,
			.error {
				float: left;
				padding: 5px;
				font-size: 32px;
				font-weight: bold;
			}

			.score {
				color: lightgreen;
			}

			.error {
				color: #ea5050;
			}
		}

		.begin-icon {
			height: 100%;
			display: flex;
			align-items: center;
			i {
				height: 40px;
				width: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24px;
				font-weight: bold;
				color: darkslateblue;
				cursor: pointer;
				border-radius: 50%;
				transition: all ease 0.4s;
				&:active {
					background: #ddf4ff;
				}

				&:hover {
					color: yellowgreen;
				}
			}
		}
	}

	.option-box {
		float: right;
		height: 100%;
		width: 20%;

		.history-box {
			height: 100%;
			background: whitesmoke;
            overflow: auto;
			.title {
				height: 80px;
				line-height: 60px;
				font-size: 24px;
				text-align: left;
				padding-left: 20px;
				font-weight: bold;
				color: darkslateblue;
				padding-top: 20px;

				i {
					font-weight: normal;
					color: darkgoldenrod;
					font-size: 32px;
					margin-right: 10px;
				}
			}

			.item {
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20px;

				.time {
					font-size: 16px;
					color: darkgrey;
				}

				.score {
					font-size: 28px;
					color: lightgreen;
				}
			}
		}
	}

	.dialog-box {
		padding-top: 20px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		.current-score {
			padding-left: 20px;
			font-weight: bold;
			font-size: 28px;
			color: lightgreen;
		}
		.content-box {
			font-size: 16px;
		}
	}

	.type-panel {
		pointer-events: none;
		position: absolute;
		bottom: 0;
		float: left;
		height: calc(100% - 60px);
		width: 80%;
		overflow-y: auto;

		.single-chinese {
			height: 100px;
			width: 60px;
			display: inline-block;
			margin-top: 5px;
			.target-box {
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 20px;
				font-weight: bold;
				background: white;
				transition: color 0.3s ease-in-out;
				&.error {
					color: red;
					background: #b8383829;
				}
				&.right {
					color: darkorchid;
					background: #f5f6fa;
				}
			}

			.input-box {
				.focusing {
					animation: twinkle 1s infinite ease-in-out;
					border-bottom: 2px solid #483d8b;
				}

				@keyframes twinkle {
					from {
						border-color: #483d8bff;
					}

					65% {
						border-color: #483d8b00;
					}

					to {
						border-color: #483d8bff;
					}
				}
			}
		}
	}
}
</style>
<style lang="scss">
.type-fun-for-chinese {
	.type-panel {
		.single-chinese {
			.input-box {
				.el-input__inner,
				.el-textarea__inner {
					text-align: center;
					font-size: 18px;
					border-radius: unset;
					outline: none;
					color: transparent;
					text-shadow: 0 0 0 #000;
				}
			}
		}
	}
}
</style>
