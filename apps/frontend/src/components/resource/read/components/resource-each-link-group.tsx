import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { IresourceContent } from "@/types/Iresource";
import ResourceEachLinkComponent from "./resource-each-link-component";

export default function ResourceEachLinkGroup({
  data,
}: {
  data: IresourceContent;
}) {
  return (
    <Card className="">
      <CardHeader className="pb-0 pt-5">
        <div className="flex justify-between border-b pb-2 items-center">
        <CardTitle className="text-xl font-bold ">{data.label}</CardTitle>
        <p className="text-sm font-semibold">{data.links.length} links</p>
        </div>
      </CardHeader>
      <CardContent >
        <ul className="flex flex-col gap-1">
          {data.links.map((resource, index) => (<ResourceEachLinkComponent   key={index+resource.url} data={resource} index={index}/>))}
        </ul>
      </CardContent>
    </Card>
  );
}
