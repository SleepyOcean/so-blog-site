<template>
	<div class="hot-articles-board word-cannot-selected">
		<div class="head"><i class="icon-ios-quote"></i>文章热度排行榜</div>
		<div class="body">
			<template v-if="hotArticles && hotArticles.length > 0">
				<div class="item" v-for="(val,index) in hotArticles" :key="index">
					<div class="title" :title="val.title" @click="jumpToArticle(val)">
						<i :class="index < 3 ? 'icon-ios-flame' : 'icon-ios-ribbon'"></i>
						{{val.title}}
					</div>
					<div class="count">{{val.readCount}}</div>
				</div>
			</template>
			<div class="hab-no-data" v-else>暂无数据</div>
		</div>
	</div>
</template>

<script>
import {getHotArticle} from '../../../service/postService';
export default {
	name: 'HotArticlesBoard',
	data () {
		return {
			hotArticles: []
		};
	},
	mounted () {
		let self = this;
		let params = {
			size: 10
		};
		getHotArticle(params).then(data => {
			self.hotArticles = data.resultList;
		});
	},
	methods: {
		jumpToArticle (val) {
			window.open('#/article/' + val.title + '=' + val.id);
		}
	}
};
</script>

<style lang="scss">
	.hot-articles-board {
		padding: 20px 10px;
		border-left: 2px solid #f9f6f6;
		.head {
			height: 40px;
			line-height: 36px;
			border-bottom: 1px solid #f2f2f2;
			i {
				color: #7aa7d1;
				position: relative;
				top: 0px;
				left: -5px;
				font-size: 22px;
			}
		}
		.body {
			width: 100%;
			font-size: 14px;
			font-weight: normal;
			.item {
				width: 100%;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.title {
					float: left;
					text-align: left;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					cursor: pointer;
					color: #6b6b6b;
					&:hover {
						color: #7aa7d1;
					}
					i {
						margin-right: 5px;
					}
					.icon-ios-flame {
						color: red;
					}
					.icon-ios-ribbon {
						color: gold;
					}
				}
				.count {
					float: right;
					font-weight: bold;
					font-size: 16px;
					width: 80px;
					text-align: right;
				}
			}
			.hab-no-data {
				height: 80px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
