import LoadResourceFeedApi from '@/api/feed/resource-feed.api'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'

export default function useLoadResourceFeed() {
  return (
    useQuery({
        queryKey:["feed","resource"],
        queryFn:LoadResourceFeedApi,
        refetchOnWindowFocus:false,
        refetchOnMount:true,
        retry:2,
        onError({response:{data:{message}}}){
            toast.error(message||"An error occured")
        }
    })
  )
}
