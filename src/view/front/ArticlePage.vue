<template>
	<div class="article-page" :class="{'full-height': !article.content}">
		<template v-if="article.content">
			<div class="ap-title text-ellipsis">{{article.title}}</div>
			<div class='ap-article-info' v-if="article.content">
				<div class='ap-ai-create-date'><i class='el-icon-date'></i>&nbsp;&nbsp;created in {{article.createTime && article.createTime.substring(0, 10)}}</div>
				<div class='ap-ai-tag-option'>
					<so-tag class='tag-btns' type="tag" v-for='(tag, index) in article.tags ? article.tags.split(",") : []' :key='index' :name="tag"></so-tag>
				</div>
			</div>
			<article-viewer class="ap-article" :content='article.content'></article-viewer>
		</template>
		<so-loading :show="loading"></so-loading>
		<blank-page v-if="!article.content && !loading"></blank-page>
	</div>
</template>

<script>
import {getArticle, getRelatedArticle} from '../../service/postService';
const ArticleViewer = () => import('../../components/layout/ArticleViewer');
const BlankPage = () => import('../../components/layout/BlankPage');
const SoLoading = () => import('../../components/base/SoLoading');
const SoTag = () => import('../../components/base/SoTag');

export default {
	name: 'ArticlePage',
	components: {
		SoTag,
		SoLoading,
		BlankPage,
		ArticleViewer
	},
	data () {
		return {
			loading: false,
			article: {},
			content: '',
			recommends: [],
			error: {
				status: false,
				info: ''
			}
		};
	},
	mounted () {
		this.loadArticle();
	},
	watch: {
		'$route': function () {
			this.loadArticle();
		}
	},
	methods: {
		loadArticle () {
			let self = this;
			self.loading = true;
			let params = {
				id: this.$route.params.id.split('=')[1]
			};
			getArticle(params).then(data => {
				if (data.status === 200) {
					self.article = data.result;
					let relatedParams = {
						tags: self.article.tags,
						size: 6
					};
					getRelatedArticle(relatedParams).then(data => {
						self.recommends = data.resultList;
					});
				} else {
					self.error = {
						status: true,
						info: '服务器内部似乎出问题了 ' + data.message
					};
				}
			}).catch(e => {
				self.error = {
					status: true,
					info: '页面似乎出错了 ' + e.message
				};
			}).finally(() => {
				self.loading = false;
			});
		}
	}
};
</script>

<style lang="scss">
.article-page{
	position: relative;
	width: 100%;
	max-width: 800px;
	margin: auto;
	background-color: white;
	.ap-title {
		height: 60px;
		display: flex;
		align-items: center;
		font-size: 28px;
		padding-left: 10px;
	}
	.ap-article-info {
		display: inline-block;
		width: 100%;
		line-height: 20px;
		text-align: left;
		font-size: 14px;
		color: #5c6b72;
		padding: 10px;

		.ap-ai-create-date {
			padding-left: 4px;
			font-family: numfont;
		}

		.ap-ai-tag-option {
			width: 100%;
			height: 40px;
			display: flex;
			align-items: center;
			overflow: hidden;
			white-space: nowrap;
			i {
				color: #7aa7d1;
				margin-right: 10px;
			}
		}
	}
	.ap-article {
		height: 100%;
		width: 100%;
	}
}
</style>
