import React from 'react'
import Link from 'next/link'
import { Button } from '@/shadcn/components/ui/button';
import Image from 'next/image';

export default function UnLoginedNavbar() {
  return (
    <nav className=" shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image height={60} width={60} src="/logo.svg" alt="Logo" />
            <span className=" text-xl font-bold text-gray-800 ">Colabra</span>
          </Link>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/features" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Features</Link>
            <Link href="/pricing" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
            <Link href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</Link>
          </div>
        </div>
        <div className=" sm:ml-6 sm:flex sm:items-center flex gap-2">
          <Link href={"/auth/signin"}>
          <Button variant={"outline"} >
            Log in
          </Button>
          </Link>
          <Link href={"/auth/signup"}>
          <Button className='' >
            Sign up
          </Button>
          </Link>
          
        </div> 
      </div>
    </div>

   
  </nav>
  )
}
