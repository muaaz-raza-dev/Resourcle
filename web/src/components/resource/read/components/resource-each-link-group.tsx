import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Badge } from "@/shadcn/components/ui/badge";
import { Tooltip } from "antd";
import Link from "next/link";
import { IresourceContent } from "@/types/Iresource";
import clsx from "clsx";
export default function ResourceEachLinkGroup({
  data,
}: {
  data: IresourceContent;
}) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">{data.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data.links.map((resource, index) => (
            <li
              key={resource.url}
              className="flex items-center justify-between"
            >
              <div className="flex gap-2">
                <Badge variant="outline" className="mr-2">
                  {index + 1}
                </Badge>
                <Tooltip title={resource.description}>
                  <Link
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {resource.title}
                  </Link>
                </Tooltip>
              </div>
              <div className="flex gap-2">
                {resource.consumption_time && (
                  <Tooltip title="Consumption time">
                    <Badge variant="secondary" className="mr-2">
                      {resource?.consumption_time}
                    </Badge>
                  </Tooltip>
                )}
                {resource.level_information && (
                  <Tooltip title="Level of information">
                    <Badge variant="secondary" className="mr-2">
                      {resource?.level_information}
                    </Badge>
                  </Tooltip>
                )}
                <Badge
                  variant="secondary"
                  className={clsx(
                    "mr-2 ",
                    resource.isPaid
                      ? "bg-yellow-500 hover:bg-yellow-500"
                      : "bg-green-700 hover:bg-greeen-700"
                  )}
                >
                  {resource?.isPaid ? "Premium" : "Free"}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
