import { Search } from 'lucide-react'
import React from 'react'

export default function Searchbar() {
  return (
    <div className="flex border gap-2 border-secondary-foreground  items-center pl-2 pr-4  rounded-md  whitespace-nowrap h-8 ">
    <Search size={18}/>
    <p className='text-gray-700 text-sm pr-4'>Search for anything </p>
    </div>
      
  )
}
