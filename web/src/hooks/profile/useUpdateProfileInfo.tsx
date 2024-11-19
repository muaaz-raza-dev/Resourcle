import UpdateProfileInfoApi, { UpdateUsernameApi } from '@/api/profile/profile-info-update.api'
import { IuserProfile } from '@/types/IuserProfile'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

export default function useUpdateProfileInfo(reset?:(payload:IuserProfile)=>void) {
  return (
    useMutation({mutationFn:(payload:Omit<IuserProfile,"username">)=>UpdateProfileInfoApi(payload),
      onSuccess({payload}){
        toast.success('Profile updated successfully')
        reset?.(payload)
    },
    onError:({response:{data:{message}}})=>{
        toast.error(message||"Internal server error. Try again later...") }
})

  )
}


export  function useUpdateProfileUsername(reset?:(payload:unknown)=>void) {
  return (
    useMutation({mutationFn:(username:string)=>UpdateUsernameApi(username),
      onSuccess({payload}){
        toast.success('username updated successfully')
        reset?.({username:payload.username})
    },
    onError:({response:{data:{message}}})=>{
        toast.error(message||"Internal server error. Try again later...") }
})

  )
}
