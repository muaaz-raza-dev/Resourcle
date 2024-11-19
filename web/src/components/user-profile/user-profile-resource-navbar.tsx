import { TabsList, TabsTrigger } from '@/shadcn/components/ui/tabs'
import React from 'react'
import { FaBookmark, FaThList } from 'react-icons/fa'

export default function UserProfileResourceNavbar() {
  return (
    <TabsList className="grid w-full grid-cols-2">
               <TabsTrigger value='resource' className='flex gap-2 items-center py-2 font-semibold '>
                <FaThList />
                  Resources
                </TabsTrigger>
              <TabsTrigger value='saved' className='flex gap-2 items-center py-2 font-semibold '>
                <FaBookmark /> Savelist
                </TabsTrigger>
          </TabsList>
  )
}
