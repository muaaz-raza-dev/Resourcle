"use client";
import GetUserResourceApi from "@/api/user-profile/get-user-resources.api";
import {
  SearchedSortOptions,
} from "@/state/search-resource.atom";
import { UserProfileResourceAtom } from "@/state/user-profile-resource.atom";
import { useParams } from "next/navigation";
import { useMutation } from "react-query";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function useGetUserResources() {
  const [{ resources:{count, sort: sortP,isPrivate,},userid:RecoiledUserId },setValue] = useRecoilState(UserProfileResourceAtom);
  const resetState = useResetRecoilState(UserProfileResourceAtom)
  const userid  = useParams().user as string
  console.log(userid)
  return useMutation({
    mutationKey: ["User",  sortP,userid,count],
    onMutate:()=>{
      if(RecoiledUserId!=userid){
        resetState()
      }
      setValue(val=>({...val,resources:{...val.resources,isLoading:true,},userid}))
      
      },
    mutationFn: (directPayload?: {
      search ?: string;
      sort?: SearchedSortOptions;
      count?: number;
      isPrivate?:boolean
    }) => {
     return GetUserResourceApi({
        count: directPayload?.count ?? count,
        sort: directPayload?.sort ?? sortP ,
        isPrivate: directPayload?.isPrivate ?? isPrivate,
        userid:userid??null
      })
    },
    onSuccess({ payload: { resources, total } }) {
      setValue((val) => ({
        ...val,
        resources:{...val.resources, resources:{...val.resources.resources,[val.resources.count]:resources},total },
      }));
    },
    onError({
      response: {
        data: { message },
      },
    }) {
      console.error("Error creating resource", message);
    },
    onSettled() {
      setValue(val=>({...val,resources:{...val.resources,isLoading:false,}}))
    },
  });
}
