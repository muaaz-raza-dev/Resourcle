/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shadcn/components/ui/input-otp";
import { Button } from "@/shadcn/components/ui/button";
import useRequestForgetPassword from "@/hooks/auth/useRequestForgetPassword";
import RequestLoader from "@/components/loader/request-loading";
import useDecodeROTPToken from "@/hooks/auth/useDecodeROTPToken";
import { Timer } from "lucide-react";
import useVerifyOTP from "@/hooks/auth/useVerifyOTP";
import { useSearchParams } from "next/navigation";

export default function VerifyOtpPage() {
  const params = useSearchParams();
  const  token = params.get("token");
  const { mutate, isLoading } = useRequestForgetPassword();
  const [otp, setOtp] = useState("");
  const { data, isLoading: isFetching } = useDecodeROTPToken();
  const { mutateAsync: verify, isLoading: isVerifying } = useVerifyOTP();

  function handleResendOTP() {
    if (data?.payload?.email) mutate(data?.payload.email);
  }
  async function VerifyOTP(auth_token?:string) {
    if (auth_token) {
      await verify({token:auth_token });
    }
    else if(data?.payload.email){
      await verify({ otp, email: data.payload.email});
    }
    setOtp("");
  }
  useEffect(() => {
    if(token){
     VerifyOTP(token)
  }
  }, [token])

  return (
    <div className="min-h-[80vh] flex flex-col gap-8 items-center justify-center  overflow-hidden">
      <span className="authBg h-[28rem]  w-screen absolute bottom-0 -z-20"></span>
      {isFetching ? (
        <div className="center w-full">
          <RequestLoader size="30" />
        </div>
      ) : null}
      <Card className="w-full max-w-md p-3 shadow-md ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">Verify OTP</CardTitle>
          <CardDescription>
            Enter the otp sent to your email address
            <span className="text-primary">{data?.payload.email}</span> to
            verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              disabled={isFetching}
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            className="w-full mt-1"
            disabled={otp.length < 6 || isLoading || isFetching || isVerifying}
            onClick={()=>VerifyOTP()}
          >
            {isVerifying? <RequestLoader size="18"/> : "Verify OTP" }
          </Button>
          <div className="flex justify-start mt-2">
            <div className="text-sm text-muted-foreground flex justify-between ">
              <button
                onClick={handleResendOTP}
                disabled={isLoading || isFetching || isVerifying}
                className="text-primary font-semibold px-2"
              >
                {isLoading ? <RequestLoader size="16" /> : "  Resend OTP"}
              </button>
              <Timer />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
