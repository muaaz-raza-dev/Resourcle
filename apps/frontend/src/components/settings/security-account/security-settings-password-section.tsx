import { Button } from "@/shadcn/components/ui/button";
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
import SecurityAccountForgetPasswordBtn from "./security-account-forget-password-btn";
import { passwordValidation } from "@/utils/validate-password";
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
  const { watch,formState:{errors,isValid},handleSubmit,control,reset } = form
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
          {q?.provider != "google" && !q?.reset_verification && (
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Controller
          name="current_password"
          control={control}
          defaultValue="" // Provide a default value to prevent uncontrolled component warning
          rules={{
            required:{ value:!q?.reset_verification,message:"Current password is required"}
          }}
          render={({field,formState})=>{
            return<>
              <InputAntd.Password
              id="current-password"
              type="password"
              {...field} // Spread the field props
              placeholder="Current password"
              />
            {
              formState.errors.current_password && <p className="text-red-500 text-sm">{formState.errors.current_password.message}</p>
            }
            </>
          }}/>
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
            validate:passwordValidation
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
          <div className="flex justify-between">
          {q?.provider == "google" ? (
            <SecuritySettingsPasswordProviderSelectionModal  disabled={!isValid||isLoading}>
              <Button className="w-full "  type="button"  >
                {q?.provider == "google" ? "Setup Password" : "Update Password"}
              </Button>
            </SecuritySettingsPasswordProviderSelectionModal>
          ) : (
            <div className="justify-end flex ">
            <Button className=" w-max bg-secondary-foreground hover:bg-secondary-foreground/90" type="submit" disabled={isLoading}>
              {
                isLoading? <RequestLoader size="22" /> : "Update password"
              }
            </Button>
              </div>
          )}
          {data?.payload.email?
          data?.payload.provider == "google" ? null :
          <SecurityAccountForgetPasswordBtn email={data.payload.email}/>:null
          }
        </div>
        </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
