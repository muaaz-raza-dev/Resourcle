/* eslint-disable react/no-unescaped-entities */
import { UserProfileResourceAtom } from "@/state/user-profile-resource.atom";
import React, { useMemo } from "react";
import { useRecoilState } from "recoil";
import EachResourceComponent from "../searched/resource/each-resource-component";
import RequestLoader from "../loader/request-loading";
import { LoadMoreButton } from "./user-profile-saved-resources";
import useGetUserResources from "@/hooks/user-profile/useGetUserResource";
const countPerRequest  =+process.env.NEXT_PUBLIC_SEARCH_LIMIT||10;
export default function UserProfileOwnResources() {
  const [{resources: { resources, isLoading,total,count },},setState] = useRecoilState(UserProfileResourceAtom);
  const mutateObject=  useGetUserResources()
  const FlatResources = useMemo(() => Object.values(resources).flat(),[resources]);
    const  OnFire=() => setState((s) => ({ ...s,resources: { ...s.resources, count: s.resources.count + 1, isLoading: true },})); 
  return (
    <>
      {FlatResources.map((resource,index) => (
        <EachResourceComponent index={index} key={resource._id} resource={resource} />
      ))}
      <div className="center">
      {isLoading ? <RequestLoader/>:
      total < ((count+1)*countPerRequest) ?
      <p className="text-muted-foreground text-sm">
        {total==0 && "No resource is published yet"}
      </p>
      :<LoadMoreButton mutateObject={mutateObject } count={count} onFire={OnFire}  />
      }
      </div>
    </>
  );
}
