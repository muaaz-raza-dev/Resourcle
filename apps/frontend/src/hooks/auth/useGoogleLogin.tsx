"use client";
import LoginWithGoogle from '@/api/auth/login-google.api'
import { authAtom } from '@/state/auth.atom'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useSetRecoilState } from 'recoil'
// import Cookie from "js-cookie"
export default function useGoogleLogin() {
    const router = useRouter()
  const setState = useSetRecoilState(authAtom)
  return (
    useMutation({mutationFn:(credential:string)=>LoginWithGoogle(credential),onSuccess(data) {
      // Cookie.set(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY,data.token,{expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),})
        setState(e=>({...e,isLogined:true,user:data.payload,authReminderModal:false}))
        toast.success("Logged in successfully")
        router.push("/")
    },
    onError({response:{data:{message}}}) {
        toast.error(message);
    }
})
  )
}
