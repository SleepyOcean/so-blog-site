<template>
	<div class="time-locker" :style="backgroundColor != 'none' ? `background-color: ${backgroundColor}` : `background-image: url(${backgroundUrl})`">
		<div class="setting" @click="showSetting"><i class="icon-ios-settings"></i></div>
		<div class="time-box">
			<div class="date" :style="`fontFamily: ${dateFontStyle}; font-size: ${dateFontSize}px; color: ${dateFontColor}`" v-if="visible.date">{{ date }}{{ week }}</div>
			<div class="time" :style="`fontFamily: ${timeFontStyle}; font-size: ${timeFontSize}px; color: ${timeFontColor}`" v-if="visible.time">{{ time }}</div>
			<div class="info" :style="`fontFamily: ${sloganFontStyle}; font-size: ${sloganFontSize}px; color: ${sloganFontColor}`" v-if="visible.info">{{ info }}</div>
		</div>
		<el-drawer
			title="时钟设置"
			:visible.sync="visible.setting"
			direction="rtl"
			:with-header="false"
			:modal="false"
			size="20%"
			destroy-on-close>
			<div class="setting-panel">
				<div class="sp-title">时钟设置</div>
				<el-form class="sp-form">
					<el-form-item label="日期显示">
						<el-switch v-model="visible.date"></el-switch>
					</el-form-item>
					<el-form-item label="时间显示">
						<el-switch v-model="visible.time"></el-switch>
					</el-form-item>
					<el-form-item label="标语显示">
						<el-switch v-model="visible.info"></el-switch>
					</el-form-item>
					<el-form-item label="日期颜色">
						<el-color-picker v-model="dateFontColor" color-format="hex"></el-color-picker>
					</el-form-item>
					<el-form-item label="时间颜色">
						<el-color-picker v-model="timeFontColor" color-format="hex"></el-color-picker>
					</el-form-item>
					<el-form-item label="标语颜色">
						<el-color-picker v-model="sloganFontColor" color-format="hex"></el-color-picker>
					</el-form-item>
					<el-form-item label="日期字体">
						<el-select v-model="dateFontStyle">
							<el-option
								v-for="item in fontOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="时间字体">
						<el-select v-model="timeFontStyle">
							<el-option
								v-for="item in fontOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="标语字体">
						<el-select v-model="sloganFontStyle">
							<el-option
								v-for="item in fontOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="日期大小">
						<el-input-number v-model="dateFontSize" :step="1" step-strictly></el-input-number>
					</el-form-item>
					<el-form-item label="时间大小">
						<el-input-number v-model="timeFontSize" :step="1" step-strictly></el-input-number>
					</el-form-item>
					<el-form-item label="标语大小">
						<el-input-number v-model="sloganFontSize" :step="1" step-strictly></el-input-number>
					</el-form-item>
					<el-form-item label="背景颜色">
						<el-select v-model="backgroundColor">
							<el-option
								v-for="item in colorOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="标语内容">
						<el-input v-model="info"></el-input>
					</el-form-item>
					<el-form-item label="背景图片">
						<el-input v-model="backgroundUrl" :disabled="backgroundColor != 'none'"></el-input>
					</el-form-item>
				</el-form>
			</div>
		</el-drawer>
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
				info: true,
				setting: true,
				selected: []
			},
			fontOptions: [{
				label: 'monospace',
				value: 'monospace'
			}, {
				label: 'serif',
				value: 'serif'
			}, {
				label: 'cursive',
				value: 'cursive'
			}],
			colorOptions: [{
				label: '自选背景',
				value: 'none'
			}, {
				label: '默认',
				value: 'black'
			}],
			fontColorOptions: [{
				label: '自选背景',
				value: 'none'
			}, {
				label: '自选背景',
				value: 'none'
			}],
			current: '',
			date: '',
			time: '',
			week: '',
			logo: '',
			info: '生命不息 奋斗不止',
			task: {},
			backgroundUrl: '',
			backgroundColor: 'black',
			dateFontSize: 28,
			timeFontSize: 100,
			sloganFontSize: 100,
			timeFontStyle: 'monospace',
			dateFontStyle: 'serif',
			sloganFontStyle: 'cursive',
			dateFontColor: '#778899',
			timeFontColor: '#ffffff',
			sloganFontColor: '#00ff00'
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
		},
		showSetting () {
			this.visible.setting = !this.visible.setting;
			console.log(this.visible.setting);
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
	background-color: black;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;

	* {
		user-select: none;
	}

	.setting {
		width: 100px;
		color: transparent;
		padding: 20px;
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
		i {
			font-size: 80px;
		}
	}
	.setting-panel {
		width: 100%;
		overflow: hidden;
		.sp-title {
			padding: 10px 40px;
			height: 40px;
			font-size: 24px;
			font-weight: bolder;
			text-align: left;
			margin: 10px;
		}
		.sp-form {
			width: 20%;
			height: calc(100% - 60px);
			padding: 10px 40px;
			position: fixed;
			overflow: scroll;
		}
	}
	.date {
		width: 100%;
		text-align: center;
		color: lightslategrey;
	}
	.time {
		height: 100%;
		width: 100%;
		color: white;
	}
	.info {
		width: 100%;
		text-align: center;
		color: lime;
	}
}
</style>
