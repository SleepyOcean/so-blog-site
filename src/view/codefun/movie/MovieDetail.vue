<template>
	<div class="movie-detail full">
		<div class="md-blur-bg-box">
			<img class="md-bbb-bg full" :src="movie.postUrlHorizon.length>0 ? movie.postUrlHorizon[0] : movie.postUrl">
		</div>
		<div class="md-detail-box">
			<div class="md-b-info-row md-base-info-row">
				<img class="md-b-ir-cover" :src="movie.postUrl">
				<div class="md-b-ir-info">
					<div class="md-bii-title-box">
						<div style="color: gold;margin-top: 40px">{{ movie.chineseName }}</div>
						<div>{{ movie.originalName }}（{{ movie.publishYear }}）</div>
					</div>
					<div class="md-bii-info-box">
						<div class="base-info" v-if="movie.director"><span>导演：</span>{{ movie.director }}</div>
						<div class="base-info multi-text-ellipsis-2" v-if="movie.actor">
							<span>主演：</span>{{ movie.actor }}
						</div>
						<div class="base-info" v-if="movie.type"><span>类型：</span>{{ movie.type }}</div>
						<div class="base-info" v-if="movie.country"><span>地区：</span>{{ movie.country }}</div>
						<div class="base-info" v-if="movie.date"><span>上映：</span>{{ movie.date }}</div>
						<div class="base-info" v-if="movie.runningTime"><span>片长：</span>{{ movie.runningTime }}</div>
						<div class="base-info" v-if="movie.alias"><span>又名：</span>{{ movie.alias }}</div>
						<div class="base-info" v-if="movie.score"><span>评分：</span>{{ movie.score }}</div>
						<div class="base-info" v-if="movie.note"><span>备注：</span>{{ movie.note }}</div>
					</div>
				</div>
			</div>
			<div class="md-b-info-row">
				<div class="md-info-title">影片介绍</div>
				<div class="md-ir-intro">
					<p v-for="(item, index) in movie.intro" :key="index" style="text-indent:2em;">{{ item }}</p>
				</div>
			</div>
			<div class="md-b-info-row">
				<div class="md-info-title">影片剧照</div>
				<div class="md-ir-capture">
					<el-carousel class="full-width" height="500px" type="card">
						<el-carousel-item v-for="(url,index) in movie.captureUrls.slice(0,4)" :key="index">
							<el-image class="md-ic-image full" :src="url" fit="cover"/>
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>
			<div class="md-b-info-row">
				<div class="md-info-title">影片预告</div>
				<div class="md-ir-trailer">
					<video-player class="md-it-video video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
				</div>
			</div>
			<div class="md-b-info-row" v-if="downloadLink.length!=0">
				<div class="md-info-title">下载链接</div>
				<div class="md-ir-download-link" v-for="(link, index) in downloadLink" :key="index">
					<el-tag class="md-bir-download-tag ratio" v-if="link.ratio">{{link.ratio}}</el-tag>
					<el-tag class="md-bir-download-tag size">{{link.fileSize}}</el-tag>
					<el-link class="text-ellipsis" type="primary" :href="link.downloadUrl" target="_blank">
						<span class="md-ir-download-title">{{link.linkName}}</span>
					</el-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getTestMovieData} from '../../../service/movieService';

export default {
	name: 'MovieDetail',
	data () {
		return {
			id: '',
			movie: {},
			downloadLink: [],
			activeName: '1',
			// 视频播放
			playerOptions: {
				playbackRates: [ 0.5, 1.0, 1.5, 2.0 ],
				autoplay: false,
				muted: false,
				loop: false,
				preload: 'auto',
				language: 'zh-CN',
				aspectRatio: '16:9',
				fluid: true,
				sources: [],
				poster: '',
				notSupportedMessage: '此视频暂无法播放，请稍后再试',
				controlBar: {
					timeDivider: true,
					durationDisplay: true,
					remainingTimeDisplay: false,
					fullscreenToggle: true
				}
			}
		};
	},
	mounted () {
		let params = this.$route.params.id.split('=');
		this.id = params[1];
		getTestMovieData().then(data => {
			this.movie = data[this.id];
			let links = JSON.parse(this.movie.downloadLinks);
			this.movie.intro = JSON.parse(this.movie.intro);
			if (this.movie.captureUrls) {
				this.movie.captureUrls = JSON.parse(this.movie.captureUrls);
			}
			if (this.movie.postUrlHorizon) {
				this.movie.postUrlHorizon = JSON.parse(this.movie.postUrlHorizon);
			}
			if (this.movie.postUrlVertical) {
				this.movie.postUrlVertical = JSON.parse(this.movie.postUrlVertical);
			}
			if (this.movie.trailerUrls) {
				this.movie.trailerUrls = JSON.parse(this.movie.trailerUrls);
				this.playerOptions.sources.push({
					type: '',
					src: 'http://localhost:10020/resource/video/1'
					// src: this.movie.trailerUrls[0]
				});
			}
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
	margin: 0 auto;

	.md-blur-bg-box {
		width: 100%;
		height: 500px;
		overflow: hidden;
		z-index: 1;
		position: relative;
		background-color: #234549;

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
					.base-info {
						font-size: 12px;
					}

					span {
						font-size: 14px;
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
				height: 40px;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #F2F6FC;
				.md-ir-download-title {
					font-size: 14px;
					font-weight: bold;
				}
				.md-bir-download-tag {
					margin-right: 10px;
					font-size: 14px;
					font-weight: bold;
					font-style: italic;
					color: #ffffff;
					border: unset;
					&.ratio {
						background: #0b638f;
					}
					&.size {
						background: #beaa85;
					}
				}
			}

			.md-ir-capture {
				display: flex;
				align-items: center;
				height: 560px;
				.md-ic-image {
					border-radius: 4px;
					box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
				}
			}
			.md-ir-trailer {
			}
		}
	}
}
</style>
