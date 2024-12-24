import { IcollectedResourceLink } from '@/api/resource-collection/get-collection-links.api';
import {atom} from 'recoil';

export const ResourceCollectionAtom = atom<{resources:IcollectedResourceLink[],iterable:IcollectedResourceLink[],count:number;total:number}>({
  key: 'resorce-collection',
  default: {resources:[],iterable:[],count:1,total:0},
});
