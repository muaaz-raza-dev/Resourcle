"use client";
import SearchResourceApi from "@/api/resource/search-resouce.api";
import {
  searchedResourcesAtom,
  SearchedSortOptions,
} from "@/state/search-resource.atom";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
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
    onMutate(){
      setValue((val) => ({...val, isLoading:true }));
    },
    onSuccess({ payload: { resources, total } }) {
      setValue((val) => ({
        ...val,
        resources: { ...val.resources, [val.count]: resources },
        total,
      }));
    },
    onSettled(){
      setValue((val) => ({...val, isLoading:false }));
    },
    onError({
      response: {
        data: { message },
      },
    }) {
      toast.error(message)
    },
  });
}
