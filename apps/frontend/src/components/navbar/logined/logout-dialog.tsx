import RequestLoader from "@/components/loader/request-loading";
import useLogOut from "@/hooks/auth/useLogOut"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/shadcn/components/ui/alert-dialog"
import { Button } from "@/shadcn/components/ui/button";
import { useState } from "react";
import { LuLogOut } from "react-icons/lu";
export default function LogoutDialog() {
  const [open,setOpen] = useState(false)
  const {LogOut,isLoading} = useLogOut(true,()=>{setOpen(false)})
  return (
    <AlertDialog open={open} onOpenChange={(o)=>!isLoading&&setOpen(o)}>
    <AlertDialogTrigger>
    <button className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md" >
            <LuLogOut className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Log out</p>
        </button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Do you want to log out ?</AlertDialogTitle>
        <AlertDialogDescription>
        To ensure the security of your login and prevent accidental logout, please confirm your action. If you are certain, proceed. We look forward to welcoming you back
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isLoading} className=" border hover:bg-border">Cancel</AlertDialogCancel>
        <Button disabled={isLoading} className="bg-secondary-foreground items-center hover:bg-secondary-foreground/90" onClick={LogOut}>
        {
          isLoading?<RequestLoader/>:"Confirm"
        }
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}
