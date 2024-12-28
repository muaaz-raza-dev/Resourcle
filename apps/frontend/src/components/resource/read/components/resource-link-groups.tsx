"use client"
import React from 'react'
import ResourceEachLinkGroup from './resource-each-link-group'
import { useRecoilValue } from 'recoil'
import { ResourceSearchBarAtom } from '@/state/resource-link-searchbar.atom'

export default function ResourceLinkGroups() {
    const {filtered} = useRecoilValue(ResourceSearchBarAtom)
  return (
    <>
            {  filtered.map(e=><ResourceEachLinkGroup key={e.label} data={e}/>)  }
            {filtered.length === 0 && <p className="text-center text-gray-700 font-semibold">No resources found</p>}
    </>
  )
}
