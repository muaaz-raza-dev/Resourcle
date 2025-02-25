import {IResource } from '@/types/Iresource'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MdAddCircleOutline } from 'react-icons/md';
export default function ToolboxSelectResourceForm() {
    const {getValues,setValue,watch}= useFormContext<IResource>()
    const isGrouped = watch("isGroupLinks")
    const handleAddLinkGroup = () => {
        setValue("content", getValues("content")?.concat({label:"",links:[]}))
    }
    

  if(!isGrouped) {return null}
  return (
    <section className='w-full center flex-col gap-4 my-4'>
   <button type='button' className='px-4 py-1 active:scale-95 hover:bg-accent/20  border border-accent text-accent shadow-none   rounded-md text-black font-semibold  transition-all hover:opacity-90 '
   onClick={handleAddLinkGroup}>
   <MdAddCircleOutline size={22} className='text-accent'/>
   </button>
    </section>
  )
}
