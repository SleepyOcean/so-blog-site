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
			newMovies: [],
			movieList: []
		};
	},
	mounted () {
		getTestMovieData().then(data => {
			this.movieList = data.map((m, i) => { m.id = i; return m; });
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
			background: #3a5456;
			filter: opacity(.9);
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
