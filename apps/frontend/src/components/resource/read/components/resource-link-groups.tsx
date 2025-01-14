"use client"
import React from 'react'
import ResourceEachLinkGroup from './resource-each-link-group'
import { useRecoilValue } from 'recoil'
import { ResourceSearchBarAtom } from '@/state/resource-link-searchbar.atom'

export default function ResourceLinkGroups() {
    const {filtered} = useRecoilValue(ResourceSearchBarAtom)
  return (
    <>
            {!filtered.length || (filtered.length==1&&!filtered[0].links.length) ?
            <div className='mt-6'>
            <h1 className='font-bold text-xl text-center'>No Links in resource</h1>
             <p className="text-center text-muted-foreground text-sm  font-semibold">No Links here .I agree , It is embarassing for a resource to have no links .</p>
            </div>
             :
               filtered.map(e=><ResourceEachLinkGroup key={e.label} data={e}/>)  
            }
    </>
  )
}
