<template>
    <div class="user-info-board full-width">
		<div class="uib-avatar-row">
			<el-avatar :size="240" :src="avatarUrl" shape="circle"></el-avatar>
		</div>
		<div class="uib-info-box">
			<div class="uib-info-row word-cannot-selected" v-for="(item, index) in info" :key="index" :class="item.class">
				<span class="uib-ir-label" v-if="item.labelShowing">{{item.label}}</span>
				<span class="uib-ir-value">
				<i :class="item.icon" v-if="item.icon"></i>{{item.value}}
			</span>
			</div>
			<div class="uib-link-row">
				<a class="uib-link-icon github" title="github" target="_blank" href="https://github.com/SleepyOcean"></a>
				<a class="uib-link-icon csdn" title="csdn" target="_blank" href="https://blog.csdn.net/stoneBridge1920"></a>
				<div class="uib-link-icon wechat" title="暂未开放"></div>
				<a class="uib-link-icon mail" title="邮箱" href="mailto:captain1920@foxmail.com"></a>
				<a class="uib-link-icon captain" title="技术博客" href="https://sleepyocean.github.io/"></a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserInfoBoard',
	data () {
		return {
			avatarUrl: '',
			info: [
				{
					label: '江湖称号',
					value: '沉睡的海洋',
					class: 'name'
				},
				{
					label: 'flag',
					value: '学如逆水行舟，不进则退',
					class: 'flag'
				},
				{
					label: '职业',
					value: '软件架构师',
					class: 'normal',
					labelShowing: true
				},
				{
					label: '技术栈',
					value: '前端Vue、后端Spring、架构设计、技术运维、大数据、人工智能',
					class: 'normal',
					labelShowing: true
				}
			]
		};
	},
	created () {
		this.avatarUrl = this.$config.getAvatarImgUrl();
	}
};
</script>

<style lang="scss">
.user-info-board {
	width: 280px;
	background-color: azure;
	border-radius: 4px;
	.uib-avatar-row {
		height: 280px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uib-info-box {
		padding: 20px 10px;
	}
	.uib-info-row {
		&.name {
			font-size: 20px;
			font-weight: bold;
			line-height: 32px;
		}
		&.flag {
			font-size: 14px;
			color: #959fb0;
			line-height: 28px;
			margin-bottom: 30px;
		}
		&.normal {
			font-size: 14px;
			color: #1f367a;
			line-height: 24px;
			margin-bottom: 5px;
		}
		.uib-ir-label {
			color: limegreen;
			margin-right: 10px;
			&:before {
				content: '# ';
			}
		}
	}
	.uib-link-row {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		.uib-link-icon {
			height: 30px;
			width: 30px;
			background-size: 100%;
			background-repeat: no-repeat;
			margin-right: 20px;
			cursor: pointer;
			transition: all .2s linear;
			&:hover {
				filter: brightness(.5);
			}
			&.github {
				background-image: url('../../../assets/img/svg/github-black.svg');
			}
			&.csdn {
				background-image: url('../../../assets/img/svg/csdn.svg');
			}
			&.wechat {
				background-image: url('../../../assets/img/svg/social-wechat.svg');
			}
			&.mail {
				background-image: url('../../../assets/img/svg/social-mail.svg');
			}
			&.captain {
				background-image: url("https://gallery.sleepyocean.cn/resource/img/0b9e9734273ad99162a482b5074d47b4");
			}
		}
	}
}
</style>
