import Image from 'next/image'
import React, { ReactNode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthNavLinksDynamic from '@/components/auth/auth-navlink-dynamic';
export default function AuthLayout({children}:{children:ReactNode}) {
  
  return (
    <div>
      <nav className='flex justify-between   p-6 py-4'>
        <div className="">
          <div className="flex items-center">
        <Image src={"/logo.svg"} quality={100} width={60} height={60} alt='Colabra'  />
        <h1 className='text-xl  tracking-tight font-black -ml-1'>Colabra</h1>
          </div>
        </div>
    <AuthNavLinksDynamic />
      </nav>
      <GoogleOAuthProvider  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {children}
      </GoogleOAuthProvider>
    </div>
  )
}


