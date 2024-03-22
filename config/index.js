const development = require('./modules/development');
const release = require('./modules/release');
const producion = require('./modules/production');

const CDZS_ENV = process.env['VUE_APP_ENV'];
// 各环境配置信息
const configs = {
	development,
	release,
	producion
};

// 全局公共配置
module.exports = Object.assign(
	{
		title: '四川川大智胜系统集成有限公司',
		// 头部栏是否滚动固定
		fixedHeader: true,
		// 是否展示Logo
		sidebarLogo: true
	},
	configs[CDZS_ENV]
); // 当前环境配置信息
