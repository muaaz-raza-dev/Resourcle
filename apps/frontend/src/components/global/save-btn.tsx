"use client";
import useSaveResource from "@/hooks/resource/useSaveResource";
import { Button } from "@/shadcn/components/ui/button";
import clsx from "clsx";
import React, { useState } from "react";
import RequestLoader from "../loader/request-loading";
import { FaBookmark } from "react-icons/fa";
import useProtectAuthorisedEvents from "@/utils/authorised-event-protector";

export default function SaveBtn({
  isSaved: isSavedRemote,
  id,
  minimal,
  size,
}: {
  id: string;
  isSaved: boolean;
  minimal?: boolean;
  size?: number;
}) {
  const [isSaved, setIsSaved] = useState(isSavedRemote);
  const { mutateAsync, isLoading } = useSaveResource();
  const authorize = useProtectAuthorisedEvents()
  async function save(){
    const previousState = isSaved;
    setIsSaved(!isSaved);
    try {
      await mutateAsync(id);
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setIsSaved(previousState);
    }
  }
  function handleSave() {
    authorize(save)
  }
  if (minimal)
    return (
      <button onClick={handleSave} disabled={isLoading} aria-label="Save button"> 
        <FaBookmark
          size={size || 18}
          className={clsx(
            "max-md:h-[1.2rem] max-md:w-[1.2rem] mr-1  hover:text-black transition-colors",
            isLoading && "animate- hover:!text-black",
            isSaved && "!text-black"
          )}
          fill={isSaved ? "#2F2F2F" : "#A9A9A9"}
        />
      </button>
    );
  return (
      <Button 
      aria-label="Save button"
        onClick={handleSave}
        disabled={isLoading}
        className={clsx(
          "ml-auto hover:bg-secondary text-sm bg-secondary shadow-none border",
          isSaved &&
            "bg-secondary-foreground  hover:bg-secondary-foreground hover:text-white text-white"
        )}
      >
        {isLoading ? (
          <RequestLoader size="18" />
        ) : (
          <>
            <FaBookmark
              className=" mr-1 !w-4 !h-4 "
              size={size || 14}
              fill={isSaved ? "white" : "#2F2F2F"}
            />
          </>
        )}
      </Button>
  );
}
