import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'eoss-ui/lib/utils/util';
import request from 'eoss-ui/lib/utils/http';
import children from './children.js';
import openWindow from './open-window.js';

Vue.use(VueRouter);

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

let routes = [
	{
		path: '/',
		redirect: '/login'
	},
	...children,
	...openWindow

	// {
	// 	path: '/404',
	// 	name: '404',
	// 	title: '川大智胜系统集成综合管理平台',
	// 	component: resolve => require(['@/views/public/Error.vue'], resolve)
	// },
	// {
	// 	path: '/login',
	// 	title: '川大智胜系统集成综合管理平台',
	// 	name: 'login',
	// 	component: resolve => require(['@/views/Login.vue'], resolve)
	// },
	// {
	// 	path: '/main',
	// 	title: '川大智胜系统集成综合管理平台',
	// 	name: 'main',
	// 	component: resolve => require(['@/views/Main.vue'], resolve),
	// 	children: [...children]
	// },
	// {
	// 	path: '/index',
	// 	title: '川大智胜系统集成综合管理平台',
	// 	name: 'index',
	// 	component: resolve => require(['@/views/MainComp.vue'], resolve),
	// 	children: [...children]
	// },
	
];
const router = new VueRouter({
	//mode: 'history', // 去掉链接中的#
	routes
});
router.beforeEach((to, from, next) => {
	$.isLogged({
		to,
		from,
		next,
		request,
		redirect: true
	});
});
// router.beforeEach((to, from, next) => {
// 	console.log(111);
// 	// eslint-disable-next-line prettier/prettier
// 	$.isLogged({ exclude: [], to, from, next, request });
// });

export default router;
