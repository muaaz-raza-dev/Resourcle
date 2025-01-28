"use client";
import useUpvoteResource from "@/hooks/upvote/useUpvoteResource";
import clsx from "clsx";
import React, { useState } from "react";
import { AiFillFire, AiOutlineFire } from "react-icons/ai";
import  "../../app/globals.css"
import useProtectAuthorisedEvents from "@/utils/authorised-event-protector";
export default function UpvoteBtn({
  className,
  value,
  size,
  containerClassName,
  isUpvoted,
  bordered,
  id,
}: {
  className?: string;
  value: number;
  size?: number;
  bordered?: boolean;
  id: string;
  containerClassName?: string;
  isUpvoted: boolean;
}) {
  const [state, setstate] = useState({ upvotes: +value, isUpvoted });
  const authorize = useProtectAuthorisedEvents()
  const { mutateAsync, isLoading } = useUpvoteResource();
  async function upvote(){
    const prevState = state;
    try {
      setstate((state) => ({
        upvotes: +state.upvotes + (prevState.isUpvoted ? -1 : 1),
        isUpvoted: !state.isUpvoted,
      }));
      await mutateAsync(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setstate(prevState);
    }
  }
  const handleUpvote =  () => {
    authorize(upvote)
  };

  return (
    <button 
    
    disabled={isLoading}

      className={clsx(
        "rounded-lg flex gap-2 items-center upvote-button text-xs font-semibold hover:bg-secondary transition-colors ",
        containerClassName,
        bordered && "border py-1 px-2",
      )}
      onClick={handleUpvote}
    >
      {state.isUpvoted ? (
        <AiFillFire fill="rgb(249 115 22)" className={clsx( " ",isLoading && "animate-pulse transition-all")}  
        size={size || 18} />
      ) : (
        <AiOutlineFire
          className={clsx(
            "hover:text-orange-500 transition-colors text-balck",
            className,
            isLoading && "animate-pulse transition-all"
          )}
          size={size || 18}
        />
      )}
      <p className="font-semibold text-muted-foreground">{state.upvotes} {bordered?"upvotes":null}</p>
    </button>
  );
}
