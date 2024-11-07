import { UserProfileResourceAtom } from '@/state/user-profile-resource.atom'
import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import EachResourceComponent from '../searched/each-resource-component';

export default function UserProfileOwnResources() {
  const {resources}  = useRecoilValue(UserProfileResourceAtom)
  const FlatResources = useMemo( () => Object.values(resources.resources).flat(), [resources.resources]);
  return FlatResources.map(resource => ( <EachResourceComponent key={resource._id} resource={resource}  /> ))
}
