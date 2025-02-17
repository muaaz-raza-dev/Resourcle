import React from 'react'
import { useRecoilValue } from 'recoil'
import { searchedAtom } from '@/state/search-resource.atom'
import ResourceEachLinkComponent from '@/components/resource/read/components/resource-each-link-component';



export default function LinksListSearchedComponent(
) {
  const {  payload:{links} } = useRecoilValue(searchedAtom);
  return (
    links.map((link,index) => ( <ResourceEachLinkComponent className='bg-white border shadow p-4 rounded-md py-5' data={link}  key={link._id} index={index}/> ))
  )
}
