<template>
	<div class='one-page full'>
		<el-image class="page-bg full" :src='oneBg' fit="cover">
			<div slot="placeholder" class="full" style="background: #04648c">
			</div>
			<div slot="error" class="full" style="background: #04648c">
			</div>
		</el-image>
		<div class="one-box">
			<div class='logo' @click='$router.push("/index")'></div>
			<search-bar class="one-ai-search-bar"></search-bar>
		</div>
	</div>
</template>

<script>
import Utils from '../../../utils/util';
const SearchBar = () => import('../../components/base/AISearchBar');
export default {
	name: 'OnePage',
	components: {
		SearchBar
	},
	data () {
		return {
			oneBg: ''
		};
	},
	created () {
		this.oneBg = Utils.getSettingCache('ImageServerUrl') + 'one-bg.jpg';
	}
};
</script>

<style lang="scss" scoped>
.one-page {
	overflow: hidden;
	.page-bg {
		filter: brightness(0.5);
		/deep/ img {
			object-position: bottom;
		}
	}
	.one-box {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
		padding-top: 5%;
		.logo {
			cursor: pointer;
			display: block;
			float: left;
			height: 100px;
			width: 100px;
			margin-bottom: 10px;
			background-size: 100px;
			background-image: url("../../assets/img/svg/whale.svg");
			background-position: center;
			background-repeat: no-repeat;
		}
	}
}
</style>
