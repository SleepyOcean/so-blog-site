<template>
	<div class="post-alien full">
		<el-card class="pa-content full">
			<div slot="header" class="center-box" style="position: relative">
				<span><i class="icon-ios-chatbubbles" style="padding-right: 10px;color: #215f9e;font-size: 24px"></i>企业微信定时群消息设置</span>
				<el-button style="position: absolute; right:0" type="text" @click="addTask">添加</el-button>
			</div>
			<el-form class="pa-form-style" :model="form">
				<el-form-item>
					<el-input v-model="form.user" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="form.name" placeholder="任务名称，格式：【内容概要】"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="form.url" placeholder="机器人url"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="form.mention" placeholder="消息接收人，@所有人->@all，@多个人->多个手机号以英文逗号分隔" title="消息接收人手机号，@所有人->@all，@多个人->多个手机号以英文逗号分隔(例如176xxxxxxxx,167xxxxxxxx)"></el-input>
				</el-form-item>
				<el-form-item>
					<el-radio-group v-model="form.activeDay">
						<el-radio :label="0" title="每天定时发送">每天</el-radio>
						<el-radio :label="1" title="工作日定时发送">工作日</el-radio>
						<el-radio :label="2" title="双休日定时发送">双休日</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-time-picker v-model="form.time" value-format="HH:mm:00" :picker-options="{format: 'HH:mm'}" placeholder="消息发送时间"></el-time-picker>
				</el-form-item>
				<el-form-item>
					<el-input type="textarea" v-model="form.msg" resize="none" :autosize="{ minRows: 5, maxRows: 6 }" placeholder="消息内容"></el-input>
				</el-form-item>
			</el-form>
			<div class="pa-task-list">
				<el-collapse accordion>
					<el-collapse-item>
						<div class="pa-task-item" slot="title">
							<span style="font-size: 16px;color: #495a80"><i class="icon-ios-help-circle-outl" style="padding-right: 10px"></i>表单填写指南</span>
						</div>
						<div class="pa-info-box"><span># 用户名</span>输入用户名可使用后台定时任务功能（此功能需要开通账号，如有需求请联系我），若不指定用户名则使用前台定时任务模式（关闭浏览器定时任务终止，打开继续运行）</div>
						<div class="pa-info-box"><span># 任务名称</span>指定任务名称便于快速知晓任务内容</div>
						<div class="pa-info-box"><span># 机器人url</span>企业微信群机器人的webHook地址</div>
						<div class="pa-info-box"><span># 消息接收人</span>@所有人->@all，@多个人->需指定多个手机号并以英文逗号分隔(例如176xxxxxxxx,167xxxxxxxx)</div>
						<div class="pa-info-box"><span># 消息发送规则</span>指定群消息是双休日或工作日或每天定时发送</div>
						<div class="pa-info-box"><span># 消息发送时间</span>指定群消息每天定时发送时间</div>
						<div class="pa-info-box"><span># 消息内容</span>指定群消息发送具体内容</div>
					</el-collapse-item>
					<el-collapse-item v-for="(item, index) in task" :key="index" v-if="task">
						<div class="pa-task-item" slot="title">
							<span>
								<i class="icon-ios-send" style="font-size: 14px;color: lightgreen;padding-right: 10px" title="复制到表单中" @click.stop="copyTaskToForm(item)"></i>
								{{item.name}}
							</span>
							<span class="word-cannot-selected" style="font-size: 12px; color: #495a80;cursor: pointer;padding-right: 10px" @click.stop="cancelTask(index, item)">点击取消任务</span>
						</div>
						<div class="pa-info-box"><span># 发送时间</span>{{getSendTime(item)}}</div>
						<div class="pa-info-box"><span># 接收对象</span>{{item.mention}}</div>
						<div class="pa-info-box"><span># 消息内容</span>{{item.msg}}</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</el-card>
	</div>
</template>

