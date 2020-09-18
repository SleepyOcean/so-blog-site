<template>
	<div id='app'>
		<transition name="el-fade-in">
			<router-view class='root-view'></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  overflow: hidden;
}
.root-view {
	height: 100% !important;
}
</style>
