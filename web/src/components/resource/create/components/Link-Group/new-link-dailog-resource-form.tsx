import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { IResourceLink } from "@/types/Iresource";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/shadcn/components/ui/button";
import { Label } from "@/shadcn/components/ui/label";
import { Input } from "@/shadcn/components/ui/input";
import { Select } from "antd";
import { FaClock, FaStar } from "react-icons/fa";

export default function NewLinkDailogResourceForm({
  children,data
}: {
  children: ReactNode;
  data?: IResourceLink;
}) {
  const {handleSubmit,register,watch,setValue} =  useForm<IResourceLink>({defaultValues:{skill_level:"intermediate",isPaid:true,...data}})
  const onSubmit: SubmitHandler<IResourceLink> = data => console.log(data);
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create your link</DialogTitle>
          <DialogDescription>
            Customize your link for the users and assign clear description and title.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="">
        <Label className="font-semibold">Title of the link *</Label>
        <Input className="bg-white" placeholder="Muaaz Raza's Post" {...register("title",{required:"Title is required"})} />            
            </div>
            <div className="">
        <Label className="font-semibold">URL *</Label>
        <Input className="bg-white" placeholder="https://muaaz.dev" {...register("url",{required:"url is required"})}  />            
        </div>

        <div className="">
        <Label className="font-semibold" >Short description</Label>
        <Input className="bg-white" placeholder="This is the best portfolio ever" {...register("description")} />            
        </div>

        <section className="flex gap-2 w-full" >
        <div className="w-[32%]">
        <Label className="py-2 flex gap-2 ">Resource availablity</Label>
        <Select
         options={[{value:false,label:"Free"},{value:true,label:"Paid / Premium"}]} className="w-full h-9" value={watch("isPaid")}
         onSelect={(value:boolean)=>setValue("isPaid",value)} 
         getPopupContainer={triggerNode => triggerNode.parentNode}
         />            
        </div>

        <div className="w-[32%]">
        <Label className="flex gap-2 py-2 ">Time to consume <FaClock/></Label>
        <Input className="bg-white" placeholder="24 hours" {...register("consumption_time")} />            
        </div>

        <div className="w-[32%]">
        <Label className="flex gap-2 py-2">Skill level <FaStar/></Label>
        <Select className="w-full h-9" options={[{value:"intermediate",label:"Intermediate"},{value:"beginner",label:"Beginner"},{value:"advanced",label:"Advanced"}]}
        value={watch("skill_level")}
        onSelect={(value:string)=>setValue("skill_level",value)}
        getPopupContainer={triggerNode => triggerNode.parentNode}
         />            
        </div>
        </section>

        </form>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