<script>
import {requestProxy, getRequestTask, cancelRequestTask, addRequestTask} from '../../service/customService';
export default {
	name: 'PostAlien',
	data () {
		return {
			form: {
				user: '',
				name: '',
				url: '',
				mention: '',
				time: '',
				activeDay: 0,
				msg: ''
			},
			task: []
		};
	},
	mounted () {
		let user = localStorage.getItem('post-alien-user');
		if (user) {
			this.form.user = user;
		}
		this.getTask();
	},
	methods: {
		addTask () {
			if (this.form.user) {
				this.addToBackend();
			} else {
				this.addOnline();
			}
		},
		addToBackend () {
			let params = JSON.parse(JSON.stringify(this.form));
			params.mention = params.mention.split(',');
			params.name = params.time.substring(0, 5) + ' ' + params.name;
			if (this.form.activeDay === 1) {
				params.cron = `0 ${params.time.substring(3, 5)} ${params.time.substring(0, 2)} ? * 2,3,4,5,6 *`;
			} else if (this.form.activeDay === 2) {
				params.cron = `0 ${params.time.substring(3, 5)} ${params.time.substring(0, 2)} ? * 1,7 *`;
			}
			addRequestTask(params).then(data => {
				if (data.status === 200) {
					this.getTask();
					localStorage.setItem('post-alien-user', this.form.user);
					this.$message.success('后台定时任务添加成功');
				} else {
					this.$message.error('后台定时任务添加失败，' + data.message);
				}
			}).catch(e => {
				console.error('后台定时任务添加请求失败' + e);
			});
		},
		addOnline () {
			let param = JSON.parse(JSON.stringify(this.form));
			param.name = param.time.substring(0, 5) + ' ' + param.name;
			this.setTask(param);
		},
		getTask () {
			if (this.form.user) {
				this.getFromBackend();
			} else {
				this.getOnline();
			}
		},
		getFromBackend () {
			getRequestTask(`user=${this.form.user}`).then(data => {
				if (data.status === 200) {
					this.task = data.extra.taskList.map(p => { return JSON.parse(p); });
					let compare = (o1, o2) => {
						return o1.id - o2.id;
					};
					this.task.sort(compare);
				} else {
					this.$message.error('后台定时任务获取失败，' + data.message);
				}
			}).catch(e => {
				console.error('后台定时任务获取请求失败' + e);
			});
		},
		getOnline () {
			let task = JSON.parse(localStorage.getItem('requestTask'));
			task.forEach(t => {
				this.setTask(t);
			});
		},
		cancelTask (index, item) {
			if (this.form.user) {
				this.cancelFromBackend(index, item);
			} else {
				this.cancelOnline(index, item);
			}
		},
		cancelFromBackend (index, item) {
			let params = {
				user: item.user,
				id: item.id
			};
			cancelRequestTask(params).then(data => {
				if (data.status === 200) {
					this.getTask();
				} else {
					this.$message.error('后台定时任务移除失败，' + data.message);
				}
			}).catch(e => {
				console.error('后台定时任务获取移除失败' + e);
			});
		},
		cancelOnline (index, item) {
			clearTimeout(item.id);
			this.task.splice(index, 1);
			localStorage.setItem('requestTask', JSON.stringify(this.task));
		},
		setTask (params) {
			let index = this.task.length;
			let timeInterval, nowTime, nowSeconds, targetSeconds;

			nowTime = new Date();
			// 计算当前时间的秒数
			nowSeconds = nowTime.getHours() * 3600 + nowTime.getMinutes() * 60 + nowTime.getSeconds();

			let hour = parseInt(params.time.substring(0, 2));
			let minutes = parseInt(params.time.substring(3, 5));
			// 计算目标时间对应的秒数
			targetSeconds = hour * 3600 + minutes * 60;

			//  判断是否已超过今日目标小时，若超过，时间间隔设置为距离明天目标小时的距离
			timeInterval = targetSeconds > nowSeconds ? targetSeconds - nowSeconds : targetSeconds + 24 * 3600 - nowSeconds;

			let request = () => {
				let message = {
					msgtype: 'text',
					text: {
						mentioned_mobile_list: params.mention.split(','),
						content: params.msg
					}
				};
				let req = {
					url: params.url,
					params: message
				};
				requestProxy(req);
				params.id = setTimeout(request, 24 * 3600 * 1000);
				this.taskChange(index, params);
			};
			params.id = setTimeout(request, timeInterval * 1000);
			this.taskChange(index, params);
		},
		taskChange (index, params) {
			this.$set(this.task, index, (JSON.parse(JSON.stringify(params))));
			localStorage.setItem('requestTask', JSON.stringify(this.task));
		},
		copyTaskToForm (item) {
			let form = JSON.parse(JSON.stringify(item));
			form.mention && (form.mention = form.mention.join(','));
			if (item && item.cron) {
				if (item.cron.includes('2,3,4,5,6')) {
					form.activeDay = 1;
				} else if (item.cron.includes('1,7')) {
					form.activeDay = 2;
				}
			}
			this.form = form;
		},
		getSendTime (item) {
			let time = item.time.substring(0, 5);
			if (item && item.cron) {
				if (item.cron.includes('2,3,4,5,6')) {
					time += ' 工作日';
				} else if (item.cron.includes('1,7')) {
					time += ' 双休日';
				}
			} else {
				time += ' 每天';
			}
			return time;
		}
	}
};
</script>

<style lang="scss">
	.post-alien {
		display: flex;
		justify-content: center;
		min-height: 800px;
		overflow: auto;
		.pa-content {
			max-width: 100%;
			width: 460px;
			height: 100%;
			.el-card__body {
				height: calc(100% - 60px);
			}
		}
		.pa-task-list {
			height: calc(100% - 530px);
			overflow: auto;
			padding: 0 10px;
			.pa-task-item {
				width: 100%;
				height: 40px;
				font-size: 14px;
				padding-left: 5px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.pa-info-box {
				text-align: left;
				padding-right: 16px;
				span {
					color: orange;
					padding-left: 10px;
					padding-right: 16px;
				}
			}
		}
	}
</style>
