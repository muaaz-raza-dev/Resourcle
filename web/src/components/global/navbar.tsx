"use client";
import React from 'react'
import { usePathname } from 'next/navigation';
import RouteValidator from '@/utils/PublicRouteValidator';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@/state/user-info.atom';
import LoginedNavbar from '../navbar/logined-navbar';
import UnLoginedNavbar from '../navbar/unlogined-navbar';



export default function Navbar() {
const {isLogined} = useRecoilValue(authAtom);
const pathname = usePathname();
if(RouteValidator(pathname,["/auth/*"])) return null;

return (
  isLogined?  <LoginedNavbar/> :  <UnLoginedNavbar/> 
)
}

