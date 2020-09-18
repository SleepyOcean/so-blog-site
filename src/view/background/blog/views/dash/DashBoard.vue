<template>
	<div class='dash-board full word-cannot-selected'>
		<div class="info-card-group">
			<statistic-info-card v-for="(item, index) in statisticInfo" :key="index" :info="item"></statistic-info-card>
		</div>
		<div class="info-card-group">
			<div class="db-chart-card-style">
				<custom-info-card :info="customInfo.visitorChart">
					<so-chart :option="option"></so-chart>
				</custom-info-card>
			</div>
			<div class="db-chart-card-style db-flex-grow">
				<custom-info-card class="todo-table" :info="customInfo.todo">
					<el-table class="todo-content" v-loading="loading.table" height="100%" :data="todoList" tooltip-effect="light">
						<el-table-column label="#" type="index" width="60" align="left"></el-table-column>
						<el-table-column label="任务事项" prop="task" align="left"></el-table-column>
						<el-table-column label="计划完成时间" prop="time" align="center"></el-table-column>
					</el-table>
				</custom-info-card>
			</div>
			<div class="db-chart-card-style db-flex-grow">
				<custom-info-card class="db-last-edit-box" :info="customInfo.edit">
					<div class="info-row title">{{lastEdit.title}}</div>
					<div class="info-row num-font">{{lastEdit.time}}</div>
					<div class="info-row cn-font summary">{{lastEdit.summary}}</div>
				</custom-info-card>
			</div>
			<div class="db-chart-card-style db-flex-grow">
				<custom-info-card :info="customInfo.blogChart">
					<so-chart :option="option"></so-chart>
				</custom-info-card>
			</div>
		</div>
		<el-divider content-position="left"><i class="iosfont icon-ios-trending-up" style="padding-right: 10px;"></i>统计信息
		</el-divider>
		<div ref="articleCardsRef" class="db-article-group" v-if="articles && articles.length>0">
			<article-card v-for='(item, index) in articles' :key='index' :article='item' @jumpToArticle='jumpToArticle' :style="`margin: 0 ${cssConfig.cardMargin}`"></article-card>
		</div>
	</div>
</template>

<script>
import {getArticle} from '../../../../../service/postService';
import CustomInfoCard from './components/CustomInfoCard';
const SoChart = () => import('../../../../../components/base/SoChart');
const ArticleCard = () => import('./components/ArticleCard');
const StatisticInfoCard = () => import('./components/StatisticInfoCard');

