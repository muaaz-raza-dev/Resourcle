"use client";
import SearchResourceApi from "@/api/resource/search-resouce.api";
import {
  searchedAtom,
  SearchedSortOptions,
} from "@/state/search-resource.atom";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function useSearchResource() {
  const s = useSearchParams();
  const { count, filters:{resources:{sort,categories}}} = useRecoilValue(searchedAtom);
  const setValue = useSetRecoilState(searchedAtom);
  const search = s.get("search") || "";

  return useMutation({
    mutationKey: ["Resource", search, sort],
    mutationFn: (directPayload?: {
      search ?: string;
      sort?: SearchedSortOptions;
      count?: number;
      categories?: string[]
    }) => {
     return SearchResourceApi({
        count: directPayload?.count ?? count,
        search: directPayload?.search ?? search,
        sort: directPayload?.sort ?? sort  ?? "upvotes",
        categories:directPayload?.categories??categories ?? []
      })
    },
    onMutate(){
      setValue((val) => ({...val, isLoading:true }));
    },
    onSuccess({ payload: { resources, total } }) {
      setValue((val) => ({
        ...val,
          payload:{
            ...val.payload,
            resources: val.payload.resources.concat(resources),
          },
        total
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
