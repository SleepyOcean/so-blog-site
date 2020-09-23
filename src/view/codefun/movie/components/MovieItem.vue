<template>
	<div class="movie-item" @click="itemClick">
		<img class="mi-image" :src="info.url">
		<div class="mi-info">
			<span class="mi-i-name">{{info.name}}</span>
			<span class="mi-i-score">{{info.score}}</span>
		</div>
		<div class="mi-tags">
			<div class="mi-tag">{{info.ratio}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MovieItem',
	props: {
		info: {
			type: Object,
			isRequired: true
		}
	},
	methods: {
		itemClick () {
			this.$emit('itemClick', this.info);
			console.log(this.info);
		}
	}
};
</script>

<style lang="scss">
.movie-item {
	position: relative;
	width: 200px;
	height: 300px;
	margin: 10px;
	border-radius: 4px;
	box-sizing: border-box;
	background: darkslateblue;
	cursor: pointer;
	float: left;
	.mi-image {
		height: calc(100% - 48px);
		width: 100%;
		object-fit: cover;
		float: left;
	}
	.mi-info {
		float: left;
		height: 48px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: whitesmoke;
		font-size: 16px;
	}
	.mi-tags {
		position: absolute;
		right: 0;
		top: 0;
		height: 32px;
		.mi-tag {
			height: 100%;
			float: right;
			display: flex;
			align-items: center;
			font-size: 16px;
			font-weight: bold;
			background: mediumslateblue;
			color: white;
			padding: 6px;
		}
	}
}
</style>
