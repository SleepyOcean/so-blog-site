<template>
	<div class="side-menu-box full">
		<div class='menu-item word-cannot-selected' :class='item.active ? "active" : ""' v-for='(item, index) in menus' :key='index' @click='menuClicked(item)'>
			<div class='menu-icon'>
				<i class='iosfont' :class='item.icon'></i>
			</div>
			<div class='menu-name'><span>{{item.name}}</span></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SideMenu',
	props: {
		menus: {
			type: Array,
			default: function () {
				return [
					{
						index: 0,
						name: '仪表盘',
						page: 'dash',
						active: true,
						icon: 'icon-ios-home'
					},
					{
						index: 0,
						name: '写文章',
						page: 'post',
						active: false,
						icon: 'icon-ios-create'
					},
					{
						index: 0,
						name: '文章管理',
						page: 'manage',
						active: false,
						icon: 'icon-ios-paper'
					},
					{
						index: 0,
						name: '项目管理',
						page: 'project',
						active: false,
						icon: 'icon-ios-hammer'
					}
				];
			}
		}
	},
	data () {
		return {
			isShowing: false
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
		}
	}
};
</script>

<style lang="scss" scoped>
.side-menu-box {
	background: #6b6be5;
	transition: all .2s linear;
	width: 100%;
	.menu-item {
		display: flex;
		height: 60px;
		line-height: 60px;
		width: 100%;
		font-size: 18px;
		color: white;
		cursor: default;
		&:hover, &.active {
			background: #bcbeea;
		}
		div {
			display: inline-flex;
			float: left;
		}
		.menu-icon {
			height: 60px;
			width: 60px;
			i {
				font-size: 24px;
				color: #fff;
				width: 100%;
			}
		}
		.menu-name {
			width: 100px;
			span {
				overflow: hidden;
				white-space: nowrap;
			}
		}
	}
}
</style>
