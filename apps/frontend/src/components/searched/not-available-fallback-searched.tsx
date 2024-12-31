/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/shadcn/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

export default function NotAvailableFallbackSearched() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
    <h2 className="text-2xl font-bold mb-2">No Resource Yet</h2>
    <p className="text-muted-foreground mb-6 max-w-md">
      It looks like there aren't any posts available at the moment. Why not be the first to share your thoughts?
    </p>
    <Button className="inline-flex items-center">
      <Plus className="mr-2 h-4 w-4" />
      Create one 
    </Button>
  </div>
  )
}
