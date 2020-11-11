<template>
	<div class="movie-theater full">
		<movie-side-menu class="mt-side-bar" :width="width" @toggle="toggleChange"></movie-side-menu>
		<div class="mt-content-panel full-height" :style="`width: calc(100% - ${expand ? width : '80px'})`">
			<transition name="el-fade-in">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
import MovieSideMenu from './components/MovieSideMenu';
import MovieOnlinePage from './MovieOnlinePage';
export default {
	name: 'MovieTheater',
	components: {MovieOnlinePage, MovieSideMenu},
	data () {
		return {
			expand: true,
			width: '300px'
		};
	},
	methods: {
		toggleChange (expand) {
			this.expand = expand;
		}
	}
};
</script>

<style lang="scss">
.movie-theater {
	* {
		user-select: none;
	}
	.mt-side-bar {
	}
	.mt-content-panel {
		float: right;
		transition: all .2s ease-in-out;
	}
}
</style>
