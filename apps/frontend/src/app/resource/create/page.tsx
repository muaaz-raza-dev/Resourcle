import ConfirmBeforeUnload from '@/components/resource/create/components/confirm-before-reload-component'
import CreateResourceForm from '@/components/resource/create/create-resource-form'
import VerificationRestrictionResourceCreationDialog from '@/components/resource/create/verification-restriction-resource-creation-dialog'
import { Metadata } from 'next'
import React from 'react'
export const metadata :Metadata={
  robots:"nofollow, noindex",
  title:"Create Resource",
  description:"Create a new resource",
  keywords:"resource, create resource , new resource , add resource , resource creation , resource form , resource details , resource metadata , resource content , resource type , resource category , resource tags , resource visibility , resource access , resource restrictions , resource verification , resource creation form , resource creation details , resource creation metadata , resource creation content , resource creation type , resource creation category , resource creation tags , resource creation visibility , resource creation access , resource creation restrictions , resource creation verification , resource creation form details , resource creation form metadata , resource creation form content , resource creation form type , resource creation form category , resource creation form tags , resource creation form visibility , resource creation form access , resource creation form restrictions , resource creation form verification"

}
export default function ResourceCreatePage() {
  return (
    <>
<ConfirmBeforeUnload/>
<VerificationRestrictionResourceCreationDialog/>
<CreateResourceForm/>
    </>
  )
}        
