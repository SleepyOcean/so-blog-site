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
				<span class="mi-i-ratio">{{infoTest.ratio}}</span>/
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
			infoTest: {
				date: 2020,
				country: '美国',
				ratio: '4K',
				tag: '无码',
				intro: '科技革命是对科学技术进行全面的、根本性变革。近代历史上发生过三次重大的科技革命。18世纪末，蒸汽机的发明和使用，引起了第一次科技革命；19世纪末，电力的发现和使用引起了第二次科技革命；第二次世界大战后，特别是近三十年来，先后出现了电脑、能源、新材料、空间、生物等新兴技术，引起了第三次科技革命。第三次科技革命无论在规模、深度与影响上都远远地超过前两次，它具有一些重要特点。'
			}
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
