<template>
	<div class="ai-search-bar word-cannot-selected">
		<el-autocomplete
			class="ai-input full-width"
			popper-class="ai-input-content"
			v-model="content"
			:trigger-on-focus="true"
			:fetch-suggestions="querySearch"
			placeholder="文章，功能，资源... 找到你想要的"
			@select="handleSelect"
			autofocus
		>
			<template slot-scope="{ item }">
				<div class="type">{{item.type}}</div>
				<div class="name">{{ item.value }}</div>
			</template>
			<el-button slot="append" icon="el-icon-search"></el-button>
		</el-autocomplete>
	</div>
</template>

<script>
import {searchArticle} from '../../service/postService';

export default {
	data () {
		return {
			pages: [],
			content: ''
		};
	},
	mounted () {
		this.pages = this.loadAll();
	},
	methods: {
		querySearch (queryString, cb) {
			let match = () => {
				let pages = this.pages;
				let results = queryString
					? pages.filter(this.createFilter(queryString))
					: pages;
				cb(results);
			};
			if (queryString) {
				let params = {
					keyword: queryString,
					size: 20,
					start: 0
				};
				searchArticle(params).then(data => {
					this.pages = data.resultList.map(a => {
						return {
							type: '文章',
							value: a.title,
							url: `article/${a.title}=${a.id}`
						};
					});
					match();
				});
			} else {
				match();
			}
		},
		createFilter (queryString) {
			return content => {
				return (
					content.value
						.toLowerCase()
						.indexOf(queryString.toLowerCase()) >= 0
				);
			};
		},
		loadAll () {
			return [
				{type: '功能', value: '时钟锁屏', url: 'time'},
				{type: '功能', value: '沉洋图床', url: 'imgServer'},
				{type: '功能', value: '云文件管理', url: 'fileSystem'},
				{type: '功能', value: '定时请求任务', url: 'postAlien'},
				{type: '功能', value: '打字练习（数字版）', url: 'typing'},
				{type: '功能', value: '打字练习（中文版）', url: 'typingChinese'}
			];
		},
		handleSelect (item) {
			this.$emit('selectChange', item);
			this.content = '';
			this.$router.push('/' + item.url);
		}
	}
};
</script>

<style lang="scss" scoped>
.ai-search-bar {
	width: 90%;
	max-width: 600px;
	.ai-input {
		/deep/ .el-input-group--append .el-input__inner {
			text-align: center;
			border-top-left-radius: 50px;
			border-bottom-left-radius: 50px;
		}
		/deep/ .el-input-group__append {
			border-top-right-radius: 50px;
			width: 60px;
			border-bottom-right-radius: 50px;
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
	.ai-input-content{
		.type {
			display: flex;
			align-items: center;
			justify-content: center;
			width: fit-content;
			float: left;
			background: violet;
			padding: 0px 8px;
			margin: 5px 10px 5px 0;
			color: snow;
			border-radius: 5px;
			height: 24px;
			font-size: 12px;
		}
		.name {
			font-weight: bold;
		}
	}
</style>
