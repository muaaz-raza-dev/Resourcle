import { Switch } from '@/shadcn/components/ui/switch'
import { IResource } from '@/types/Iresource'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function PublicPrivateSwitchResourceForm() {
    const {setValue ,watch}= useFormContext<IResource>()
    const isPrivate = watch("isPrivate")

  return (
    <div className='flex gap-2 items-center w-full justify-between '>
        <div className="flex gap-1  items-center">
            <div className="">
        <p className="font-semibold">
            Private resource
        </p>
        <p className='text-sm text-muted-foreground'>
            Private resources will only be available to you
        </p>
        </div>
        </div>
         <Switch checked={isPrivate}  onCheckedChange={(e)=>setValue("isPrivate",e)} />
    </div>
  )
}
