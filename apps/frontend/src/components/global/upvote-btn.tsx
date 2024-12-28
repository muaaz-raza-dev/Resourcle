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
  id,
}: {
  className?: string;
  value: number;
  size?: number;
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
      className={clsx(
        "rounded flex gap-0.5 items-center upvote-button text-xs font-semibold ",
        containerClassName
      )}
      onClick={handleUpvote}
    >
      <p className="font-semibold">{state.upvotes}</p>
      {state.isUpvoted ? (
        <AiFillFire fill="rgb(249 115 22)" className={clsx( " ",isLoading && "animate-ping transition-all")}  
        size={size || 18} />
      ) : (
        <AiOutlineFire
          className={clsx(
            "hover:text-orange-500 transition-colors text-balck",
            className,
            isLoading && "animate-ping"
          )}
          size={size || 18}
        />
      )}
    </button>
  );
}
