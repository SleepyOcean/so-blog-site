<template>
	<div class="setting-page full">
		<el-menu :default-active="currentIndex" class="setting-menu" @select='selectChange'>
			<el-menu-item v-for="(menu, key) in menus" :key="key" :index="menu.index">
				<i :class="menu.icon"></i>
				<span slot="title">{{menu.name}}</span>
			</el-menu-item>
		</el-menu>
		<div class="setting-box">
			<system-config v-if="currentIndex === '1'"></system-config>
		</div>
	</div>
</template>

<script>
const SystemConfig = () => import('./sub/SystemConfig');

export default {
	name: 'Setting',
	components: {
		SystemConfig
	},
	data () {
		return {
			currentIndex: '1',
			menus: [
				{
					index: '1',
					name: '系统配置',
					icon: 'icon-ios-settings'
				}
			]
		};
	},
	methods: {
		selectChange (index) {
			this.currentIndex = index;
		}
	}
};
</script>

<style lang="scss" scoped>
.setting-page {
	.setting-menu {
		height: 100%;
		width: 200px;
		float: left;
	}
	.setting-box {
		width: calc(100% - 200px);
		height: 100%;
		float: left;
		overflow: auto;
	}
}
</style>
