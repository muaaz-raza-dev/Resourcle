import { TabsList, TabsTrigger } from '@/shadcn/components/ui/tabs'
import React from 'react'

export default function UserProfileResourceNavbar() {
  return (
    <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className='shadow-none border-none py-2 font-semibold' value="resource">Resources</TabsTrigger>
            <TabsTrigger className='shadow-none border-none py-2 font-semibold' value="saved">Saved Resources</TabsTrigger>
          </TabsList>
  )
}
