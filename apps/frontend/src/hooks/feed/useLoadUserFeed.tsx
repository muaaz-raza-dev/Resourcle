import LoadUsersFeedApi from '@/api/feed/users-feed.api'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'

export default function useLoadUsersFeed() {
  return (
    useQuery({
        queryKey:["feed","users"],
        queryFn:()=>LoadUsersFeedApi(),
        enabled: true,
        refetchOnWindowFocus:false,
        refetchOnMount:true,
        retry:2,
        staleTime: 1000 * 60 * 5, // 5 minutes
        onError({response:{data:{message}}}){
            toast.error(message||"An error occured")
        }
    })
  )
}
