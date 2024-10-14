"use client";
import { usePathname } from 'next/navigation';
import React from 'react'
import PrimaryButton from '../global/primary-button';
import Link from 'next/link';

export default function AuthNavLinksDynamic() {
  const pathname = usePathname()
  const  isSignIn = pathname.includes("signin") 
  return (
    <div className="flex gap-4 items-center">
          <p className='font-semibold text-xs text-muted-foreground'>
            {
                isSignIn?
                "Don't have an account?" : 
                "Already the member of Colabra?" 
            }
        </p>
    
    <Link href={isSignIn?"/auth/signup":"/auth/signin"}>
    <PrimaryButton>
        {isSignIn? "Sign up" : "Sign in"}
    </PrimaryButton>
    </Link>
</div>
)
}

