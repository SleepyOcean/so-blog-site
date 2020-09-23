<template>
	<div class="full-height" style="background: #1b1919;">
		<el-scrollbar class="movie-theater full-width">
			<div style="background: darkslateblue;">
				<div class="mt-header full-width">
					<el-image class="mt-h-logo" :src="logo"/>
					<div class="mt-h-title">沉洋影院</div>
					<el-input placeholder="搜索影视" v-model="searchWord" class="mt-h-search">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>
			</div>
			<router-view class="mt-router"></router-view>
			<div class="mt-footer full-width">
				<div class="mt-f-right">
					沉睡的海洋 2020 © All Rights Reserved.
				</div>
				<div class="mt-f-ICP">
					<a>皖ICP备20002439号</a>
				</div>
			</div>
		</el-scrollbar>
	</div>
</template>

<script>
export default {
	name: 'MovieTheater',
	data () {
		return {
			logo: 'https://gallery.sleepyocean.cn/resource/img/8ba13dd1329e1ada3ac5a8bf3599bbc7',
			searchWord: ''
		};
	}
};
</script>

<style lang="scss">
.movie-theater {
	height: calc(100% + 10px);
	.mt-header {
		max-width: 1200px;
		margin: auto;
		padding: 0 20px;
		height: 60px;
		display: flex;
		align-items: center;
		position: relative;
		.mt-h-logo {
			height: 40px;
			width: 40px;
			margin-right: 15px;
			border-radius: 40px;
			box-shadow: 0 0 5px 2px #5d1d1d;
		}
		.mt-h-title {
			color: greenyellow;
			font-weight: bold;
			font-size: 24px;
			letter-spacing: 2px;
		}
		.mt-h-search {
			width: 300px;
			position: absolute;
			right: 15px;
		}
	}
	.mt-router {
		min-height: 1080px;
		max-width: 1200px;
		margin: auto;
		padding: 20px 0;
	}
	.mt-footer {
		height: 60px;
		background: #2f3649;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		flex-direction: column;
	}
}
</style>
