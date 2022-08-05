import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth.module';
import pokemon from './pokemon.module';
import opportunity from './opportunity.module';
import profile from './profile.module';
import chat from './chat.module';

Vue.use(Vuex);

export default new Vuex.Store<any>({
  modules: {
    auth,
    pokemon,
    opportunity,
    profile,
    chat,
  },
});
