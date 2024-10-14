import { IResource } from '@/types/Iresource'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
import {Tooltip} from "antd"
export default function ToolboxSelectResourceForm() {
    const form = useFormContext<IResource>()
    const handleAddLinkGroup = () => {
        form.setValue("content", form.getValues("content")?.concat({label:"",links:[]}))
    }

  return (
    <section className='w-full center '>
        <Tooltip title={"Add Link Group"}>
   <button type='button' className='px-4 py-2 rounded-md bg-secondary hover:bg-primary hover:text-white transition-colors'
   onClick={handleAddLinkGroup}>
    
   <FaPlus/>
   </button>
        </Tooltip>
    
    </section>
  )
}
