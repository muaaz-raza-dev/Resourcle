import { Button } from '@/shadcn/components/ui/button'
import React from 'react'
import TagsResourceForm from './tags-resource-form'
import RequestLoader from '@/components/loader/request-loading'
import PublicPrivateSwitchResourceForm from './public-private-switch-resource-form'
import { useFormContext } from 'react-hook-form'
import { IResource } from '@/types/Iresource'
import { useTrackChanges } from '@/hooks/utils/useTrackChanges'

export default function ResourceFormFooter({isLoading,edit,isSuccess}:{isLoading:boolean;edit?:boolean;isSuccess?:boolean}) {
  const {watch} = useFormContext<IResource>()
  const content = watch("content")
  return (
    <footer  className='  max-w-5xl border-t h-max  flex justify-between gap-4 py-4  flex-col'>
    <TagsResourceForm/>
    <PublicPrivateSwitchResourceForm/>
        
    {
      edit ? 
      <UpdateButton isLoading={isLoading} isSuccess={isSuccess}/>
      :
      <Button disabled={isLoading} type='submit' className='font-semibold bg-secondary-foreground  hover:bg-secondary-foreground transition-all'>
        { isLoading? <RequestLoader size='16' /> : 'Launch 🚀'}
      </Button>
    }
    {
      !content.length&&
    <p className="text-orange-400 text-sm text-center">
    Link is required to launch a resource
      </p>        
    
    }
    </footer>
  )
}


function UpdateButton({isLoading,isSuccess}:{isLoading:boolean;isSuccess?:boolean}){
  const state  = useFormContext<IResource>()
  const {changes,UpdateState} = useTrackChanges(state.watch())
  React.useEffect(() => {
  if(isSuccess) UpdateState(state.watch())
  }, [isSuccess])
  return (
    <Button type='submit' className='font-semibold  bg-secondary-foreground  hover:bg-secondary-foreground  transition-all' disabled={isLoading||!changes}>
      { isLoading? <RequestLoader size='16' /> : 'Update'}
    </Button>
  )
}