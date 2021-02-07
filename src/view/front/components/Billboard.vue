<template>
	<div class="billboard">
		<div class="b-head"><el-image class="logo-img-style-40" :src="logoUrl"></el-image>公告板</div>
		<el-carousel class="b-content" indicator-position="outside" direction="vertical">
			<el-carousel-item v-for="(item, index) in news" :key="index">
				<div class="b-content-info">
					<div class="b-title">{{item.title}}</div>
					<div class="b-info">{{item.info}}<el-link :href="item.link" type="primary">点击围观</el-link></div>
					<div class="b-date">{{item.date}}</div>
				</div>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
export default {
	name: 'Billboard',
	data () {
		return {
			logoUrl: 'https://gallery.sleepyocean.cn/resource/img/e36f2f52cdcf31eb0df212755b4cbf57',
			news: [{
				title: '通知：博客文章迁移',
				info: '目前本网站处于beta阶段，博客文章均在Github平台更新，想查看最新文章，请',
				date: '2021-02-03',
				link: 'https://sleepyocean.github.io/'
			}, {
				title: '更新：沉洋实验室页面重设计',
				info: '沉洋实验室页面已经完成重新设计，丰富的内容展示，告别之前的单调乏味啦。',
				date: '2020-10-26',
				link: '#/lab'
			}, {
				title: '新功能上线：沉洋影院',
				info: '沉洋影院已完成首页制作，小洋同学正在加紧实现后端接口中，想尝鲜的小伙伴们可以先围观提提建议哈。',
				date: '2020-09-21',
				link: '#/theater'
			}]
		};
	}
};
</script>

<style lang="scss">
.billboard {
	padding: 10px 20px;
	margin-bottom: 10px;
	background-image: url("https://gallery.sleepyocean.cn/resource/img/3ee21ff59d162c909c7adef98f2e6958");
	background-size: 300px;
	background-repeat: no-repeat;
	background-position: bottom;
	height: 400px;
	background-color: aliceblue;
	border-radius: 4px;
	.b-head, .b-title, .b-info, .b-date {
		cursor: default;
	}
	.b-head {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		margin-bottom: 10px;
	}
	.b-title {
		width: 100%;
		height: 36px;
		font-size: 18px;
		font-weight: bold;
		padding-left: 10px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.b-info {
		font-size: 14px;
		text-align: left;
	}
	.b-date {
		height: 30px;
		line-height: 30px;
		text-align: right;
		font-size: 12px;
		color: #909399;
	}
	.b-content {
		height: 130px;
	}
	.b-content-info {
		border-bottom: 1px dashed #ffd5d5;
	}
}
</style>
