<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
import util from 'eoss-ui/lib/utils/util';
export default {
	created() {
		const color = localStorage.getItem('theme') || '#a60006';
		util.updateTheme(color);
	},
	mounted() {
		if (!!window.ActiveXObject || 'ActiveXObject' in window) {
			window.addEventListener(
				'hashchange',
				() => {
					setTimeout(() => {
						let currentPath = window.location.hash.slice(1);
						if (this.$route.path !== currentPath) {
							this.$router.push(currentPath); // 主动更改路由界面
						}
					}, 500);
				},
				false
			);
		}
	}
};
</script>
<style lang="scss" scoped>
#app {
	height: 100%;
	overflow: hidden;
	position: relative;
}
</style>
