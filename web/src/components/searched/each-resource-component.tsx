import React from "react";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import { Avatar } from "antd";
import { Dot, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import UpvoteBtn from "../global/upvote-btn";
import { IResourceSearched } from "@/types/Isearched";
import moment from "moment";
import Link from "next/link";
import SaveBtn from "../global/save-btn";
export default function EachResourceComponent({resource}: {resource: IResourceSearched;}) {
  
    return (
    <Card key={resource?._id} className="overflow-hidden px-2 py-2">
      <div className="flex flex-col sm:flex-row center">
        {resource?.banner && (
          <Link href={`/resource/${resource?._id}`} className="relative w-full sm:w-48 h-28 bg-secondary rounded-md">
            <Image
              src={resource?.banner || ""}
              alt={resource?.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </Link>
        )}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <CardContent className="p-0">
            <div className="flex items-center gap-1">
              <Avatar
                src={resource?.publisher?.picture || "/user.png"}
                size={20}
              />
              <p className="font-semibold text-sm pl-1">
                {resource?.publisher?.name}
              </p>
              <Dot />
              <span className="text-sm text-gray-500">
                {moment(resource?.createdAt).fromNow()}
              </span>
            </div>
            <Link href={"/resource?/" + resource?._id}>
              <h2 className="text-xl font-semibold ">{resource?.title}</h2>
            </Link>
          </CardContent>
          <CardFooter className="p-0 items-end">
            <div className="flex items-center space-x-3  text-sm text-muted-foreground">
              <span className="flex items-center  text-primary  text-xs font-semibold">
                <LinkIcon className="h-4 w-4 mr-1 font-medium text-primary" />
                {resource?.linksLength} links
              </span>
              <UpvoteBtn
                value={`${resource?.upvotes} upvotes`}
                size={18}
                id={resource._id}
                isUpvoted={resource.isUpvoted}
                containerClassName="flex-row-reverse"
              />
            </div>
            <SaveBtn id={resource?._id} isSaved={resource?.isSaved}/>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
