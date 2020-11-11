<template>
	<div class="movie-side-menu" :style="`width: ${expand ? width : '80px'}`">
		<div class="msm-toggle" title="菜单显隐开关" @click="menuToggle">
			<i class="icon-ios-menu"></i>
		</div>
		<div class="msm-header-area">
			<el-image class="msm-ha-logo" :src="logoUrl"></el-image>
		</div>
		<div class="msm-menu-area">
			<div class="msm-ma-menu-box full-width" v-for="(menu, index) in menus" :key="index" :title="menu.name" @click="selectedIndex = index">
				<div class="msm-ma-menu-item" :class="{selected: selectedIndex===index, folded: !expand}">
					<el-image class="msm-ma-mi-icon" :src="menu.icon">
						<div slot="error" :style="`background: ${menu.color}`"></div>
					</el-image>
					<span class="msm-ma-mi-name text-ellipsis">{{menu.name}}</span>
				</div>
			</div>
		</div>
		<div class="msm-footer-area"></div>
	</div>
</template>

<script>
export default {
	name: 'MovieSideMenu',
	props: {
		width: {
			type: String,
			default: '300px'
		},
		logoUrl: {
			type: String,
			default: 'https://gallery.sleepyocean.cn/resource/img/8516ecbc32dac3fa43d1107e2b487588'
		},
		menus: {
			type: Array,
			default: () => {
				return [{
					icon: 'https://gallery.sleepyocean.cn/resource/img/b273ca92caa36c720cba2de3e116a385',
					color: '#122',
					name: '在线影院'
				}, {
					icon: 'https://gallery.sleepyocean.cn/resource/img/7a912b85390e1e07414264ff53b701d3',
					color: '#122',
					name: '个人私藏'
				}, {
					icon: 'https://gallery.sleepyocean.cn/resource/img/cd7e1ae5cc7d2f90f1330e5e9340a9f9',
					color: '#122',
					name: '详情'
				}];
			}
		}
	},
	data () {
		return {
			selectedIndex: 0,
			expand: true
		};
	},
	methods: {
		menuToggle () {
			this.expand = !this.expand;
			this.$emit('toggle', this.expand);
		}
	}
};
</script>

<style lang="scss">
.movie-side-menu {
	float: left;
	position: relative;
	height: 100%;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	transition: all .2s ease-in-out;
	.msm-toggle {
		width: 80px;
		height: 80px;
		position: absolute;
		right: 0;
		top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all .2s ease-in-out;
		color: transparent;
		cursor: pointer;
		&:hover {
			color: #c2b8b9;
		}
		i {
			font-size: 24px;
		}
	}
	.msm-header-area {
		padding-top: 100px;
		height: 400px;
		display: flex;
		align-items: flex-end;
		.msm-ha-logo {
			width: 100%;
			max-width: 300px;
		}
	}
	.msm-menu-area {
		height: calc(100% - 400px - 80px);
		min-height: 300px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
		.msm-ma-menu-box {
			display: flex;
			justify-content: center;
			.msm-ma-menu-item {
				height: 48px;
				width: 100%;
				max-width: 200px;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 20px;
				margin: 5px 0;
				border-radius: 4px;
				transition: all .1s ease-in-out;
				cursor: default;
				user-select: none;
				&.folded {
					.msm-ma-mi-name {
						width: 0;
						padding-left: 0;
					}
				}
				&.selected {
					background-color: #c2b8b9;
					color: white;
				}
				.msm-ma-mi-icon {
					height: 32px;
					width: 32px;
				}
				.msm-ma-mi-name {
					transition: all .2s ease-in-out;
					padding-left: 10px;
					max-width: calc(100% - 40px + 10px);
					text-align: left;
				}
			}
		}
	}
	.msm-footer-area {
		height: 80px;
	}
}
</style>
