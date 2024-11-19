import SwitchVisiblityResourceApi from '@/api/resource/switch-visiblity-resource.api'
import {toast} from "react-hot-toast"
import { useMutation } from 'react-query'
  
  export default function useSwitchResourceVisiblity(setPrivate:React.Dispatch<React.SetStateAction<boolean>>) {
  return (
    useMutation({
        mutationFn:(id:string)=>SwitchVisiblityResourceApi(id),
        onSuccess({payload:{isPrivate}}) {
            toast.success(!isPrivate ? "Resource switched to public feed": "Resource switched to private feed")
            setPrivate(isPrivate)
        },
        onError({response:{data:{message}}}) {
            toast.error(message || "Internal server error. Try again later...")  
        }
    })
  )
}
