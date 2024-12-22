import LoadResourceFeedApi from '@/api/feed/resource-feed.api'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'

export default function useLoadResourceFeed() {
  return (
    useQuery({
        queryKey:["feed","resource"],
        queryFn:LoadResourceFeedApi,
        enabled: true,
        refetchOnWindowFocus:false,
        retry:2,
        staleTime: 1000 * 60 * 5, // 5 minutes
        onError({response:{data:{message}}}){
            toast.error(message||"An error occured")
        }
    })
  )
}
