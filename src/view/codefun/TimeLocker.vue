<template>
	<div class="time-locker">
		<div class="time-box">
			<div class="date num-font" @click="visible.date = false" v-if="visible.date">{{ date }}{{ week }}</div>
			<div class="time" @click="visible.time = false" v-if="visible.time">{{ time }}</div>
			<div class="info cn-font" @click="visible.info = false" v-if="visible.info">{{ info }}</div>
		</div>
	</div>
</template>

<script>
import { clearInterval } from 'timers';
import DateUtil from '../../../utils/date';
export default {
	name: 'TimeLocker',
	data () {
		return {
			visible: {
				date: true,
				time: true,
				info: true
			},
			current: '',
			date: '',
			time: '',
			week: '',
			logo: '',
			info: '生命不息 奋斗不止',
			task: {}
		};
	},
	mounted () {
		let self = this;
		self.getCurrentTime();
		self.task = setInterval(() => {
			self.getCurrentTime();
		}, 1000);
	},
	methods: {
		getCurrentTime () {
			this.current = DateUtil.formatDate(
				new Date(),
				'yyyy年MM月dd日 hh:mm:ss'
			);
			this.date = this.current.substring(0, 12);
			this.time = this.current.substring(12, this.current.length);
			const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			this.week = weekday[new Date().getDay()];
		}
	},
	beforeDestroy () {
		if (this.task) {
			clearInterval(this.task);
		}
	}
};
</script>

<style lang="scss" scoped>
.time-locker {
	height: 100%;
	width: 100%;
	position: absolute;
	background: black;
	z-index: 10;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;

	* {
		user-select: none;
	}

	.date {
		width: 100%;
		text-align: center;
		font-size: 28px;
		color: lightslategrey;
	}
	.time {
		height: 100%;
		width: 100%;
		font-family: num-Expansiva;
		font-size: 100px;
		color: white;
	}
	.info {
		width: 100%;
		text-align: center;
		font-size: 100px;
		color: lime;
	}

	.setting {
		height: 100%;
		width: 40%;
	}
}
</style>
