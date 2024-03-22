import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'eoss-ui/lib/utils/util';
import request from 'eoss-ui/lib/utils/http';
import children from './children.js';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

let routes = children;
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

export default router;
