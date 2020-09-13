import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth.module';
import pokemon from './pokemon.module';

Vue.use(Vuex);

export default new Vuex.Store<any>({
  modules: {
    auth,
    pokemon,
  },
});
