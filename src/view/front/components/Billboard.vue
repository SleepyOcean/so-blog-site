<template>
	<div class="billboard">
		<div class="b-head"><el-image class="logo-img-style-40" :src="logoUrl"></el-image>公告板</div>
		<div class="b-title">{{title}}</div>
		<div class="b-info">{{info}}<el-link :href="link" type="primary">点击围观</el-link></div>
	</div>
</template>

<script>
export default {
	name: 'Billboard',
	data () {
		return {
			logoUrl: 'https://gallery.sleepyocean.cn/resource/img/e36f2f52cdcf31eb0df212755b4cbf57',
			title: '新功能上线：沉洋影院',
			info: '沉洋影院已完成首页制作，小洋同学正在加紧实现后端接口中，想尝鲜的小伙伴们可以先围观提提建议哈。',
			link: '#/theater'
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
}
</style>
