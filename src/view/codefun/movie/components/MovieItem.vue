<template>
	<div class="movie-item" @click="itemClick">
		<img class="mi-image full" :src="info.postUrlVertical">
		<div class="mi-info">
			<div class="mi-i-intro" v-if="true">
				<span :title="info.intro">{{info.intro}}</span>
			</div>
			<div class="mi-i-title">
				<span class="mi-i-name text-ellipsis" :title="info.chineseName">{{info.chineseName}}</span>
				<span class="mi-i-score">{{info.scoreDouban}}</span>
			</div>
			<div class="mi-i-ps">
				<span class="mi-i-date" style="padding-left: 0;">{{info.publishYear}}</span>/
				<span class="mi-i-ratio">{{info.ratio || '4K'}}</span>/
				<span class="mi-i-plain">{{info.country.split(" / ")[0]}}</span>/
				<span class="mi-i-tag">{{info.type.split(" / ")[0]}}</span>
			</div>
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
	data () {
		return {
		};
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
	height: 320px;
	margin: 10px;
	box-sizing: border-box;
	cursor: pointer;
	flex: auto;
	transition: all .2s ease-in-out;
	border-radius: 4px;
	overflow: hidden;
	&:hover {
		transform: scale(1.05);
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		.mi-image {
			filter: blur(4px) brightness(0.6);
			transform: scale(1.05);
		}
		.mi-info, .mi-tags {
			visibility: visible;
		}
	}
	.mi-image {
		object-fit: cover;
		border-radius: 4px;
		transition: all .2s ease-in-out;
	}
	.mi-info, .mi-tags {
		visibility: hidden;
	}
	.mi-info {
		position: absolute;
		bottom: 0;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 16px;
		color: white;
		background: #1c414444;
		.mi-i-intro {
			height: calc(100% - 60px);
			font-size: 12px;
			top: 0;
			display: flex;
			align-items: flex-end;
			justify-content: flex-start;
			span {
				text-align: left;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}
		}
		.mi-i-title {
			height: 30px;
			width: 100%;
			bottom: 24px;
			font-size: 18px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.mi-i-name {
				font-weight: bold;
			}

			.mi-i-score {
				font-size: 16px;
				color: #a78c59;
			}
		}
		.mi-i-ps {
			width: 100%;
			height: 14px;
			bottom: 10px;
			font-size: 12px;
			display: flex;
			align-items: flex-end;
			justify-content: flex-start;
			span {
				padding: 0 5px;
				color: #95888b;
			}
			.mi-i-date {
				font-weight: bolder;
				color: #c2b8b9;
			}
			.mi-i-ratio {
				font-weight: bolder;
				font-style: italic;
				color: #786ea3;
			}
			.mi-i-tag {
				color: #8b7d7e;
			}
		}
		.mi-i-intro, .mi-i-title, .mi-i-ps {
			position: absolute;
			padding-left: 20px;
			padding-right: 20px;
		}
	}
}
</style>
