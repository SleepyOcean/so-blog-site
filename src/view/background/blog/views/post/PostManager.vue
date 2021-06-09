<template>
	<div class='post-manager full'>
		<post-archived-panel class="pm-archived-panel"></post-archived-panel>
		<drag-side-menu class="pm-article-manager-panel full-height" :left-min-width="200" :left-max-width="600">
			<post-search-list slot="left" ref="pslRef" class="pm-list-panel full-height" @itemChange="selectChange"></post-search-list>
			<article-content-panel slot="right" class="pm-article-panel full" :article="article"></article-content-panel>
		</drag-side-menu>
	</div>
</template>

<script>
import PostArchivedPanel from './component/PostArchivedPanel';
import ArticleContentPanel from './component/ArticleContentPanel';
import DragSideMenu from '../../../../../components/layout/DragSideMenu';
const Pagination = () => import('../../../../../components/layout/Pagination');
const PostSearchList = () => import('./component/PostSearchList');

export default {
	components: {
		ArticleContentPanel,
		PostArchivedPanel,
		DragSideMenu,
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
		.pm-archived-panel, .pm-article-manager-panel, .pm-list-panel, .pm-article-panel {
			float: left;
		}
		.pm-archived-panel {
			width: 200px;
		}
		.pm-article-manager-panel {
			width: calc(100% - 200px);
		}
		.pm-list-panel {
			min-width: 200px;
			max-width: 600px;
		}
		.pm-article-panel {
		}
	}
</style>
