import React from 'react'
import { IResource } from '@/types/Iresource';
import { useFormContext } from 'react-hook-form';
import {  MdSettingsBackupRestore } from 'react-icons/md';
import { useFetchEditableResource } from '@/hooks/resource/useEditResource';
import GroupViewToggleButtonResourceForm from './group-view-toggle-button-resource-form';

export default function LinksOperationsResourceForm({edit}:{edit?:boolean}) {
  const methods = useFormContext<IResource>()
  const {refetch} = useFetchEditableResource(edit||false,methods.reset)
  return (
    <div className="flex justify-between ">
        {/* <button disabled type='button' className='py-2 px-4 flex items-center bg-secondary rounded-md border font-semibold text-sm gap-2'>
          <FaPlus/> Import from collection
        </button> */}
      <h2 className="font-bold text-xl text-center"> Add Links </h2>
       <div className="flex gap-1   items-center ">
          {edit&&
            <button type="button" onClick={()=>refetch()} className={"p-4 py-2 text-sm font-semibold cursor-pointer border hover:bg-secondary rounded-md flex items-center gap-2 transition-colors "}>
                <MdSettingsBackupRestore />
                <span>Restore Original</span>
            </button>
            }
          <GroupViewToggleButtonResourceForm/>
    
          
            </div>
            </div>
  )
}
