<template>
	<div class="movie-detail full">
		<div class="md-blur-bg-box">
			<img class="md-bbb-bg full" :src="movie.postUrlVertical">
		</div>
		<div class="md-detail-box">
			<div class="md-b-info-row md-base-info-row">
				<img class="md-b-ir-cover" :src="movie.postUrlVertical">
				<div class="md-b-ir-info">
					<div class="md-bii-title-box">
						<div style="color: gold;margin-top: 40px">{{movie.chineseName}}</div>
						<div>{{movie.originalName}}（{{movie.publishYear}}）</div>
					</div>
					<div class="md-bii-info-box">
						<div class="base-info"><span>导演：</span>{{movie.director}}</div>
						<div class="base-info multi-text-ellipsis-2"><span>主演：</span>{{movie.actor}}</div>
						<div class="base-info"><span>类型：</span>{{movie.type}}</div>
						<div class="base-info"><span>地区：</span>{{movie.country}}</div>
						<div class="base-info"><span>上映：</span>{{movie.date}}</div>
						<div class="base-info"><span>片长：</span>{{movie.runningTime}}</div>
						<div class="base-info"><span>又名：</span>{{movie.alias}}</div>
						<div class="base-info"><span>评分：</span>{{movie.score}}</div>
						<div class="base-info"><span>备注：</span>{{movie.note}}</div>
					</div>
				</div>
			</div>
			<div class="md-b-info-row">
				<div class="md-info-title">影片介绍</div>
				<div class="md-ir-intro">{{movie.intro}}</div>
			</div>
			<div class="md-b-info-row">
				<div class="md-info-title">下载链接</div>
				<div class="md-ir-download-link" v-for="(link, index) in downloadLink" :key="index">
					<span class="md-irdl-ratio hd" v-if="link.linkName.includes('720p')||link.linkName.includes('720P')">720P</span>
					<span class="md-irdl-ratio fhd" v-else-if="link.linkName.includes('1080p')||link.linkName.includes('1080P')">1080P</span>
					<span class="md-irdl-ratio shd" v-else-if="link.linkName.includes('2160p')||link.linkName.includes('2160P')||link.linkName.includes('4k')||link.linkName.includes('4K')">4K</span>
					<span class="md-irdl-ratio unknown-ratio" v-else>未知</span>
					<el-link class="text-ellipsis" type="primary" :href="link.downloadUrl" target="_blank">{{link.linkName}}</el-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getTestMovieData } from '../../../service/movieService';
export default {
	name: 'MovieDetail',
	data () {
		return {
			id: '',
			movie: {},
			downloadLink: []
		};
	},
	mounted () {
		let params = this.$route.params.id.split('=');
		this.id = params[1];
		getTestMovieData().then(data => {
			this.movie = data[this.id];
			let links = JSON.parse(this.movie.downloadLinks);
			links.forEach(link => {
				this.downloadLink.push(link);
			});
		});
	}
};
</script>

<style lang="scss">
.movie-detail {
	overflow-x: auto;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	.md-blur-bg-box {
		width: 100%;
		height: 500px;
		overflow: hidden;
		z-index: 1;
		position: relative;
		.md-bbb-bg {
			object-fit: cover;
			filter: blur(10px) brightness(0.4);
			transform: scale(1.2);
		}
	}
	.md-detail-box {
		margin-top: -160px;
		margin-left: auto;
		margin-right: auto;
		width: calc(100% - 40px);
		padding: 0 20px;
		z-index: 2;
		position: relative;
		.md-b-info-row {
			width: 100%;
			margin-bottom: 40px;
			text-align: left;
			&.md-base-info-row {
				height: 480px;
			}
			.md-b-ir-cover {
				float: left;
				object-fit: cover;
				width: 300px;
				height: 480px;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			}
			.md-b-ir-info {
				float: right;
				width: calc(100% - 300px);
				height: 480px;
				padding-left: 20px;
				.md-bii-title-box {
					height: 160px;
					padding-bottom: 10px;
					display: flex;
					justify-content: flex-end;
					flex-direction: column;
					color: white;
					font-size: 24px;
					font-weight: bolder;
					text-align: left;
				}
				.md-bii-info-box {
					width: 100%;
					height: calc(480px - 160px);
					padding: 20px 0;
					text-align: left;
					font-size: 14px;
					line-height: 24px;
					color: #2d2d2d;
					span {
						font-weight: bolder;
						color: #777;
					}
				}
			}
			.md-info-title {
				height: 40px;
				line-height: 30px;
				font-size: 20px;
				font-weight: bolder;
			}
			.md-ir-intro {
				line-height: 28px;
				font-size: 14px;
			}
			.md-ir-download-link {
				line-height: 28px;
				.md-irdl-ratio {
					font-size: 16px;
					font-style: italic;
					font-weight: bold;
					&.hd {
						color: #9f8758
					}
					&.fhd {
						color: #8b7e7f
					}
					&.shd {
						color: #00289a
					}
					&.unknown-ratio {
						color: #c1c1c1
					}
				}
			}
		}
	}
}
</style>
