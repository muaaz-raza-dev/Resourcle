"use client"

import { useEffect, useState } from "react"
import { Button } from "@/shadcn/components/ui/button"
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

export default function AuthReminderModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [{authReminderModal},setValue] = useRecoilState(authAtom)
   useEffect(() => {  
    if(authReminderModal)setIsOpen(true)
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
        <div className="flex flex-col  justify-center gap-2 ">
          <Button  className="w-full bg-secondary-foreground hover:bg-secondary-foreground/90  font-semibold ">
            <Link href="/login"> Log In</Link>
          </Button>
          <Button  variant="secondary" className="bg-accent font-semibold text-white hover:bg-accent/90">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}