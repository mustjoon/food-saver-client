import Vue from 'vue';
import Buefy from 'buefy';

import './main.scss';

import App from './App.vue';
import ApiService from './common/api.service';
import './registerServiceWorker';
import './vee-validate';
import router from './router';
import store from './store';
import { CHECK_AUTH } from './store/actions.type';

Vue.use(Buefy);

Vue.config.productionTip = false;
ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next: any) => Promise.all([store.dispatch(CHECK_AUTH)]).then(next));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
