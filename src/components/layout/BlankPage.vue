<template>
	<div class="blank-page full word-cannot-selected">
		<div class="blank-bg">
			<img src="../../assets/img/svg/blank.svg" height="160"/>
			<div class="blank-info">{{info}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BlankPage',
	props: {
		info: {
			type: String,
			default: '云端数据 走丢了，再试一次？'
		}
	}
};
</script>

<style lang="scss" scoped>
.blank-page {
	display: flex;
	align-items: center;
	justify-content: center;

	.blank-bg {
		height: 200px;
		.blank-info {
			display: flex;
			height: 40px;
			width: 100%;
			align-items: center;
			justify-content: center;
			font-size: 18px;
			color: #bcc0c4;
		}
	}
}
</style>
