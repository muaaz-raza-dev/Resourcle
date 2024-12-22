import { IresourceContent } from '@/types/Iresource';
import {atom} from 'recoil';

export const ResourceSearchBarAtom = atom<{original:IresourceContent[],filtered:IresourceContent[]}>({
  key: 'resource-searchbar',
  default:{original:[],filtered:[]},
});



  

