import { defaultAuthState } from '@/types/IuserInfo';
import {atom} from 'recoil';

export const authAtom = atom({
  key: 'auth-state',
  default: defaultAuthState,
});
