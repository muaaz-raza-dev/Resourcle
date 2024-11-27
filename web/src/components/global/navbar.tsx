"use client";
import React from 'react'
import { usePathname } from 'next/navigation';
import RouteValidator from '@/utils/PublicRouteValidator';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@/state/auth.atom';
import LoginedNavbar from '../navbar/logined-navbar';
import UnLoginedNavbar from '../navbar/unlogined-navbar';
import Link from "next/link";
import Image from "next/image";


export default function Navbar() {
const {isLogined} = useRecoilValue(authAtom);
const pathname = usePathname();
if(RouteValidator(pathname,["/auth/*"])) return null;

return (
  <nav className="  z-[100]">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8  ">
        <div className="flex justify-between items-center h-16 navbar-bg mt-2 px-8">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image height={50} width={50} src="/logo/logo-transparent.svg" alt="Logo" />
            </Link>
            <h1 className="font-bold text-2xl  text-secondary-foreground ">Resourcera</h1>
          </div>
          {
            isLogined?  <LoginedNavbar/> :  <UnLoginedNavbar/> 
          }
  </div>
      </div>
    </nav>
)
}

