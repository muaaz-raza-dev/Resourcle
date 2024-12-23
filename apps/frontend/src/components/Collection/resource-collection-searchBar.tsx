import { Input } from '@/shadcn/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

export default function ResourceCollectionSearchBar() {
  return (
    <div className="w-[60%] max-md:w-[90%]  mx-auto space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search resources by name, type, or tag..." 
              className="pl-10 bg-white"
              
            />
          </div>
          
        </div>
  )
}
