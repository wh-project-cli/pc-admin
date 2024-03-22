import 'whatwg-fetch'; // fetch polyfill
import 'custom-event-polyfill';
import 'babel-polyfill';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'eoss-element';
import EsUi from 'eoss-ui';
import EsProcess from 'eoss-process';
import util from 'eoss-ui/src/utils/util';
Vue.prototype.$ = util;

Vue.config.productionTip = false;
import './assets/style/theme.scss';
Vue.use(Element);
Vue.use(EsUi);
Vue.use(EsProcess);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
