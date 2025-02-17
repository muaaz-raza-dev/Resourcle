import { Badge } from "@/shadcn/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";

import { IResourceLink } from "@/types/Iresource";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useState } from "react";
import ResourceEachLinkUpvote from "./resource-each-link-upvote";
import ResourceEachLinkCollectButton from "./resource-each-link-collect-button";
import useScreenSizeTracker from "@/hooks/global/useScreenSizeTracker";
import { LinkPreview } from "@/shadcn/components/ui/link-preview";
import { LuMousePointerClick } from "react-icons/lu";
import { FaCaretUp } from "react-icons/fa";
import useTrackLinkClick from "@/hooks/resource/useTrackLinkClick";
import { BiSolidUpvote } from "react-icons/bi";
import clsx from "clsx";

export default function ResourceEachLinkComponent({
  data: link,
  index,
  className
}: {
  data: IResourceLink;
  index?: number;
  className?:string;
}) {
  const {mutate} =useTrackLinkClick()
  return (
    <li
      key={link.url}
      className={clsx("flex items-center justify-between gap-2 w-full  py-2  ",className)}
    >
      <div>

      
      <div className="flex gap-2 items-center">
        {
          index!=undefined?
        <Badge variant="outline" className="mr-2 h-max">
          {index + 1}
        </Badge>:null
        }

          <div className="flex gap-x-4 md:items-center max-md:flex-col flex-wrap ">

              <LinkPreview quality={100}  url={link.url} >
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className=" font-semibold   md:whitespace-nowrap "
                onClick={()=>mutate(link._id)}
                >
                {link.title}
              </Link>
              </LinkPreview>
            <Link
            onClick={()=>mutate(link._id)}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm text-wrap md:border-x md:px-2 break-all max-md:text-xs text-primary underline py-0 leading-tight"
              >
              {link.url.slice(0,30)}
            </Link>
      <div className="flex gap-2 max-md:hidden">
{
  link.clicks?
            <div className="text-xs  text-muted-foreground border flex gap-1 rounded p-0.5 items-center px-2">
              <LuMousePointerClick className="text-accent"/>
              {link.clicks} clicks 
            </div>:null
}
{
  link.upvotes?
            <div className="text-xs text-muted-foreground border rounded p-0.5 flex gap-1 items-center px-2">
              <FaCaretUp  fontSize={14}/> 
              {link.upvotes} upvotes
            </div>:null
}

      </div>
          </div>
        </div>
      </div>
      <ScreeenSizeBasedLayout mutate={mutate} resource_id={link.resource} data={link} />
    </li>
  );
}

function ScreeenSizeBasedLayout({
  data: link,
  resource_id,
  mutate
}: {
  data: IResourceLink;
  resource_id: string;
  mutate: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const size = useScreenSizeTracker();
  return (
    <div className="flex gap-2  items-center max-md:justify-between ">
      <Popover  open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <button className="`relative aspect-square  text-xs font-semibold  h-8 hover:bg-border transition-colors  border rounded-md p-1 px-2">
              <CaretSortIcon fontSize={20} />
            </button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="center">
        <Link
            onClick={()=>mutate(link._id)}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm text-wrap break-all max-md:text-xs text-primary underline py-0 leading-tight"
              >
              {link.url}
            </Link>
          <p className="text-muted-foreground text-xs mt-2">
            {link.description || "no description"}
          </p>
        
          {size == "sm" && (
            <div className="flex justify-between flex-col  mt-2 gap-4 w-full border-t   py-2">
              
              <ResourceEachLinkCollectButton link_id={link._id} />
              
              <div className="flex justify-between items-center">
                <p className="text-center text-sm font-semibold"> 
                Upvotes
                </p>
              <ResourceEachLinkUpvote
                link_id={link._id}
                resource_id={resource_id}
                upvotes={link.upvotes}
                isUpvoted={link.isUpvoted}
                />
                </div>
            </div>
          )}
          {
            size == "sm"&&
          
          <div className="flex gap-2 mt-2">

          <div className="text-xs  text-muted-foreground border flex gap-1 rounded p-0.5 items-center px-2">
            <LuMousePointerClick className="text-accent"/>
            {link.clicks||0} clicks 
          </div>
          <div className="text-xs text-muted-foreground border rounded p-0.5 flex gap-1 items-center px-2">
            <BiSolidUpvote fill="black"  fontSize={14}/> 
            {link.upvotes||0} upvotes
          </div>

        </div>
}
        </PopoverContent>
        
      </Popover>
      {size == "md" ||
        (size == "lg" && (
          <>
          <div className="flex gap-2 items-center">
            <ResourceEachLinkCollectButton link_id={link._id} />
            <ResourceEachLinkUpvote
              link_id={link._id}
              resource_id={resource_id}
              upvotes={link.upvotes}
              isUpvoted={link.isUpvoted}
            />
          </div>
        </>
        ))}
    </div>
  );
}
