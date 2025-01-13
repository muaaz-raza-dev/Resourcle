import RequestLoader from "@/components/loader/request-loading";
import useValidateLink from "@/hooks/utils/useValidateLink";
import { Input } from "@/shadcn/components/ui/input";
import { IResourceLink } from "@/types/Iresource";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
export default function LinkInputResourceForm({
  state: [isValid, setisValid],
}: {
  state: [
     boolean,
     React.Dispatch<React.SetStateAction<boolean>>
  ];
}) {
  const {
    register,
    formState: { errors },
    getValues
  } = useFormContext<IResourceLink>();
  const { mutate, isLoading } = useValidateLink(setisValid);
  const { onChange: onUrlChange, ...rest } = register("url", {required: "url is required",});
  const debounced = useDebouncedCallback((value) => {
    const isLocalValid =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(value);
    if (value && isLocalValid) {
      mutate(value);
    } else if (!isLocalValid) {
      setisValid(false);
    }
  }, 800);

  return (
    <div className="">
      <Label className="font-semibold text-sm my-1">URL *</Label>
      <div className="flex gap-2 items-center">

        <Input
          type="url"
          className={"bg-white placeholder:text-muted-foreground"}
          placeholder="https://netflixtechblog.com"
          onChange={(e) => {
            debounced(e.target.value);
            onUrlChange(e);
          }}
          autoFocus
          {...rest}
        />
        {
          isLoading&& <RequestLoader size="18" />
        }
      </div>
      

      { 
      !getValues("url")?
      null
      :
      isLoading?
      null
      :
      (!isValid||errors.url) ? (
        <span className="text-red-500 text-xs">Link is not valid</span>
      ) : (null
      )
    }
    </div>
  );
}
