
import TrackUserVisitsApi from "@/api/user-activity/track-user-visits.api"
import { useQuery } from "react-query"

const useTrackUserVisit = ()=>{

    return useQuery({
        queryKey:"track user visit",queryFn:()=>TrackUserVisitsApi,
        refetchOnWindowFocus:false,staleTime:Infinity,
        refetchOnReconnect:false,
        
     })
}
export default useTrackUserVisit