import { Button } from '@/shadcn/components/ui/button'
import React from 'react'
import TagsResourceForm from './tags-resource-form'
import RequestLoader from '@/components/loader/request-loading'

export default function ResourceFormFooter({isLoading}:{isLoading:boolean}) {
  return (
    <footer className='w-full fixed bottom-0 max-w-5xl pr-6 border-t bg-background h-max justify-between flex py-2'>
    <TagsResourceForm/>
      <Button disabled={isLoading} type='submit' className='font-semibold  hover:brightness-1100 transition-all'>
        { isLoading? <RequestLoader size='16' /> : 'Launch 🚀' }
      </Button>
    </footer>
  )
}
