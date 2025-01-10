"use client"
import { Button } from "@/shadcn/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog"
import Link from "next/link"
import {  useRecoilValue } from "recoil"
import { authAtom } from "@/state/auth.atom"
import { MdSecurity } from "react-icons/md"

export default function VerificationRestrictionResourceCreationDialog() {
    const {user} = useRecoilValue(authAtom)
    const isEmailVerified = user?.email_verified
    if(user&&isEmailVerified){return null}
  return (
    <Dialog open={!isEmailVerified} >
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <div className="center flex-col">
            <MdSecurity size={50}/>
        </div>
        <DialogTitle className="mt-4 text-center font-semibold"> Verify your email address </DialogTitle>
        <DialogDescription className="text-center">
          Resource creation is restricted to verified users only, to keep the enviroment clean and authenticated.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col  justify-center gap-2 ">
        <Button  className="w-full bg-secondary-foreground hover:bg-secondary-foreground/90  font-semibold ">
          <Link href="/settings/account"> Verify Email Address</Link>
        </Button>
        <Button  variant="secondary" className=" font-semibold ">
          <Link href="/">Later</Link>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}
