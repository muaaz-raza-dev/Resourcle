import { authAtom } from "@/state/auth.atom"
import { useResetRecoilState } from "recoil"
import Cookie from "js-cookie"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
export default function useLogOut(noToast?:boolean) {
    const logout = useResetRecoilState(authAtom)
    const router = useRouter()
  function LogOut(){
        Cookie.remove(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY,{domain:"resourcle.com"})
        logout()
        router.push("/")
        if(!noToast){
          toast.success("logged out successfully. See you again ")
        }
  }
  return LogOut
}
