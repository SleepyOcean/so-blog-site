<template>
	<div class="article-content-panel" v-if="article">
		<div class="acp-head-bar">
			<span class="text-ellipsis">{{article.title}}
				<i class="el-icon-edit-outline acp-edit" title="编辑" @click="editArticle"></i>
			</span>
			<div class="acp-options-group word-cannot-selected">
				<el-popconfirm title="删除后不可撤销，确认删除？" @onConfirm="deleteArticle">
					<i class="el-icon-delete acp-og-delete" slot="reference" title="删除"></i>
				</el-popconfirm>
			</div>
		</div>
		<div class="acp-properties-bar word-cannot-selected">
			<div class="acp-date">{{article.createTime.substring(0, 10)}}</div>
			<so-tag v-for="(tag, index) in tags" :key="index" :name="tag"></so-tag>
		</div>
		<div class="acp-content-box">
			<article-viewer class="acp-article-viewer full-width" :content="article.content"></article-viewer>
		</div>
	</div>
</template>

<script>
import {deleteArticle} from '../../../../../../service/postService';
const SoTag = () => import('../../../../../../components/base/SoTag');
const ArticleViewer = () => import('../../../../../../components/layout/ArticleViewer');
export default {
	name: 'ArticleContentPanel',
	components: {
		SoTag,
		ArticleViewer
	},
	props: {
		article: {
			required: true
		}
	},
	computed: {
		tags: function () {
			return this.article.tags ? this.article.tags.split(',') : [];
		}
	},
	methods: {
		editArticle () {
			let title = this.article.title.replace(/<[^>]+>/g, '');
			let info = title + '=' + this.article.id;
			window.open(location.protocol + '//' + location.host + '#/sys/post/' + info);
		},
		deleteArticle () {
			let params = {
				id: this.article.id
			};
			deleteArticle(params).then(data => {
				this.$message('删除成功');
				this.$refs['pslRef'].search();
			});
		}
	}
};
</script>

<style lang="scss">
.article-content-panel {
	.acp-head-bar {
		height: 50px;
		padding: 0 20px;
		font-size: 24px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.acp-edit {
			font-size: 20px;
			font-weight: lighter;
			cursor: pointer;
			margin-left: 10px;
			&:hover {
				filter: opacity(.5);
			}
			color: blueviolet;
		}
		.acp-options-group {
			.acp-og-delete {
				font-size: 20px;
				font-weight: lighter;
				cursor: pointer;
				margin-left: 10px;
				&:hover {
					filter: opacity(.5);
				}
				color: orangered;
			}
		}
	}
	.acp-properties-bar {
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		margin-bottom: 10px;
		border-bottom: 1px solid #f0f2f9;
		.acp-date {
			font-size: 12px;
			margin-right: 10px;
			text-align: right;
			color: #a4a8a5;
		}
	}
	.acp-content-box {
		height: calc(100% - 50px - 60px);
		max-width: 900px;
		margin: auto;
		.acp-article-viewer {
			height: 100%;
			background: white;
			overflow: auto;
			width: 100%;
		}
	}
}
</style>
