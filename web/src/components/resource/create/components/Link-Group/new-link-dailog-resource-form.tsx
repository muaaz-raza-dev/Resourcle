import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { ImBooks } from "react-icons/im";
import { IResource, IResourceLink } from "@/types/Iresource";
import { FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { Button } from "@/shadcn/components/ui/button";
import { Label } from "@/shadcn/components/ui/label";
import { Input } from "@/shadcn/components/ui/input";
import { Select } from "antd";
import { FaClock} from "react-icons/fa";
import LinkInputResourceForm from "./link-input-resource-form";
import { IoMdPricetags } from "react-icons/io";

export default function NewLinkDailogResourceForm({
  children,
  data,
  linkGroupIndex,
  linkIndex,
}: {
  children: ReactNode;
  linkGroupIndex: number;
  linkIndex: number;
  data?: IResourceLink;
}) {
  const ParentForm = useFormContext<IResource>();
  const [open, setopen] = useState(false);
  const form = useForm<IResourceLink>({defaultValues: { level_information: "intermediate", isPaid: true, ...data },});
  const {handleSubmit,register,watch,setValue,trigger,formState: { errors },} =form;
  const link = useState(data?true:false)
  const [isLinkValid ] =link
  const onSubmit: SubmitHandler<IResourceLink> = (data,event) => {
    event?.stopPropagation();
    if(!isLinkValid)return;
    const isValid = trigger();
    if (!isValid) return;
    ParentForm.setValue(`content.${linkGroupIndex}.links.${linkIndex}`, data);
    form.reset();
    setopen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) setopen(true);
      }}
    >
      <DialogTrigger className="center ">{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create your link</DialogTitle>
          <DialogDescription>
            Customize your link for the users and assign clear description and
            title.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="">
            <Label className="font-semibold">Title of the link *</Label>
            <Input
              className="bg-white"
              placeholder="Muaaz Raza's Post"
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
            <Label className="font-semibold">Short description</Label>
            <Input
              className="bg-white"
              placeholder="This is the best portfolio ever"
              {...register("description")}
              />
          </div>

          <section className="flex gap-2 w-full">
            <div className="w-[32%]">
              <Label className="py-2 font-semibold flex gap-2 ">
              Availability (Free/Paid)
              <IoMdPricetags />
              </Label>
              <Select
                options={[
                  { value: false, label: "Free" },
                  { value: true, label: "Paid / Premium" },
                ]}
                className="w-full h-9"
                value={watch("isPaid")}
                onSelect={(value: boolean) => setValue("isPaid", value)}
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                />
            </div>

            <div className="w-[32%]">
              <Label className="flex gap-2 py-2 font-semibold ">
                Time to consume <FaClock />
              </Label>
              <Input
                className="bg-white"
                placeholder="24 hours"
                {...register("consumption_time")}
                />
            </div>

            <div className="w-[32%]">
              <Label className="flex gap-2 py-2 font-semibold"> Level of information <ImBooks />
              </Label>
              <Select
                className="w-full h-9"
                options={[
                  { value: "intermediate", label: "Intermediate" },
                  { value: "beginner", label: "Beginner" },
                  { value: "advanced", label: "Advanced" },
                ]}
                value={watch("level_information")}
                onSelect={(value: string) => setValue("level_information", value)}
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                />
            </div>
          </section>
          <DialogFooter>
            <Button type="button" onClick={handleSubmit(onSubmit)}>Save</Button>
            <DialogClose onClick={() => setopen(false)}>
              <Button variant="secondary" type="button">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
                </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
