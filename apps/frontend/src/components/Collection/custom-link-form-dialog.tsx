import React, {  useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/shadcn/components/ui/button";
import { Label } from "@/shadcn/components/ui/label";
import { Input } from "@/shadcn/components/ui/input";
import {  Select } from "antd";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn/components/ui/form";
import LinkInputResourceForm from "../resource/create/components/Link-Group/link-input-resource-form";
import { IResourceLink } from "@/types/Iresource";
import { IoMdPricetags } from "react-icons/io";

export default function CustomLinkFormDialog({children}: {children: React.ReactNode}) {
  const [open, setopen] = useState(false);
  const form = useForm<IResourceLink>();
  const validState = useState(false);
  const [expand,setExpand] = useState(false);
  const onSubmit: SubmitHandler<IResourceLink> = () => {
  event?.stopPropagation();
  };
  return (
    <Dialog
    open={open}
    onOpenChange={(open) => {
      setopen(open);
    }}
  >
    <DialogTrigger className="center " asChild>{children}</DialogTrigger>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Link details</DialogTitle>
        <DialogDescription>
          Customize your link for the users and assign clear description and
          title.
        </DialogDescription>
      </DialogHeader>
      <FormProvider {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <LinkInputResourceForm state={validState}/>

      <FormField
    control={form.control}
    name="title"
    rules={{maxLength:{value:80,message:"Title must be less than 80 characters"}}}
    render={({field}) => (
      <FormItem>
        <FormLabel className="py-0">
        <div className="flex justify-between w-full">
        <Label className="font-semibold my-1" htmlFor="title">Title </Label>
        <p className="text-muted-foreground text-xs">{field.value?.length||0}/80</p>
        </div>
        </FormLabel>
        <FormControl>
        <Input
            {...field}
          id="title"
          maxLength={80}
            className="bg-white placeholder:text-muted-foreground"
            placeholder="Netflix Engineering blogs"
          />
         </FormControl>
        <FormDescription  />
        <FormMessage />
      </FormItem>
    )}
  />
         
      
{
expand ?
<>


         <FormField
    control={form.control}
    name="description"
    rules={{maxLength:{value:120,message:"Description should be less than 120 characters"}}}
    render={({field}) => (
      <FormItem>
        <FormLabel className="py-0">
        <div className="flex justify-between w-full">
        <Label className="font-semibold my-1" htmlFor="description">Description </Label>
        <p className="text-muted-foreground text-xs">{field.value?.length||0}/120</p>
        </div>
        </FormLabel>
        <FormControl>
        <Input
            {...field}
            placeholder="A short and concise description"
          id="description"
          maxLength={120}
            className="bg-white placeholder:text-muted-foreground"
          />
         </FormControl>
        <FormDescription  />
        <FormMessage />
      </FormItem>
    )}
  />


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
              value={form.watch("tags")}
              placeholder="assign appropriate tags"
              onChange={(value: string[]) =>{ form.setValue("tags", value);}}
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
              />
          </div>
        </section>
        <button className=" text-sm text-muted-foreground " onClick={()=>setExpand(false)}>Show less </button>
        </>:
        <button className=" text-sm text-muted-foreground" onClick={()=>setExpand(true)}>Setup description and tags </button>
}
        <DialogFooter className="mt-3">
          <Button type="button" className="w-full hover:bg-secondary-foreground/90 transition-colors bg-secondary-foreground" onClick={form.handleSubmit(onSubmit)}>upload</Button>
        </DialogFooter>
      </form>
              </FormProvider>
    </DialogContent>
  </Dialog>
  )
}
