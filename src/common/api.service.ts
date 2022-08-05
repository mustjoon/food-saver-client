/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import axios, { AxiosError, AxiosPromise } from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/common/jwt.service';
import io from 'socket.io-client';
import { API_URL } from '@/common/config';
import { mockRequests } from './setup-mock';

import { PokemonResponse } from '@/types/pokemon.types';
import { Opportunity, OpportunityResponse } from '@/types/opportunity.types';
import { Chat, ChatResponse } from '@/types/chat.types';

interface ResponseType<T> {
  data: T;
}

export const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    // mockRequests(Vue.axios);
  },

  setHeader() {
    Vue.axios.defaults.headers.common.Authorization = `${JwtService.getToken()}`;
  },

  query<T>(resource: string, params: any): AxiosPromise<T> {
    return Vue.axios.get(resource, params).catch((error: AxiosError) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get<T>(resource: string, slug = ''): AxiosPromise<T> {
    return Vue.axios.get(`${resource}/${slug}`).catch((error: AxiosError) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post<T>(resource: string, params?: any): AxiosPromise<T> {
    return Vue.axios.post(`${resource}`, params);
  },

  update<T>(resource: string, slug: string, params: any): AxiosPromise<ResponseType<T>> {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put<T>(resource: string, params: any): AxiosPromise<T> {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource: string) {
    return Vue.axios.delete(resource).catch((error: AxiosError) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
};

export default ApiService;

export const PokemonService = {
  path: 'pokemons',
  get() {
    return ApiService.get<PokemonResponse>(this.path);
  },
  delete(id: string) {
    console.log(this.path + id);
    return ApiService.delete(this.path + '/' + id);
  },
};

export const OpportunityService = {
  path: 'opportunity',
  get() {
    return ApiService.get<OpportunityResponse>(this.path);
  },
  delete(id: string) {
    return ApiService.delete(this.path + '/' + id);
  },
  post(data: Opportunity) {
    return ApiService.post<{ item: Opportunity }>(this.path, data);
  },
};

export const TagsService = {
  get() {
    return ApiService.get('tags');
  },
};

export const ChatService: {
  path: string;
  socket: any;
  connect: (callback?: any) => void;
  get: any;
  post: any;
  getSocket: any;
  joinRoom: (id: string) => void;
  sendMessage: (id: string, message: string) => void;
} = {
  path: '/chat',
  socket: undefined,
  get() {
    return ApiService.get<ChatResponse>(this.path);
  },
  post(opportunityId: string) {
    return ApiService.post<{ item: Chat }>(this.path, { opportunityId });
  },

  async getSocket() {
    if (!this.socket) {
      return await this.connect();
    }
    return this.socket;
  },
  async connect(cb) {
    return new Promise((resolve, reject) => {
      const token = JwtService.getToken()?.replace('Bearer ', '');
      this.socket = io.connect('http://localhost:8080', { query: { token } });
      this.socket.on('connect', (sc: any) => {
        resolve(this.socket);
      });
    });
  },
  joinRoom(room: string) {
    this.socket.emit('subscribe', room);
  },
  sendMessage(chatId: string, message: string) {
    this.socket.emit('chatroom', { chatId, message });
  },
};
