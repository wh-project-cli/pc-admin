// import costControlManage from './cost-control-manage';
// import workManage from './work-manage';
// import entertainmentExpense from './entertainment-expense';
// import developmentManage from './development-manage';
// import productManage from './product-manage';
// import store from '../store';

export default [
	{
		path: '/error',
		name: 'error',
		title: '',
		component: resolve => require(['@/views/public/Error.vue'], resolve)
	},
	{
		//中转页面实现路由刷新
		path: '/transfer',
		title: '',
		name: 'transfer',
		component: resolve => require(['@/views/public/Transfer.vue'], resolve)
	},
	// 业务流程页面
	// {
	// 	path: '/process',
	// 	title: '业务流程',
	// 	name: 'process',
	// 	component: resolve => require(['@/views/public/Process.vue'], resolve)
	// },
	// {
	// 	path: '/myProject',
	// 	title: '我管理的',
	// 	name: 'myProject',
	// 	component: resolve => require(['@/views/project/my-project/index.vue'], resolve),
	// 	beforeEnter: async (to, from, next) => {
	// 		await store.dispatch('project/getOptions');
	// 		next();
	// 	}
	// },
	
	// 研发管理
	// 费控管理
	// ...costControlManage,
	// 工作管理
	
];
