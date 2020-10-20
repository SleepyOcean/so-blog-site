<template>
	<div class="home-page">
		<div class="hp-left-panel">
			<user-info-board></user-info-board>
		</div>
		<div class="hp-article-list" v-if="articles.length > 0 || loading" v-infinite-scroll="load">
			<article-item class='hp-article-fragment' v-for='(item, index) in articles' :key='index' :article='item' @jumpToArticle='jumpToArticle'></article-item>
			<div class="hp-loading" v-loading="loading" element-loading-spinner="el-icon-loading"></div>
		</div>
		<blank-page class="hp-article-list" v-if="articles.length < 1 && !loading" :info="blankInfo"></blank-page>
		<div class="hp-right-panel">
			<billboard></billboard>
			<hot-articles-board></hot-articles-board>
		</div>
	</div>
</template>

<script>
import {getArticle} from '../../service/postService';
import Billboard from './components/Billboard';
const HotArticlesBoard = () => import('./components/HotArticlesBoard');
const UserInfoBoard = () => import('./components/UserInfoBoard');
const SoLoading = () => import('../../components/base/SoLoading');
const ArticleItem = () => import('../../components/layout/ArticleItem');
const Pagination = () => import('../../components/layout/Pagination');
const BlankPage = () => import('../../components/layout/BlankPage');

export default {
	name: 'HomePage',
	components: {
		Billboard,
		HotArticlesBoard,
		UserInfoBoard,
		SoLoading,
		BlankPage,
		Pagination,
		ArticleItem
	},
	data () {
		return {
			loading: false,
			articles: [],
			blankInfo: '',
			page: {
				size: 30,
				current: 1,
				total: 0
			},
			loadFinish: false
		};
	},
	mounted () {
		let self = this;
		let params = {
			title: '',
			content: '',
			size: self.page.size,
			start: self.page.current - 1
		};
		self.loading = true;
		getArticle(params).then(data => {
			if (data.status === 200) {
				if (data.total <= 0) {
					self.blankInfo = '还没有文章发布，下次看看？';
					self.loadFinish = true;
				}
				self.articles = data.resultList.slice(0);
				self.page.total = data.total;
				if (self.page.total === self.articles.length) {
					self.loadFinish = true;
				}
			} else {
				self.blankInfo = '服务端请求出错了！' + data.message;
			}
			self.loading = false;
		}).catch(e => {
			self.blankInfo = '服务维护中，请稍后再试？';
			self.loading = false;
			self.loadFinish = true;
		});
	},
	methods: {
		jumpToArticle (info) {
			window.open('#/article/' + info);
		},
		load () {
			if (this.loadFinish || this.loading) {
				return;
			}
			let self = this;
			self.page.current++;
			let params = {
				title: '',
				content: '',
				size: self.page.size,
				start: self.page.current - 1
			};
			self.loading = true;
			getArticle(params).then(data => {
				if (data.status === 200) {
					if (data.total > 0) {
						self.articles = self.articles.concat(data.resultList);
						self.page.total = data.total;
					} else {
						self.loadFinish = true;
					}
				} else {
					this.$message.error('服务端请求出错了！' + data.message);
					self.loadFinish = true;
				}
				self.loading = false;
			}).catch(e => {
				console.error(e);
				self.loading = false;
				self.loadFinish = true;
			});
		}
	}
};
</script>

<style lang="scss">
	.home-page {
		position: relative;
		display: flex;
		justify-content: center;
		@media screen and (max-width: 1200px) {
			.hp-left-panel {
				display: none;
			}
		}
		@media screen and (max-width: 600px) {
			.hp-right-panel, .hp-left-panel {
				display: none;
			}
		}
		.hp-article-list {
			width: 800px;
			min-width: 300px;
			max-width: 800px;
			background-color: white;
		}
		.hp-article-fragment {
			background-color: snow;
			margin-bottom: 10px;
		}
		.hp-loading {
			margin-top: 40px;
			height: 20px;
			display: flex;
			align-items: center;
		}
		.hp-blank-box {
			width: 60%;
			height: 600px;
			margin: 0 auto;
		}
		.hp-right-panel, .hp-left-panel {
			margin: 10px 20px;
			width: 320px;
			height: 100%;
			top: 10px;
			overflow-y: auto;
			overflow-x: hidden;
		}
		.hp-left-panel {
			width: 280px;
		}
	}
</style>
