import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import useFetchSecurityInfo from '@/hooks/settings/useFetchSecurityInfo';
import { Button } from '@/shadcn/components/ui/button';
import { FaCheckCircle } from 'react-icons/fa';
import SecurityAccountEmailVerificationTriggerDialog from './security-account-email-verification-trigger-dialog';

export default function SecurityAccountEmailVerificationSettings() {
  const { data } = useFetchSecurityInfo();
  const q = data?.payload;
  if(!q) return null
  return (
    <Card className="bg-transparent shadow-none border-none rounded-none">
    <CardHeader>
    <CardTitle className="text-2xl font-bold">Email verfication </CardTitle>
    <CardDescription>
      Verification status of your email address .
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className='flex justify-between'>
      <div className="">
        <h1 className='text-base font-semibold leading-tight'>{q.email}</h1>
          {q.email_verified?
        <p className='text-muted-foreground text-xs text-green-600'>
          Your email is verified
        </p>
        :
        <p className='text-muted-foreground text-xs text-red-600'>
          Your email is not verified .
        </p>
        }

      </div>
      {
        !q.email_verified?
        <SecurityAccountEmailVerificationTriggerDialog email={q.email}/>
      :
      <Button className='bg-green-100 hover:bg-green-200 border shadow-none '>
        <FaCheckCircle className='text-green-900'/>
      </Button> 
      }
    </div>
  </CardContent>
    </Card>
  )
}
