import 'whatwg-fetch'; // fetch polyfill
import 'custom-event-polyfill';
import 'babel-polyfill';

import Vue from 'vue';
import App from './Login.vue';
import store from './store';
import Element from 'eoss-element';
import EsUi from 'eoss-ui';

Vue.config.productionTip = false;
import './assets/style/theme.scss';

Vue.use(Element);
Vue.use(EsUi);

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');
