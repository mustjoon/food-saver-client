import { PokemonResponse } from '@/types/pokemon.types';
import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import API_URL from './config';

const MOCK_FETCH_POKEMONS: PokemonResponse = {
  list: [
    { id: '1', type: 'electric', name: 'Pikachu' },
    { id: '2', type: 'fire', name: 'Charmander' },
  ],
};

const MOCK_DELETE_POKEMON = {
  success: true,
};

const FETCH_POKEMONS_URL = API_URL + '/pokemons/';
const DELETE_POKEMON_URL = new RegExp(`${FETCH_POKEMONS_URL}/*`);

export const mockRequests = (axios: AxiosInstance) => {
  const mockAdapter = new MockAdapter(axios, { delayResponse: 500 });
  mockAdapter.onGet(FETCH_POKEMONS_URL).reply(200, MOCK_FETCH_POKEMONS);
  mockAdapter.onDelete(DELETE_POKEMON_URL).reply(200, MOCK_DELETE_POKEMON);
};
