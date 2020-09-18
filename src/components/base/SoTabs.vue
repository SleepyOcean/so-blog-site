<template>
	<div class="tabs">
		<div :class="tabStyle + '-header'">
			<div :class="'tab ' + (currentKey === item.key ? tabStyle + '-selected' : tabStyle + '-unselected')" v-for="(item, index) in tabs" :key="index" @click="tabChange(item)">
				{{ item.name }}
			</div>
			<div :class="tabStyle + '-option'">
				<slot name="option"></slot>
			</div>
		</div>
		<div :class="tabStyle + '-content-row'">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SoTabs',
	props: {
		tabs: {
			type: Array,
			default: function () {
				return [
					{
						key: 0,
						name: '全部',
						alias: 'ALL'
					}
				];
			}
		},
		initTab: 0,
		tabStyle: {
			type: String,
			default: 'card'
		}
	},
	data () {
		return {
			currentKey: 0
		};
	},
	mounted () {
		this.currentKey = this.initTab;
	},
	methods: {
		tabChange (item) {
			this.currentKey = item.key;
			this.$emit('tabChange', item);
		}
	}
};
</script>

<style lang="scss" scoped>
	.tabs {
		position: relative;
		box-sizing: border-box;

		.tab {
			float: left;
			font-size: 14px;
			text-align: center;
			color: #909399;
		}
		.card-header {
			background: #1d193a;
			height: 48px;
		}
		.card-selected {
			background: #0b638f;
			padding: 0 20px;
			color: white;
			height: 48px;
			line-height: 48px;
			&:hover {
				cursor: pointer;
				background: #0b638f88;
			}
		}
		.card-unselected {
			padding: 0 20px;
			height: 48px;
			line-height: 48px;
			&:hover {
				cursor: pointer;
				background: #0b638f;
				color: white;
			}
		}
		.tag-selected {
			margin: 10px;
			background: #427BF1;
			padding: 0 20px;
			color: white;
			height: 34px;
			line-height: 34px;
			border-radius: 16px;
			&:hover {
				background: #366DDE;
			}
		}
		.tag-unselected {
			margin: 10px;
			padding: 0 20px;
			height: 34px;
			line-height: 34px;
			border-radius: 16px;
			&:hover {
				margin: 8px;
				cursor: pointer;
				border-radius: 16px;
				border: 2px solid #F3AC34;
			}
		}
		.tag-option {
			float: right;
			margin: 10px 0;
			height: 34px;
			line-height: 34px;
			width: auto;
		}
		.card-option {
			float: right;
			height: 40px;
			line-height: 40px;
			width: auto;
		}
		.tag-content-row {
			height: calc(100% - 54px);
			overflow: auto;
		}
		.card-content-row {
			height: calc(100% - 48px);
			overflow: auto;
		}
	}
</style>
