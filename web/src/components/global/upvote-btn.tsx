import clsx from 'clsx'
import React from 'react'
import { AiOutlineFire } from "react-icons/ai";
export default function UpvoteBtn({className,value,size,containerClassName}:{className?:string,value:string;size?:number,containerClassName?:string}) {
  return (
    <button className={clsx("rounded flex gap-0.5 items-center text-xs font-semibold",containerClassName)}>
        <p>{value}</p>
        <AiOutlineFire strokeWidth={3}  className={clsx("hover:text-orange-500 transition-colors",className)} size={size||18}/>
</button>
  )
}
