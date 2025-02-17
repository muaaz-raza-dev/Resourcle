import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue } from '@/shadcn/components/ui/select'
import { defaultSearchedState, searchedAtom, SearchedTypes } from '@/state/search-resource.atom';
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { FaLink, FaThList } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import useSearchResource from '@/hooks/resource/useSearchResource';
import useSearchLinks from '@/hooks/links/useSearchLinks';

export default function SearchTypeFilterSelect() {
  const searchParams= useSearchParams();
  const searchResources = useSearchResource()
  const searchLinks = useSearchLinks()
  const  [{type},setState] = useRecoilState(searchedAtom)
  const router = useRouter()
  function HandleTypeChange(val:SearchedTypes){
    const params = new URLSearchParams(searchParams.toString()); 
      params.set("type", val); 
      router.replace(`?${params.toString()}`); 
      setState(({ ...defaultSearchedState, type: val,count:0 }));
      if(val == "links"){
        searchLinks.mutate({})
      }
      else{
        searchResources.mutate({count:0})
      }
}

  return (
        <Select value={type} onValueChange={HandleTypeChange}>
                <SelectTrigger className="md:min-w-[180px] max-md:w-[130px] border border-border ring-offset-transparent bg-white outline-none h-10 ">
                  <SelectValue className="hover:!bg-slate-300" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="resources" className="hover:!bg-border ">
                    <div className="flex gap-2 items-center">
                    <FaThList  />
                      <h2>Resources</h2>
                    </div>
                  </SelectItem>
                  <SelectItem value="links" className="hover:!bg-border">
                    <div className="flex gap-2 items-center">
                      <FaLink  />
                      <h2>Links</h2>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
  )
}
