/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Dialog,  DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/shadcn/components/ui/dialog";
import { Button } from '@/shadcn/components/ui/button'
import { Label } from '@/shadcn/components/ui/label';
import { Input } from 'antd';
import useDeleteAccount from '@/hooks/auth/useDeleteAccount';
import RequestLoader from '@/components/loader/request-loading';
import useFetchSecurityInfo from '@/hooks/settings/useFetchSecurityInfo';
  
export default function DeleteAccountButton() {
    const { data } = useFetchSecurityInfo();
    const q =data?.payload.provider
    const isPassword = q != "google"
    const [password,setPassword] = useState("")
    const [open,setOpen] = useState(false);
    const {mutateAsync,isLoading} = useDeleteAccount()
    async function Delete(){
            if(isPassword&&password){
                await mutateAsync(password)
                setOpen(false)
        }
    }
  return (
    <Dialog open={open} onOpenChange={o=>!isLoading&&setOpen(o)}>
    <DialogTrigger asChild>
    <Button variant="destructive" className="w-full">
          Delete Account
        </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className='text-left'>Delete account confirmation</DialogTitle>
        <DialogDescription className='text-left'>
        Please ensure that you genuinely wish to delete your account, as account recovery will not be easily possible.
        </DialogDescription>
      </DialogHeader>
        <div className="flex flex-col  gap-4">
          <Label htmlFor="password" >
            Current password
          </Label>
          <Input.Password  value={password} disabled={!isPassword} onChange={(e)=>setPassword(e.target.value)} placeholder='current password' className="col-span-3 " id='password' />
          {!isPassword&&<p className='text-sm text-destructive'>Setup your password first</p>}
        </div>
      <DialogFooter>
        <Button onClick={Delete} disabled={isLoading||!isPassword||!password} type="submit">
            { isLoading? <RequestLoader size='16'/> : "Delete my account" }
            </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
    
  )
}
