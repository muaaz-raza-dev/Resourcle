import { Button } from '@/shadcn/components/ui/button'
import React from 'react'
import RequestLoader from '../loader/request-loading'

export default function ProfileFormSubmit({isLoading}:{isLoading:boolean}) {

  return (
    <Button disabled={isLoading} type="submit">
    {isLoading?<RequestLoader size="22"  /> : "Update"}
    </Button>
  )
}
