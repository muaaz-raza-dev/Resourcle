import { Search } from 'lucide-react'
import React from 'react'

export default function NotSearchedFallback() {
  return (
    <div className="py-6 px-4 text-center text-sm" >
    <div className="mb-2 border-accent/30 border w-max mx-auto border-dashed p-2 rounded-md  font-semibold flex gap-2 center">
      <Search size={18} />
      <span className='text-accent px-2 py-1 rounded-md bg-secondary-foreground'>Resources</span> 
     <span className='text-primary px-2 py-1 rounded-md bg-secondary-foreground'>Users</span>  <span className='px-2 py-1 rounded-md text-white bg-secondary-foreground'>Categories</span></div>
    <p className="text-sm text-muted-foreground">
    Type a keyword or phrase to find the resources you&apos;re looking for. Use specific terms for better results.
    </p>
    
  </div>
  )
}
