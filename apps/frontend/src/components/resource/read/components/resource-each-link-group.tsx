import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { IresourceContent } from "@/types/Iresource";
import ResourceEachLinkComponent from "./resource-each-link-component";
import clsx from "clsx";

export default function ResourceEachLinkGroup({
  data,
  isGrouped
}: {
  data: IresourceContent;
  isGrouped:boolean
}) {
  return (
    <Card className={clsx(isGrouped===false &&"!py-0 !px-0 shadow-none border-none bg-transparent ")}>
      {
        isGrouped===false ? null 
        :
      <CardHeader className="pb-0 pt-5">
        <div className="flex justify-between border-b pb-2 items-center">
        <CardTitle className="text-xl font-bold ">{data.label}</CardTitle>
        <p className="text-sm font-semibold">{data.links.length} links</p>
        </div>
      </CardHeader> 
      }
      <CardContent className={clsx(isGrouped===false&&"!px-0 !p-0")} >
        <ul className="flex flex-col gap-2 w-full">
          {data.links.map((resource, index) => (<ResourceEachLinkComponent   key={index+resource.url} data={resource} className={clsx(isGrouped===false &&'bg-white border shadow p-4 rounded-md py-5')} index={index}/>))}
        </ul>
      </CardContent>
    </Card>
  );
}
