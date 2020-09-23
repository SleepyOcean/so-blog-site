<template>
	<div class="movie-home">
		<div class="mh-slider-box">
			<el-carousel height="460px">
				<el-carousel-item v-for="(item,index) in newMovies" :key="index">
					<el-image class="full" :src="item.url" fit="cover"/>
					<div class="mh-c-info">
						<h2>{{item.title}}</h2>
						<span>{{item.note}}</span>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="mh-content-box">
			<div class="mh-cb-list-panel">
				<movie-item v-for="(movie, index) in movieList" :key="index" :info="movie" @itemClick="movieClick"></movie-item>
			</div>
			<div class="mh-cb-index-panel">
				<movie-index-item></movie-index-item>
			</div>
		</div>
	</div>
</template>

<script>
import MovieItem from './components/MovieItem';
import MovieIndexItem from './components/MovieIndexItem';
export default {
	name: 'MovieHome',
	components: {MovieIndexItem, MovieItem},
	data () {
		return {
			newMovies: [{
				url: 'https://gallery.sleepyocean.cn/resource/img/3e74e6a547f784b16dc87258846e3612',
				title: '《神奇宝贝之路基亚的爆诞》',
				note: '今年最火爆的神奇宝贝大电影'
			}, {
				url: 'https://gallery.sleepyocean.cn/resource/img/7e20a0629c8cff47e74385a28e90f710',
				title: '《神奇宝贝之乘龙历险记》',
				note: '神奇宝贝大冒险，一起探索未知的海域吧'
			}],
			movieList: [
				{
					id: '23sadflkasjf23kl5h23jk5h2jk35b23523jk4b',
					url: 'https://gallery.sleepyocean.cn/resource/img/8f76719435495bfb06b7ee0e83964a45',
					name: '人生七年',
					ratio: '1080P',
					score: '9.8'
				}
			]
		};
	},
	mounted () {
		for (let i = 0; i < 20; i++) {
			this.movieList.push(this.movieList[0]);
		}
	},
	methods: {
		movieClick (movie) {
			window.open(`#/theater/detail/${movie.name}=${movie.id}`);
		}
	}
};
</script>

<style lang="scss">
.movie-home {
	.mh-slider-box {
		height: 460px;
		background: #0b638f;
		.mh-c-info {
			position: absolute;
			bottom: 0;
			background: #0b638f;
			filter: opacity(.5);
			width: 100%;
			height: 140px;
			color: white;
			span {
				font-size: 14px;
			}
		}
	}
	.mh-content-box {
		.mh-cb-list-panel {
			width: 900px;
			float: left;
			padding: 10px;
		}
		.mh-cb-index-panel {
			width: calc(100% - 900px);
			float: right;
		}
	}
}
</style>
