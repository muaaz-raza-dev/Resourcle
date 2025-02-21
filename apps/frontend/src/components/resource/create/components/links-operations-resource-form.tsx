import React from 'react'
import { IResource } from '@/types/Iresource';
import { useFormContext } from 'react-hook-form';
// import clsx from 'clsx';
import {  MdSettingsBackupRestore } from 'react-icons/md';
// import { FaPlus, FaThList } from 'react-icons/fa';
import { useFetchEditableResource } from '@/hooks/resource/useEditResource';

export default function LinksOperationsResourceForm({edit}:{edit?:boolean}) {
  const methods = useFormContext<IResource>()
  // const {watch,setValue}  =methods
  const {refetch} = useFetchEditableResource(edit||false,methods.reset)
  // const isGrouped = watch("isGroupLinks")
  return (
    <div className="flex justify-end">
        {/* <button disabled type='button' className='py-2 px-4 flex items-center bg-secondary rounded-md border font-semibold text-sm gap-2'>
          <FaPlus/> Import from collection
        </button> */}
    
       <div className="flex gap-1   items-center ">
            {/* <button disabled type="button" onClick={() => setValue("isGroupLinks",false)} className={
              clsx("p-4 py-2 text-sm font-semibold cursor-pointer bg-secondary hover:scale-95 rounded-md flex items-center gap-2 transition-transform border",!isGrouped && "!bg-secondary-foreground !text-white scale-95" )}>
                <MdFormatLineSpacing  size={14} />
                <span>No Group</span>
            </button>
            <button disabled type="button" onClick={() => setValue("isGroupLinks",true)} className={clsx("p-4 py-2 text-sm font-semibold cursor-pointer bg-secondary hover:scale-95 rounded-md flex items-center gap-2 transition-transform border",isGrouped && "!bg-secondary-foreground !text-white scale-95" )}>
                <FaThList  size={14} />
                <span>Link Group</span>
            </button> */}
          {edit&&
            <button type="button" onClick={()=>refetch()} className={"p-4 py-2 text-sm font-semibold cursor-pointer bg-secondary hover:scale-95 rounded-md flex items-center gap-2 transition-transform border"}>
                <MdSettingsBackupRestore />
                <span>Restore</span>
            </button>
            }
    
          
            </div>
            </div>
  )
}
