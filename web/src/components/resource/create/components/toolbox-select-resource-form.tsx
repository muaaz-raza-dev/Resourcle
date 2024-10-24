import {IResource } from '@/types/Iresource'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
import {Tooltip} from "antd"
export default function ToolboxSelectResourceForm() {
    const {getValues,setValue,setError,clearErrors,watch,formState:{errors}}= useFormContext<IResource>()
    const content= watch("content")
    const handleAddLinkGroup = () => {
        setValue("content", getValues("content")?.concat({label:"",links:[]}))
    }
    useEffect(() => {
      if(!content.length){
        setError("content",{ type: 'required', message: 'Resource page without resource is trash' })
      }
      else {
        clearErrors('content');
      }
    }, [content.length])


  return (
    <section className='w-full center flex-col gap-4'>
   <Tooltip title={"Add Link Group"}>
   <button type='button' className='px-4 py-2 rounded-md bg-secondary hover:bg-primary hover:text-white transition-colors'
   onClick={handleAddLinkGroup}>
   <FaPlus/>
   </button>
    </Tooltip>
    {errors.content&&<p className='text-red-500 text-sm'>*{errors.content?.message}</p>}
    </section>
  )
}
