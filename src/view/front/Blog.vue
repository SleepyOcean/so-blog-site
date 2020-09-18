<template>
	<div class="full blog">
		<div class="b-header-box" :class="{'showing': showing.menu}" v-click-outside="() => showing.menu = false">
			<el-avatar class="b-hb-avatar" slot="reference" :size="100" :src="avatarUrl" @click.native.stop="showing.menu = !showing.menu"></el-avatar>
			<div class="b-hb-keyword">Learning is like rowing upstream</div>
			<div class="b-hb-info-box">
				<div class="b-hb-info" :class='{"selected": currentType === 0}' @click="jumpTo(0)"><i class="icon-ios-book"></i><span>Home</span></div>
				<div class="b-hb-info" :class='{"selected": currentType === 3}' @click="jumpTo(3)"><i class="icon-ios-speedometer"></i><span>SOBS</span></div>
				<div class="b-hb-info" :class='{"selected": currentType === 2}' @click="jumpTo(2)"><i class="icon-ios-flask"></i><span>Lab</span></div>
				<div class="b-hb-info" :class='{"selected": currentType === 4}' @click="jumpTo(4)"><i class="icon-ios-person"></i><span>About</span></div>
			</div>
		</div>
		<div id="content-box-id" class="b-content-box" :class="{'shrink': showing.menu,'search-status': showing.search}">
			<div class="content-head-bar" ref="contentHeadRef">
				<el-avatar class="b-hb-avatar" slot="reference" :size="40" :src="avatarUrl" @click.native.stop="showing.menu = !showing.menu"></el-avatar>
				<div class="b-hb-title text-ellipsis">{{currentTitle}}</div>
				<i class="chb-icon" :class="showing.search ? 'icon-ios-remove' : 'icon-ios-search'" @click="showing.search = !showing.search"></i>
			</div>
			<div class="b-search-box" v-show="showing.search">
				<search-bar @selectChange="showing.search = false"></search-bar>
			</div>
			<div class="content-box" ref="contentRef" @click="showing.search = false">
				<router-view class="b-cb-view"></router-view>
				<div class="b-cb-footer">
					沉睡的海洋 2020 © All Rights Reserved.
				</div>
				<div class="b-cb-ICP">
					<a>皖ICP备20002439号</a>
				</div>
			</div>
		</div>
		<el-backtop target=".content-box" :visibility-height="40"></el-backtop>
	</div>
</template>

<script>
const SearchBar = () => import('../../components/base/AISearchBar');

export default {
	name: 'Blog',
	components: {
		SearchBar
	},
	data () {
		return {
			avatarUrl: '',
			showing: {
				menu: false,
				search: false
			}
		};
	},
	watch: {
		'showing.menu': function (newVal, oldVal) {
			this.showing.search = false;
		}
	},
	created () {
		this.avatarUrl = 'https://gallery.sleepyocean.cn/resource/img/39187b1e2af3f96a4b1f9be0e1c09cfd';
	},
	mounted () {
		let scrollDiv = this.$refs['contentRef'];
		let headerDiv = this.$refs['contentHeadRef'];

		scrollDiv.onmousewheel = function (event) {
			if ((event.wheelDelta || event.detail) > 0) {
				headerDiv.className = 'content-head-bar';
				scrollDiv.className = 'content-box';
			} else {
				headerDiv.className = 'content-head-bar header-hidden';
				scrollDiv.className = 'content-box header-hidden';
			}
			return true;
		};
	},
	computed: {
		currentType: function () {
			let path = this.$route.fullPath.substring(1, this.$route.fullPath.length);
			switch (path) {
			case 'home': return 0;
			case 'lab': return 2;
			case 'login': return 3;
			case 'about': return 4;
			}
		},
		currentTitle: function () {
			let path = this.$route.fullPath.substring(1, this.$route.fullPath.length);
			if (path.includes('article/')) {
				return path.substring(8, path.indexOf('='));
			}
			switch (path) {
			case 'home': return '首页';
			case 'lab': return '实验室';
			case 'login': return '登陆';
			case 'about': return '关于';
			default: return '沉洋';
			}
		}
	},
	methods: {
		jumpTo (type) {
			this.showing.menu = false;
			switch (type) {
			case 0: this.$router.push('/home'); return;
			case 2: this.$router.push('/lab'); return;
			case 3: this.$router.push('/sys/dash'); return;
			case 4: this.$router.push('/about');
			}
		}
	}
};
</script>

