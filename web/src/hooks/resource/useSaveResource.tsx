import SaveResourceApi from '@/api/resource/save-resource.api'
import { useMutation } from 'react-query'

export default function useSaveResource() {
  return (
    useMutation({
        mutationKey:["save","resource"],
        mutationFn:(id:string)=>SaveResourceApi(id),
          onError(){
            console.error("An error occured.try again later")
        }
    })
  )
}
