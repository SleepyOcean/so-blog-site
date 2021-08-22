<template>
	<el-card class="pomodoro-timer">
		<div slot="header" class="pt-header">
			<div style="font-weight: bold;">番茄卡片</div>
			<div>
				<el-button type="primary" @click="startWork">工作</el-button>
				<el-button type="success" @click="haveRest">休息</el-button>
				<el-button type="info" @click="stopCount">停止</el-button>
			</div>
		</div>
		<div class="pt-content full-height">
			<div class="pt-c-timer center-box">
				<el-progress type="dashboard" :stroke-width="16" :percentage="time.percentage" :color="time.color" :format="percentageFormat"></el-progress>
			</div>
			<div class="pt-c-statics">
				<i class="icon-ios-thumbs-up" style="color: gold" v-for="index in pomodoro.count" :key="index"></i><i class="icon-ios-thumbs-up" style="color: #C0C4CC" v-for="n in (16 - pomodoro.count)" :key="n+16"></i>
			</div>
		</div>
	</el-card>
</template>

<script>
import DateUtil from '../../../../../../../utils/date';

export default {
	name: 'PomodoroTimer',
	data () {
		return {
			time: {
				percentage: 100,
				color: '#6f7ad3'
			},
			pomodoro: {
				count: 0,
				date: ''
			},
			countType: 1,
			timeTask: '',
			audio: {
				start: '',
				end: ''
			}
		};
	},
	mounted () {
		// 初始化提示音
		this.audio.start = new Audio();
		this.audio.end = new Audio();
		this.audio.start.src = this.$config.getPomodoroSound('start');
		this.audio.end.src = this.$config.getPomodoroSound('end');

		// 获取当天完成番茄钟情况
		let pomodoro = JSON.parse(localStorage.getItem('Pomodoro'));
		let todayDate = DateUtil.getNowFormatDate();
		if (!pomodoro || todayDate != pomodoro.date) {
			this.pomodoro.count = 0;
			this.pomodoro.date = todayDate;
			localStorage.setItem('Pomodoro', JSON.stringify(this.pomodoro));
		} else {
			this.pomodoro = pomodoro;
		}
	},
	methods: {
		percentageFormat (percentage) {
			if (this.countType === 0) {
				// 类型：休息
				return (100 - percentage) / 20 + ' min 休息';
			} else if (this.countType === 1) {
				// 类型：工作
				return (100 - percentage) / 4 + ' min 工作';
			}
			return '完成';
		},
		startWork () {
			let self = this;
			this.startPlay();
			this.countType = 1;
			this.time.percentage = 0;
			localStorage.setItem('Pomodoro', JSON.stringify(self.pomodoro));
			clearInterval(this.timeTask);
			self.timeTask = setInterval(() => {
				self.time.percentage += 4;
				if (self.time.percentage === 100) {
					self.endPlay();
					self.pomodoro.count++;
					clearInterval(self.timeTask);
				}
			}, 100);
		},
		haveRest () {
			let self = this;
			this.startPlay();
			this.countType = 0;
			this.time.percentage = 0;
			clearInterval(this.timeTask);
			self.timeTask = setInterval(() => {
				self.time.percentage += 20;
				if (self.time.percentage === 100) {
					self.endPlay();
					clearInterval(self.timeTask);
				}
			}, 1000);
		},
		stopCount () {
			this.audio.start.pause();
			this.audio.start.load();
			this.audio.end.pause();
			this.audio.end.load();
			clearInterval(this.timeTask);
			this.time.percentage = 100;
		},
		startPlay () {
			this.audio.end.pause();
			this.audio.end.load();
			this.audio.start.play();
		},
		endPlay () {
			this.audio.start.pause();
			this.audio.end.load();
			this.audio.end.play();
		}
	}
};
</script>


<style lang="scss">
.pomodoro-timer {
	.pt-header {
		display: flex;
		justify-content: space-between;
	}
	.pt-content {
		height: 200px;
		.pt-c-timer {
			height: 100%;
			width: 180px;
			padding: 0 10px;
			float: left;
			border-right: 1px solid #EBEEF5;
		}
		.pt-c-statics {
			height: 100%;
			padding: 0 10px;
			float: left;
			width: calc(100% - 180px);
			padding: 10px;
			text-align: left;
			line-height: 1.6;
			word-wrap: break-word;
			word-break: break-all;
			overflow: hidden;
			i {
				font-size: 24px;
			}
		}
	}
}
</style>

