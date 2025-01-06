
import LoadTagFeedApi from '@/api/feed/tags-feed.api'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'

export default function useLoadTagsFeed() {
  return (
    useQuery({
        queryKey:["feed","tags"],
        queryFn:LoadTagFeedApi,
        refetchOnWindowFocus:false,
        retry:2,
        staleTime:Infinity, // 5 minutes
        onError({response:{data:{message}}}){
            toast.error(message||"An error occured")
        }
    })
  )
}
