import useSearchResourceLink from '@/hooks/resource-collection/useSearchResourceLink'
import { Input } from '@/shadcn/components/ui/input'
import { ResourceCollectionAtom } from '@/state/resource-collection.atom'
import { Search } from 'lucide-react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { useDebouncedCallback } from 'use-debounce'
import RequestLoader from '../loader/request-loading'

export default function ResourceCollectionSearchBar() {
  const [search, setSearch] = React.useState('')
  const {mutate,isLoading} =  useSearchResourceLink()
  const  setState = useSetRecoilState(ResourceCollectionAtom)
  const debounced = useDebouncedCallback((value)=>{
    if(value){ mutate({query:value})}
    else setState((prev)=>({...prev,iterable:prev.resources}))
  }, 800)

  return (
    <div className="w-full max-md:w-[90%]  mx-auto space-y-2 white rounded-md">
          <div className=" flex justify-between items-center border rounded-md px-4 bg-white ">
            <Search className=" h-4 w-4 text-muted-foreground" />
            <Input 
              value={search}
              onChange={(e) => {setSearch(e.target.value);debounced(e.target.value)}}
              placeholder="Search resources by title and url " 
              className=" border-none outline-none  "
              />
              {isLoading && <RequestLoader size='14' dark/>}
          </div>
          
        </div>
  )
}
