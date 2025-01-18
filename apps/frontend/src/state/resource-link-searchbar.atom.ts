import { IresourceContent } from '@/types/Iresource';
import {atom} from 'recoil';

export const ResourceFilterLinksAtom = atom<{original:IresourceContent[],filtered:IresourceContent[];sort:"recent"|"top rated"}>({
  key: 'resource-filter-links',
  default:{original:[],filtered:[],sort:"recent"},
});



  

