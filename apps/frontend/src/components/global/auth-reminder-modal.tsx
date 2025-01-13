"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog"
import Link from "next/link"
import { useRecoilState } from "recoil"
import { authAtom } from "@/state/auth.atom"
import Image from "next/image"
import LocalLoginForm from "../auth/local-login-form"
import GoogleAuthButton from "../auth/Google-auth-button"

export default function AuthReminderModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [{authReminderModal},setValue] = useRecoilState(authAtom)
   useEffect(() => {  
    setIsOpen(authReminderModal)
    }, [authReminderModal])
    function handleChange(open:boolean){
        setIsOpen(open)
        if(!open) {
            setValue(e=>({...e,authReminderModal:false}))
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="center flex-col">
                        <Image height={100} width={100}  src="/logo/logo.svg" alt="Logo" priority={false} />
          </div>
          <DialogTitle className="mt-4 text-center font-semibold">Few seconds to login <b>Resourcle</b> </DialogTitle>
          <DialogDescription className="text-center">
            Log in or sign up to access all resources and features.
          </DialogDescription>
        </DialogHeader>
            <GoogleAuthButton /> 
        <LocalLoginForm/>
        <div className=" text-center text-muted text-sm font-medium">
        Dont have an account?{" "}
        <Link href="/auth/signup" className="font-semibold hover:underline">
          Sign up
        </Link>
      </div>
      </DialogContent>
    </Dialog>
  )
}