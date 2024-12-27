import useValidateUsername from "@/hooks/profile/useValidateUsername";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { IuserProfile } from "@/types/IuserProfile";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
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
  const [username, setUsername] = useState("");
  useEffect(() => setUsername(username_remote), [username_remote]);
  const { data, isLoading, mutate } = useValidateUsername();
  const debounced = useDebouncedCallback((val) => {
    if (val && username_remote != val) {
      mutate(val);
    }
  }, 500);
  const { mutate: update, isLoading: isUpdating } = useUpdateProfileUsername();

  function UpdateUsername() {
    if (data?.payload.isAvailable) {
      update(username);
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
          href={uri + "/" + username_remote}
          target="_blank"
          className="p-0.5 px-2 hover:underline rounded shadow-sm border text-xs font-semibold "
        >
          {uri}/
          <span className=" text-primary">{username_remote}</span>
        </Link>
        }
      </div>
      <div className="flex gap-2 items-center">
        <Input
          id="username"
          value={username}
          onChange={({ target: { value } }) => {
            setUsername(value);
            debounced(value);
          }}
          placeholder="username"
        />
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
          disabled={isLoading ||  !data || !data.payload.isAvailable || username_remote == username}
          onClick={UpdateUsername}
        >
          {isUpdating ? <RequestLoader size="16" /> : "Update"}
        </Button>
      </div>
    </div>
  );
}
