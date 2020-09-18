<template>
	<div class="result-panel">
		<el-breadcrumb class="breadcrumb-box" separator-class="el-icon-arrow-right">
			<el-breadcrumb-item class="word-cannot-selected">首页</el-breadcrumb-item>
			<el-breadcrumb-item class="word-cannot-selected">搜索</el-breadcrumb-item>
		</el-breadcrumb>
		<article-item v-for='(item, index) in results' :key='index' :article='item' @jumpToArticle='itemClick'></article-item>
	</div>
</template>

<script>
const ArticleItem = () => import('./ArticleItem');

export default {
	name: 'SearchResultPanel',
	components: { ArticleItem },
	props: {
		results: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	methods: {
		itemClick (result) {
			this.$emit('itemClick', result);
		}
	}
};
</script>

<style lang="scss" scoped>
.result-panel {
	width: 60%;
	min-width: 600px;
	margin: 0 auto;

	.breadcrumb-box {
		height: 40px;
		display: flex;
		align-items: flex-end;
	}

	.result-item {
		text-align: left;
		margin: 10px;
		padding: 10px;
		border: 1px solid #fafa;

		.result-title {
			height: 32px;
			line-height: 32px;
			font-size: 20px;
			margin-bottom: 20px;
			cursor: pointer;

			i {
				font-size: 28px;
				padding-right: 10px;
				position: relative;
				top: 2px;
			}

			span {
				font-size: 22px;
			}
		}

		.result-content {
			font-size: 14px;
			p {
				margin: 0;
			}
			img {
				width: 100%;
			}
		}
	}
}
</style>
<style lang="scss">
.result-panel {
	.result-item {
		.result-content {
			p {
				margin: 0;
			}
			img {
				width: 100%;
			}
		}
	}
}
</style>
