import { ListedResource, byId } from './common.types';

export interface Message {
  _id: string;
  chat: string;
  text: string;
}

export interface Chat {
  _id: string;
  donator: string;
  receiver: string;
  opportunity: string;
  messages: Message[];
}

export type State = ListedResource<Chat> & {
  byOpportunity: byId<Chat>;
};

export interface ChatResponse {
  count: number;
  items: ChatResponse[];
}
