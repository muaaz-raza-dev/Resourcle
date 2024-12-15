import { Itags } from '@/types/Itags';
import {atom} from 'recoil';

export const searchedTagsAtom = atom<Itags[]>({
  key: 'searched-tags',
  default: [],
});
