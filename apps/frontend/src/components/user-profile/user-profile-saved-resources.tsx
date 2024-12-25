/* eslint-disable react/no-unescaped-entities */
import { UserProfileResourceAtom } from "@/state/user-profile-resource.atom";
import React, { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import EachResourceComponent from "../searched/resource/each-resource-component";
import RequestLoader from "../loader/request-loading";
import useGetUserSavedResource from "@/hooks/user-profile/useGetUserSavedResource";
import { UseMutationResult } from "react-query";
import { Button } from "@/shadcn/components/ui/button";
const countPerRequest = +process.env.NEXT_PUBLIC_SEARCH_LIMIT || 10;
export default function UserProfileSavedResources() { 
  const [{saved: { resources, total, count, isLoading },},setState,] = useRecoilState(UserProfileResourceAtom);
  const mutateObject = useGetUserSavedResource();
  const FlatResources = useMemo(
    () => Object.values(resources).flat(),
    [resources]
  );
  useEffect(() => {
    if (!total) mutateObject.mutate(undefined);
  }, []);

  function OnFire() {
    setState((s) => ({
      ...s,
      saved: { ...s.saved, count: s.saved.count + 1, isLoading: true },
    }));
  }
  return (
    <main className="flex flex-col gap-2">
      <p className="text-muted-foreground">{total} resources</p>
      {FlatResources.map((resource,index) => (
        <EachResourceComponent index={index} key={resource?._id} resource={resource} />
      ))}
      <div className="center">
        {isLoading ? (
          <RequestLoader />
        ) : total < (count + 1) * countPerRequest ? (
          <p className="text-muted-foreground text-sm">
            {total==0&&"No resource is published yet" }
          </p>
        ) : (
        <LoadMoreButton onFire={OnFire} count={count} mutateObject={mutateObject} />
        )}
      </div>
    </main>
  );
}

export function LoadMoreButton({
    mutateObject,
    onFire,
    count,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutateObject: UseMutationResult<any, unknown,  any, unknown>;
    onFire: () => void;
    count: number;
  }) {
  function handleLoadMore() {
    onFire();
    mutateObject.mutate({ count: count + 1 });
  }

  return (
    <Button
      className=" my-4 mx-auto"
      variant={"secondary"}
      onClick={handleLoadMore}
      disabled={mutateObject.isLoading}
    >
      {mutateObject.isLoading ? <RequestLoader /> : "Load more"}
    </Button>
  );
}
