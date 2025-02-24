import { IResource } from '@/types/Iresource';
import { Tooltip } from 'antd'
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

export default function SwitchLinkPositionWithinGroupResourceForm({linkIndex,groupIndex}:{linkIndex:number;groupIndex:number}) {
  const form= useFormContext<IResource>()
  function MoveLinkWithinGroup(up:1|0){
      const totalLinkLength = form.getValues(`content.${groupIndex}.links`).length;
      const currentLink = form.getValues(`content.${groupIndex}.links.${linkIndex}`)
      if((up&& linkIndex==0 )|| (!up && (linkIndex==totalLinkLength-1))){
        return ;
      }
      const updatedPayload  = form.getValues(`content.${groupIndex}.links`).map((link,i,linkArray)=>{
        if(up){

          if(i==linkIndex){
            return linkArray[i-1]
          }
          else if(i==(linkIndex-1)){
            return currentLink
          }
          else {
            return link;
          }
        }
        else{
            if(i==linkIndex){
              return linkArray[i+1]
            }
            else if(i==(linkIndex+1)){
              return currentLink
            }
            else {
              return link;
            }
        }
      })
    
    form.setValue(`content.${groupIndex}.links`,updatedPayload)      
  }
  return (
    <section className="border rounded-md  flex  " key={linkIndex} >
      <Tooltip title="move down">

    <button
    type="button"
    onClick={()=>MoveLinkWithinGroup(0)}
    className="`relative aspect-square  md:text-xs text-sm font-semibold   h-8 hover:bg-border transition-colors    p-1 px-2"
    >
  <FaArrowDown />
  </button>
    </Tooltip>
  <Tooltip title="move up">
  <button
  onClick={()=>MoveLinkWithinGroup(1)}
    type="button"
    className="`relative aspect-square border-l  md:text-xs text-sm font-semibold  h-8 hover:bg-border transition-colors  p-1 px-2"
    >
    <FaArrowUp />
  </button>
    </Tooltip>
    </section>
  )
}
