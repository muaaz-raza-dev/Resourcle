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

export default function ResourceEachLinkComponent({
  data: resource,
  index,
  resource_id,
}: {
  data: IResourceLink;
  resource_id: string;
  index: number;
}) {
  return (
    <li
      key={resource.url}
      className="flex items-center justify-between gap-2 w-full  py-2 "
    >
      <div className="flex gap-2 items-center">
        <Badge variant="outline" className="mr-2 h-max">
          {index + 1}
        </Badge>
        <div className="">
          <div className="flex md:gap-2 md:items-center max-md:flex-col">
            <div className="flex gap-2 items-center ">
              <LinkPreview quality={100}  url={resource.url} >
              <Link
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className=" font-semibold md:border-r pr-2"
                >
                {resource.title}
              </Link>
              </LinkPreview>
            </div>
            <Link
              href={resource.url}
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm text-wrap  max-md:text-xs text-primary underline py-0 leading-tight"
              >
              {resource.url}
            </Link>
          </div>
        </div>
      </div>
      <ScreeenSizeBasedLayout resource_id={resource_id} data={resource} />
    </li>
  );
}

function ScreeenSizeBasedLayout({
  data: resource,
  resource_id,
}: {
  data: IResourceLink;
  resource_id: string;
}) {
  const [open, setOpen] = useState(false);
  const size = useScreenSizeTracker();
  return (
    <div className="flex gap-2   max-md:justify-between ">
      <Popover  open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
            <button className="`relative aspect-square  text-xs font-semibold  h-8 hover:bg-border transition-colors  border rounded-md p-1 px-2">
              <CaretSortIcon fontSize={20} />
            </button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="center">
          <p className="text-muted-foreground text-xs">
            {resource.description || "no description"}
          </p>
          {resource.tags.length ? (
            <div className="flex gap-2 flex-wrap mt-2">
              {resource.tags.map((tag) => {
                return (
                  <Badge
                    variant="secondary"
                    className="text-xs font-normal "
                    key={tag}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          ) : null}
          {size == "sm" && (
            <div className="flex justify-between flex-col  mt-4 gap-4 w-full border-t  t py-2">
              <div className="flex justify-between items-center">
              <p className=" text-center text-sm font-semibold">
              Add to collection
              </p>
              <ResourceEachLinkCollectButton link_id={resource._id} />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-center text-sm font-semibold"> 
                Upvotes
                </p>
              <ResourceEachLinkUpvote
                link_id={resource._id}
                resource_id={resource_id}
                upvotes={resource.upvotes}
                isUpvoted={resource.isUpvoted}
                />
                </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      {size == "md" ||
        (size == "lg" && (
          <div className="flex gap-2">
            <ResourceEachLinkCollectButton link_id={resource._id} />
            <ResourceEachLinkUpvote
              link_id={resource._id}
              resource_id={resource_id}
              upvotes={resource.upvotes}
              isUpvoted={resource.isUpvoted}
            />
          </div>
        ))}
    </div>
  );
}
