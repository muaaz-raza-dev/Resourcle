import React, { ReactNode, useState } from 'react'
import {  Database, GitMerge } from 'lucide-react'
import { Button } from "@/shadcn/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shadcn/components/ui/dialog"
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Iproviders } from '@/types/Isecurity'
import useChangePassword from '@/hooks/settings/useChangePassword'
import { useFormContext } from 'react-hook-form'
import RequestLoader from '@/components/loader/request-loading'
import { IChangePasswordForm } from './security-settings-password-section'


interface ProviderOption {
  id: Iproviders
  name: string
  icon: React.ReactNode
}

const providers: ProviderOption[] = [
  { id: 'local', name: 'Local', icon: <Database className="w-6 h-6" /> },
  { id: 'hybrid', name: 'Hybrid', icon: <GitMerge className="w-6 h-6" /> },
]
export default function SecuritySettingsPasswordProviderSelectionModal({children,disabled}:{children:ReactNode;disabled:boolean}) {
    const [open,setopen]  = useState(false)
  const { mutateAsync:mutate, isLoading } = useChangePassword();
  const {getValues,reset}  =  useFormContext<IChangePasswordForm>()
  async function SubmitPasswordAndProviderChange(provider:Iproviders){
    await mutate({...getValues(),provider})    
    setopen(false)
    reset()
  }
  return (
    <Dialog open={open} onOpenChange={o=>!isLoading&&setopen(o)}>
        <DialogTrigger disabled={disabled}>
            {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How Provider Setup Works</DialogTitle>
            <DialogDescription>
              Choose a provider to set up your data source:
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            {providers.map((provider) => (
              <Button
              disabled={isLoading}
                key={provider.id}
                onClick={()=>SubmitPasswordAndProviderChange(provider.id)}
                className="flex items-center justify-start gap-2 h-16 bg-secondary-foreground text-white "
              >
                { isLoading? (<RequestLoader size='16' />) :null }
                {provider.icon}
                <div className="flex flex-col items-start">
                  <span className="font-semibold">{provider.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {provider.id === 'local' && "Stores data on local infrastructure"}
                    {provider.id === 'hybrid' && "Combines Google and local resources"}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
  )
}




