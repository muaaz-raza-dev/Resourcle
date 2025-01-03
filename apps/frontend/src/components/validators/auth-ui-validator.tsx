"use client";
import useGetUserInfo from "@/hooks/global/useGetUserInfo";
import React, { ReactNode, Suspense } from "react";
import AppLoader from "../loader/app-loader";
import Cookies from "js-cookie"
const session_token = Cookies.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY);

export default function AuthUiValidator({ children }: { children: ReactNode }) {
  const { isLoading ,isFetched} = useGetUserInfo();
  if (session_token && (isLoading || !isFetched)){ return <AppLoader/>;}
  return( <Suspense fallback={<AppLoader/>}>{children}</Suspense>)
}
