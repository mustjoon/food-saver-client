import { ListedResource as ListedResourceType } from '@/types/common.types';

export const ListedResource: ListedResourceType<any> = {
  isLoading: false,
  allIds: [],
  byId: {},
  activeId: undefined,
  errors: undefined,
};
