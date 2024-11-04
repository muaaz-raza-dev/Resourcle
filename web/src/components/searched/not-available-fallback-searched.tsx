/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/shadcn/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

export default function NotAvailableFallbackSearched() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
    <div className="mb-6">
      <svg
        className="w-40 h-40 text-muted-foreground"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="m22 3-5 5" />
        <path d="m17 3 5 5" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold mb-2">No Resource Yet</h2>
    <p className="text-muted-foreground mb-6 max-w-md">
      It looks like there aren't any posts available at the moment. Why not be the first to share your thoughts?
    </p>
    <Button className="inline-flex items-center">
      <Plus className="mr-2 h-4 w-4" />
      Create Your First Post
    </Button>
  </div>
  )
}
