<template>
	<div class="mt-cp-content full-height">
		<div class="mt-slider-box">
			<el-carousel height="500px">
				<el-carousel-item v-for="(item,index) in movieList.slice(10, 16)" :key="index">
					<el-image class="full" :src="item.postUrl" fit="cover"/>
					<div class="mh-c-info">
						<h2>{{ item.chineseName }}</h2>
						<span>{{ item.intro[0] }}</span>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="mt-content-box">
			<movie-item v-for="(movie, index) in movieList" :key="index" :info="movie"
						@itemClick="movieClick"></movie-item>
		</div>
	</div>
</template>

<script>
import {getTestMovieData} from '../../../service/movieService';
import MovieItem from './components/MovieItem';

export default {
	name: 'MovieOnlinePage',
	components: {MovieItem},
	data () {
		return {
			newMovies: [],
			movieList: []
		};
	},
	mounted () {
		getTestMovieData().then(data => {
			this.movieList = data.map((m, i) => {
				m.id = i;
				m.intro = JSON.parse(m.intro);
				if (m.captureUrls) {
					m.captureUrls = JSON.parse(m.captureUrls);
				}
				if (m.postUrlHorizon) {
					m.postUrlHorizon = JSON.parse(m.postUrlHorizon);
				}
				if (m.postUrlVertical) {
					m.postUrlVertical = JSON.parse(m.postUrlVertical);
				}
				if (m.trailerUrls) {
					m.trailerUrls = JSON.parse(m.trailerUrls);
				}
				return m;
			});
		});
	},
	methods: {
		movieClick (movie) {
			this.$router.push(`detail/${movie.chineseName}=${movie.id}`);
		}
	}
};
</script>

<style lang="scss">

.mt-cp-content {
	overflow-x: auto;
	width: 100%;
	//max-width: 1800px;
	margin: 0 auto;

	.mt-slider-box {
		height: 500px;
		width: 100%;
		margin: 0 auto;

		.mh-c-info {
			position: absolute;
			bottom: 0;
			background: #23464a99;
			width: 100%;
			height: 160px;
			color: white;
			padding: 0 20px;
			text-align: left;

			&.blur {
				filter: blur(10px) brightness(0.4);
				transform: scale(1.2);
			}

			span {
				font-size: 14px;
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}

	.el-carousel__item {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}

	.mt-content-box {
		padding: 40px 20px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
}
</style>
