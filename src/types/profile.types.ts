import { Opportunity } from './opportunity.types';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Profile {
  name: string;
  gender?: string;
  location?: string;
  picture?: string;
  coordinates?: Coordinates | undefined;
}

export type State = {
  isLoading: boolean;
  profile: Profile | undefined;
  errors: string | undefined;
  currentPosition?: Coordinates | undefined;
  createdOpportunitys: string[];
};

export interface User {
  profile: Profile;
  opportunitys: string[];
}

export type ProfileResponse = {
  user: User;
};
