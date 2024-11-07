"use client";
import SearchResourceApi from "@/api/resource/search-resouce.api";
import {
  searchedResourcesAtom,
  SearchedSortOptions,
} from "@/state/search-resource.atom";
import { useSearchParams } from "next/navigation";
import { useMutation } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function useSearchResource() {
  const s = useSearchParams();
  const { count, sort: sortP } = useRecoilValue(searchedResourcesAtom);
  const setValue = useSetRecoilState(searchedResourcesAtom);
  const search = s.get("search") || "";

  return useMutation({
    mutationKey: ["Resource", search, sortP],
    mutationFn: (directPayload?: {
      search ?: string;
      sort?: SearchedSortOptions;
      count?: number;
    }) => {
     return SearchResourceApi({
        count: directPayload?.count || count,
        search: directPayload?.search || search,
        sort: directPayload?.sort || sortP || "upvotes",
      })
    },
    onSuccess({ payload: { resources, total } }) {
      setValue((val) => ({
        ...val,
        resources: { ...val.resources, [count]: resources },
        total,
      }));
    },
    onError({
      response: {
        data: { message },
      },
    }) {
      console.error("Error creating resource", message);
    },
  });
}