<style lang="scss">
	@import "../../style/scss/socolor";
	.blog {
		@media screen and (max-width: 600px) {
			.content-box {
				padding: 0;
			}
		}
		@media screen and (min-width: 600px) {
			.content-box {
				padding: 10px 20px;
			}
		}
		.b-header-box {
			width: 200px;
			height: 100%;
			background: $--so-color-main-1;
			float: left;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding-top: 100px;
			position: absolute;
			z-index: 2;
			left: -200px;
			transition: all .2s ease-in-out;
			&.showing {
				left: 0;
			}

			.b-hb-keyword {
				margin-top: 40px;
				margin-bottom: 20px;
				width: 80%;
				color: white;
				line-height: 24px;
				letter-spacing: 1px;
				font-size: 16px;
				font-style: italic;
				font-weight: bold;
				user-select: none;
			}

			.b-hb-info-box {

				.b-hb-info {
					height: 40px;
					width: 100%;
					display: flex;
					align-items: center;
					color: white;
					font-size: 14px;
					cursor: pointer;
					user-select: none;
					&.selected {
						color: #7efb3f;
					}

					&:hover {
						span {
							color: wheat;
						}
					}
					i {
						font-size: 20px;
						margin-right: 10px;
					}
					span {
						padding-bottom: 2px;
						letter-spacing: 1px;
					}
				}
			}
		}

		.search-status {
			&.b-content-box {
				overflow: hidden;
				.b-search-box {
					opacity: 1;
				}
				.content-box {
					transform: perspective(800px) translate3d(0,40vh,0) rotate3d(1,0,0,30deg);
				}
			}
		}

		.b-content-box {
			width: 100%;
			height: 100%;
			position: absolute;
			transition: all .2s ease-in-out;
			right: 0;
			background-color: #30434e;
			background-image: url("https://gallery.sleepyocean.cn/resource/img/715a3d8cffbfcf9a16d9b3d460c68bb1");
			&.shrink {
				right: -200px;
			}

			.content-head-bar {
				height: 60px;
				background-color: $--so-color-main-2;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20px;
				transition: all .4s ease;

				&.header-hidden {
					margin-top: -60px;
				}

				.b-hb-avatar {
					cursor: pointer;
				}
				.b-hb-title {
					width: 600px;
					max-width: calc(100% - 100px);
					color: white;
					font-weight: bold;
					letter-spacing: 6px;
				}
				.chb-icon {
					font-size: 28px;
					color: white;
					cursor: pointer;
				}
			}
			.b-search-box {
				position: absolute;
				top: 60px;
				opacity: 0;
				height: 300px;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all .2s ease-in-out;
			}
			.content-box {
				height: calc(100% - 60px);
				overflow: auto;
				background-color: white;
				transition: all .2s ease-in-out;

				&.header-hidden {
					height: 100%;
				}
				.b-cb-view {
					min-height: calc(100% - 60px);
				}
				.b-cb-footer {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 30px;
					width: 100%;
					font-size: 12px;
					letter-spacing: 1px;
					color: #807bc5;
					font-family: sans-serif;
					float: left;
					user-select: none;
				}
				.b-cb-ICP {
					display: flex;
					align-items: center;
					justify-content: center;
					padding-bottom: 10px;
					height: 30px;
					width: 100%;
					font-size: 12px;
					letter-spacing: 1px;
					font-family: sans-serif;
					float: left;
					a {
						cursor: pointer;
						color: #807bc5;
						transition: color .3s ease-in-out;
					}
					a:hover {
						color: #9a98bd;
					}
				}
			}
		}
	}
</style>
