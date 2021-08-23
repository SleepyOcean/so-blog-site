<template>
    <div class='full-width lab-page'>
		<div class="lp-box">
			<div  class="lp-item-box" v-for="(item, index) in sets" :key="index" @click="itemClick(item)">
				<div class="lp-item-container" :title="item.name" :style="`background-image:url(${item.icon}; background-color: ${item.bgColor}`">
					<div class="lp-ic-title">{{item.name}}</div>
					<div class="lp-ic-intro">{{item.intro}}</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
export default {
	name: 'LabPage',
	components: {
	},
	data () {
		return {
			sets: []
		};
	},
	created () {
		this.sets = [
			{
				id: 'theater',
				name: '豆瓣影院',
				intro: '倾心打造高品质、优体验、真良心的开放影院',
				url: '/theater',
				bgColor: '#b8a6ff',
				icon: this.$config.getImageUrlById('7a7d20fdbd1864358e878148789338c8')
			}, {
				id: 'TS',
				name: '豆瓣图书',
				intro: '高效查找你想看的图书',
				url: '/book',
				bgColor: '#e2d0ea',
				icon: this.$config.getImageUrlById('bd78e8e4c3c82b35920b24557e2e0032')
			}, {
				id: 'TP',
				name: '壁纸天堂',
				intro: '沉洋精选壁纸合集',
				url: '/photograph',
				bgColor: '#a84bd8',
				icon: this.$config.getImageUrlById('c7e8852da88f97bf45144ffba706e8b3')
			}, {
				id: 'TL',
				name: '时钟锁屏',
				intro: '休息一会，让显示器做个安静的时钟吧',
				url: '/time',
				bgColor: '#353438',
				icon: this.$config.getImageUrlById('274da3185361ff08040649bbfa39285d')
			}, {
				id: 'CSS',
				name: 'CSS布局',
				intro: '有趣的CSS实验室',
				url: '/css-layout',
				bgColor: '#B6ABB7',
				icon: this.$config.getImageUrlById('1f4f976697adb764241cb92a5fb756f6')
			}, {
				id: '3D',
				name: '3D实验室',
				intro: '在这里，你就是上帝',
				url: '/3D',
				bgColor: '#ff6a90',
				icon: this.$config.getImageUrlById('65ba977962128fe5688a48b86de22279')
			}, {
				id: 'TEST',
				name: 'IDEA实验室',
				intro: '让梦想在这里实现吧',
				url: '/idea-lab',
				bgColor: '#b9ca31',
				icon: this.$config.getImageUrlById('1eaf7929e2c23c3c75f6fa3e0298f661')
			}, {
				id: 'TYPING',
				name: '沉洋打字机',
				intro: '小键盘练习机，慧慧同学的练习场',
				url: '/typing',
				bgColor: '#0bb127',
				icon: this.$config.getImageUrlById('1048be1d9a30116adc253e6a1057e49b')
			}, {
				id: 'TYPINGCH',
				name: '拼音打字机',
				intro: '拼音练习机，慧慧同学的练习场',
				url: '/typingChinese',
				bgColor: '#d05656',
				icon: this.$config.getImageUrlById('23a19ec65490204e4aa6b2ee21bf9494')
			}, {
				id: 'FILESYSTEM',
				name: '云文件管理器',
				intro: '在线文件管理器，搭建自己的百度云',
				url: '/fileSystem',
				bgColor: '#a9daa5',
				icon: this.$config.getImageUrlById('530cf937ba1707baf193f9e52b820e65')
			}, {
				id: 'IMGSERVER',
				name: '沉洋图床',
				intro: '自己搭的图床，才放心',
				url: '/imgServer',
				bgColor: '#848484',
				icon: this.$config.getImageUrlById('8b7f9c37adbd78a80c714e851a91f7b3')
			}, {
				id: 'POSTALIEN',
				name: '请求发射器',
				intro: '微信机器人请求模拟',
				url: '/postAlien',
				bgColor: '#4995b9',
				icon: this.$config.getImageUrlById('594fc9c60816c544f3450aa7a674e1fd')
			}];
	},
	methods: {
		itemClick (item) {
			window.open('#' + item.url);
		}
	}
};
</script>

<style lang='scss'>
    .lab-page {
		padding: 20px 0;
		text-align: center;
		@media (min-width: 900px) {
			.lp-box {
				width: 840px;
			}
		}
		@media (max-width: 400px) {
			.lp-box {
				width: 300px;
			}
		}
		.lp-box {
			margin: 0 auto;
			.lp-item-box {
				display: inline-block;
				padding: 5px 10px;
			}
			.lp-item-container {
				width: 256px;
				height: 100px;
				padding: 10px 80px 10px 20px;
				border-radius: 4px;
				float: left;
				background-repeat: no-repeat;
				background-position: 90% bottom;
				background-size: 25%;
				font-size: 24px;
				user-select: none;
				color: white;
				flex-grow: 1;
				transition: opacity .2s linear;
				border: 1px solid white;
				&:hover {
					opacity: 0.8;
				}
				.lp-ic-title, .lp-ic-intro {
					text-align: left;
				}
				.lp-ic-title {
					width: 100%;
					height: 32px;
					line-height: 32px;
					font-size: 22px;
					font-weight: bold;
				}
				.lp-ic-intro {
					width: 100%;
					height: 36px;
					line-height: 18px;
					font-size: 14px;
				}
			}
		}
    }
</style>
