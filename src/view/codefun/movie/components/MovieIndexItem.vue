<template>
	<div class="movie-index-item">
		<div class="mii-title">
			<i class="icon-ios-stats" style="color: chartreuse;font-size: 32px;margin-right: 5px"></i>
			<span>{{title}}</span>
		</div>
		<div class="mii-list">
			<div class="mii-l-item" v-for="(item, index) in list" :key="index">
				<div class="mii-l-i-title text-ellipsis"><span class="mii-l-i-t-index">{{index+1}}</span>{{item.title}}</div>
				<div class="mii-l-i-info">{{item.info}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MovieIndexItem',
	props: {
		title: {
			type: String,
			default: 'Top10'
		},
		list: {
			type: Array,
			default: () => {
				return [{
					title: '神奇宝贝之路基亚的爆诞',
					info: '9.2'
				}, {
					title: '神奇宝贝之路基亚的爆诞特别版预告片',
					info: '9.2'
				}, {
					title: '神奇宝贝之路基亚的爆诞',
					info: '9.2'
				}, {
					title: '神奇宝贝之路基亚的爆诞',
					info: '9.2'
				}, {
					title: '神奇宝贝之路基亚的爆诞',
					info: '9.2'
				}, {
					title: '神奇宝贝之路基亚的爆诞',
					info: '9.2'
				}, {
					title: '神奇宝贝之路基亚的爆诞',
					info: '9.2'
				}, {
					title: '神奇宝贝之路基亚的爆诞',
					info: '9.2'
				}, {
					title: '神奇宝贝之路基亚的爆诞',
					info: '9.2'
				}, {
					title: '神奇宝贝之路基亚的爆诞',
					info: '9.2'
				}];
			}
		}
	},
	data () {
		return {
		};
	}
};
</script>

<style lang="scss">
.movie-index-item {
	background: darkslateblue;
	padding: 10px 5px;
	.mii-title {
		height: 36px;
		display: flex;
		align-items: flex-end;
		padding-left: 10px;
		margin-bottom: 5px;
		font-size: 20px;
		font-weight: bold;
		color: #7efb3f;
	}
	.mii-list {
		padding: 0 15px;
		.mii-l-item {
			color: white;
			font-size: 16px;
			height: 36px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.mii-l-i-title {
				width: calc(100% - 40px);
				text-align: left;
			}
			.mii-l-i-t-index {
				background: cadetblue;
				width: 24px;
				height: 24px;
				margin-right: 5px;
				border-radius: 2px;
				float: left;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.mii-l-i-info {
				font-weight: bold;
			}
		}
	}
}
</style>
