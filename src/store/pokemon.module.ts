import { MutationTree, ActionTree } from 'vuex';
import { PokemonService } from '@/common/api.service';
import { State, Pokemon } from '@/types/pokemon.types';
import { ActionTypes } from './actions.type';

import { MutationTypes } from './mutations.type';
import { byId } from '@/types/common.types';

const state: State = {
  isLoading: false,
  allIds: [],
  byId: {},
  activeId: undefined,
  errors: undefined,
};

const getters = {
  activePokemon(state: State): Pokemon | undefined {
    if (state.activeId) {
      return state.byId[state.activeId];
    }
    return undefined;
  },
  byId(state: State): byId<Pokemon> {
    return state.byId;
  },
  pokemons(state: State): Pokemon[] {
    return state.allIds.map((id: string) => state.byId[id]);
  },
  isLoading(state: State): boolean {
    return state.isLoading;
  },
};

const actions: ActionTree<State, State> = {
  async [ActionTypes.FETCH_POKEMONS](context) {
    try {
      context.commit(MutationTypes.SET_POKEMON_LOADING, true);
      const { data } = await PokemonService.get();

      context.commit(MutationTypes.SET_POKEMON_LIST, data.list);
    } catch (error) {
      context.commit(MutationTypes.SET_POKEMON_ERRORS, error.response.data.errors);
    }
  },
  async [ActionTypes.POKEMON_SET_ACTIVE](context, id: string) {
    context.commit(MutationTypes.SET_ACTIVE_POKEMON, id);
  },
  async [ActionTypes.POKEMON_EDIT](context, id: string) {
    try {
      context.commit(MutationTypes.SET_POKEMON_LOADING, true);
      await PokemonService.delete(id);
      context.commit(MutationTypes.POKEMON_REMOVE, id);
    } catch (error) {
      context.commit(MutationTypes.SET_POKEMON_ERRORS, error.response.data.errors);
    }
  },
  async [ActionTypes.POKEMON_DELETE](context, id: string) {
    try {
      context.commit(MutationTypes.SET_POKEMON_LOADING, true);
      await PokemonService.delete(id);
      context.commit(MutationTypes.POKEMON_REMOVE, id);
    } catch (error) {
      context.commit(MutationTypes.SET_POKEMON_ERRORS, error.response.data.errors);
    }
  },
};

const mutations: MutationTree<State> = {
  [MutationTypes.SET_POKEMON_LOADING](state, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  [MutationTypes.SET_POKEMON_ERRORS](state, error) {
    state.errors = error;
    state.isLoading = false;
  },
  [MutationTypes.SET_POKEMON_LIST](state, pokemonList: Pokemon[]) {
    const allIds: string[] = [];
    const byId: byId<Pokemon> = {};
    pokemonList.forEach((pokemon) => {
      allIds.push(pokemon.id);
      byId[pokemon.id] = pokemon;
    });
    state.allIds = allIds;
    state.byId = byId;
    state.isLoading = false;
  },
  [MutationTypes.SET_ACTIVE_POKEMON](state, id: string) {
    state.activeId = id;
  },
  [MutationTypes.POKEMON_REMOVE](state, id: string) {
    const byid = { ...state.byId };
    delete byid[id];

    state.allIds = state.allIds.filter((item) => item !== id);
    state.byId = byid;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
