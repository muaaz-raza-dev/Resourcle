import { Badge } from "@/shadcn/components/ui/badge"
import { Button } from "@/shadcn/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog"

export default function SecurityAccountEmailVerificationTriggerDialog({email}:{email:string}) {

  return (
    <Dialog >
      <DialogTrigger>
        <Button variant={"outline"} className=" bg-background border-border shadow-none hover:bg-secondary">
        Verify 
        </Button>
      </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="mt-4 text-center font-semibold"> Verify your email address </DialogTitle>
        <DialogDescription className=" "> 
          <div className="flex items-center gap-1">
          <p> We will send an email address to your email address </p> <Badge variant={"secondary"}> {email} </Badge>
          </div>
          <p className="text-xs text-orange-700">
            If this email is invalid or not in your use. You should change your email address
          </p>
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col  justify-center gap-2 ">
        <Button  className="w-full bg-secondary-foreground hover:bg-secondary-foreground/90  font-semibold ">
           Send email 
        </Button>
        <div className="flex gap-1 "> <p>  0:30 </p> <button className="underline">Resend</button></div>
      </div>
    </DialogContent>
  </Dialog>
  )
}
