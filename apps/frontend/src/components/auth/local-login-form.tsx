"use client"
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Lock, Mail } from "lucide-react";
import React from "react";
import PasswordInput from "../global/password-input";
import { Button } from "@/shadcn/components/ui/button";
import {SubmitHandler, useForm} from "react-hook-form"
import useLoginLocal from "@/hooks/useLoginLocal";
import RequestLoader from "../loader/request-loading";
import clsx from "clsx";
import Link from "next/link";
interface iLocalLogin{
    email:string;
    password:string;
}
export default function LocalLoginForm() {
    const form = useForm<iLocalLogin>()
    const {mutate:login,isLoading}= useLoginLocal()
    const formSubmit:SubmitHandler<iLocalLogin> = (data)=>{
        login(data)
    }
  return (
    <form onSubmit={form.handleSubmit(formSubmit)}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <div className="space-y-0.5 ">
        <Label className="text-xs font-semibold " htmlFor="email">
          Work Email
        </Label>
        <div className={clsx("border group rounded-lg flex gap-1 items-center px-2 ",form.formState.errors.email&&"border-red-500")}>
          <Mail className="text-muted-foreground" size={22} />
          <Input 
          {...form.register("email",{required:"email is required"})}
            id="email"
            type="email"
            placeholder="Enter your work email"
            className="border-none  outline-none ring-0 focus:outline-none focus:border-no placeholder:text-sm"
          />
        </div>
          {form.formState.errors.email&& <p className="text-xs font-medium text-red-600">{form.formState.errors.email.message}</p>}
      </div>
      <div className="space-y-0.5">
        <Label className="text-xs font-semibold " htmlFor="password">
          Password
        </Label>
        <div className={clsx("border group rounded-lg flex gap-1 items-center px-2 ",form.formState.errors.password&&"border-red-500")}>
          <Lock className="text-muted-foreground " size={22} />
          <PasswordInput {...form.register("password",{required:"password is required"})} />
        </div>
          {form.formState.errors.password&& <p className="text-xs font-medium text-red-600">{form.formState.errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full bg-secondary-foreground font-semibold mt-4 hover:bg-opacity-90 hover:bg-secondary-foreground shadow  hover:opacity-90 transition-colors " disabled={isLoading}>
        {isLoading? <RequestLoader dark/>: 'Sign in'}
      </Button>
      <div className="flex justify-end">
        <Link href="/auth/forget-password" className="font-semibold hover:underline text-xs mt-2">
        Forgot password
        </Link>        
      </div>
    </form>
  );
}
