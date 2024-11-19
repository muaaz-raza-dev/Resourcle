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
          <DialogTitle>Join our community</DialogTitle>
          <DialogDescription>
            Log in or sign up to access all resources and features.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row justify-center gap-4 py-4">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}