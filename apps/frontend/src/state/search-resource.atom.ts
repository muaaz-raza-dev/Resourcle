import { LinkSortOptions } from '@/api/resource/search-links.api';
import { IResourceLink } from '@/types/Iresource';
import { IResourceSearched } from '@/types/Isearched';
import {atom} from 'recoil';
interface IsearchedResource{
    count:number;
    total:number;
    filters:{
      resources:{
        sort: SearchedSortOptions
        categories:string[];
      },
      links:{
        sort:LinkSortOptions
      }
    };
    type:SearchedTypes;
    payload:{
      resources:IResourceSearched[];
      links:IResourceLink[];
    }
    isLoading:boolean;
}
export type SearchedSortOptions = "upvotes"|"updatedAt"
export type SearchedTypes = "resources"|"links"

export const defaultSearchedState:IsearchedResource = {
  count: 0,
  total: 0,
  filters: {
      resources: {
          sort:"updatedAt", 
          categories: []
      },
      links: {
          sort: "updatedAt" 
      }
  },
  type: "resources",
  payload: {
      resources: [],
      links: []
  },
  isLoading: false
};


export const searchedAtom = atom<IsearchedResource>({
  key: 'searched-resource',
  default: defaultSearchedState,
});
