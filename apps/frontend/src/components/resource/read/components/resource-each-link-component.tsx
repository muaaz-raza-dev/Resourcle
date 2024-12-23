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
  const [isMinimal, setIsMinimal] = useState(false);
  return (
    <li key={resource.url} className="flex items-center justify-between  py-2 ">
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
            <button onClick={() => setIsMinimal((s) => !s)}>
              <CaretSortIcon fontSize={18} />
            </button>
          </div>
          {!isMinimal && (
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
          )}
        </div>
      </div>
      <div className="flex gap-2">
        {resource.tags.map((tag) => {
          return (
            <Badge variant="secondary" className="!mr-x2text-sm" key={tag}>
              {tag}
            </Badge>
          );
        })}
        <ResourceEachLinkCollectButton link_id={resource._id} />
        <ResourceEachLinkUpvote
          link_id={resource._id}
          resource_id={resource_id}
          upvotes={resource.upvotes}
          isUpvoted={resource.isUpvoted}
        />
      </div>
    </li>
  );
}
