/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/shadcn/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function ResourceNotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
          <div className='animate-fade-up'>
          <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Oops! Resource not found.</p>
          <p className="mt-2 text-lg text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
        </div>
      <Button asChild className="animate-fade-in animation-delay-900 bg-secondary-foreground text-white hover:bg-secondary-foreground">
        <Link href={"/"}>
          Return to Home
        </Link>
      </Button>
      </div>
  </div>
  )
}
