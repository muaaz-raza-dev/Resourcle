"use client";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";
import { Label } from "@/shadcn/components/ui/label";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IuserProfile } from "@/types/IuserProfile";
import GetProfileInfoApi from "@/api/profile/profile-info.api";
import { Textarea } from "@/shadcn/components/ui/textarea";
import ProfileLinkField from "./profile-link-field";
import useUpdateProfileInfo from "@/hooks/profile/useUpdateProfileInfo";
import ProfilePhoto from "./profile-photo";
import ProfileFormSubmit from "./profile-form-submit";
import Link from "next/link";
import ProfileFormUsername from "./profile-form-username";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Separator } from "@/shadcn/components/ui/separator";
export default function ProfileForm() {
  const methods = useForm<IuserProfile>({
    defaultValues: async () => (await GetProfileInfoApi()).payload,
  });
  const { mutate, isLoading } = useUpdateProfileInfo(methods.reset);
  const onSubmit: SubmitHandler<IuserProfile> = (data) => {
    const payload = data;
    delete payload.username;
    mutate(payload);
  };
  return (
    <div className="md:max-w-2xl max-w-full md:px-4 max-md:px-0 space-y-8">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="bg-transparent px-0 shadow-none border-none rounded-none">
            <CardHeader className="">
              <div className="flex justify-between ">
                <div className="">
                <CardTitle className="text-2xl font-bold">Profile</CardTitle>
              <CardDescription className="p-0 m-0">
                Create your skill profile to showcase your skills.
              </CardDescription>
                </div>
                <Link href={`/${methods.getValues("_id")}`}>
                  <Button
                    variant="ghost"
                    className="hover:bg-transparent hover:underline hover:text-primary transition-colors"
                  >
                    View my profile
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="!font-semibold text-muted-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  {...methods.register("name")}
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headline" className="!font-semibold text-muted-foreground">
                  Headline
                </Label>
                <Input
                  id="headline"
                  {...methods.register("headline")}
                  placeholder="A short tagline describing yourself"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about" className="!font-semibold text-muted-foreground">
                  About
                </Label>
                <Textarea
                  id="about"
                  rows={5}
                  className="resize-none border-border"
                  placeholder="Tell the community about yourself, your goals, and your ambitions."
                  {...methods.register("about")}
                />
              </div>
              <ProfileFormUsername />
        <Separator/>
          <ProfilePhoto />
          <ProfileLinkField />
          <section className="flex w-full mb-5 ">
            <ProfileFormSubmit isLoading={isLoading} />
          </section>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
}
