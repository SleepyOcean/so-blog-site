<template>
	<el-col class='full' style='text-align: center'>
		<el-row class='pagination'>
			<el-col class='center inline'>
				<el-pagination class='pagi' @current-change='pageChange'
				@size-change='sizeChange'
				:page-size="page.size"
				:pager-count="count"
				:current-page='page.current'
				:total="page.total"
				:page-sizes='pageSizes'
				:layout='layout'></el-pagination>
			</el-col>
			<el-col class='center go-color' v-if='false'>
				<el-button type='primary' @click='pageChange(page.current)' round>GO</el-button>
			</el-col>
		</el-row>
	</el-col>
</template>

<script>
export default {
	name: 'pagination',
	props: {
		layout: {
			type: String,
			default: 'total, prev, pager, next'
		},
		page: {
			type: Object,
			default () {
				return {
					total: 0,
					size: 30,
					current: 1
				};
			}
		},
		pageSizes: {
			// 选择每页可以显示多少数据
			type: Array,
			default: () => {
			}
		},
		count: {
			type: Number,
			default: 5
		}
	},
	methods: {
		pageChange (current) {
			this.$emit('pageChange', current);
		},
		sizeChange (val) {
			this.$emit('sizeChange', val);
		}
	}
};
</script>

<style lang="scss" scoped>
.pagination {
	display: inline-block;
	.center {
		line-height: 64px;
		text-align: center;
	}
	.el-col-24 {
		width: auto;
	}
	.inline {
		display: inline;
	}
	.go-color  {
		.el-button--primary {
			background: #427BF1;
			&:hover {
				background: #366DDE;
				border-color: #366DDE;
			}
		}
	}
}
</style>

<style lang="scss">
.pagination {
	.pagi {
		&.el-pagination {
			padding-top: 0;
			padding-bottom: 0;

			* {
				background-color: transparent;
			}
		}
		.btn-next, .btn-prev, span:not([class*=suffix]) {
			height: 64px;
			line-height: 64px;
		}
		.btn-next .el-icon, .btn-prev .el-icon {
			font-size: 16px;
		}
		.el-pager li, .el-pager li.btn-quicknext, .el-pager li.btn-quickprev {
			line-height: 64px;
		}
		.el-pagination__jump {
			height: 64px;
			line-height: 64px;
			width: 140px;
			.el-pagination__editor.el-input {
				width: 80px !important;
				height: 35px !important;
				.el-input__inner {
					width: 60px !important;
					height: 35px !important;
					margin: 0 10px;
					border: none;
				}
			}
		}
	}
}
</style>
