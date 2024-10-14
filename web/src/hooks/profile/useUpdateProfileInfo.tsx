import UpdateProfileInfoApi from '@/api/profile/profile-info-update.api'
import { IuserProfile } from '@/types/IuserProfile'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

export default function useUpdateProfileInfo(reset?:(payload:IuserProfile)=>void) {
  return (
    useMutation({mutationFn:(payload:IuserProfile)=>UpdateProfileInfoApi(payload),
      onSuccess({payload}){
        toast.success('Profile updated successfully')
        reset?.(payload)
    },
    onError:({response:{data:{message}}})=>{
        toast.error(message||"Internal server error. Try again later...") }
})

  )
}
