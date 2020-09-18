<template>
    <div class='full-width lab-page'>
		<div class="lp-box">
			<div class="item" v-for="(item, index) in sets" :key="index" @click="itemClick(item)" :title="item.name">
				<i :class="item.icon"></i><span class="text-ellipsis">{{item.name}}</span>
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
			sets: [
				{
					id: 'theater',
					name: '豆瓣影院',
					url: '/theater',
					bgColor: '#BBD2F2',
					icon: 'icon-ios-film'
				}, {
					id: 'TS',
					name: '豆瓣图书',
					url: '/book',
					bgColor: '#E5D8EB',
					icon: 'icon-ios-journal'
				}, {
					id: 'TP',
					name: '壁纸天堂',
					url: '/photograph',
					bgColor: '#BFB8BD',
					icon: 'icon-ios-images'
				}, {
					id: 'TL',
					name: '时钟锁屏',
					url: '/time',
					bgColor: '#ADA3BA',
					icon: 'icon-ios-timer'
				}, {
					id: 'CSS',
					name: 'CSS布局',
					url: '/css-layout',
					bgColor: '#B6ABB7',
					icon: 'icon-ios-tablet-landscape'
				}, {
					id: '3D',
					name: '3D实验室',
					url: '/3D',
					bgColor: '#AD8A93',
					icon: 'icon-ios-cube'
				}, {
					id: 'TEST',
					name: 'IDEA实验室',
					url: '/idea-lab',
					bgColor: '#976253',
					icon: 'icon-ios-flask'
				}, {
					id: 'TYPING',
					name: '沉洋打字机',
					url: '/typing',
					bgColor: '#7C4544',
					icon: 'icon-ios-keypad'
				}, {
					id: 'TYPINGCH',
					name: '拼音打字机',
					url: '/typingChinese',
					bgColor: '#62394A',
					icon: 'icon-ios-barcode'
				}, {
					id: 'FILESYSTEM',
					name: '云文件管理器',
					url: '/fileSystem',
					bgColor: '#544667',
					icon: 'icon-ios-folder-open'
				}, {
					id: 'IMGSERVER',
					name: '沉洋图床',
					url: '/imgServer',
					bgColor: '#3B4B61',
					icon: 'icon-ios-image'
				}, {
					id: 'POSTALIEN',
					name: '请求发射器',
					url: '/postAlien',
					bgColor: '#3E6070',
					icon: 'icon-ios-rocket'
				}
			]
		};
	},
	mounted () {
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
        width: 100%;
		.lp-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
		}

        .item {
            width: 200px;
            height: 100px;
            padding: 10px;
            float: left;
            display: flex;
            align-items: center;
            justify-content: center;
			background-position: bottom;
			background-size: cover;
			background-color: #1b2323;
            font-size: 24px;
            user-select: none;
			color: gainsboro;
            flex-grow: 1;
            transition: opacity .2s linear;
			border: 1px solid white;

            i {
                font-size: 32px;
                padding-right: 10px;
				color: gold;
            }

            &:hover {
                opacity: 0.8;
            }
        }
    }
</style>
