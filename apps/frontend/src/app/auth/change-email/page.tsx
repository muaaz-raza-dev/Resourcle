"use client";
import RequestLoader from "@/components/loader/request-loading";
import useVerifyEmailAndChange from "@/hooks/auth/useVerifyEmailAndChange";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const { mutate, isLoading, isSuccess, isError,error } = useVerifyEmailAndChange();
  useEffect(() => {
    if (token) mutate({ token });
  }, [token]);
  return (
    <div className="min-h-[80vh]  flex flex-col gap-8 items-center justify-center  overflow-hidden">
      <Card className="w-full max-w-md p-3 shadow-md ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center pb-0 my-0">
            Verifying your new email address
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {token ? (
            isLoading ? (
              "Verifying"
            ) : null
          ) : (
            <p className="text-muted-foreground text-sm">
              If you have requested a change to your email address, a
              verification link may have been sent to your new email. Please
              check your inbox and click on the link to complete the
              verification process.
            </p>
          )}

          {isLoading ? (
            <RequestLoader size="30" />
          ) : isSuccess ? (
            <section>
              <div>Your email has been successfully verified</div>
              <Link href={"/"}>
              <Button variant={"secondary"}  className="w-full mt-4 ">
                Go back home
              </Button>
              </Link>
            </section>
          ) : (
            isError && (
              <p className="text-destructive ">
                {error.response.data.message}
              </p>
            )
          )}

        </CardContent>
      </Card>
    </div>
  );
}
