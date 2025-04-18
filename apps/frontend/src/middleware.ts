import  { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {RequestOTPMiddleware} from "@/middleware/request-otp.middleware"
const Cookie_key = process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY 
const privateRoutes= ["/profile","/settings","/collection","/settings/account","/settings/personal-info","/resource/create","/resource/edit",]
const AuthProtectedRoutes = ["/auth/signin","/auth/signup",]
export function middleware(request: NextRequest,   ) {
  const { pathname } = request.nextUrl
  const isPrivateRoute = privateRoutes.includes(pathname)
  const isAuthRestrictedRoute = AuthProtectedRoutes.some(route => pathname==route)
  if (pathname.startsWith('/favicon.ico') || pathname.startsWith('/_next/static')) {
    return NextResponse.next();
}

const userSessionCookie = request.cookies.get(Cookie_key)
  if (isPrivateRoute && !userSessionCookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  else if(userSessionCookie&&isAuthRestrictedRoute){
    return NextResponse.redirect(new URL('/', request.url))
  }
  if(pathname == "/auth/verify-token" ||pathname == "/auth/forget-password"){
    return RequestOTPMiddleware(request)
  }
  if(pathname == "/edit"){
  return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/auth/:path*",
    "/settings/:path*",
    "/edit",
    "/collection/:path*",
    ...privateRoutes
  ]
}
