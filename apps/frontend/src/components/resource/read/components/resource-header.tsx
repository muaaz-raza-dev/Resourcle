/* eslint-disable react/no-unescaped-entities */

import useCollectResourceView from "@/hooks/resource/useCollectResourceView";
import useGetNonContentResource from "@/hooks/resource/useGetNonContentResource";
import { Separator } from "@/shadcn/components/ui/separator";
import { ResourceFilterLinksAtom } from "@/state/resource-link-searchbar.atom";
import { accurateFromNow } from "@/utils/accurate-time-from-now";
import Image from "next/image";
import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";

export default function ResourceHeader() {
  useCollectResourceView();
  const { data } = useGetNonContentResource({ hitApi: false });
  const {original} = useRecoilValue(ResourceFilterLinksAtom)
  const totalResources = useMemo(
    () => original.reduce((acc, elm) => acc + elm.links.length, 0),
    [original]
  );
  return (
    <header>
      {data?.payload.banner ? (
        <Image
          src={data.payload.banner}
          alt="Resource Library Banner"
          width={800}
          height={200}
          unoptimized
          className="w-full h-40 object-contain mb-4 rounded-t-lg"
        />
      ) : null}
      <h1 className="text-5xl max-md:text-4xl font-black text-center">
        {data?.payload.title}
      </h1>
      <p className="text-muted-foreground text-center pt-2">
        {data?.payload.description}
      </p>
      {
        data?.payload.createdAt&&
      <p className="text-xs text-muted-foreground text-center">{accurateFromNow(data?.payload.createdAt)}</p>
      }
      <Separator className="my-2 w-[40%] mx-auto" />

      <div className="flex gap-2 justify-between  flex-wrap">
        <div className="flex gap-2">
          {data?.payload.isGroupLinks===false ?null :
          <p className="font-semibold text-muted-foreground text-[0.7rem] border rounded-md p-1 px-2">
            {original.length} resource groups
          </p>
          }
          <p className="font-semibold text-muted-foreground text-[0.7rem] border rounded-md p-1 px-2">
            {totalResources} links
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {data?.payload.tags.map((e) => (
            <div
              className="border rounded-md transition-transform p-1 px-2 hover:bg-muted text-xs font-semibold !bg-white text-primary "
              key={e._id}
            >
              # {e.name}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
