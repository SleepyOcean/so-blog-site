<template>
<div class="user-page full">
    <div class="user-base-info-box" :style="'background-image:' + getBackgroundImgUrl() ">
        <div class="base-info-panel">
            <el-avatar class="avatar-obj word-cannot-selected" slot="reference" :size="120" :src="getAvatarImgUrl()"></el-avatar>
            <div class="info-obj">姓名： 沉睡的海洋</div>
            <div class="info-obj">工作地： 上海</div>
            <div class="info-obj">个人站： sleepyocean.com</div>
        </div>
    </div>
</div>
</template>

<script>
import {srcImgUrlById} from '../../../../service/imgService';

export default {
	components: {
	},
	data () {
		return {
		};
	},
	methods: {
		getBackgroundImgUrl () {
			return `url('${srcImgUrlById('8a80cb816e437a9b016e43c2a6e80004')}')`;
		},
		getAvatarImgUrl () {
			return `${srcImgUrlById('8a80cb816e437a9b016e43c3009e0005')}`;
		}
	}
};
</script>
<style lang="scss" scoped>
.user-page {
    .user-base-info-box {
        position: relative;
        height: 100%;
        min-width: 400px;
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: auto 100%;
        background-position: center;
        background-attachment: fixed;
        .base-info-panel {
            height: 80%;
            width: 80%;
            position: absolute;
            background: inherit;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            &::before {
                content: '';
                position: absolute;
                top:0;
                right: 0;
                bottom: 0;
                left: 0;
                background: inherit;
                background-attachment: fixed;
                filter: blur(10px);
            }
            &::after {
                content: '';
                position: absolute;
                top:0;
                right: 0;
                bottom: 0;
                left: 0;
                background: rgba(156, 139, 139, 0.25);
                border-radius: 10px;
            }

            .avatar-obj, .info-obj {
                position:relative;
                z-index: 1;
            }
            .avatar-obj {
                margin-bottom: 20px;
            }

            .info-obj {
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #190202;
                font-size: 21px;
				user-select: none;
            }
        }
    }
}
</style>
