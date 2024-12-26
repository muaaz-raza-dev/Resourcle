import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { IResource, IResourceLink } from "@/types/Iresource";
import { FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { Button } from "@/shadcn/components/ui/button";
import { Label } from "@/shadcn/components/ui/label";
import { Input } from "@/shadcn/components/ui/input";
import {  Select } from "antd";
import LinkInputResourceForm from "./link-input-resource-form";
import { IoMdPricetags } from "react-icons/io";

export default function NewLinkDailogResourceForm({
  children,
  data,
  linkGroupIndex,
  linkIndex,
  isEdit
}: {
  children: ReactNode;
  linkGroupIndex: number;
  linkIndex: number;
  data?: IResourceLink;
  isEdit?: boolean;
}) {
  const ParentForm = useFormContext<IResource>();
  const [open, setopen] = useState(false);
  const form = useForm<IResourceLink>({ defaultValues: data });
  const {handleSubmit,register,watch,setValue,trigger,formState: { errors },} =form;
  const link = useState(data?true:false)
  const [isLinkValid ] =link
  const onSubmit: SubmitHandler<IResourceLink> = (data,event) => {
    event?.stopPropagation();
    if(!isLinkValid)return;
    const isValid = trigger();
    if (!isValid) return;

    if(isEdit){
      ParentForm.setValue(`content.${linkGroupIndex}.links.${linkIndex}`, data);
      setopen(false);
      return;
    }

    if(ParentForm.getValues(`content.${linkGroupIndex}.links`).length<=linkIndex){
      ParentForm.setValue(`content.${linkGroupIndex}.links.${linkIndex}`, data);
    }
    else {
      ParentForm.setValue(`content.${linkGroupIndex}.links`,
      [...ParentForm.getValues(`content.${linkGroupIndex}.links`).slice(0, linkIndex), data,
      ...ParentForm.getValues(`content.${linkGroupIndex}.links`).slice(linkIndex)])
    }
    form.reset();
    setopen(false);
    return;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setopen(open);
      }}
    >
      <DialogTrigger className="center ">{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Link details</DialogTitle>
          <DialogDescription>
            Customize your link for the users and assign clear description and
            title.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="">
            <Label className="font-semibold text-sm">Title *</Label>
            <Input
              className="bg-white placeholder:text-muted-foreground"
              placeholder="Netflix Engineering blogs"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-red-500 text-xs">
                {errors.title.message}
              </span>
            )}
          </div>
         <LinkInputResourceForm state={link}/>

          <div className="">
            <Label className="font-semibold text-sm">Description</Label>
            <Input
              className="bg-white placeholder:text-muted-foreground"
              placeholder="A short and concise description"
              {...register("description")}
              />
          </div>

          <section className="flex gap-2 w-full">
            
            <div className="w-full">
              <Label className="py-2 font-semibold flex gap-2 ">
              Tags
              <IoMdPricetags />
              </Label>
              <Select 
                mode="tags"
                className="w-full h-9 text-sm placeholder:!text-muted-foreground"
                maxTagCount={3}
                value={watch("tags")}
                placeholder="assign appropriate tags"
                onChange={(value: string[]) => setValue("tags", value)}
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                />
            </div>
          </section>
          <DialogFooter className="mt-3">
            <Button type="button" onClick={handleSubmit(onSubmit)}>Save</Button>
          </DialogFooter>
        </form>
                </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
