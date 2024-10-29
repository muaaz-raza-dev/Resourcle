import clsx from 'clsx'
import React from 'react'
import { AiOutlineFire } from "react-icons/ai";
export default function UpvoteBtn({className}:{className?:string}) {
  return (
    <button className="rounded flex gap-1  p-1 items-center text-xs font-semibold">
        <p>32</p>
        <AiOutlineFire strokeWidth={3} className={clsx("",className)} size={18}/>
</button>
  )
}
