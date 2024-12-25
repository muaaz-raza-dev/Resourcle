import { Badge } from "@/shadcn/components/ui/badge";
import { IResourceLink } from "@/types/Iresource";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useState } from "react";
import ResourceEachLinkUpvote from "./resource-each-link-upvote";
import ResourceEachLinkCollectButton from "./resource-each-link-collect-button";

export default function ResourceEachLinkComponent({
  data: resource,
  index,
  resource_id,
}: {
  data: IResourceLink;
  resource_id: string;
  index: number;
}) {
  const [isMinimal, setIsMinimal] = useState(true);
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
              <Link
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className=" font-semibold md:border-r pr-2"
              >
                {resource.title}
              </Link>
              <button
                className="md:hidden"
                onClick={() => setIsMinimal((s) => !s)}
              >
                <CaretSortIcon fontSize={20} />
              </button>
            </div>
            <Link
              href={resource.url}
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm text-wrap  max-md:text-xs text-primary underline py-0 leading-tight"
            >
              {resource.url}
            </Link>
            <button
              className="max-md:hidden"
              onClick={() => setIsMinimal((s) => !s)}
            >
              <CaretSortIcon fontSize={20} />
            </button>
          </div>
          {!isMinimal && (
            <>
              <p className="text-muted-foreground text-xs">
                {resource.description || "no description"}
              </p>
              {resource.tags.length ? (
                <div className="flex gap-2 mt-2">
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
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2   max-md:justify-between ">
        <div className="flex gap-2">
          <ResourceEachLinkCollectButton link_id={resource._id} />
          <ResourceEachLinkUpvote
            link_id={resource._id}
            resource_id={resource_id}
            upvotes={resource.upvotes}
            isUpvoted={resource.isUpvoted}
          />
        </div>
      </div>
    </li>
  );
}
