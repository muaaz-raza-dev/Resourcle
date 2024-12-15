import  { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const Cookie_key = process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY 
const Requested_OTP_Cookie_Key = process.env.NEXT_PUBLIC_REQUESTED_OTP_COOKIE_KEY 

export function RequestOTPMiddleware(request:NextRequest, ) {
    const { pathname } = request.nextUrl
  const userSessionCookie = request.cookies.get(Cookie_key)
    if( pathname=="/auth/verify-token"  ){
        if(!request.cookies.get(Requested_OTP_Cookie_Key)){
          if(userSessionCookie){
            return NextResponse.redirect(new URL('/settings/account', request.url))
          }
          else{
            return NextResponse.redirect(new URL('/auth/forget-password', request.url))
          }
        }
        else{
          return NextResponse.next()
        }
      }
      else if(pathname == "/auth/forget-password"  ){
        if(request.cookies.get(Requested_OTP_Cookie_Key)){
          return NextResponse.redirect(new URL('/auth/verify-token', request.url))
        }
        else if(userSessionCookie){
          return NextResponse.redirect(new URL('/settings/account', request.url))
      }
      }    
}