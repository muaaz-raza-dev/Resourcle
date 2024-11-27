import Image from 'next/image'
import Link from "next/link"
import React, { ReactNode } from 'react'
import AuthNavLinksDynamic from '@/components/auth/auth-navlink-dynamic';
export default function AuthLayout({children}:{children:ReactNode}) {
  
  return (
    <div className='overflow-x-hidden w-screen'>
      <nav className='flex justify-between   p-6 py-4'>
      <div className="flex items-center">
        <Link href="/" className="flex-shrink-0 flex items-center">
              <Image height={50} width={50} src="/logo/logo-transparent.svg" alt="Logo" />
            </Link>
            <h1 className="font-bold text-2xl  text-secondary-foreground ">Resourcera</h1>
        </div>
    <AuthNavLinksDynamic />
      </nav>
      <span className="authBg h-[28rem]  w-screen absolute bottom-0 -z-20"></span> 
      {children}
    </div>
  )
}


