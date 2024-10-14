import { Icategory } from '@/types/Icategory';
import {atom} from 'recoil';

export const searchedCategoryAtom = atom<Icategory[]>({
  key: 'searched-cateogry',
  default: [],
});
