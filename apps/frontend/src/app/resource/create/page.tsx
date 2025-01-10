import CreateResourceForm from '@/components/resource/create/create-resource-form'
import VerificationRestrictionResourceCreationDialog from '@/components/resource/create/verification-restriction-resource-creation-dialog'
import { Metadata } from 'next'
import React from 'react'
export const metadata :Metadata={
  robots:"nofollow noindex"
}
export default function ResourceCreatePage() {
  return (
    <>
<VerificationRestrictionResourceCreationDialog/>
<CreateResourceForm/>
    </>
  )
}        
