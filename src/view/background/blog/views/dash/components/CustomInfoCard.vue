<template>
	<div class="full custom-info-card word-cannot-selected" :style="info ? `color: ${info.color || ''}; background: ${info.background || ''}` : ''">
		<div class="cic-title">
			<i :class="info.icon"></i>
			<span>{{info.title}}</span>
		</div>
		<div class="cic-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomInfoCard',
	props: {
		info: {
			type: Object,
			default: function () {
				return {
					title: '标题',
					icon: 'icon-ios-paper',
					color: '#3b4b61',
					background: '#BBD2F2'
				};
			}
		}
	}
};
</script>

<style lang="scss">
	.custom-info-card {
		background: #ececff;
		border-radius: 5px;
		.cic-title {
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			span {
				font-size: 16px;
				font-weight: bold;
				letter-spacing: 2px;
			}
			i {
				filter: brightness(.8);
				font-size: 24px;
				margin-right: 16px;
			}
		}
		.cic-content {
			background: white;
			height: calc(100% - 50px);
			padding: 0 20px;
			border-radius: 20px 20px 0 0;
			box-shadow: 0 4px 6px 0px #fbebeb;
			transition: all 0.2s ease;
		}
	}
</style>
