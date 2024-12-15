import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { IresourceContent } from "@/types/Iresource";
import ResourceEachLinkComponent from "./resource-each-link-component";
import { useParams } from "next/navigation";

export default function ResourceEachLinkGroup({
  data,
}: {
  data: IresourceContent;
}) {
  const resource_id = (useParams().id || "" ) as string
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3 pt-5">
        <div className="flex justify-between items-center">
        <CardTitle className="text-xl ">{data.label}</CardTitle>
        <p className="text-sm font-semibold">{data.links.length} links</p>
        </div>
      </CardHeader>
      <CardContent >
        <ul className="flex flex-col gap-1">
          {data.links.map((resource, index) => (<ResourceEachLinkComponent resource_id={resource_id}  key={index+resource.url} data={resource} index={index}/>))}
        </ul>
      </CardContent>
    </Card>
  );
}
