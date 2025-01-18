"use client";
import React from "react";
import ResourceMeta from "./components/resource-meta";
import ResourceHeader from "./components/resource-header";
import   { ResourceMetaLoader } from "./components/resource-loader";
import ResourceNotFoundPage from "@/app/resource/[id]/not-found";
import ResourceSearchbar from "./components/resource-searchbar";
import ResourceLinkGroups from "./components/resource-link-groups";
import useGetNonContentResource from "@/hooks/resource/useGetNonContentResource";
import moment from "moment";

export default function ResourcesPage() {
  const { data, isLoading, error } = useGetNonContentResource({ hitApi: true });
  if (error) return <ResourceNotFoundPage />;
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <main className="flex-grow flex flex-col gap-2 container mx-auto md:px-8 max-md:px-2 py-6">
{
  isLoading?
   <ResourceMetaLoader/>
  :
<>
          <ResourceHeader />
          <ResourceMeta />
          <ResourceSearchbar />
          <div className="flex gap-2 items-center text-muted-foreground text-xs ">
            <p className="border-r pr-2">Last updated at </p>
            <p className="">
              {moment(data?.payload.updatedAt).format("hh:mma  DD-MM-Y ")}
            </p>
          </div>
</>
}
          <ResourceLinkGroups />
        </main>
      </div>
    </>
  );
}
