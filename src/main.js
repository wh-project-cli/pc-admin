import 'whatwg-fetch'; // fetch polyfill
import 'custom-event-polyfill';
import 'babel-polyfill';

import Vue from 'vue';
import App from './Main.vue';
import router from './router/main.js';
import store from './store';
import Element from 'eoss-element';
import EsUi from 'eoss-ui';
import EsProcess from 'eoss-process';
import request from 'eoss-ui/lib/utils/http';
import util from 'eoss-ui/lib/utils/util';
import './assets/style/theme.scss';
Vue.prototype.$ = util;
Vue.prototype.$api = request;
import WujieVue from 'wujie-vue2';
Vue.config.productionTip = false;
Vue.use(EsUi);
Vue.use(Element);
Vue.use(WujieVue);
Vue.use(EsProcess);
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
