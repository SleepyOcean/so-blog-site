<template>
	<div class="article-card" @click='jumpToArticle'>
		<div class="ac-cover full-width">
			<el-image class="ac-cover-image full" :src="getRectifyImg(imgList[0])" fit="cover">
				<div slot="error">
					<i class="el-icon-picture-outline"></i>
				</div>
			</el-image>
		</div>
		<div class="ac-content-box full-width">
			<div class="ac-cb-title full-width"><span class="text-ellipsis">{{article.title}}</span></div>
			<div class="ac-cb-summary" v-html="article.summary">{{article.summary}}</div>
			<div class="ac-cb-ps">
				<span>{{article.createTime.substring(0, 10)}}</span>
				<span>
					<so-tag type="text" :name="article.tags.split(',')[0]"></so-tag>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import Util from '../../../../../../../utils/util';
const SoTag = () => import('../../../../../../components/base/SoTag');

export default {
	name: 'ArticleCard',
	components: {
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
				return Util.getCompressImg(Util.imgUrlRectify(imgUrl), 0.5);
			}
		}
	}
};
</script>

<style lang="scss">
	.article-card {
		width: 240px;
		height: 320px;
		border: 1px solid #f2f2f2;
		border-radius: 4px;
		float: left;
		clear: unset;
		cursor: pointer;
		&:hover {
			.ac-content-box {
				background-color: #fffdfd;
			}
		}
		&:active {
			.ac-content-box {
				background-color: white;
			}
		}
		.ac-cover {
			height: calc(100% - 110px - 20px);
			.ac-cover-image {
				margin-right: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 4px 4px 0 0;
				font-size: 14px;
				color: deepskyblue;
				background-color: #f5f7fa;
			}
		}
		.ac-content-box {
			padding: 10px 20px;
			font-size: 12px;
			transition: background-color .2s linear;
			.ac-cb-title {
				height: 40px;
				display: flex;
				align-items: center;
				font-size: 16px;
				font-weight: bold;
			}
			.ac-cb-summary {
				height: 52px;
				line-height: 24px;
				text-align: left;
				color: #9f9bb7;
				font-family: contentfont;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.ac-cb-ps {
				height: 18px;
				color: #a4a8a5;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
</style>
