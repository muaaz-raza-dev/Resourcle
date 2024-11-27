import useAttachGoogleProvider from "@/hooks/auth/useAttachGoogleProvider";
import { Button } from "@/shadcn/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import RequestLoader from "../loader/request-loading";

export default function GoogleAuthDialog({children,title,description,provider}:{children:ReactNode;title?:string;description?:string;provider:string}) {
  const [open,setopen] = useState(false);
  const {mutateAsync:mutate,isLoading} = useAttachGoogleProvider()
  async function onSuccess(res:CredentialResponse){
    if(res.credential){
      await mutate({id_token:res.credential,provider})
      setopen(false)
    }
  }
  function onError(){
    toast.error("An error occured try again later")
    setopen(false)
  }
  return (
    <Dialog open={open} onOpenChange={o=>!isLoading&&setopen(o)}>
    <DialogTrigger asChild>
        {children}
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{title||`Attach login with Google`}</DialogTitle>
        <DialogDescription>
            {description||`By attaching google with you can easily access your account at just one click`}
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center space-x-2 justify-between">
        
      {
        isLoading ?
        <div className="items-center flex gap-2 text-muted-foreground w-full">
        Attaching ...
        <RequestLoader size="30"/>
        </div>
        : 
        <GoogleLogin  auto_select  text='continue_with' onSuccess={onSuccess} onError={onError} />
      }
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary" disabled={isLoading}>
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
