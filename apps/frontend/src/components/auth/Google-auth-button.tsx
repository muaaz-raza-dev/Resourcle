"use client"
import useGoogleLogin from '@/hooks/auth/useGoogleLogin'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import React from 'react'
import toast from 'react-hot-toast'
import RequestLoader from '../loader/request-loading'


export default function GoogleAuthButton() {
  const {mutate,isLoading} = useGoogleLogin()
  async function onSuccess(res:CredentialResponse){
    if(res.credential){
        mutate(res.credential)
        
}
  }

  function onError(){
    toast.error("An error occured try again later")
  }
  return (

    <div className="w-full center flex-col gap-2">
    <GoogleLogin  shape='rectangular'  text='continue_with' type='icon' size='large' onSuccess={onSuccess} onError={onError} />
      {
        isLoading && <RequestLoader/>
      }
    </div>
  )
}
