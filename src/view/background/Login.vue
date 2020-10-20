<template>
	<div class="full login" :style="`background-image: url('${background}')`">
		<div class="l-box form">
			<div class='lb-form-box'>
				<div class='title word-cannot-selected'><el-image class="l-fb-logo" :src="logo"></el-image>{{serviceName}}</div>
				<el-form class="form">
					<el-form-item>
						<el-input v-model='form.username' prefix-icon="icon-ios-person" placeholder="用户名" clearable></el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model='form.password' prefix-icon="icon-ios-key" type="password" placeholder="密码" clearable></el-input>
					</el-form-item>
					<el-button type="primary" @click='submitForm'>登 录</el-button>
					<div class='link-box word-cannot-selected' v-if="false"><a>注册账号</a></div>
				</el-form>
			</div>
		</div>
		<div class="l-box info word-cannot-selected">
			<div class="lb-info-box">
				<div class="lb-ib-row title">SOBS Cloud</div>
				<div class="lb-ib-row info sub-title"><span>沉洋</span>博客管理系统</div>
				<div class="lb-ib-row info">1. 博文发布、编辑、统计、管理平台</div>
				<div class="lb-ib-row info">2. 博客网站流量统计、运营管理平台</div>
				<div class="lb-ib-row info">3. 服务注册、监控、管理平台</div>
				<div class="lb-ib-row info">4. 新功能尝试发布平台</div>
				<div class="lb-ib-row info">4. 多系统管理运维平台</div>
			</div>
		</div>
	</div>
</template>

<script>
import {login} from '../../service/authService';

export default {
	name: 'Login',
	data () {
		return {
			serviceName: '欢迎回来',
			background: '',
			logo: '',
			form: {
				username: '',
				password: ''
			}
		};
	},
	created () {
		this.background = 'https://gallery.sleepyocean.cn/resource/img/2cd13c22baabf7e33b15b796d4ad15a8';
		this.logo = 'https://gallery.sleepyocean.cn/resource/img/0b9e9734273ad99162a482b5074d47b4';
	},
	methods: {
		submitForm () {
			let params = {
				name: this.form.username,
				password: this.form.password
			};
			login(params).then(data => {
				if (data && data.Authorization) {
					localStorage.token = data.Authorization + ' @' + (new Date()).getTime();
					this.$message.success(`欢迎 ${params.name}`);
					this.$router.push('/sys/dash');
				} else {
					this.$message.error('用户名或密码错误，请检查后重试');
				}
			});
		}
	}
};
</script>

<style lang="scss">
	.login {
		background-color: #384967;
		background-size: cover;
		width: 100%;
		height: 100vh;
		.l-box {
			position: absolute;
			width: 400px;
			height: 360px;
			display: flex;
			align-items: center;
			padding: 0 40px;
			&.form {
				right: 180px;
				top: calc(50% - 180px);
				background: white;
				border-radius: 10px;
				border: 1px solid #c1cede;
			}

			&.info {
				left: 180px;
				top: calc(50% - 180px);
			}

			.lb-form-box {
				width: 100%;

				.l-fb-logo {
					height: 40px;
					width: 40px;
					margin-right: 5px;
				}

				.title {
					font-size: 24px;
					height: 60px;
					display: flex;
					align-items: flex-end;
					justify-content: center;
					width: 100%;
					color: #272f42;
					font-weight: bold;
					letter-spacing: 2px;
				}

				.form {
					margin-top: 20px;
					.el-form-item {
						margin: 28px 0;
					}

					.el-input__inner {
						height: 48px;
						line-height: 48px;
						font-size: 16px;
						padding: 0 50px;
						border-bottom: 2px solid #eee;
						border-radius: 5px;
						transition: all linear .2s;

						&:focus {
							border-bottom: 2px solid #484a7e;
						}
					}

					.el-input__prefix {
						margin-left: 10px;
						i {
							font-size: 24px;
						}
					}

					.el-button--primary {
						width: 80%;
						height: 48px;
						border-radius: 48px;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 10px auto;
						background: #484a7e;
						border: unset;
						font-size: 18px;
						font-weight: bold;
					}
				}

				.link-box {
					margin-top: 10px;
					font-size: 12px;
					color: #6d6de7;
					cursor: pointer;

					&:hover {
						color: #6d6de7aa;
					}
				}
			}

			.lb-info-box {
				width: 100%;
				color: white;
				.lb-ib-row {
					width: 100%;
					display: flex;
					align-items: center;

					&.title {
						height: 40px;
						font-weight: bold;
						font-size: 36px;
						color: #ffffe9;
					}
					&.info {
						height: 30px;
						font-size: 16px;
					}
					&.sub-title {
						height: 40px;
						padding-left: 80px;
						font-size: 28px;
						margin-bottom: 10px;
						color: #cec589;
						span {
							font-size: 24px;
							color: #ffff3c;
							font-weight: bold;
							padding-right: 5px;
							display: flex;
							height: 100%;
							align-items: flex-end;
							padding-bottom: 3px;
						}
					}
				}
			}
		}
	}
</style>
