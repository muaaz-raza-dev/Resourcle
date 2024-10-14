"use client";
import { Input } from "@/shadcn/components/ui/input"
import { Button } from "@/shadcn/components/ui/button"
import { Label } from "@/shadcn/components/ui/label"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { IuserProfile } from "@/types/IuserProfile"
import GetProfileInfoApi from "@/api/profile/profile-info.api"
import { Textarea } from "@/shadcn/components/ui/textarea";
import ProfileLinkField from "./profile-link-field";
import useUpdateProfileInfo from "@/hooks/profile/useUpdateProfileInfo";
import ProfilePhoto from "./profile-photo";
import ProfileFormSubmit from "./profile-form-submit";
export default function ProfileForm() {
  const methods = useForm<IuserProfile>({defaultValues:async()=>(await GetProfileInfoApi()).payload})
  const {mutate,isLoading} = useUpdateProfileInfo(methods.reset)
    const onSubmit:SubmitHandler<IuserProfile> =(data)=> {
        mutate(data)
  }
  return (
    
    <div className="max-w-2xl  mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My details</h1>
            <Button variant="ghost">View my profile</Button>
          </div>
          <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="!font-semibold">Name</Label>
              <Input id="name" {...methods.register("name")} placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline" className="!font-semibold">Headline</Label>
              <Input id="headline" {...methods.register("headline")} placeholder="A short tagline describing yourself" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="!font-semibold">Email address</Label>
              <div className="flex space-x-2">
                <Input id="email" {...methods.register("email")} placeholder="Your active email address" disabled type="email" className="flex-grow" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="about" className="!font-semibold">About</Label>
              <Textarea 
              id="about"
              rows={5}
              className="resize-none"
              placeholder="Tell the community about yourself, your goals, and your ambitions."
               {...methods.register("about")}
              />
            </div>
            <ProfilePhoto />
            <ProfileLinkField/>
    <section className="flex w-full justify-end">
      <ProfileFormSubmit isLoading={isLoading}/>
    </section>
          </form>
          </FormProvider>
        </div>
  )
}
