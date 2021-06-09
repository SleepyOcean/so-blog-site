<template>
	<drag-side-menu class="side-menu-test full">
		<div class="smt-left full" slot="left"></div>
		<div class="smt-right full" slot="right"></div>
	</drag-side-menu>
</template>

<script>
import DragSideMenu from '../../../../components/layout/DragSideMenu';
export default {
	name: 'DragSideMenuTest',
	components: {
		DragSideMenu
	}
};
</script>

<style lang="scss">
.side-menu-test {
	.smt-left {
		background: #5c6b72;
	}
	.smt-right {
		background: lightcoral;
	}
}
</style>
