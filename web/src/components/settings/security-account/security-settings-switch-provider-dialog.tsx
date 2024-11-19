'use client'
import React, { ReactNode } from 'react'

import { useState } from 'react'
import { Button } from "@/shadcn/components/ui/button"
import { Label } from "@/shadcn/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog"
import { Lock } from 'lucide-react'
import { Iproviders } from '@/types/Isecurity'
import useDettachHybridMode from '@/hooks/settings/useDetachHybrid'
import RequestLoader from '@/components/loader/request-loading'
import { Input } from 'antd'
export default function SecuritySettingsSwitchProviderDialog({provider,children,title}:{provider:Iproviders,children:ReactNode;title:string}) {
    const [isOpen, setIsOpen] = useState(false)
    const {mutateAsync:mutate,isLoading,isSuccess} = useDettachHybridMode()
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    async function handleSwitch(){
        if(!password){
            setError('Password is required')
            return
        }
        await mutate({password,provider})
        if(isSuccess){
            setIsOpen(false)
            setPassword('')
            setError('')
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={o=>!isLoading&&setIsOpen(o)}>
    <DialogTrigger asChild>
        {children}
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 " />
          {title}
        </DialogTitle>
        <DialogDescription>
          Please enter your password to proceed.
        </DialogDescription>
      </DialogHeader>
      <div className="">
        <div className="">
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input.Password
            id="password"
            className="col-span-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && ( <p className="text-sm text-red-500 text-center">{error}</p>)}
      </div>
      <DialogFooter>
        <Button variant="outline" className='hover:bg-secondary' onClick={() => !isLoading&& setIsOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleSwitch} disabled={isLoading}>
            {isLoading? <RequestLoader size='16'/>:"Confirm"}
            </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
