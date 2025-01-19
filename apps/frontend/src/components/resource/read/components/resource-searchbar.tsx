"use client";
import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/shadcn/components/ui/input"
import { useDebouncedCallback } from 'use-debounce'
import useSearchLinkResource from '@/hooks/utils/useSearchLinkResource'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/shadcn/components/ui/select"
import { useRecoilState } from "recoil";
import { ResourceFilterLinksAtom } from "@/state/resource-link-searchbar.atom";
import { useGetContentResource } from "@/hooks/resource/useGetResourceContent";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BiSolidUpvote } from "react-icons/bi";
import SearchLoader from '@/components/loader/search-loader';
export default function ResourceSearchbar() {
  const [input,setInput] = useState("")
  const search = useSearchLinkResource()
  const debounced = useDebouncedCallback((value:string)=>{
    search(value)
  },500)  
  const {refetch,isLoading,isRefetching} = useGetContentResource({hitApi:false})
      const [{sort},setState] =useRecoilState(ResourceFilterLinksAtom)
      function handleSortChange(value:"recent"|"top rated"){
          setState(e=>({...e,sort:value}));
          setTimeout(()=>refetch(),5)
      }
  return (
    <div className=" w-full flex justify-between gap-4 mt-4">
    <div className="relative w-full">
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
    <div className="flex gap-2 items-center">
    <Select disabled={isLoading||isRefetching} value={sort} onValueChange={handleSortChange}>
      <SelectTrigger className="md:w-[180px] max-md:w-[150px] border-border !bg-white  justify-between">
        <SelectValue placeholder="Filter by" />
        
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recent" >
            <div className="flex gap-2 items-center">
            <FaClockRotateLeft /> Recent
            </div>
            </SelectItem>
        <SelectItem value="top-rated" >
        <div className="flex gap-2 items-center">
        <BiSolidUpvote /> Top Rated
            </div>
            </SelectItem>
      </SelectContent>
    </Select> 
    {isRefetching&&<SearchLoader/>}
    </div>
    </div>
  )
}

