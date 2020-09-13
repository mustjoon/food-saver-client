import { ListedResource } from './common.types';

export type State = ListedResource<Pokemon>;

export interface Pokemon {
  id: string;
  type: string;
  name: string;
}

export interface PokemonResponse {
  list: Pokemon[];
}
