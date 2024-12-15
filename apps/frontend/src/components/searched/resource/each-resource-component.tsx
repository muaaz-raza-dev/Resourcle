import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import { Dot, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import UpvoteBtn from "../../global/upvote-btn";
import { IResourceSearched } from "@/types/Isearched";
import moment from "moment";
import Link from "next/link";
import SaveBtn from "../../global/save-btn";
import { FaEye, FaLock } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/shadcn/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import EachResourceAdminMenubar from "./each-resource-admin-menubar";
import { Badge } from "@/shadcn/components/ui/badge";
export default function EachResourceComponent({
  resource,
  index
}: {
  resource: IResourceSearched;
  index?:number
}) {
  const [isPrivate, setIsPrivate] = useState(resource.isPrivate);
  return (
    <Card key={resource?._id} className="overflow-hidden px-2 py-2 ">
      <div className="flex flex-col sm:flex-row center">
        {resource?.banner && (
          <Link
            href={`/resource/${resource?._id}`}
            className="relative w-full sm:w-48 h-28 bg-secondary rounded-md"
          >
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
              <Avatar>
                <AvatarImage src={resource?.publisher?.picture} />
                <AvatarFallback className="bg-primary text-white font-semibold center w-full h-full">
                  {resource?.publisher?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold text-sm pl-1">
                {resource?.publisher?.name}
              </p>
              <Dot />
              <span className="text-sm text-gray-500">
                {moment(resource?.createdAt).fromNow()}
              </span>
              {isPrivate && (
                <>
                  {" "}
                  <Dot />
                  <Badge variant={"destructive"} className="flex gap-2">
                    Private <FaLock />
                  </Badge>
                </>
              )}
            </div>
            <Link href={"/resource/" + resource?._id}>
              <h2 className="text-xl font-bold ">{resource?.title}</h2>
            </Link>
          </CardContent>
          <CardFooter className="p-0 justify-between items-center">
            <div className="flex items-center space-x-3  text-sm text-muted-foreground">
              <span className="flex items-center  text-primary  text-xs font-semibold">
                <LinkIcon className="h-4 w-4 mr-1 font-medium text-primary" />
                {resource?.linksLength} links
              </span>
              <span className="flex items-center   text-xs font-semibold">
                <FaEye className="h-4 w-4 mr-1 font-medium " />
                {resource?.views} views
              </span>
              <UpvoteBtn
                value={resource?.upvotes}
                size={18}
                id={resource._id}
                isUpvoted={resource.isUpvoted}
                containerClassName="flex-row-reverse"
              />
            </div>
            <div className="flex gap-2 ">
              <SaveBtn id={resource?._id} isSaved={resource?.isSaved} />
              {
              (resource.isOwned && index!=null && index!=undefined) ?
              <EachResourceAdminMenubar
              index={index}
              setPrivate={setIsPrivate}
              title={resource.title}
              _id={resource._id}
              isPrivate={isPrivate}
              /> :null
            }
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
