import { Button } from '@/shadcn/components/ui/button'
import React from 'react'
import RequestLoader from '../loader/request-loading'
import { useFormContext } from 'react-hook-form'
import { IuserProfile } from '@/types/IuserProfile'

export default function ProfileFormSubmit({isLoading}:{isLoading:boolean}) {
    const {formState}  = useFormContext<IuserProfile>()
  return (
    <Button  className='max-md:w-full bg-secondary-foreground hover:bg-secondary-foreground' disabled={formState.isLoading||!formState.isDirty||!formState.isValid||isLoading} type="submit">
    {isLoading?<RequestLoader size="22"  /> :
    
     "Update"
    }
    </Button>
  )
}
