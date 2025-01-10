import CreateResourceForm from '@/components/resource/create/create-resource-form'
import VerificationRestrictionResourceCreationDialog from '@/components/resource/create/verification-restriction-resource-creation-dialog'
import React from 'react'

export default function MainEditPage() {
  return (
    <>
    <VerificationRestrictionResourceCreationDialog/>
    <CreateResourceForm edit={true}/>
    </>
  )
}
