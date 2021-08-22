<template>
	<div class="home-center full">
		<pomodoro-timer class="hc-pt"></pomodoro-timer>
	</div>
</template>

<script>
import PomodoroTimer from './component/PomodoroTimer';
export default {
	name: 'HomeCenter',
	components: {PomodoroTimer}
};
</script>

<style lang="scss">
.home-center {
	padding: 20px;
	.hc-pt {
		width: 500px;
	}
}
</style>
