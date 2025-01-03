import {IResource } from '@/types/Iresource'
import { Tooltip } from 'antd';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MdAddCircleOutline } from 'react-icons/md';
export default function ToolboxSelectResourceForm() {
    const {getValues,setValue}= useFormContext<IResource>()
    const handleAddLinkGroup = () => {
        setValue("content", getValues("content")?.concat({label:"",links:[]}))
    }
    


  return (
    <section className='w-full center flex-col gap-4 mt-4'>
    <Tooltip title='Add Link Group'>
   <button type='button' className='px-4 py-2 active:scale-95 hover:bg-accent/20  border border-accent text-accent shadow-md   rounded-md text-black font-semibold  transition-all hover:opacity-90 '
   onClick={handleAddLinkGroup}>
   <MdAddCircleOutline size={22} className='text-accent'/>
   </button>
     </Tooltip>
    </section>
  )
}
