"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Card,CardContent, CardDescription, CardHeader,CardTitle,} from "@/shadcn/components/ui/card";
import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import useRequestForgetPassword from '@/hooks/auth/useRequestForgetPassword';
import RequestLoader from '@/components/loader/request-loading';
export default function RequestOTP() {
  const[email,setEmail]  = useState("")
  const {mutate,isLoading} = useRequestForgetPassword()
  function HandleSendResetLink(){
    mutate(email)
  }
  return (
<div className="min-h-[80vh] flex flex-col gap-8 items-center justify-center  overflow-hidden">
      {/* Background */}
      <span className="authBg h-[28rem]  w-screen absolute bottom-0 -z-20"></span> 
      <Card className="w-full max-w-md p-3 shadow-md ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">
            Forgot Password
          </CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a password reset link.
          </CardDescription>
        </CardHeader>
          <CardContent className="">
            <Input placeholder='Email address or username'  type="email" className="w-full" value={email} onChange={({target:{value}})=>setEmail(value)}/>
      <Button className='w-full mt-2' disabled={!email||isLoading} onClick={HandleSendResetLink}> 
        {isLoading?  <RequestLoader size='22'/> : 'Send reset link'}
      </Button>
        </CardContent>
      </Card>
    </div>
  )
}
