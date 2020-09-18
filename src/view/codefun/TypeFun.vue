<template>
	<div class="type-fun full word-cannot-selected">
		<div class="info-box">
			<div class="time"><i class="icon-ios-alarm"></i> {{time}} s</div>
			<div class="score-panel">
				<i class="icon-ios-stats score" style="color: darkslateblue;font-weight: normal;"></i>
				<div class="score">{{score}}</div>
				<div class="error"> | {{error}}</div>
			</div>
			<div class="begin-icon">
				<i class="icon-ios-rocket" @click="tryAgain"></i>
			</div>
		</div>
		<div class="fly-symbol-box">
			<div class="symbol-box num-font" :class="{'active': index < currentIndex, 'error': index === errorIndex}" v-for="(item, index) in currentSymbols" :key="index">{{ item }}
			</div>
		</div>
		<div class="option-box">
			<div class="history-box">
				<div class="title"><i class="icon-ios-medal"></i>历史记录</div>
				<div class="item" style="margin-bottom: 10px;background-color: white;">
					<div class="time num-font">打榜时间</div>
					<div>
						<span class="score">正确</span><span
						style="font-size: 24px;font-weight: bold;color: darkmagenta;"> / 总数 </span> (时长)
					</div>
				</div>
				<div class="item" v-for="(item, index) in scoreList" :key="index">
					<div class="time num-font">{{item.time}}</div>
					<div>
						<span class="score">{{item.score}}</span><span
						style="font-size: 24px;font-weight: bold;color: darkmagenta;"> / {{item.score + item.error}}</span> ({{item.period}}s)
						<span><i class="icon-ios-trash delete-record" @click="deleteRecord(index)"></i></span>
					</div>
				</div>
			</div>
		</div>
		<el-dialog width="400px" :visible.sync="dialShowing" :show-close="false">
			<div class="dialog-box">
				<div class="content-box">
					本次正确
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
import Utils from '../../../utils/util';
import DateUtils from '../../../utils/date';

export default {
	name: 'TypeFun',
	data () {
		return {
			currentSymbols: [],
			size: 11,
			currentIndex: 0,
			errorIndex: -1,
			time: 0,
			defaultTime: 60 * 5,
			score: 0,
			error: 0,
			history: [],
			scoreList: [],
			timeTask: '',
			gaming: false,
			dialShowing: false,
			isDelay: false
		};
	},
	mounted () {
		let self = this;
		self.time = self.defaultTime;
		document.onkeydown = function keyDown (event) {
			if (self.isDelay) {
				return;
			}
			const e = event || window.event || keyDown.caller.arguments[0];
			if (self.currentIndex === 8) {
				if (e.keyCode === 110) {
					self.currentIndex++;
				} else {
					self.errorIndex = self.currentIndex;
					self.isDelay = true;
					setTimeout(() => {
						self.error++;
						self.reset();
						self.isDelay = false;
					}, 500);
				}
			} else {
				if (self.gaming && e.keyCode > 95 && e.keyCode < 106) {
					if (self.currentSymbols[self.currentIndex] === e.key) {
						self.currentIndex++;
						if (self.currentIndex === self.size) {
							self.isDelay = true;
							setTimeout(() => {
								self.score++;
								self.reset();
								self.isDelay = false;
							}, 500);
						}
					} else {
						self.errorIndex = self.currentIndex;
						self.isDelay = true;
						setTimeout(() => {
							self.error++;
							self.reset();
							self.isDelay = false;
						}, 500);
					}
				}
			}
		};
		self.history = JSON.parse(localStorage.getItem('typing-history'));
		if (self.history === null) {
			self.history = [];
		}
		self.reset();
	},
	watch: {
		history: {
			handler () {
				let history = JSON.parse(JSON.stringify(this.history));
				this.scoreList = history ? history.reverse().splice(0, 10) : [];
			},
			deep: true
		}
	},
	methods: {
		tryAgain () {
			let self = this;
			self.gaming = true;
			clearInterval(this.timeTask);
			self.timeTask = setInterval(() => {
				self.time--;
				if (self.time === 0) {
					let item = {
						time: DateUtils.formatDate(
							new Date(),
							'yyyy-MM-dd hh:mm:ss'
						),
						score: self.score,
						error: self.error,
						period: self.defaultTime
					};
					self.history.push(item);
					localStorage.setItem(
						'typing-history',
						JSON.stringify(self.history)
					);
					self.gaming = false;
					clearInterval(self.timeTask);
					self.dialShowing = true;
				}
			}, 1000);
			self.reset();
			self.time = self.defaultTime;
			self.score = 0;
			self.error = 0;
			self.dialShowing = false;
		},
		reset () {
			let self = this;
			self.errorIndex = -1;
			self.currentIndex = 0;
			self.currentSymbols = [];
			for (let i = 0; i < self.size; i++) {
				let code = Utils.randomNum(48, 57);
				if (i === 8) {
					self.currentSymbols.push('.');
				} else {
					self.currentSymbols.push(String.fromCharCode(code));
				}
			}
		},
		deleteRecord (index) {
			this.history.splice(index, 1);
			localStorage.setItem(
				'typing-history',
				JSON.stringify(this.history)
			);
		}
	},
	destroyed () {
		clearInterval(this.timeTask);
	}
};
</script>

<style lang="scss" scoped>
.type-fun {
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

	.fly-symbol-box {
		float: left;
		height: 100%;
		width: 80%;
		background: linear-gradient(0, #6a6aa5, #ffe4e4);
		display: flex;
		align-items: center;
		justify-content: center;

		.symbol-box {
			float: left;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 80px;
			color: #1d193a;
			height: 100px;
			width: 100px;
			margin: 5px;
			border-radius: 5px;
			transition: all 0.2s linear;

			&.active {
				background: lightgreen;
			}

			&.error {
				background: #ea5050;
				color: white;
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
				.delete-record {
					font-size: 20px;
					cursor: pointer;
					padding-left: 10px;
					&:hover {
						color: #495a80;
					}
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
}
</style>
