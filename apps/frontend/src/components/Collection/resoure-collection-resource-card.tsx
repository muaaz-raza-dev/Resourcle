import React from "react";
import { Badge } from "@/shadcn/components/ui/badge";
import { Card, CardHeader, CardFooter } from "@/shadcn/components/ui/card";
import Link from "next/link";
import { AiFillFire } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "antd";
export default function ResoureCollectionResourceCard() {
  return (
    <Card className="flex flex-col !w-[49%] py-3 gap-3">
      <CardHeader className="flex flex-col gap-1 py-0">
        <div className="flex flex-col ">
          <Link
            href={"https://harkiratblogs.netlify.app/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold"
          >
            Harkirat Blogs
          </Link>
          <Link
            href={"https://harkiratblogs.netlify.app/"}
            rel="noopener noreferrer"
            target="_blank"
            className="text-sm block text-primary hover:underline py-0 leading-tight"
          >
            https://harkiratblogs.netlify.app
          </Link>
          <p className="text-muted-foreground text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            assumenda quaerat quidem voluptates veniam. Asperiores similique,
            commodi tempore, fugiat nisi ducimus
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            tags
          </Badge>
          <Badge variant="outline" className="text-xs">
            tags
          </Badge>
          <Badge variant="outline" className="text-xs">
            tags
          </Badge>
        </div>
      </CardHeader>

      <CardFooter className="flex items-center justify-between py-0 gap-4">
        <div className="text-xs font-medium p-1 rounded">
          Collected from{" "}
          <Link href="" className="font-bold">
            Resource
          </Link>{" "}
          of{" "}
          <Link href={""} className="font-bold">
            Mitchel Marsh
          </Link>
        </div>
        <section className="flex gap-2 text-xs items-center">
          <div className="gap-1 text-muted-foreground flex text-sm items-center">
            <p>120 </p>
            <AiFillFire
              fill="rgb(249 115 22)"
              className={"hover:text-orange-500 transition-colors text-balck"}
              size={18}
            />
          </div>
          <RemoveResource />
        </section>
      </CardFooter>
    </Card>
  );
}

function RemoveResource() {
  return (
    <button>
      <Tooltip title="Remove from collection">
        <MdDeleteForever
          size={18}
          className="hover:bg-danger transition-colors"
        />
      </Tooltip>
    </button>
  );
}
