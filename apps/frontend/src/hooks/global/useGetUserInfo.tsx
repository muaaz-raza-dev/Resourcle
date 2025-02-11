import GetUserInfo from "@/api/global/user-info.api"
import { useQuery } from "react-query"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authAtom } from "@/state/auth.atom";
import toast from "react-hot-toast";
export default function useGetUserInfo() {
     const session_token = Cookies.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY);
     const router = useRouter();
     const setAuthState = useSetRecoilState(authAtom);
     const resetAuthState = useResetRecoilState(authAtom);
      return useQuery({
        queryKey:"user info",
        queryFn:GetUserInfo,
        enabled:session_token?true:false,
        refetchOnWindowFocus:false,
        retry:2,
        staleTime:1000*60*5 ,
        onSuccess({payload}){
            setAuthState(e=>({...e,isLogined:true,user:payload}))
        },
        onError({response:{data:{message}}}) {
            toast.error(message)
            resetAuthState()
            Cookies.remove(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY);
            router.push("/auth/signin");
        }
       })
}
