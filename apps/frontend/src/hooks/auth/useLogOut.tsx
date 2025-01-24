import { authAtom } from "@/state/auth.atom"
import { useResetRecoilState } from "recoil"
import Cookie from "js-cookie"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import LogOutApi from "@/api/auth/logout.api"
import { useState } from "react"

export default function useLogOut(noToast?:boolean,onSuccess?:()=>void) {
  const [isLoading,setIsLoading] = useState(false)
    const logout = useResetRecoilState(authAtom)
    const router = useRouter()
  async function LogOut(){
    setIsLoading(true)
    try{
      await LogOutApi()
      Cookie.remove(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY, { domain: ".resourcle.com", path: "/" });
      Cookie.remove(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY, { domain: "server.resourcle.com", path: "/" });
      logout()
      router.push("/")
      if(!noToast){
        toast.success("logged out successfully. See you again ")
      }
    }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      catch(_){
      toast.error("Failed to log out. Please try again later")
    }
    finally{
      setIsLoading(false)
      onSuccess?.()
    }
  }
  return {LogOut,isLoading}
}
