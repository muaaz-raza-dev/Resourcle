import ValidateUsernameApi from '@/api/resource/validate-username.api'
import { useMutation } from 'react-query'

export default function useValidateUsername() {
  return (
    useMutation({mutationFn:(val:string)=>ValidateUsernameApi(val),})
  )
}
