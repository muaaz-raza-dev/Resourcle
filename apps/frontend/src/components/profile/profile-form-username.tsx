import useValidateUsername from "@/hooks/profile/useValidateUsername";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { IuserProfile } from "@/types/IuserProfile";
import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import RequestLoader from "../loader/request-loading";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import { Tooltip } from "antd";
import { Button } from "@/shadcn/components/ui/button";
import { useUpdateProfileUsername } from "@/hooks/profile/useUpdateProfileInfo";
import Link from "next/link";
const uri = process.env.NEXT_PUBLIC_URL;
export default function ProfileFormUsername() {
  const methods = useFormContext<IuserProfile>();
  const username_remote = methods.watch("username") || "";
  const form = useForm<{username:string}>({defaultValues:{username:username_remote}});
  useEffect(() => form.setValue("username",username_remote), [username_remote]);
  const { data, isLoading, mutate } = useValidateUsername();
  const debounced = useDebouncedCallback(async(val) => {
    const isValid =await form.trigger("username");
    if (val && username_remote != val&&isValid) {
      mutate(val);
    }
  }, 500);
  const { mutate: update, isLoading: isUpdating } = useUpdateProfileUsername();

  async function UpdateUsername() {
    const isValid =await form.trigger("username");
    if (data?.payload.isAvailable&&isValid) {
      update(form.getValues("username"));
    }
  }
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center w-full">
        <Label
          htmlFor="username"
          className="!font-semibold text-muted-foreground"
        >
          Username
        </Label>
        {username_remote&&
        <Link
          href={uri + "/u/" + username_remote}
          target="_blank"
          className="p-0.5 px-2 hover:underline rounded shadow-sm border text-xs font-semibold "
        >
          {uri}/
          <span className=" text-primary">{username_remote}</span>
        </Link>
        }
      </div>
      <div className="flex gap-2 items-center">
        <div className="">

        
        <Input
          id="username"
          {
            ...form.register("username", {required:"Username is required",minLength:{value:3,message:"minimum 3 character is required"},
            pattern:{value:/^[a-zA-Z0-9_]+$/,message:"username should contain only alphabets, numbers and underscore"}})
          }
          onChange={(e) => {form.register("username").onChange(e); debounced(e.target.value)}}
        />
        <span className="text-xs text-destructive">{form.formState.errors.username?.message}</span>
        </div>
        {isLoading ? (
          <RequestLoader size="16" />
        ) : data ? (
          data?.payload.isAvailable ? (
            <Tooltip title="Username is available" placement="top">
              <FaCheckCircle className="text-primary" />
            </Tooltip>
          ) : (
            <Tooltip title="Username is taken">
              <FaBan className="text-destructive" />
            </Tooltip>
          )
        ) : null}
        <Button
          type="button"
          disabled={isLoading ||  !data || !data.payload.isAvailable || username_remote == form.watch("username")||!form.formState.isValid}
          onClick={UpdateUsername}
        >
          {isUpdating ? <RequestLoader size="16" /> : "Update"}
        </Button>
      </div>
    </div>
  );
}
