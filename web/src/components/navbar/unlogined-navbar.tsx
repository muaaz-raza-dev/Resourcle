import React from 'react'
import Link from 'next/link'
import { Button } from '@/shadcn/components/ui/button';
import Image from 'next/image';
import Searchbar from './logined/searchbar';

export default function UnLoginedNavbar() {
  return (
    <nav className="">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image height={60} width={60} src="/logo.svg" alt="Logo" />
          </Link>
        </div>
        <div className=" sm:ml-6 sm:flex sm:items-center flex gap-2">
        <Searchbar />
          <Link href={"/auth/signup"}>
          <Button variant={"outline"} className='font-semibold hover:bg-primary hover:text-white transition'>
          Sign up
          </Button>
          </Link>
          <Link href={"/auth/signin"} >
          <Button className='font-semibold' >
          Log in
          </Button>
          </Link>
        </div> 
      </div>
    </div>
  </nav>
  )
}
