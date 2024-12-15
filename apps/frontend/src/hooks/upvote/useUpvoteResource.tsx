import UpvoteResourceApi from '@/api/upvote/upvote.api'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

export default function useUpvoteResource() {
  return (
    useMutation({mutationKey:"upvote post",mutationFn:UpvoteResourceApi,onError() {
        toast.error("An Error occured.")
    },})
  )
}
