import { Switch } from '@/shadcn/components/ui/switch'
import { IResource } from '@/types/Iresource'
import { Tooltip } from 'antd'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FaGlobe,FaInfoCircle, FaLock } from 'react-icons/fa'

export default function PublicPrivateSwitchResourceForm() {
    const {setValue ,watch}= useFormContext<IResource>()
    const isPrivate = watch("isPrivate")

  return (
    <div className='flex gap-2 items-center'>
        <div className="flex gap-1 text-xs items-center">
            <FaGlobe/>
        <p className="font-semibold">
            Public
        </p>
        </div>
        <Switch checked={isPrivate}  onCheckedChange={(e)=>setValue("isPrivate",e)} />
        <div className="flex gap-1 text-xs items-center">
            <FaLock/>
        <p className="font-semibold">
            Private
        </p>
        <Tooltip title="Private resource will only be available to you">
        <FaInfoCircle size={12} />
        </Tooltip>
        </div>
    </div>
  )
}
