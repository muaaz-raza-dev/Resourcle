import { IResourceSearched } from '@/types/Isearched';
import {atom} from 'recoil';
interface IsearchedResource{
    count:number;
    total:number;
    sort:SearchedSortOptions
    resources:{[key:string]: IResourceSearched[]};
}
export type SearchedSortOptions = "upvotes"|"createdAt"
export const searchedResourcesAtom = atom<IsearchedResource>({
  key: 'searched-resource',
  default: {count:0,total:0,resources:{},sort:"upvotes"},
});
