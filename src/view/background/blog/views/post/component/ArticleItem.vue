<template>
	<div class='small-article-item' :class="{'selected': selected}">
		<div class="sai-title text-ellipsis" :title="article.title">
			{{article.title}}
		</div>
		<div class="sai-date">
			{{article.createTime.substring(0, 10)}}
		</div>
	</div>
</template>

<script>
import Util from '../../../../../../../utils/util';
const ArticleViewer = () => import('../../../../../../components/layout/ArticleViewer');
const SoTag = () => import('../../../../../../components/base/SoTag');

export default {
	name: 'ArticleItem',
	components: {
		ArticleViewer,
		SoTag
	},
	props: {
		article: {
			type: Object
		},
		selected: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		jumpToArticle () {
			let title = this.article.title.replace(/<[^>]+>/g, '');
			this.$emit('jumpToArticle', title + '=' + this.article.id);
		},
		getSummary () {
			return this.article.summary;
		},
		getRectifyImg (imgUrl) {
			if (imgUrl) {
				return Util.imgUrlRectify(imgUrl);
			}
		}
	}
};
</script>

<style lang="scss">
.small-article-item {
	height: 50px;
	width: 100%;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	user-select: none;

	&:hover, &.selected {
		background-color: #f5f7fa;
	}
	.sai-title {
		width: calc(100% - 100px - 10px);
		font-size: 14px;
		text-align: left;
		.sai-icon {
			color: #5a4199;
			margin-right: 10px;
		}
	}
	.sai-date {
		width: 100px;
		font-size: 12px;
		margin-left: 10px;
		text-align: right;
		color: #a4a8a5;
	}
}
</style>
