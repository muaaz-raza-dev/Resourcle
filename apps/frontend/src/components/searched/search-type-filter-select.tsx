import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue } from '@/shadcn/components/ui/select'
import { searchedResourcesAtom, SearchedTypes } from '@/state/search-resource.atom';
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { FaLink, FaThList } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

export default function SearchTypeFilterSelect() {
    const searchParams= useSearchParams();
    const  [{type},setValue] = useRecoilState(searchedResourcesAtom)
    const router = useRouter()
function HandleSortChange(val:SearchedTypes){
    const params = new URLSearchParams(searchParams.toString()); 
      params.set("sort", val); 
      router.replace(`?${params.toString()}`); 
      setValue((e) => ({ ...e, type: val }));
}

  return (
        <Select
                value={type}
                onValueChange={HandleSortChange}
              >
                <SelectTrigger className="md:min-w-[180px] max-md:w-[130px] border border-border ring-offset-transparent bg-white outline-none h-10 ">
                  <SelectValue className="hover:!bg-slate-300" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="resources" className="hover:!bg-border ">
                    <div className="flex gap-2 items-center">
                    <FaThList fill='#FF6600'  />
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
