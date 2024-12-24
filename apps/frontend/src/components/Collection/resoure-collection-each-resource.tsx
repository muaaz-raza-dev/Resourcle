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
} from "@/shadcn/components/ui/alert-dialog"
import useRemoveLinkFromCollection from "@/hooks/resource-collection/useRemovLinkFromCollection";
import { useParams } from "next/navigation";
import clsx from "clsx";
import RequestLoader from "../loader/request-loading";

export default function ResoureCollectionEachResource({data}:{data:IcollectedResourceLink}) {
  return (
    <Card className="flex flex-col !w-[49%] py-3 gap-1 justify-between">
      <CardHeader className="flex flex-col gap-1 py-0">
        <div className="flex flex-col ">
          <Link
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold"
          >
            {data.title}
          </Link>
          <Link
            href={data.url}
            rel="noopener noreferrer"
            target="_blank"
            className="text-sm block text-primary hover:underline py-0 leading-tight"
          >
            {data.url}
          </Link>
          <p className="text-muted-foreground text-xs">
          {data.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {data?.tags.map(t=><Badge variant="outline" className="text-xs" key={t}>{t}</Badge>)}
        </div>
      </CardHeader>

      <CardFooter className="flex items-center justify-between py-0 gap-4 ">
        <div className="text-xs font-medium p-1 rounded">
          Collected from{" "}
          <Link href={`/resource/${data.resource._id}`} className="font-bold underline ">
            Resource
          </Link>
          {" "} of {" "}
          <Link href={`/${data.resource.publisher._id}`} className="font-bold underline">
            {data.resource.publisher.name}
          </Link>
        </div>
        <section className="flex gap-1 text-xs items-center">
          <div className="gap-1 text-muted-foreground flex text-sm items-center">
            <p className="text-xs">{data.upvotes||"No upvotes "} </p>
            <AiFillFire
              fill="rgb(249 115 22)"
              className={"hover:text-orange-500 transition-colors text-balck"}
              size={18}
            />
          </div>
          <RemoveResource linkId={data._id}/>
        </section>
      </CardFooter>
    </Card>
  );
}

function RemoveResource({linkId}:{linkId:string,}) {
  const [open,setOpen]  = useState(false)
  const {mutateAsync:mutate,isLoading} = useRemoveLinkFromCollection(linkId)
  const collectionId = useParams().id  as string
  const handleRemove = async ()=>{
    await mutate({collectionId,linkId})
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={o=>!isLoading&&setOpen(o)}>
  <AlertDialogTrigger >
    <button disabled={isLoading} className=" transition-colors p-1 rounded">
      <Tooltip title="Remove from collection">
        <MdDeleteForever
          size={18}
          className={clsx("hover:bg-danger transition-colors",isLoading&&"animate-pulse")}
        />
      </Tooltip>
    </button>
    </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the resource and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleRemove} className="bg-red-500">{isLoading?<RequestLoader size="16"/>:"Delete"}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    
  );
}
