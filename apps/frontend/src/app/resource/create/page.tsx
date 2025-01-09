import CreateResourceForm from '@/components/resource/create/create-resource-form'
import { Metadata } from 'next'
import React from 'react'
export const metadata :Metadata={
  robots:"nofollow noindex"
}
export default function ResourceCreatePage() {
  return (
<CreateResourceForm/>
  )
}        
