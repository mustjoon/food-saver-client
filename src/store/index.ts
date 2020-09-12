import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}
export interface State {
  count: number;
  todos: Todo[];
}

export default new Vuex.Store<State>({
  state: {
    count: 0,
    todos: [],
  },
  mutations: {},
  actions: {},
  modules: {},
});
