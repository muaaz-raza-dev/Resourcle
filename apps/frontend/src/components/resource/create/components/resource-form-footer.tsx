import { Button } from '@/shadcn/components/ui/button'
import React from 'react'
import TagsResourceForm from './tags-resource-form'
import RequestLoader from '@/components/loader/request-loading'
import PublicPrivateSwitchResourceForm from './public-private-switch-resource-form'

export default function ResourceFormFooter({isLoading,edit}:{isLoading:boolean;edit?:boolean}) {
  return (
    <footer  className='  max-w-5xl pr-6 border-t h-max  flex justify-between gap-4 py-2 pb-4'>
    <TagsResourceForm/>
    <div className="flex gap-4 self-end justify-end full">
    <PublicPrivateSwitchResourceForm/>
      <Button disabled={isLoading} type='submit' className='font-semibold  hover:brightness-1100 transition-all'>
        { isLoading? <RequestLoader size='16' /> : !edit? 'Launch 🚀':" Update " }
      </Button>
    </div>
    </footer>
  )
}
