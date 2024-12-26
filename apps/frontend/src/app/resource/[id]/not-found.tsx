/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/shadcn/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function ResourceNotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted text-foreground p-4">
    <div className={`text-center transition-opacity duration-1000 ease-in-out `}>
      <h1 className="text-6xl  mb-4 animate-fade-in">
        404
      </h1>
      <div className="h-1 w-20 bg-primary mx-auto mb-8 animate-expand"></div>
      <h2 className="text-2xl  mb-4 animate-fade-in animation-delay-300">
        Page Not Found
      </h2>
      <p className="text-lg mb-8 max-w-md mx-auto animate-fade-in animation-delay-600">
        Oops! The resource you're looking for doesn't exist or there was a server error.
      </p>
      <Button asChild className="animate-fade-in animation-delay-900">
        <Link href="/">
          Return to Home
        </Link>
      </Button>
    </div>
  </div>
  )
}
