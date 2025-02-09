import { IResourceSearched } from '@/types/Isearched';
import {atom} from 'recoil';
interface IsearchedResource{
    count:number;
    total:number;
    sort:SearchedSortOptions;
    categories:string[];
    type:SearchedTypes;
    resources:{[key:string]: IResourceSearched[]};
    isLoading:boolean;
}
export type SearchedSortOptions = "upvotes"|"createdAt"
export type SearchedTypes = "resources"|"links"
export const searchedResourcesAtom = atom<IsearchedResource>({
  key: 'searched-resource',
  default: {count:0,total:0,resources:{},sort:"upvotes",isLoading:false,categories:[],type:"resources"},
});
