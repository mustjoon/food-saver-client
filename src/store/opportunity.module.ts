import { MutationTree, ActionTree } from 'vuex';
import { OpportunityService, ChatService } from '@/common/api.service';
import { State, Opportunity } from '@/types/opportunity.types';
import { ActionTypes } from './actions.type';
import { byId } from '@/types/common.types';
import { MutationTypes } from './mutations.type';
import { User } from '@/types/profile.types';

const state: State = {
  isLoading: false,
  allIds: [],
  byId: {},
  activeId: undefined,
  errors: undefined,
  ownedByUser: [],
};

const getters = {
  activeOpportunity(state: State): Opportunity | undefined {
    if (state.activeId) {
      return state.byId[state.activeId];
    }
    return undefined;
  },
  opportunityById(state: State): byId<Opportunity> {
    return state.byId;
  },
  opportunityList(state: State): Opportunity[] {
    return state.allIds.map((id: string) => state.byId[id]);
  },
  isOpportunityLoading(state: State): boolean {
    return state.isLoading;
  },
  opportunityErrors(state: State): string | undefined {
    return state.errors;
  },
};

const actions: ActionTree<State, State> = {
  async [ActionTypes.FETCH_OPPORTUNITIES](context) {
    try {
      context.commit(MutationTypes.SET_OPPORTUNITY_LOADING, true);
      const { data } = await OpportunityService.get();
      console.log(data);
      context.commit(MutationTypes.SET_OPPORTUNITY_LIST, data.items);
    } catch (error) {
      context.commit(MutationTypes.SET_OPPORTUNITY_ERRORS, error?.response?.data?.errors);
    }
  },
  async [ActionTypes.CREATE_OPPORTUNITY](context, opportunity: Opportunity) {
    try {
      context.commit(MutationTypes.SET_OPPORTUNITY_LOADING, true);
      const {
        data: { item },
      } = await OpportunityService.post(opportunity);
      context.commit(MutationTypes.OPPORTUNITY_ADD, item);
      return item._id;
    } catch (error) {
      context.commit(MutationTypes.SET_OPPORTUNITY_ERRORS, error?.response?.data?.errors);
    }
  },
};

const mutations: MutationTree<State> = {
  [MutationTypes.SET_OPPORTUNITY_LOADING](state, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  [MutationTypes.SET_OPPORTUNITY_ERRORS](state, error) {
    state.errors = error || 'Error fetching data';
    state.isLoading = false;
  },
  [MutationTypes.SET_OPPORTUNITY_LIST](state, pokemonList: Opportunity[]) {
    const allIds: string[] = [];
    const byId: byId<Opportunity> = {};
    pokemonList.forEach((op) => {
      allIds.push(op._id);
      byId[op._id] = op;
    });
    state.allIds = allIds;
    state.byId = byId;
    state.isLoading = false;
  },
  [MutationTypes.OPPORTUNITY_ADD](state, opportunity: Opportunity) {
    const { _id } = opportunity;
    state.allIds.push(_id);
    state.byId[_id] = opportunity;
    state.isLoading = false;
    state.activeId = _id;
  },
  [MutationTypes.SET_PROFILE](state, user: User) {
    // state.
    // state.ownedByUser = user.opportunitys;
  },
  [MutationTypes.SET_ACTIVE_OPPORTUNITY](state, id: string) {
    state.activeId = id;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
