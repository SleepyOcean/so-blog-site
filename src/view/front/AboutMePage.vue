<template>
	<div class="about-me-page full-width">
		<div class="amp-content">
			<p>我是一个追求极致用户体验的人。</p>
			<p>在如今互联网产品如山洪一般，冲刷这我们的生活。好的产品，能让我们感受到生活的美好。但生活中，总有那么些产品，包罗万象，但容易迷失。
				好的产品是简单的，纯粹的，是能够给你最想要的。
			</p>
			<p>我的职业人生中的第一位导师，很荣幸能够跟随他，学习他的精神和理念。
				"好的产品，需要慢慢打磨"，我导师的这句话，给了我做这个网站的想法和坚持的动力，也是我将秉承的开发理念。
				我希望这些产品经过我和时间的细细打磨，能够给自己的工作和生活带来愉悦和享受。
				也希望这些工具和产品能够帮到你们。
			</p>
			<p>一个人的力量是薄弱的，将他们开放出来，希望拥有开源精神、志同道合的小伙伴们，一起为这份纯粹，增添更多的光彩。</p>
		</div>
		<div class="amp-title center-box">
			我的开源项目
		</div>
		<div class="amp-project-box">
			<div class="amp-project" v-for="(project, index) in projects" :key="index">
				<img class="amp-project-background full" :src="project.imgUrl">
				<div class="amp-project-info full" @click="jumpTo(index)">
					<div class="amp-project-title">
						{{project.title}}<span class="amp-project-update-time">最后更新 {{project.updateTime}}</span>
					</div>
					<div class="amp-project-intro">{{project.intro}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AboutMePage',
	data () {
		return {
			projects: [
				{
					imgUrl: 'https://cdn.jsdelivr.net/gh/SleepyOcean/ImageRepo@master/uPic/%E5%8F%A3%E8%A2%8B%E5%A6%96%E6%80%AA%20%E5%A4%8D%E5%88%BB%20Demo.png',
					title: '口袋妖怪 复刻 Demo',
					intro: '本次实验做的 RPG 口袋妖怪，有很大程度上模仿了原版游戏的风格，具备打怪升级，经验值获得，当经验值到一定临界值玩家的宠物就会升级。玩家在游戏设定的地 图里可以自由移动(当然，障碍物时不能走的)，在游戏地图中，还设置了三个 NPC (Non-Player-Controlled Character)，分别是医生、商人和敌人，医生可以将玩家 的宠物生命值完全恢复，商人可以让玩家买道具，而敌人是可以让玩家挑战的。\n' +
						'在战斗系统中，玩家可以选择使用道具，也可以选择逃跑，攻击的方式也较为简单，有攻击对方，治疗自己，防御对方的攻击以及和对方同归于尽。',
					updateTime: '2016-04-20',
					source: 'https://github.com/SleepyOcean/JavaLearning/tree/master/RPG_Game'
				},
				{
					imgUrl: 'https://cdn.jsdelivr.net/gh/SleepyOcean/ImageRepo@master/uPic/%E4%BA%91%E4%B8%8A%E6%96%87%E4%BB%B6%E5%A4%B9.png',
					title: '云文件夹应用',
					intro: '',
					updateTime: '2020-08-12',
					source: 'https://github.com/SleepyOcean/JavaLearning/tree/master/RPG_Game'
				},
				{
					imgUrl: 'https://cdn.jsdelivr.net/gh/SleepyOcean/ImageRepo@master/uPic/%E6%B2%89%E6%B4%8B%20%E7%94%B5%E5%BD%B1%E9%99%A2.png',
					title: '沉洋电影院',
					intro: '',
					updateTime: '2021-01-20',
					source: 'https://github.com/SleepyOcean/JavaLearning/tree/master/RPG_Game'
				}
			]
		};
	},
	methods: {
		jumpTo (index) {
			window.open(this.projects[index].source);
		}
	}
};
</script>

<style lang="scss">
.about-me-page {
	max-width: 1000px;
	margin: auto;
	padding: 40px 20px;
	user-select: none;

	.amp-title {
		margin-top: 20px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-items: center;
		font-size: 20px;
		font-weight: bolder;
	}

	.amp-content {
		p {
			line-height: 28px;
			font-size: 14px;
			text-align: left;
			text-indent: 28px;
			margin: 0;
		}
	}
	.amp-project-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.amp-project {
		position: relative;
		width: 100%;
		height: 260px;
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
			.amp-project-background {
				filter: blur(4px) brightness(0.6);
				transform: scale(1.05);
			}
			.amp-project-info {
				visibility: visible;
			}
		}
		.amp-project-background {
			object-fit: cover;
			border-radius: 4px;
			transition: all .2s ease-in-out;
		}
		.amp-project-info {
			visibility: hidden;
			position: absolute;
			bottom: 0;
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 16px;
			color: white;
			background: #1c414444;

			.amp-project-title {
				font-size: 32px;
				font-weight: bolder;
				color: gold;
			}
			.amp-project-update-time {
				font-size: 12px;
				margin-left: 20px;
				color: #f4f4f4;
			}
			.amp-project-intro {
				font-size: 14px;
				text-indent: 28px;
				margin: 0 100px;
				text-align: left;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 6;
				-webkit-box-orient: vertical;
			}
		}
	}
}
</style>
