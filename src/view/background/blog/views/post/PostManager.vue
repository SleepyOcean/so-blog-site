<template>
	<div class='post-manager full'>
		<post-archived-panel class="pm-archived-panel"></post-archived-panel>
		<post-search-list ref="pslRef" class="pm-list-panel" @itemChange="selectChange"></post-search-list>
		<article-content-panel class="pm-article-panel" :article="article"></article-content-panel>
	</div>
</template>

<script>
import PostArchivedPanel from './component/PostArchivedPanel';
import ArticleContentPanel from './component/ArticleContentPanel';
const Pagination = () => import('../../../../../components/layout/Pagination');
const PostSearchList = () => import('./component/PostSearchList');

export default {
	components: {
		ArticleContentPanel,
		PostArchivedPanel,
		Pagination,
		PostSearchList
	},
	data () {
		return {
			article: '',
			loading: false,
			page: {
				total: 0,
				size: 30,
				current: 1
			}
		};
	},
	methods: {
		selectChange (article) {
			this.article = article;
		}
	}
};
</script>

<style lang="scss">
	.post-manager {
		.pm-archived-panel, .pm-list-panel, .pm-article-panel {
			float: left;
		}
		.pm-archived-panel {
			width: 200px;
		}
		.pm-list-panel {
			width: 240px;
		}
		.pm-article-panel {
			height: 100%;
			width: calc(100% - 200px - 240px);
			padding: 10px 20px;
		}
	}
</style>
