"use client";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Lock, Mail, User } from "lucide-react";
import React from "react";
import PasswordInput from "../global/password-input";
import { Button } from "@/shadcn/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import RequestLoader from "../loader/request-loading";
import useSignupLocal from "@/hooks/auth/useSignupLocal";
interface IlocalSignup {
  name: string;
  email: string;
  password: string;
}
export default function LocalSignUpForm() {
  const form = useForm<IlocalSignup>();
  const { mutate: signup, isLoading } = useSignupLocal();
  const formSubmit: SubmitHandler<IlocalSignup> = (data) => {
    signup(data);
  };
  const passwordValidation = (value: string) => {
    if(value.includes(" ")){
      return "password should not contain space"
    }
    if(!/[A-Z]/.test(value)){
      return "password should contain at least one uppercase letter"
    }
    if(!/[a-z]/.test(value)){
      return "password should contain at least one lowercase letter"
    }
    if(!/[0-9]/.test(value)){
      return "password should contain at least one number"
  }
  return true 
  }
  return (
    <form
      onSubmit={form.handleSubmit(formSubmit)}
      className="flex flex-col gap-2"
    >
      <div className="space-y-1">
        <Label className="text-xs font-semibold " htmlFor="email">
          Full name
        </Label>
        <div className="border group rounded-lg flex gap-1 items-center px-2 ">
          <User className="text-muted-foreground" size={22} />
          <Input
            {...form.register("name", { required: "Name is required", minLength: { value: 3, message: "minimum 3 character is required" } })}
            id="name"
            placeholder="Enter your full name"
            className="border-none  outline-none ring-0 focus:outline-none focus:border-no placeholder:text-sm"
          />
        </div>
        {form.formState.errors.name && (
          <p className="text-xs text-red-600">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-semibold " htmlFor="email">
          Work Email
        </Label>
        <div className="border group rounded-lg flex gap-1 items-center px-2 ">
          <Mail className="text-muted-foreground" size={22} />
          <Input
            {...form.register("email", { required: "email is required" ,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              }
            })}
            id="email"
            type="email"
            placeholder="Enter your work email"
            className="border-none  outline-none ring-0 focus:outline-none focus:border-no placeholder:text-sm"
          />
        </div>
        {form.formState.errors.email && (
          <p className="text-xs text-red-600">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-semibold " htmlFor="password">
          Choose password
        </Label>
        <div className="border group rounded-lg flex gap-1 items-center px-2 ">
          <Lock className="text-muted-foreground " size={22} />
          <PasswordInput
            {...form.register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "minimum 8 character is required",
              },
              validate: passwordValidation
           })}
            placeholder="Choose strong password"
          />
        </div>
        {form.formState.errors.password && (
          <p className="text-xs text-red-600">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <Button 
        type="submit"
        className="w-full font-semibold mt-4 bg-accent hover:bg-accent shadow  hover:opacity-90 transition-colors "
        disabled={isLoading}>
        {isLoading ? <RequestLoader dark/> : "Create account"}
      </Button>
    </form>
  );
}
