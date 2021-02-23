<template>
	<div class="time-locker" :style="config.backgroundColor != 'none' ? `background-color: ${config.backgroundColor}` : `background-image: url(${config.backgroundUrl})`">
		<div class="setting" @click="showSetting"><i class="icon-ios-settings"></i></div>
		<div class="time-box">
			<div class="date" :style="`fontFamily: ${config.dateFontStyle}; font-size: ${config.dateFontSize}px; color: ${config.dateFontColor}`" v-if="config.visible.date">{{ date }}{{ week }}</div>
			<div class="time" :style="`fontFamily: ${config.timeFontStyle}; font-size: ${config.timeFontSize}px; color: ${config.timeFontColor}`" v-if="config.visible.time">{{ time }}</div>
			<div class="info" :style="`fontFamily: ${config.sloganFontStyle}; font-size: ${config.sloganFontSize}px; color: ${config.sloganFontColor}`" v-if="config.visible.info">{{ config.info }}</div>
		</div>
		<el-drawer
			title="时钟设置"
			:visible.sync="config.visible.setting"
			direction="rtl"
			:with-header="false"
			:modal="false"
			size="20%"
			destroy-on-close>
			<div class="setting-panel">
				<div class="sp-title">时钟设置</div>
				<el-form class="sp-form">
					<el-form-item label="日期显示">
						<el-switch v-model="config.visible.date"></el-switch>
					</el-form-item>
					<el-form-item label="时间显示">
						<el-switch v-model="config.visible.time"></el-switch>
					</el-form-item>
					<el-form-item label="标语显示">
						<el-switch v-model="config.visible.info"></el-switch>
					</el-form-item>
					<el-form-item label="日期颜色">
						<el-color-picker v-model="config.dateFontColor" color-format="hex"></el-color-picker>
					</el-form-item>
					<el-form-item label="时间颜色">
						<el-color-picker v-model="config.timeFontColor" color-format="hex"></el-color-picker>
					</el-form-item>
					<el-form-item label="标语颜色">
						<el-color-picker v-model="config.sloganFontColor" color-format="hex"></el-color-picker>
					</el-form-item>
					<el-form-item label="日期字体">
						<el-select v-model="config.dateFontStyle">
							<el-option
								v-for="item in fontOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="时间字体">
						<el-select v-model="config.timeFontStyle">
							<el-option
								v-for="item in fontOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="标语字体">
						<el-select v-model="config.sloganFontStyle">
							<el-option
								v-for="item in fontOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="日期大小">
						<el-input-number v-model="config.dateFontSize" :step="1" step-strictly></el-input-number>
					</el-form-item>
					<el-form-item label="时间大小">
						<el-input-number v-model="config.timeFontSize" :step="1" step-strictly></el-input-number>
					</el-form-item>
					<el-form-item label="标语大小">
						<el-input-number v-model="config.sloganFontSize" :step="1" step-strictly></el-input-number>
					</el-form-item>
					<el-form-item label="背景颜色">
						<el-select v-model="config.backgroundColor">
							<el-option
								v-for="item in colorOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="标语内容">
						<el-input v-model="config.info"></el-input>
					</el-form-item>
					<el-form-item label="背景图片">
						<el-input v-model="config.backgroundUrl" :disabled="config.backgroundColor != 'none'"></el-input>
					</el-form-item>
					<el-form-item label="配置名称">
						<el-input v-model="configName"></el-input>
					</el-form-item>
					<el-button type="primary" @click="saveConfig">保存当前配置</el-button>
					<el-table class="config-table" height="40%" :data="configList" tooltip-effect="light" @row-dblclick="loadConfig">
						<el-table-column label="#" type="index" width="60" align="left"></el-table-column>
						<el-table-column label="配置名" prop="name" align="left"></el-table-column>
						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button @click.native.prevent="deleteRow(scope.$index, configList)" type="text" size="small">移除</el-button>
							</template>
						</el-table-column>
					</el-table>
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
			config: {
				visible: {
					date: true,
					time: true,
					info: true,
					setting: true
				},
				info: '生命不息 奋斗不止',
				backgroundUrl: 'https://images.unsplash.com/photo-1429704658776-3d38c9990511?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2430&q=80',
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
			task: {},
			configName: '',
			configList: []
		};
	},
	mounted () {
		let self = this;
		if (localStorage.getItem('TimeLockerConfigList')) {
			this.configList = JSON.parse(localStorage.getItem('TimeLockerConfigList'));
		}
		self.getCurrentTime();
		this.configName = this.date + ' ' + this.time;
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
			this.config.visible.setting = !this.config.visible.setting;
		},
		saveConfig () {
			let config = JSON.parse(JSON.stringify({
				name: this.configName,
				config: this.config
			}));
			this.configList.push(config);
			localStorage.setItem('TimeLockerConfigList', JSON.stringify(this.configList));
		},
		loadConfig (row, col, event) {
			this.config = JSON.parse(JSON.stringify(row.config));
		},
		deleteRow (index, rows) {
			rows.splice(index, 1);
			localStorage.setItem('TimeLockerConfigList', JSON.stringify(this.configList));
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
