<template>
	<div class="mt-cp-content full-height">
		<div class="mt-slider-box">
			<el-carousel height="380px" type="card">
				<el-carousel-item v-for="(item,index) in movieList" :key="index">
					<el-image class="full" :src="item.postUrlVertical" fit="cover"/>
					<div class="mh-c-info">
						<h2>{{item.chineseName}}</h2>
						<span>{{item.intro}}</span>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="mt-content-box">
			<movie-item v-for="(movie, index) in movieList" :key="index" :info="movie" @itemClick="movieClick"></movie-item>
		</div>
	</div>
</template>

<script>
import { getTestMovieData } from '../../../service/movieService';
import MovieItem from './components/MovieItem';
export default {
	name: 'MovieOnlinePage',
	components: {MovieItem},
	data () {
		return {
			newMovies: [{
				url: 'https://gallery.sleepyocean.cn/resource/img/430ad1f21e931ea5b35df900c282720a',
				title: '《神奇宝贝之路基亚的爆诞》',
				note: '今年最火爆的神奇宝贝大电影'
			}, {
				url: 'https://gallery.sleepyocean.cn/resource/img/3a10d71e86f349c691f4b354dd310e55',
				title: '《神奇宝贝之乘龙历险记》',
				note: '神奇宝贝大冒险，一起探索未知的海域吧'
			}, {
				url: 'https://gallery.sleepyocean.cn/resource/img/43dfe6c5d37f093913c984fa7a393a1b',
				title: '《幽灵公主》',
				note: '神奇宝贝大冒险，一起探索未知的海域吧'
			}],
			movieList: [
				{
					id: '23sadflkasjf23kl5h23jk5h2jk35b23523jk4b',
					url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3768185659,37548005&fm=173&app=25&f=JPEG?w=640&h=1136&s=2AA2CC4D1AF2C84D46383C8C0300C002',
					name: '火星救援',
					ratio: '1080P',
					score: '9.8'
				},
				{
					id: '23sadflkasjf23kl5h23jk5h2jk35b23523jk4b',
					url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3681864896,1401200815&fm=173&app=25&f=JPEG?w=640&h=947&s=3873E14CDEAD837E4CEFD611030040DD',
					name: '海洋深处',
					ratio: '1080P',
					score: '9.8'
				},
				{
					id: '23sadflkasjf23kl5h23jk5h2jk35b23523jk4b',
					url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=909306739,558210708&fm=173&app=25&f=JPEG?w=640&h=800&s=63710B64A64A2CF456EC2D0F0000E0C2',
					name: '毒液',
					ratio: '1080P',
					score: '9.8'
				},
				{
					id: '23sadflkasjf23kl5h23jk5h2jk35b23523jk4b',
					url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3204320347,2207779249&fm=173&app=25&f=JPEG?w=640&h=960&s=EA828345441117DED8B47D17030090C0',
					name: '黑暗骑士',
					ratio: '1080P',
					score: '9.8'
				},
				{
					id: '23sadflkasjf23kl5h23jk5h2jk35b23523jk4b',
					url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3686892592,4181585750&fm=173&app=25&f=JPEG?w=640&h=906&s=94D71AD68863CCDC5E8796B10300C018',
					name: '奇异博士',
					ratio: '1080P',
					score: '9.8'
				},
				{
					id: '23sadflkasjf23kl5h23jk5h2jk35b23523jk4b',
					url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3152921789,3556901918&fm=173&app=25&f=JPEG?w=640&h=972&s=1D902CDC4A36EBDA00B8B8160300C0C6',
					name: '银河护卫队',
					ratio: '1080P',
					score: '9.8'
				},
				{
					id: '23sadflkasjf23kl5h23jk5h2jk35b23523jk4b',
					url: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1905758184,2436356264&fm=173&app=25&f=JPEG?w=640&h=1211&s=89C4934ECEED9F7C1EE5B5AD0300F007',
					name: '攻壳机动队',
					ratio: '1080P',
					score: '9.8'
				}
			]
		};
	},
	mounted () {
		getTestMovieData().then(data => {
			this.movieList = data;
		});
	},
	methods: {
		movieClick (movie) {
			this.$router.push(`detail/${movie.name}=${movie.id}`);
		}
	}
};
</script>

<style lang="scss">

.mt-cp-content {
	overflow-x: auto;
	width: 100%;
	max-width: 1800px;
	margin: 0 auto;
	padding: 40px 20px;

	.mt-slider-box {
		height: 400px;
		width: calc(100% - 40px);
		margin: 0 auto;
		.mh-c-info {
			position: absolute;
			bottom: 0;
			background: #0b638f;
			filter: opacity(.5);
			width: 100%;
			height: 160px;
			color: white;
			span {
				padding: 0 20px;
				font-size: 14px;
				text-align: left;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}
	.el-carousel__item {
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
	.mt-content-box {
		padding: 20px 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
}
</style>
