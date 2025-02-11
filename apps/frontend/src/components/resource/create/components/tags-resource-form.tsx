import useSearchTags from '@/hooks/tags/useSearchTags'
import { FormControl, FormDescription, FormField, FormItem,  FormMessage } from '@/shadcn/components/ui/form'
import { searchedTagsAtom } from '@/state/tags.atom'
import { IResource } from '@/types/Iresource'
import { Select, Spin } from 'antd'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { useDebouncedCallback } from 'use-debounce'

export default function TagsResourceForm() {
    const methods = useFormContext<IResource>()
    const {mutate,isLoading} = useSearchTags()
    const debounced = useDebouncedCallback((value:string)=>{
        if(value){
            mutate(value)
        }
        },800)
  const tags = useRecoilValue(searchedTagsAtom)
  return (
    <section className='w-full'>
    <FormField
    control={methods.control}
    name="tags"
    render={({field}) => (
        <FormItem className='w-full'>
          <FormControl className='w-full'>
            <Select
            {...field}
            className='w-full !placeholder:text-gray-700'
            id='tags'
            placeholder='select suitable tags'
            filterOption={false}
            mode='multiple'
            options= {tags.map(t=>({value:t._id,label:t.name}))} 
            onSearch={(select)=>debounced(select)}
            notFoundContent={isLoading ? <Spin size="small" /> : null}
            loading = {isLoading}
              />
          
           </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
    </section>
  )
}

