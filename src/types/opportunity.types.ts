import { ListedResource } from './common.types';

export type State = ListedResource<Opportunity> & {
  ownedByUser: Opportunity[];
};

export interface OpportunityTemplate {
  city?: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type Opportunity = OpportunityTemplate & {
  _id: string;
};

export interface OpportunityResponse {
  count: number;
  items: Opportunity[];
}
