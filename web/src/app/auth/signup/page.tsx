import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import GoogleAuthButton from "@/components/auth/Google-auth-button";
import LocalSignupForm from "@/components/auth/local-signup-form";
import Link from "next/link";
export const metadata = {
    title: 'Signup',
    description: 'Sign up page for colabra.',
  };
export default function SignupPage() {
  return (
    <>
       
    <div className="min-h-[80vh] flex flex-col gap-8 items-center justify-center  overflow-hidden">
      {/* Background */}
      <span className="authBg h-[28rem]  w-screen absolute bottom-0 -z-20"></span> 
      <Card className="w-full max-w-md p-3 shadow-md ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Seconds to Sign up!
          </CardTitle>
        </CardHeader>
          <CardContent className="space-y-3">
          <LocalSignupForm/>
           <GoogleAuthButton/> 
        </CardContent>
      </Card>
      <div className=" text-center text-muted text-sm font-medium">
        Already have an account?{" "}
        <Link href="/auth/signin" className="font-semibold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
    </>
  );
}
