import { authAtom } from '@/state/auth.atom'
import { useRecoilState } from 'recoil'

export default function useProtectAuthorisedEvents() {
    const [{isLogined} ,setState] = useRecoilState(authAtom);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function authorize(fn:()=>any){
      if(!isLogined) {
        setState(e=>({...e,authReminderModal:true}))
      }
      else{
        fn();
      }
    }
    return authorize;
}