export default {
	name: 'DashBoard',
	components: {
		CustomInfoCard,
		SoChart,
		ArticleCard,
		StatisticInfoCard
	},
	data () {
		return {
			option: {},
			articles: [],
			cssConfig: {
				cardMargin: '0'
			},
			loading: {
				table: false,
				article: false
			},
			lastEdit: {
				title: '杂技',
				time: '2019-10-10 19:12',
				summary:
                        '功能：专栏展示、TODO计划栏、恢复文章编写（文章历史纪录）、文章提交日统计（柱状）图、访问量统计（折线）图、标签展示（饼状）图、访问数、文章总数、转发数、评论数、关注数功能：专栏展示、TODO计划栏、恢复文章编写（文章历史纪录）、文章提交日统计（柱状）图、访问量统计（折线）图、标签展示（饼状）图、访问数、文章总数、转发数、评论数、关注数'
			},
			statisticInfo: [
				{
					label: '已发布',
					value: '86 文',
					icon: 'icon-ios-paper',
					color: '#3b4b61',
					background: '#BBD2F2'
				},
				{
					label: '今日访问',
					value: '2181 次',
					icon: 'icon-ios-podium',
					color: '#b0fd6a',
					background: '#3B4B61'
				},
				{
					label: '累计评论',
					value: '621 条',
					icon: 'icon-ios-quote',
					color: '#fdf4f8',
					background: '#62394A'
				},
				{
					label: '关注总数',
					value: '921 人',
					icon: 'icon-ios-eye',
					color: '#d8ff00',
					background: '#7C4544'
				}
			],
			customInfo: {
				visitorChart: {
					title: '近一周访问量统计',
					icon: 'icon-ios-paw',
					color: '#3b4b61',
					background: '#BBD2F2'
				},
				todo: {
					title: 'TO-DO',
					icon: 'icon-ios-checkbox-outline',
					color: '',
					background: '#E5D8EB'
				},
				edit: {
					title: '最近在写',
					icon: 'icon-ios-laptop',
					color: '#fdf4f8',
					background: '#62394A'
				},
				blogChart: {
					title: '近一周博文发布统计',
					icon: 'icon-ios-albums',
					color: '#b0fd6a',
					background: '#3B4B61'
				}
			},
			todoList: [
				{
					task: '完成日志',
					time: '2019-10-12'
				},
				{
					task: '写小说',
					time: '2019-10-15'
				},
				{
					task: '开发系统',
					time: '2019-12-12'
				},
				{
					task: '文档编写',
					time: '2020-02-23'
				}
			]
		};
	},
	mounted () {
		let self = this;
		let params = {
			title: '',
			content: '',
			size: 10,
			start: 0
		};
		self.loading.article = true;
		getArticle(params).then(data => {
			self.articles = data.resultList;
			self.$nextTick(self.resize);
			self.loading.article = false;
		}).catch(e => {
			self.loading.article = false;
		});
		window.onresize = () => {
			return (() => {
				self.resize();
			})();
		};
		this.option = this.getOption();
	},
	methods: {
		getOption () {
			return {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					top: '10%',
					left: '0',
					bottom: '15%',
					right: '0%'
				},
				xAxis: {
					type: 'category',
					data: [
						'06-04',
						'06-05',
						'06-05',
						'06-07',
						'06-08',
						'06-09',
						'06-10'
					],
					axisLabel: {
						rotate: 20,
						formatter: value => {
							return value.length > 6
								? value.slice(0, 6) + '...'
								: value;
						}
					},
					axisLine: {
						lineStyle: {
							color: '#3b4b61'
						}
					}
				},
				yAxis: {
					show: false,
					splitLine: {
						show: false
					},
					type: 'value'
				},
				series: {
					name: '访问数',
					type: 'bar',
					barWidth: 20,
					itemStyle: {
						color: '#BBD2F2'
					},
					data: [270, 412, 300, 334, 390, 330, 220]
				}
			};
		},
		jumpToArticle (info) {
			window.open(location.protocol + '//' + location.host + '#/sys/post/' + info);
		},
		resize () {
			if (this.$refs && this.$refs['articleCardsRef']) {
				let newVal = this.$refs['articleCardsRef'].clientWidth;
				let margin = (newVal % 282) / ((newVal / 282) * 2);
				this.cssConfig.cardMargin = margin + 'px';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	.dash-board {
		text-align: center;
		padding: 10px;
		overflow: auto;
		.info-card-group {
			display: flex;
			.db-chart-card-style {
				padding: 10px;
				height: 280px;
				width: 400px;
				min-width: 300px;
				max-width: 600px;
				.db-last-edit-box {
					.info-row {
						font-size: 14px;
						text-align: left;
						height: 40px;
						line-height: 40px;
						color: #d2691e;

						&.title {
							height: 50px;
							padding-top: 10px;
							font-size: 20px;
							font-weight: bold;
							color: #1b1919;
						}

						&.summary {
							padding-top: 5px;
							color: #6b6b6b;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 5;
							overflow: hidden;
							height: unset;
							line-height: 20px;
						}
					}
				}
			}
			.db-flex-grow {
				flex-grow: 1;
			}
		}
		.db-article-group {
			display: flex;
			float: left;
			overflow: auto;
			max-height: 100%;
			width: 100%;
			padding: 20px;
		}
	}
</style>
