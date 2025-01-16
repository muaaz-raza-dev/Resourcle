"use client"
import {  TrackUserResourceVisitsApi } from "@/api/user-activity/track-user-visits.api"
import { useParams } from "next/navigation"
import { useQuery } from "react-query"

const useTrackUserResourceVisit = ()=>{
    const id = useParams().id as string;
    return useQuery({
        queryKey:["track user profile visit",id],
        queryFn:()=>TrackUserResourceVisitsApi(id),
        refetchOnWindowFocus:false,staleTime:Infinity,
        refetchOnReconnect:false,
     })
}
export default useTrackUserResourceVisit