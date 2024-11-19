import { Badge } from "@/shadcn/components/ui/badge";
import { IResourceLink } from "@/types/Iresource";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Tooltip } from "antd";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";


export default function ResourceEachLinkComponent({
  data: resource,
  index,
}: {
  data: IResourceLink;
  index: number;
}) {
    const [isMinimal,setIsMinimal] = useState(true)
  return (
    <li key={resource.url} className="flex items-center justify-between  py-2  border-b" >
      <div className="flex gap-2 items-center">
        <Badge variant="outline" className="mr-2 h-max">
          {index + 1}
        </Badge>
        <div className="">
            <div className="flex gap-2">
          <Link
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-semibold"
            >
            {resource.title}
          </Link>
          <button  onClick={()=>setIsMinimal(s=>!s)}>
                 <CaretSortIcon fontSize={18}/> 
          </button>
              </div>
              {
                !isMinimal &&
              <>
          <Link
            href={resource.url}
            rel="noopener noreferrer"
            target="_blank"
            className="text-sm block text-primary underline py-0 leading-tight"
          >
            {resource.url}
          </Link>
          <p className="text-muted-foreground text-xs">
            {resource.description}
          </p>
          </>
           }
        </div>
      </div>
      <div className="flex gap-2">
        {resource.consumption_time && (
          <Tooltip title="Consumption time">
            <Badge variant="secondary" className="mr-2">
              {resource?.consumption_time}
            </Badge>
          </Tooltip>
        )}
        {resource.level_information && (
          <Tooltip title="Level of information">
            <Badge variant="secondary" className="mr-2">
              {resource?.level_information}
            </Badge>
          </Tooltip>
        )}
        <Badge
          variant="secondary"
          className={clsx(
            "mr-2 ",
            resource.isPaid
              ? "bg-yellow-500 hover:bg-yellow-500"
              : "bg-green-400 hover:bg-greeen-700"
          )}
        >
          {resource?.isPaid ? "Premium" : "Free"}
        </Badge>
      </div>
    </li>
  );
}
