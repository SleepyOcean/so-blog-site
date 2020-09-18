<template>
	<div class='article-item'>
		<div class="ai-main-box ai-single-cover-style" v-if="imgList.length === 1">
			<div class='ai-info-box'>
				<div class='title' @click='jumpToArticle' v-html="article.title"></div>
				<div class='article-intro' v-html="article.summary">{{article.summary}}</div>
				<div class='ai-ps-box'>
					<div class="ai-pb-date">
						{{article.createTime.substring(0, 10)}}
					</div>
					<div class="ai-pb-tags">
						<so-tag type="text" class='tag-btns' v-for='(tag, index) in article.tags ? article.tags.split(",").slice(0,3) : []' :key='index' :name="tag"></so-tag>
					</div>
				</div>
			</div>
			<div class="ai-img-box full-height" v-if="article.coverImg">
				<el-image class="ai-cover-image full" :src="getRectifyImg(article.coverImg)" fit="cover"></el-image>
			</div>
		</div>
		<div class='ai-main-box' v-else>
			<div class='title' @click='jumpToArticle' :title="article.title"><span v-html="article.title"></span></div>
			<div class='article-intro' v-html="article.summary">{{article.summary}}</div>
			<div class="ai-img-box full-height" v-if="article.coverImg">
				<el-image class="ai-cover-image" :style="`width:calc(100% / ${imgList.length});`" :src="getRectifyImg(img)" fit="cover" v-for="(img, index) in imgList" :key="index">
					<div slot="error">
						<i class="el-icon-picture-outline"></i>
					</div>
				</el-image>
			</div>
			<div class='ai-ps-box'>
				<div class="ai-pb-date">
					{{article.createTime.substring(0, 10)}}
				</div>
				<div class="ai-pb-tags">
					<so-tag type="text" class='tag-btns' v-for='(tag, index) in article.tags ? article.tags.split(",").slice(0,2) : []' :key='index' :name="tag"></so-tag>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Util from '../../../utils/util';
const ArticleViewer = () => import('./ArticleViewer');
const SoTag = () => import('../../components/base/SoTag');

export default {
	name: 'ArticleItem',
	components: {
		ArticleViewer,
		SoTag
	},
	props: {
		article: {
			type: Object
		}
	},
	computed: {
		imgList: function () {
			if (this.article && this.article.coverImg) {
				let imgStr = this.article.coverImg;
				if (this.article.contentImg) {
					imgStr += ',' + this.article.contentImg;
				}
				return imgStr.split(',');
			}
			return '';
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
				// let url = Util.imgUrlRectify(imgUrl);
				// let thumbnail = Util.getThumbnailImg(url.substring(url.lastIndexOf('/') + 1));
				// return thumbnail;
				return Util.getCompressImg(Util.imgUrlRectify(imgUrl), 0.2);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.article-item {
	margin-top: 10px;
	width: 100%;
	padding: 5px 20px;
	border-bottom: 1px solid #f9f6f6;
	box-sizing: border-box;
	user-select: none;
	border-radius: 4px;
	transition: all 0.4s ease;
	.ai-main-box {
		width: 100%;
		.title {
			line-height: 28px;
			display: flex;
			align-items: center;
			font-size: 16px;
			text-align: left;
			cursor: pointer;
			margin-bottom: 5px;
			&:hover {
				color: blueviolet;
			}
		}
		.article-intro {
			font-size: 12px;
			line-height: 24px;
			text-align: left;
			color: #9f9bb7;
			font-family: contentfont;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
	}
	.ai-img-box {
		position: relative;
		display: flex;
		.ai-cover-image {
			margin-right: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 4px;
			font-size: 14px;
			color: deepskyblue;
			background-color: #f5f7fa;
		}
	}
	.ai-ps-box {
		width: 100%;
		height: 20px;
		display: flex;
		justify-content: flex-start;
		margin-top: 5px;
		align-items: center;
		overflow: hidden;
		white-space: nowrap;
		.ai-pb-date {
			font-size: 12px;
			color: #a4a8a5;
		}
		.ai-pb-tags {
			margin-left: 10px;
			width: fit-content;
		}
	}
	.ai-single-cover-style {
		display: flex;
		justify-content: space-between;
		height: 130px;
		.ai-info-box {
			width: calc(100% - 140px - 20px);
			display: flex;
			flex-direction: column;
		}
		.article-intro {
			height: 72px;
		}
		.ai-img-box {
			margin-left: 20px;
			width: 140px;
		}
	}
}
</style>
<style lang="scss">
.article-item {
	.simple-article {
		.ql-editor {
			padding-bottom: unset;
			* {
				font-size: 16px;
				font-weight: 500;
				line-height: 30px;
			}

			h1,
			h2 {
				font-size: 20px;
			}
		}
	}
}
</style>
