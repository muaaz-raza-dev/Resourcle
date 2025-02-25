import RequestLoader from '@/components/loader/request-loading'
import useSearchTags from '@/hooks/tags/useSearchTags'
import { searchedAtom } from '@/state/search-resource.atom'
import { searchedTagsAtom } from '@/state/tags.atom'
import { Select } from 'antd'
import React, { useRef } from 'react'
import {  useRecoilState, useRecoilValue } from 'recoil'
import { useDebouncedCallback } from 'use-debounce'
export default function AdvancedFiltersCategorySelectField() {
    const {mutate,isLoading} = useSearchTags()
    const [state,setState] = useRecoilState(searchedAtom)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref=  useRef<any>(null)
    const debounced = useDebouncedCallback((value:string)=>{
        if(value){
            mutate(value)
        }
        },800)
    function HandleChange(categories:string[]){
      setState(e=>({...e,categories}))
    }
  const tags = useRecoilValue(searchedTagsAtom)
  return (
    <Select
    ref={ref}
    className='w-full !placeholder:text-gray-700'
    id='category'
    placeholder='select categories'
    filterOption={false}
    value={state.filters.resources.categories}
    onChange={(values)=>HandleChange(values)}
    mode='multiple'
    options= {tags.map(t=>({value:t._id,label:t.name}))} 
    onSearch={(select)=>debounced(select)}
    onSelect={()=>ref?.current?.blur()}
    notFoundContent={isLoading ? <RequestLoader/> : null}
    loading = {isLoading}
      />
  )
}
