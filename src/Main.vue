<template>
	<div id="app">
		<es-main
			ref="main"
			:logo="logo"
			:theme="theme"
			:host="host"
			:remote="remote"
			:data="menu"
			scene="subsystem"
			class="set-user-info"
			userHeight="810px"
		></es-main>
	</div>
</template>
<script>
import WujieVue from 'wujie-vue2';
const { bus } = WujieVue;
export default {
	data() {
		return {
			logo: require('@/assets/image/logo.png'),
			//开发模式是加载本地public/meta/menu.json文件配置的菜单，如果不需要改成remote:true
			// remote: true,
			remote: process.env.NODE_ENV != 'development',
			host: '',
			menu: undefined,
			theme: '#A60006',
			isCustomMain: true
		};
	},
	created() {
		const color = localStorage.getItem('theme') || '#A60006';
		this.$.updateTheme(color);
		this.getMenu();
	},
	mounted() {},
	methods: {
		// 关闭弹窗
		bntClick(data) {
			this.$refs.main.showUserInfo = false;
		},
		handleSetting(type, res) {
			if (type === 'theme') {
				bus.$emit('changeTheme', res);
			}
		},
		getMenu() {
			if (process.env.NODE_ENV == 'development' && !this.remote) {
				this.$.ajax({
					url: 'meta/menu.json',
					host: '/'
				}).then(res => {
					this.menu = res;
				});
			}
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
.es-dialog.is-middle .el-dialog {
	height: 840px !important;
}
</style>
