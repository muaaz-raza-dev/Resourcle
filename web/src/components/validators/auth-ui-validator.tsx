"use client";
import useGetUserInfo from "@/hooks/global/useGetUserInfo";
import React, { ReactNode } from "react";
import AppLoader from "../loader/app-loader";
import { usePathname } from "next/navigation";
import RouteValidator from "@/utils/PublicRouteValidator";
import Cookies from "js-cookie"


export default function AuthUiValidator({ children }: { children: ReactNode }) {
  const session_token = Cookies.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY);
  const { isLoading ,isFetched} = useGetUserInfo();
  const pathname = usePathname();
  if(RouteValidator(pathname,["/auth/*"])) return children;
  else if (session_token && (isLoading || !isFetched)) return <AppLoader/>;
  return children
}
