<template>
	<div class="post-search-list full">
		<div class="psl-search-bar">
			<el-input class="psl-sb-input full-width" v-model="keyword" @keyup.enter.native="search" placeholder="点击输入，回车查看结果">
				<template slot-scope="{ item }">
					<div class="title" v-html="item.title"></div>
				</template>
			</el-input>
		</div>
		<div class="psl-article-list">
			<article-item :selected="index === currentSelected" v-for='(item, index) in articles' :key='index' :article='item' @click.native="itemSelected(index)"></article-item>
		</div>
	</div>
</template>

<script>
import ArticleItem from './ArticleItem';
import {searchArticle} from '../../../../../../service/postService';
export default {
	name: 'PostSearchList',
	components: {ArticleItem},
	data () {
		return {
			keyword: '',
			currentSelected: 0,
			articles: [],
			loading: false,
			total: 0
		};
	},
	mounted () {
		this.search();
	},
	methods: {
		itemSelected (index) {
			this.currentSelected = index;
			this.$emit('itemChange', this.articles[index]);
		},
		search () {
			let self = this;
			let params = {
				keyword: self.keyword,
				size: 20,
				start: 0
			};
			self.loading = true;
			searchArticle(params).then(data => {
				self.articles = data.resultList.slice(0);
				self.itemSelected(0);
			}).catch(e => {
				self.loading = false;
			}).finally(() => {
				self.loading = false;
			});
		}
	}
};
</script>

<style lang="scss">
.post-search-list {
	overflow: hidden;
	border-right: 1px solid #f0f2f9;
	.psl-search-bar {
		height: 60px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		border-bottom: 1px solid #f0f2f9;
		.psl-sb-input {
			/deep/ .el-input-group--append .el-input__inner {
				text-align: center;
			}
			/deep/ .el-input-group__append {
				width: 60px;
				padding-left: 10px;
				font-size: 16px;
			}
			/deep/ .el-input-group__append,
			.el-input-group__prepend {
				background: #425798;
				color: white;
				border: unset;
			}
		}
	}
	.psl-article-list {
		height: calc(100% - 60px);
		overflow: auto;
	}
}
</style>
