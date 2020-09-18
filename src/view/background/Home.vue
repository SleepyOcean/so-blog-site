<template>
	<div class='home full'>
		<div class='header-box'>
			<div class='menu-box'>
				<div class='menu-item word-cannot-selected' :class='item.active ? "active" : ""' v-for='(item, index) in menus' :key='index' @click='menuClicked(item)'>
					<div class='menu-name'><span>{{item.name}}</span></div>
				</div>
			</div>
			<div class="avatar-box">
				<div class="blog-link" @click="jumpToBlog">博客首页</div>
				<el-popover
					placement="bottom"
					width="80"
					class="avatar-popover"
					popper-class="home-avatar-popover-popper"
					trigger="hover">
					<div class="user-option" @click="jumpToPage('user')">用户信息</div>
					<div class="user-option" @click="jumpToPage('setting')">设置</div>
					<div class="user-option" @click="logout">退出</div>
					<el-avatar :title="user.name" slot="reference" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
				</el-popover>
			</div>
		</div>
		<div class='content-box'>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import {logout} from '../../service/authService';
const DashBoard = () => import('./blog/views/dash/DashBoard');
const PostPage = () => import('./blog/views/post/PostPage');
const PostManager = () => import('./blog/views/post/PostManager');
const UserPage = () => import('./blog/views/UserPage');

export default {
	name: 'Home',
	components: {
		PostManager,
		UserPage,
		PostPage,
		DashBoard
	},
	data () {
		return {
			user: {
				name: '沉睡的海洋'
			},
			menus: [
				{
					index: 0,
					name: '仪表盘',
					page: 'dash',
					active: true,
					icon: 'icon-ios-home'
				},
				{
					index: 0,
					name: '文章管理',
					page: 'manage',
					active: false,
					icon: 'icon-ios-paper'
				}
			]
		};
	},
	watch: {
		'$route.path': function (newVal, oldVal) {
			let self = this;
			self.menus.forEach(item => {
				item.active = false;
				if (newVal.indexOf(item.page) > -1) {
					item.active = true;
				}
			});
		}
	},
	mounted () {
		let self = this;
		self.menus.forEach(item => {
			item.active = false;
			if (self.$route.path.indexOf(item.page) > -1) {
				item.active = true;
			}
		});
	},
	methods: {
		menuClicked (item) {
			this.menus.forEach(element => {
				element.active = false;
			});
			item.active = true;
			this.$router.push('/sys/' + item.page);
		},
		jumpToBlog () {
			this.$router.push('/');
		},
		jumpToPage (page) {
			this.$router.push('/sys/' + page);
		},
		logout () {
			logout().then(() => {
				delete localStorage.token;
				this.$router.push('/login');
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	.header-box {
		height: 60px;
		width: 100%;
		background: #5a4199;
		display: flex;
		justify-content: space-between;

		.menu-box {
			.menu-item {
				height: 100%;
				width: 100px;
				float: left;
				display: flex;
				align-items: center;
				justify-content: center;

				.menu-name {
					color: #ebf1ff;
					font-size: 18px;
				}

				&:hover, &.active {
					background: #1f367a;
					.menu-name {
						color: white;
					}
				}
			}
		}

		.avatar-box {
			margin-right: 30px;
			height: 100%;
			float: right;
			display: flex;
			align-items: center;

			.blog-link {
				font-size: 14px;
				color: white;
				margin-right: 20px;
				width: 60px;
				cursor: pointer;

				&:hover {
					color: #bbcaf8;
				}
			}

			.avatar-popover {
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}
	.content-box {
		width: 100%;
		height: calc(100% - 60px);
		transition: all .2s linear;
		background: white; // background: linear-gradient(135deg, rgba(215,230,255,1) 0%, rgba(243,219,246,1) 50%, rgba(240,220,247,1) 55%, rgba(217,227,255,1) 100%);
	}
}

.home-avatar-popover-popper {
	.user-option {
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: left;
		cursor: pointer;

		&:hover {
			color: #aec4ff;
		}
	}
}
</style>
