import {IResource } from '@/types/Iresource'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
import {Tooltip} from "antd"
export default function ToolboxSelectResourceForm() {
    const {getValues,setValue}= useFormContext<IResource>()
    const handleAddLinkGroup = () => {
        setValue("content", getValues("content")?.concat({label:"",links:[]}))
    }
    


  return (
    <section className='w-full center flex-col gap-4'>
   <Tooltip title={"Add resource group"}>
   <button type='button' className='px-4 py-2 rounded-md bg-secondary text-primary     transition-colors'
   onClick={handleAddLinkGroup}>
   <FaPlus/>
   </button>
    </Tooltip>
    </section>
  )
}
