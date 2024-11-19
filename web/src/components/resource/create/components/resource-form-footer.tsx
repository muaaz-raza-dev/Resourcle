import { Button } from '@/shadcn/components/ui/button'
import React from 'react'
import TagsResourceForm from './tags-resource-form'
import RequestLoader from '@/components/loader/request-loading'
import PublicPrivateSwitchResourceForm from './public-private-switch-resource-form'

export default function ResourceFormFooter({isLoading}:{isLoading:boolean}) {
  return (
    <footer className='w-full fixed bottom-0 max-w-5xl pr-6 border-t bg-background h-max  flex justify-between gap-4 py-2 pb-4'>
    <TagsResourceForm/>

    <div className="flex gap-4 self-end justify-end full">
    <PublicPrivateSwitchResourceForm/>
      <Button disabled={isLoading} type='submit' className='font-semibold  hover:brightness-1100 transition-all'>
        { isLoading? <RequestLoader size='16' /> : 'Launch 🚀' }
      </Button>
    </div>
    </footer>
  )
}
