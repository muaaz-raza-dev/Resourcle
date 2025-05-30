import React, { useState } from "react";
import { Badge } from "@/shadcn/components/ui/badge";
import { Card, CardHeader, CardFooter } from "@/shadcn/components/ui/card";
import Link from "next/link";
import { AiFillFire } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "antd";
import { IcollectedResourceLink } from "@/api/resource-collection/get-collection-links.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/components/ui/alert-dialog";
import useRemoveLinkFromCollection from "@/hooks/resource-collection/useRemovLinkFromCollection";
import { useParams } from "next/navigation";
import clsx from "clsx";
import RequestLoader from "../loader/request-loading";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { FaLock } from "react-icons/fa6";

export default function ResoureCollectionEachResource({
  data,
}: {
  data: IcollectedResourceLink;
}) {
  const [expand, setExpand] = useState(false);
  return (
    <Card className="flex flex-col w-[49%] h-max py-3 gap-1 justify-between max-md:w-full">
      <CardHeader className="flex flex-col py-0">
        <div className="flex flex-col ">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Link
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold"
              >
                {data.title}
              </Link>
              {data.isPublished === false ? (
                <Tooltip title="This link is only available to you in collection">
                  <Badge className="bg-accent/20 text-black shadow-none gap-1 items-center flex w-max ">
                    {" "}
                    <FaLock /> Private{" "}
                  </Badge>
                </Tooltip>
              ) : null}
            </div>
            <button
              onClick={() => setExpand((e) => !e)}
              className="`relative aspect-square  text-xs font-semibold  h-8 hover:bg-border transition-colors  border rounded-md p-1 px-2"
            >
              <CaretSortIcon fontSize={20} />
            </button>
          </div>
          <Link
            href={data.url}
            rel="noopener noreferrer"
            target="_blank"
            className="text-sm block text-primary hover:underline py-0 leading-tight"
          >
            {data.url}
          </Link>
        </div>
        {expand && (
          <>
            <p className="text-muted-foreground text-sm ">
              {data.description || "no description"}
            </p>

          
          </>
        )}
      </CardHeader>
      {expand ? (
        <CardFooter className="flex items-center justify-between py-0 gap-4 mt-2 max-[350px]:flex-col-reverse max-[350px]:items-start max-md:gap-1">
          {data.isPublished === false ? null : (
            <div className="text-xs font-medium max-md:font-normal  rounded">
              Collected from{" "}
              <Link
                href={`/resource/${data.resource._id}`}
                className="font-bold  "
              >
                Resource
              </Link>{" "}
              of{" "}
              <Link
                href={`/${data.resource.publisher._id}`}
                className="font-bold "
              >
                {data.resource.publisher.name}
              </Link>
            </div>
          )}

          <section className="flex gap-2 text-xs items-center ">
            {data.isPublished === false ? null : (
              <div className="gap-0.5 text-muted-foreground flex text-sm items-end">
                <p className="text-xs">{data.upvotes || "No upvotes "} </p>
                <AiFillFire
                  fill="rgb(249 115 22)"
                  className={
                    "hover:text-orange-500 transition-colors text-balck"
                  }
                  size={16}
                />
              </div>
            )}
            <RemoveResource linkId={data._id} />
          </section>
        </CardFooter>
      ) : null}
    </Card>
  );
}

function RemoveResource({ linkId }: { linkId: string }) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: mutate, isLoading } =
    useRemoveLinkFromCollection(linkId);
  const collectionId = useParams().id as string;
  const handleRemove = async () => {
    await mutate({ collectionId, linkId });
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={(o) => !isLoading && setOpen(o)}>
      <AlertDialogTrigger>
        <button
          disabled={isLoading}
          className=" p-1 rounded border hover:bg-danger transition-colors "
        >
          <MdDeleteForever
            size={20}
            className={clsx(isLoading && "animate-pulse")}
          />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            resource and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove} className="bg-red-500">
            {isLoading ? <RequestLoader size="16" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
