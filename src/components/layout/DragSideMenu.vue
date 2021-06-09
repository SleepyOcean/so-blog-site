<template>
	<div class="page">
		<div id="box">
			<div id="left" v-bind:style="{ width: menuWidth + 'px' }">
				<slot name="left"></slot>
			</div>
			<div id="resize"></div>
			<div id="right">
				<slot name="right"></slot>
			</div>
			<p></p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DragSideMenu',
	props: {
		leftMinWidth: Number,
		leftMaxWidth: Number
	},
	data: function () {
		return {
			menuWidth: 200
		};
	},
	methods: {
		dragControllerDiv: function () {
			// 保留this引用
			let data = this;
			let resize = document.getElementById('resize');
			resize.onmousedown = function (e) {
				// 颜色改变提醒
				resize.style.borderLeft = '2px dashed #3a85ff';
				let startX = e.clientX;
				resize.left = resize.offsetLeft;
				document.onmousemove = function (e) {
					// 计算并应用位移量
					let endX = e.clientX;
					let moveLen = endX - startX;
					startX = endX;
					if (data.menuWidth + moveLen > data.leftMaxWidth) data.menuWidth = data.leftMaxWidth;
					else if (data.menuWidth + moveLen < data.leftMinWidth) data.menuWidth = data.leftMinWidth;
					else data.menuWidth += moveLen;
				};
				document.onmouseup = function () {
					// 颜色恢复
					resize.style.borderLeft = '';
					document.onmousemove = null;
					document.onmouseup = null;
				};
				return false;
			};
		}
	},
	mounted () {
		this.dragControllerDiv();
	}
};
</script>

<style scoped>
#box {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	display: flex;
}

#left {
	height: 100%;
}

#resize {
	width: 5px;
	height: 100%;
	cursor: w-resize;
}

#right {
	height: 100%;
	flex: 1;
}
</style>

