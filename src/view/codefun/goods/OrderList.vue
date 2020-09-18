<template>
	<div class="fx-order-list">
		<div
			class="fol-single-order-box"
			:name="index"
			v-for="(item, index) in order"
			:key="index"
		>
			<div class="fsob-item first-row">
				<div class="fi-date">2020-02-15 17:32:11</div>
				<div class="fi-order-status">{{ getDeliveryStatus(item) }}</div>
			</div>
			<div class="fsob-item second-row">
				<div class="fi-img-box">
					<el-image
						v-for="(goodsItem, index) in item.goods.split(',')"
						:key="index"
						class="f-ib-img full-height"
						:src="goods[goodsItem.split(':')[0]].imgUrl"
						fit="fill"
					></el-image>
					<i class="full-height el-icon-more"></i>
				</div>
				<div class="fi-order-info">
					<div class="foi-price">￥31.20</div>
					<div class="foi-goods-count">共5件</div>
				</div>
			</div>
			<div class="fsob-item third-row">
				<div class="fi-button" v-if="item.deliveryStatus == -1">
					分配订单
				</div>
				<div class="fi-button" v-if="item.deliveryStatus == 0">
					确认完成
				</div>
				<div class="fi-button">删除订单</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getOrderList } from '../../../service/goodsService';

export default {
	name: 'OrderList',
	data () {
		return {
			order: [],
			goods: {}
		};
	},
	mounted () {
		let params = {
			deliveryStatus: '0'
		};
		getOrderList(params).then(data => {
			if (data.status === 200) {
				this.order = data.resultList;
				this.goods = data.extra.goods;
			}
		});
	},
	methods: {
		getDeliveryStatus (item) {
			return item.deliveryStatus > 0
				? '已完成'
				: item.deliveryStatus < 0
					? '未配送'
					: '配送中 - ' + item.deliveryMan;
		}
	}
};
</script>

<style lang="scss">
.fx-order-list {
	height: 100%;
	width: 100%;
	max-width: 800px;
	margin: auto;
	padding: 5px 10px;
	box-sizing: border-box;
	background: #f5f5f5;
	overflow: auto;

	.fol-single-order-box {
		width: 100%;
		height: 200px;
		margin-bottom: 10px;
		padding: 0 10px;
		border-radius: 4px;
		background: white;

		.fsob-item {
			display: flex;
			align-items: center;

			&.first-row,
			&.third-row {
				height: 60px;
			}

			&.first-row {
				justify-content: space-between;
			}

			&.second-row {
				height: 80px;
				justify-content: space-between;
			}

			&.third-row {
				justify-content: flex-end;
			}

			.fi-date {
				height: 100%;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #606266;
			}

			.fi-order-status {
				height: 100%;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #606266;
			}

			.fi-img-box {
				height: 100%;
				width: calc(100% - 80px);

				.f-ib-img {
					width: 80px;
					float: left;
					margin-right: 5px;
				}

				i {
					color: #909399;
					min-width: 60px;
					float: left;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.fi-order-info {
				width: 80px;
				height: 100%;
				display: flex;
				align-items: flex-end;
				justify-content: center;
				flex-direction: column;

				.foi-price {
					font-weight: bold;
					font-size: 14px;
				}

				.foi-goods-count {
					font-size: 12px;
					color: #909399;
				}
			}

			.fi-button {
				border: 1px solid #ebeef5;
				float: right;
				width: 80px;
				margin-left: 5px;
				font-size: 12px;
				border-radius: 20px;
				height: 30px;
				user-select: none;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;

				&:hover {
					color: white;
					border: unset;
					background: #409eff;
				}
			}
		}
	}
}
</style>
