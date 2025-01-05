"use client"
import { TrackUserProfileVisitsApi } from "@/api/user-activity/track-user-visits.api"
import { useParams } from "next/navigation"
import { useQuery } from "react-query"

const useTrackUserProfileVisit = ()=>{
    const id = useParams().user as string;
    return useQuery({
        queryKey:["track user profile visit",id],
        queryFn:()=>TrackUserProfileVisitsApi(id),
        refetchOnWindowFocus:false,staleTime:Infinity,
        refetchOnReconnect:false,
     })
}
export default useTrackUserProfileVisit