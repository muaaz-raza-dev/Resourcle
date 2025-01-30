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
import { Metadata } from "next";
export const metadata: Metadata  = {
  title: "Sign Up - Resourcle",
  description: "Create your Resourcle account to save, organize, and manage all your favorite links effortlessly in one place. Join the ultimate resource bookmarking platform today.",
  keywords: [
    "Resourcle sign up",
    "create Resourcle account",
    "register Resourcle",
    "sign up resource manager",
    "bookmarking platform registration"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Sign Up | Resourcle",
    description: "Join Resourcle and start organizing your favorite links effortlessly. Sign up for free and manage your bookmarks like a pro.",
    url: "https://resourcle.com/auth/signup",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign Up | Resourcle",
    description: "Sign up for Resourcle today and start managing your favorite links in a secure and organized way.",
  },
};


export default function SignupPage() {
  return (
    <>
       
    <div className="min-h-[80vh] flex flex-col gap-8 items-center justify-center  overflow-hidden">
      <Card className="w-full max-w-md p-3 shadow-md ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Seconds to Sign up!
          </CardTitle>
        </CardHeader>
          <CardContent className="space-y-3">
          <LocalSignupForm/>
          <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
          <GoogleAuthButton /> 
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
