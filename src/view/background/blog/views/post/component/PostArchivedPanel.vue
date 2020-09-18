<template>
	<div class="post-archived-panel full">
		<el-tree class="pap-tree" :data="archivedList" :props="props" :load="loadNode" lazy accordion>
			<span class="pap-node-item" slot-scope="{ node, data }"><i :class="data.icon"></i>{{node.label}}</span>
		</el-tree>
		<el-button class="pap-create" type="success" icon="el-icon-plus" @click="startToEdit">新建笔记</el-button>
	</div>
</template>

<script>
export default {
	name: 'PostArchivedPanel',
	data () {
		return {
			props: {
				label: 'name',
				children: 'zones',
				isLeaf: 'leaf'
			},
			archivedList: [{
				name: '收藏',
				leaf: true,
				icon: 'icon-ios-star'
			}, {
				name: '全部',
				leaf: true,
				icon: 'icon-ios-albums'
			}, {
				name: '转载',
				icon: 'icon-ios-share-alt'
			}, {
				name: '笔记本',
				icon: 'icon-ios-archive'
			}, {
				name: '日记',
				leaf: true,
				icon: 'icon-ios-journal'
			}, {
				name: '回收站',
				leaf: true,
				icon: 'icon-ios-trash'
			}]
		};
	},
	methods: {
		loadNode (node, resolve) {
			if (node.level === 0) {
				return resolve(this.archivedList);
			}
			if (node.level > 4) return resolve([]);
			setTimeout(() => {
				const data = [{
					name: 'So系统架构设计',
					leaf: true
				}, {
					name: 'Java架构师笔记'
				}];
				resolve(data);
			}, 500);
		},
		startToEdit () {
			window.open(location.protocol + '//' + location.host + '#/sys/post');
		}
	}
};
</script>

<style lang="scss">
.post-archived-panel {
	padding: 10px 0;
	border-right: 1px solid #f0f2f9;
	.el-tree-node {
		.el-tree-node__content {
			height: 40px;
			display: flex;
			align-items: center;
		}
	}
	.pap-tree {
		height: calc(100% - 50px);
		overflow: auto;
		.pap-node-item {
			font-size: 16px;
			i {
				padding-right: 10px;
			}
		}
	}
	.pap-create {
		height: 40px;
		width: 60%;
	}
}
</style>
