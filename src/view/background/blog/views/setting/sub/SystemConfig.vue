<template>
	<div class="setting-style">
		<setting-group title="查询设置">
			<setting-item name="在线查询" desc="在线查询：使用后台服务； 离线查询：使用部署的缓存（演示专用）" @click.native="searchOnline = !searchOnline">
				<el-switch v-model="searchOnline">
				</el-switch>
			</setting-item>
			<setting-item name="启用ES存储" desc="ES存储：使用ElasticSearch存储博文； 默认存储：使用Mysql存储博文" @click.native="esEnable = !esEnable">
				<el-switch v-model="esEnable">
				</el-switch>
			</setting-item>
		</setting-group>
		<setting-group title="后端服务">
			<setting-item name="图片服务地址" desc="提供图片上传下载服务，未配置图片服务将使系统所有图片无法显示" >
				<so-editable-label :disabled="imgServerConfig.isEditing"  v-model="imgServerConfig.url"></so-editable-label>
			</setting-item>
		</setting-group>
		<setting-group title="数据备份">
			<setting-item name="启用备份" desc="启动后，将备份所有与你相关的数据到备份地址上，启用备份需配置备份URL" @click.native="backup.status = !backup.status">
				<el-switch v-model="backup.status">
				</el-switch>
			</setting-item>
			<setting-item name="备份地址" desc="默认保存到服务器本地，可配置到远端服务器" :disable="!backup.status">
				<so-editable-label  v-model="backup.url" :disabled="!backup.status"></so-editable-label>
			</setting-item>
			<setting-item name="备份周期" desc="定时备份到本地或远端服务器, 格式： 数字+分/时/天/周/月" :disable="!backup.status">
				<so-editable-label  v-model="backup.interval" placeholder="默认1天" :disabled="!backup.status"></so-editable-label>
			</setting-item>
		</setting-group>
	</div>
</template>

<script>
import {saveSetting} from '../../../../../../service/settingService';
import Util from '../../../../../../../utils/util';
const SettingGroup = () => import('../components/SettingGroup');
const SettingItem = () => import('../components/SettingItem');
const SoEditableLabel = () => import('../../../../../../components/base/SoEditableLabel');

export default {
	name: 'SystemConfig',
	components: {
		SoEditableLabel,
		SettingGroup,
		SettingItem
	},
	data () {
		return {
			searchOnline: true,
			esEnable: true,
			imgServerConfig: {
				isEditing: false,
				url: ''
			},
			backup: {
				status: true,
				url: '',
				interval: ''
			}
		};
	},
	created () {
		Util.updateSettingCache();
		this.searchOnline = Util.getSettingCache('searchOnline') === 'true';
		this.esEnable = Util.getSettingCache('esEnable') === 'true';
		this.imgServerConfig.url = Util.getSettingCache('ImageServerUrl');
		this.backup.status = Util.getSettingCache('autoBackup') === 'true';
		this.backup.url = Util.getSettingCache('autoBackupAddress');
		this.backup.interval = Util.getSettingCache('autoBackupCycle');
	},
	methods: {
		saveSetting () {
			saveSetting({}).then(data => {
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.setting-style {
	max-width: 900px;
	margin: 10px auto;

	.box {
		width: 100%;
		padding: 20px;
		border-bottom: 1px solid #edeced;

		.title {
			height: 60px;
			font-size: 18px;
			color: #1b1919;
			display: flex;
			align-items: center;
			justify-content: left;
			padding-left: 10px;
			user-select: none;

			i {
				font-size: 24px;
				color: #6495ed;
				margin-right: 10px;
				animation-name: rotate;
				animation-duration: 6s;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
			}
		}
		.item {
			width: 100%;
			height: 60px;
			font-size: 14px;
			color: #546262;
			letter-spacing: 2px;
			user-select: none;

			&:hover {
				background: #f0f8ff;
			}

			.name,
			.option {
				height: 100%;
				display: flex;
				align-items: center;
			}
			.name {
				padding-left: 20px;
				float: left;

				.info-box {
					.sub,
					.obj {
						text-align: left;
					}

					.obj {
						padding-top: 5px;
						font-size: 12px;
						color: #bcbbc2;
					}
				}
			}
			.option {
				padding-right: 20px;
				float: right;
			}
		}
	}
}
</style>

<style lang="scss">
.setting-style {
	.el-input-group__append,
	.el-input-group__prepend {
		width: 68px;

		input {
			text-align: center;
		}
	}
}
</style>
