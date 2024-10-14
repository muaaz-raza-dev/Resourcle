

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const Cookie_key = process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicRoute = pathname.includes("/auth")
  const userSessionCookie = request.cookies.get(Cookie_key)
  if (userSessionCookie && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  else if (!isPublicRoute && !userSessionCookie) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  else if(!isPublicRoute && userSessionCookie){
    return NextResponse.next()
  }
  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', "/auth", "/auth/:path*"],
}