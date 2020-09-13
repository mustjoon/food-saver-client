/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import axios, { AxiosError, AxiosPromise } from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/common/jwt.service';
import { API_URL } from '@/common/config';
import { mockRequests } from './setup-mock';

import { PokemonResponse } from '@/types/pokemon.types';

interface ResponseType<T> {
  data: T;
}

export const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    mockRequests(Vue.axios);
  },

  setHeader() {
    Vue.axios.defaults.headers.common.Authorization = `Token ${JwtService.getToken()}`;
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

export const TagsService = {
  get() {
    return ApiService.get('tags');
  },
};
