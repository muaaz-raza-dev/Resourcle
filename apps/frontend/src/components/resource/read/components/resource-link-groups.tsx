"use client";
import React from "react";
import ResourceEachLinkGroup from "./resource-each-link-group";
import { useRecoilValue } from "recoil";
import { useGetContentResource } from "@/hooks/resource/useGetResourceContent";
import { ResourceFilterLinksAtom } from "@/state/resource-link-searchbar.atom";
import ResourceLinkLoader from "./resource-link-loader";
import { FaUnlink } from "react-icons/fa";

export default function ResourceLinkGroups() {
  const { isLoading ,isSuccess} = useGetContentResource({ hitApi: true });
  const { filtered } = useRecoilValue(ResourceFilterLinksAtom);
  if (isLoading) return <ResourceLinkLoader />;
  return (
    <>
      {
        !isSuccess?
        null:
      !filtered.length ||
      (filtered.length == 1 && !filtered[0].links.length) ? (
        <div className="mt-6 ">
          <div className="center">
          <FaUnlink size={40} className="text-muted-foreground" />
          </div>
          <h1 className="font-bold text-xl text-center">
            No link found in resource
          </h1>
        </div>
      ) : (
        filtered.map((e) => <ResourceEachLinkGroup key={e.label} data={e} />)
      )}
    </>
  );
}


