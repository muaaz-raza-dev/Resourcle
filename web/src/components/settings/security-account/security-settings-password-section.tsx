import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import {Input as InputAntd} from "antd";
import { Label } from "@/shadcn/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import React from "react";
import useFetchSecurityInfo from "@/hooks/settings/useFetchSecurityInfo";
import SecuritySettingsPasswordProviderSelectionModal from "./security-settings-password-provider-selection-modal";
import useChangePassword from "@/hooks/settings/useChangePassword";
import { FormProvider, useForm,SubmitHandler, Controller } from "react-hook-form";
import { Iproviders } from "@/types/Isecurity";
import RequestLoader from "@/components/loader/request-loading";
export interface IChangePasswordForm {
  current_password: string;
  new_password: string;
  confirmPassword: string;
  provider: Iproviders;
}
export default function SecuritySettingsPasswordSection() {
  const { data } = useFetchSecurityInfo();
  const q = data?.payload;
  const {mutateAsync: mutate, isLoading } = useChangePassword();
  const form = useForm<IChangePasswordForm>({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirmPassword: "",
      provider: q?.provider || "hybrid",
    },
  });
  const { register,watch,formState:{errors,isValid},handleSubmit,control,reset } = form
  const new_password = watch("new_password"); // Watch the new_password field
  const onSumbit: SubmitHandler<IChangePasswordForm> = async(data) => {
      await mutate(data);
      reset();
  }
  return (
    <Card className="bg-transparent shadow-none border-none rounded-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Password</CardTitle>
        <CardDescription>
          Use the form below to update your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>

        
        <form className="space-y-4" onSubmit={handleSubmit(onSumbit)}>
          {q?.provider != "google" && (
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                {...register("current_password", {
                  required:{ value:!q?.reset_verification,message:"Current password is required"},
                })}
                id="current-password"
                type="password"
                placeholder="Current password"
              />
              {
                  errors.current_password && <p className="text-red-500 text-sm">{errors.current_password.message}</p>
              }
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Controller
          name="new_password"
          control={control}
          defaultValue="" // Provide a default value to prevent uncontrolled component warning
          rules={{
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ field }) => (
            <InputAntd.Password
              {...field} // Spread the field props
              id="new-password"
              placeholder="New password"
            />
          )}
        />
            {
                  errors.new_password && <p className="text-red-500 text-sm">{errors.new_password.message}</p>
              }
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: "Confirm password is required",
            validate: (value) =>
              value === new_password || "Passwords don't match",
          }}
          render={({ field }) => (
            <InputAntd.Password
              {...field}
              id="confirm-password"
              placeholder="Confirm new password"
            />
          )}
        />
            {
                  errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              }
          </div>
          {q?.provider == "google" ? (
            <SecuritySettingsPasswordProviderSelectionModal  disabled={!isValid||isLoading}>
              <Button className="w-full " type="button" disabled={!isValid||isLoading} >
                {q?.provider == "google" ? "Setup Password" : "Update Password"}
              </Button>
            </SecuritySettingsPasswordProviderSelectionModal>
          ) : (
            <Button className="w-full " type="submit" disabled={isLoading}>
              {
                isLoading? <RequestLoader size="22" /> : "Update password"
              }
            </Button>
          )}
        </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
