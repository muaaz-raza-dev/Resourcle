import useRequestEmailVerification from "@/hooks/auth/useRequestEmailVerification"
import { Button } from "@/shadcn/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog"
import { useState } from "react"
import { GiCancel } from "react-icons/gi";

export default function SecurityAccountEmailVerificationTriggerDialog({email}:{email:string}) {
  const [open,setOpen] = useState(false)
  const {mutate,isLoading} = useRequestEmailVerification()
  return (
    <Dialog open={open} onOpenChange={(o)=>!isLoading&&setOpen(o)}>
      <DialogTrigger>
          <Button className='bg-red-100 hover:bg-red-200 border shadow-none '>
                <GiCancel  className='text-red-800'/>
              </Button> 
      </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="mt-4 text-xl text-slate-900 text-center font-semibold"> Verify your email address </DialogTitle>
        <DialogDescription className=" "> 
          <div >
          <p> We will send an email address to your email address <span className="text-black inline"> {email} </span></p> 
          </div>
       
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col  justify-center gap-2 ">
        <Button  className="w-full bg-secondary-foreground hover:bg-secondary-foreground/90  font-semibold " onClick={()=>mutate()} disabled={isLoading}>
           Send email 
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}
