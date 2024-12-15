import CreateResourceApi from '@/api/resource/create-resource.api'
import { IResource } from '@/types/Iresource'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

export default function useCreateResource() {
  const router = useRouter()
  return (
    useMutation({mutationKey:"New Resource",mutationFn:(payload:IResource)=>CreateResourceApi(payload),
        onSuccess(){
            toast.success("Resource is uploaded successfully! 🎉")
            router.push("/")

        },
          onError({response:{data:{message}}}){
            console.error("Error creating resource", message)
        }
    })
  )
}
