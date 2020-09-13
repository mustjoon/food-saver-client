import { MutationTree, ActionTree } from 'vuex';
import ApiService from '@/common/api.service';
import JwtService from '@/common/jwt.service';
import { State, Credentials, UserResponse, UpdateUserParams } from '@/types/auth.types';
import { ActionTypes } from './actions.type';

import { MutationTypes } from './mutations.type';

const state: State = {
  errors: null,
  user: undefined,
  isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  currentUser(state: State) {
    return state.user;
  },
  isAuthenticated(state: State) {
    return state.isAuthenticated;
  },
};

const actions: ActionTree<State, State> = {
  async [ActionTypes.LOGIN](context, credentials: Credentials) {
    try {
      const { data } = await ApiService.post<UserResponse>('users/login', { user: credentials });
      context.commit(MutationTypes.SET_AUTH, data.user);
    } catch ({ response }) {
      context.commit(MutationTypes.SET_ERROR, response.data.errors);
    }
  },
  [ActionTypes.LOGOUT](context) {
    context.commit(MutationTypes.PURGE_AUTH);
  },
  async [ActionTypes.REGISTER](context, credentials: Credentials) {
    try {
      const { data } = await ApiService.post<UserResponse>('users', { user: credentials });

      context.commit(MutationTypes.SET_AUTH, data.user);
    } catch ({ response }) {
      context.commit(MutationTypes.SET_ERROR, response.data.errors);
    }
  },
  async [ActionTypes.CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();

      try {
        const { data } = await ApiService.get<UserResponse>('user');
        context.commit(MutationTypes.SET_AUTH, data.user);
      } catch ({ response }) {
        context.commit(MutationTypes.SET_ERROR, response.data.errors);
      }
    } else {
      context.commit(MutationTypes.PURGE_AUTH);
    }
  },
  async [ActionTypes.UPDATE_USER](context, payload: UpdateUserParams) {
    const { email, username, password } = payload;
    const user: UpdateUserParams = {
      email,
      username,
      password,
    };

    const { data } = await ApiService.put<UserResponse>('user', user);
    context.commit(MutationTypes.SET_AUTH, data.user);
    return data;
  },
};

const mutations: MutationTree<State> = {
  [MutationTypes.SET_ERROR](state, error) {
    state.errors = error;
  },
  [MutationTypes.SET_AUTH](state, user): void {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    if (state.user) {
      JwtService.saveToken(state.user.token);
    }
  },
  [MutationTypes.PURGE_AUTH](state): void {
    state.isAuthenticated = false;
    state.user = undefined;
    state.errors = {};
    JwtService.destroyToken();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
