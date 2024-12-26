import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/shadcn/components/ui/input"
import { useDebouncedCallback } from 'use-debounce'
import useSearchLinkResource from '@/hooks/utils/useSearchLinkResource'
export default function ResourceSearchbar() {
  const [input,setInput] = useState("")
  const search = useSearchLinkResource()
  const debounced = useDebouncedCallback((value:string)=>{
    search(value)
  },500)  
  return (
    <div className=" w-full ">
    <div className="relative">
      <Input
      value={input}
      onChange={(e)=>{setInput(e.target.value);debounced(e.target.value)}}
        type="text"
        placeholder="Search resource based on thier name and url"
        className="w-full pl-10 pr-4 py-2 text-gray-800 bg-white border rounded-md focus:outline-none"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
    </div>
  )
}

