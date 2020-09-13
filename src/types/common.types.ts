export type byId<T> = {
  [key: string]: T;
};

export type ListedResource<T> = {
  isLoading: boolean;
  allIds: string[];
  byId: byId<T>;
  activeId?: string;
  errors: any;
};
