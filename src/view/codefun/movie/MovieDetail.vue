<template>
	<div class="movie-detail full">
		{{movie.id}}
	</div>
</template>

<script>
export default {
	name: 'MovieDetail',
	data () {
		return {
			movie: {
				id: '',
				postUrl: 'https://gallery.sleepyocean.cn/resource/img/8f76719435495bfb06b7ee0e83964a45',
				headUrl: 'https://gallery.sleepyocean.cn/resource/img/7e20a0629c8cff47e74385a28e90f710',
				name: '神奇宝贝之乘龙历险记',
				date: '2019-03-23',
				score: '9.2'
			}
		};
	},
	mounted () {
		this.movie.id = this.$route.params.id.split('=')[1];
	}
};
</script>

<style lang="scss">
.movie-detail {
}
</style>
