"use client";
import { usePathname } from 'next/navigation';
import React from 'react'
import Link from 'next/link';

export default function AuthNavLinksDynamic() {
  const pathname = usePathname()
  const  isSignIn = pathname.includes("signin") 
  return (
    <div className="flex gap-4 w-full justify-end  items-center">
          <p className='font-semibold text-xs text-muted-foreground'>
            {
                isSignIn?
                "Don't have an account?" : 
                "Already the member of Resourcle?" 
            }
        </p>
    
    <Link href={isSignIn?"/auth/signup":"/auth/signin"}>
    <button className="px-5 py-1 rounded-md bg-secondary-foreground text-white text-sm font- 
       hover:-translate-y-0.5   transition-transform border">
        {isSignIn? "Sign up" : "Sign in"}
       </button>
    </Link>
</div>
)
}

