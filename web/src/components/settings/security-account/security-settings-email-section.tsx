import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import { Button } from "@/shadcn/components/ui/button"
import useFetchSecurityInfo from "@/hooks/settings/useFetchSecurityInfo"
import { FormEventHandler, ReactNode, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shadcn/components/ui/dialog"
import useRequestEmailChange from "@/hooks/auth/useRequestChangeEmail"
import RequestLoader from "@/components/loader/request-loading"
import { isValidEmail } from "@/utils/validate-email"
export default function SecuritySettingsEmailSection() {
    const  [newEmail,setNewEmail]=useState("")
    const {data } =  useFetchSecurityInfo()
    const q=data?.payload;
    const isDisabled= useMemo( ()=>!isValidEmail(newEmail),[newEmail])
  return (
    <Card className="bg-transparent shadow-none border-none rounded-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Update Email</CardTitle>
        <CardDescription>
          Use the form below to update your email.
        </CardDescription>
      </CardHeader>

      <CardContent>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-email">Current Email</Label>
            <Input
            value={q?.email}
              id="current-email"
              type="email"
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-email">New Email</Label>
            <Input
            value={newEmail}
            onChange={({target:{value}})=>setNewEmail(value)}
              id="new-email"
              type="email"
              placeholder="Enter new email"
            />
          </div>
<NewEmailTriggerButtonDialog new_email={newEmail} disabled={isDisabled}>
          <Button
          disabled={isDisabled}
            className="w-full"
          >
            Send Verification Link
          </Button>
</NewEmailTriggerButtonDialog>
        </div>
      </CardContent>
    </Card> 
  )
}


function NewEmailTriggerButtonDialog({new_email,children,disabled}:{new_email:string;children:ReactNode,disabled?:boolean}){
  const [open, setOpen] = useState(false)
  const [password,setPassword] = useState("")
  const {data } =  useFetchSecurityInfo()
  const {mutateAsync,isLoading} = useRequestEmailChange()
  const handleSubmit: FormEventHandler<HTMLFormElement>=async(e)=>{
  e.preventDefault()
  await mutateAsync({new_email,password})   
  setOpen(false)
  }

  return(
    <Dialog open={open} onOpenChange={o=>!isLoading&&setOpen(o)} >
  <DialogTrigger asChild disabled={disabled}>
    {children}
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Change Email Address</DialogTitle>
      <DialogDescription>
        Enter your new email address and current password to update your account.
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        {
          data?.payload.provider != "google" ? 
        <div className="">
          <Label htmlFor="password" >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="col-span-3"
            required
          />
        </div> : null
          }
      </div>
      <DialogFooter>
        <Button className="w-full" type="submit" disabled={ (data?.payload.provider != "google" && password == "") || isLoading}>
          {isLoading? <RequestLoader size="22" /> : " Send Verification Link"}
        </Button>
      </DialogFooter>
    </form>
   
    <div className="mt-4 text-sm text-muted-foreground">
      <h4 className="font-semibold">Guidelines:</h4>
      <ul className="list-disc list-inside">
        <li>Use a valid email address you have access to</li>
        <li>You&apos;ll need to verify your new email address</li>
        <li>Your current email will remain active until verification</li>
        <li>For security, you may be logged out after changing your email</li>
      </ul>
    </div>
  </DialogContent>
</Dialog>)
}