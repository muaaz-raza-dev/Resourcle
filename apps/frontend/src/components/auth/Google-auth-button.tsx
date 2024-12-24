"use client"
import LoginWithGoogle from '@/api/auth/login-google.api'
import { authAtom } from '@/state/auth.atom'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'

export default function GoogleAuthButton({context}:{context?:("signin"|"signup")}) {
  const router = useRouter()
  const setState = useSetRecoilState(authAtom)
  async function onSuccess(res:CredentialResponse){
    if(res.credential){
      const data = await LoginWithGoogle(res.credential)
      setState(e=>({...e,isLogined:true,user:data.payload}))
      toast.success("Logged in successfully")
      router.push("/")
    }
  }

  function onError(){
    toast.error("An error occured try again later")
  }
  return (

    <div className="w-full">
    <GoogleLogin  shape='rectangular' width={377} context={context||'signin'}  onSuccess={onSuccess} onError={onError} />
    </div>
  )
}
