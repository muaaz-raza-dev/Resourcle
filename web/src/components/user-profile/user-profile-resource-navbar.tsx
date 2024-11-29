import { TabsList, TabsTrigger } from '@/shadcn/components/ui/tabs'
import React from 'react'
import { FaBookmark, FaThList } from 'react-icons/fa'

export default function UserProfileResourceNavbar() {
  return (
    <TabsList className=" w-max flex gap-3 items-center">
               <TabsTrigger value='resource' className='flex gap-2 items-center py-2 font-semibold  w-max '>
                <FaThList />
                  Resources
                </TabsTrigger>
              <TabsTrigger value='saved' className='flex gap-2 items-center py-2 font-semibold w-max '>
                <FaBookmark /> Savelist
                </TabsTrigger>
          </TabsList>
  )
}
