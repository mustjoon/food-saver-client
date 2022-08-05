import { MutationTree, ActionTree } from 'vuex';
import ApiService, { OpportunityService } from '@/common/api.service';
import { State, Profile, ProfileResponse, User, Coordinates } from '@/types/profile.types';
import { ActionTypes } from './actions.type';
import { byId } from '@/types/common.types';
import { MutationTypes } from './mutations.type';

const state: State = {
  isLoading: false,
  profile: undefined,
  errors: undefined,
  currentPosition: undefined,
  createdOpportunitys: [],
};

const getters = {
  profile(state: State): Profile | undefined {
    return state.profile;
  },
  isProfileLoading(state: State): boolean {
    return state.isLoading;
  },
  profileErrors(state: State): string | undefined {
    return state.errors;
  },
  createdOpportunitys(state: State): string[] {
    return state.createdOpportunitys;
  },
  currentPosition(state: State): Coordinates | undefined {
    return state.currentPosition;
  },
};

const actions: ActionTree<State, State> = {
  async [ActionTypes.FETCH_PROFILE](context) {
    try {
      context.commit(MutationTypes.SET_PROFILE_LOADING, true);
      const { data } = await ApiService.get<ProfileResponse>('user');

      context.commit(MutationTypes.SET_PROFILE, data.user);
    } catch (error) {
      context.commit(MutationTypes.SET_PROFILE_ERRORS, error?.response?.data?.errors);
    }
  },
  async [ActionTypes.PROFILE_EDIT](context, profile: Profile) {
    try {
      context.commit(MutationTypes.SET_PROFILE_LOADING, true);
      const { data } = (await ApiService.post<ProfileResponse>('profile', profile)) as any;

      context.commit(MutationTypes.SET_PROFILE, data);
    } catch (error) {
      context.commit(MutationTypes.SET_PROFILE_ERRORS, error?.response?.data?.errors);
    }
  },
  async [ActionTypes.POSITION_GET](context) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const coordinates = { lat: coords.latitude, lng: coords.longitude };
      context.commit(MutationTypes.SET_CURRENT_POSITION, coordinates);
    });
  },
};

const mutations: MutationTree<State> = {
  [MutationTypes.SET_PROFILE_LOADING](state, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  [MutationTypes.SET_PROFILE_ERRORS](state, error) {
    state.errors = error || 'Error fetching data';
    state.isLoading = false;
  },
  [MutationTypes.SET_PROFILE](state, user: User) {
    state.profile = user.profile;
    state.createdOpportunitys = user.opportunitys;
  },
  [MutationTypes.SET_CURRENT_POSITION](state, position: Coordinates) {
    state.currentPosition = position;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
