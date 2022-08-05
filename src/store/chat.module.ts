import { MutationTree, ActionTree } from 'vuex';
import { Chat, Message, State } from '@/types/chat.types';
import { byId } from '@/types/common.types';
import { ActionTypes } from './actions.type';
import { ChatService } from '@/common/api.service';
import { MutationTypes } from './mutations.type';

const state: State = {
  isLoading: false,
  allIds: [],
  byId: {},
  activeId: undefined,
  errors: undefined,
  byOpportunity: {},
};

const getters = {
  chatByOpportunity: (state: State): byId<Chat> => {
    return state.allIds.reduce((memo, id) => {
      const item = state.byId[id];
      const opId = item.opportunity;
      return { ...memo, [opId]: item };
    }, {});
  },
};

const actions: ActionTree<State, State> = {
  async [ActionTypes.CONNECT_SOCKET](context, id) {
    try {
      const socket = await ChatService.getSocket();
      socket.on('message', (data: any) => {
        console.log(data);
        context.commit(MutationTypes.MESSAGE_ADD, data);
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  },

  async [ActionTypes.CHAT_CREATE](context, id: string) {
    try {
      const {
        data: { item },
      } = await ChatService.post(id);
      context.commit(MutationTypes.CHAT_ADD, item);

      return item._id;
    } catch (error) {
      // context.commit(MutationTypes.SET_OPPORTUNITY_ERRORS, error?.response?.data?.errors);
    }
  },
  async [ActionTypes.FETCH_CHATS](context) {
    try {
      const { data } = await ChatService.get();
      context.commit(MutationTypes.SET_CHAT_LIST, data.items);
      data.items.forEach((item: Chat) => {
        ChatService.joinRoom(item._id);
      });

      // St
    } catch (error) {
      // context.commit(MutationTypes.SET_OPPORTUNITY_ERRORS, error?.response?.data?.errors);
    }
  },
};

const mutations: MutationTree<State> = {
  [MutationTypes.SET_OPPORTUNITY_LOADING](state, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  [MutationTypes.SET_CHAT_LIST](state, list: Chat[]) {
    const allIds: string[] = [];
    const byId: byId<Chat> = {};
    list.forEach((op) => {
      op.messages = [];
      allIds.push(op._id);
      byId[op._id] = op;
    });
    state.allIds = allIds;
    state.byId = byId;
    state.isLoading = false;
  },
  [MutationTypes.CHAT_ADD](state, chat: Chat) {
    chat.messages = [];
    const { _id } = chat;
    state.allIds.push(_id);
    state.byId[_id] = chat;
    state.isLoading = false;
    state.activeId = _id;
    state.byOpportunity[_id] = chat;
  },
  [MutationTypes.MESSAGE_ADD](state, message) {
    state.byId[message.chat].messages.push(message);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
