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
import useGetMinimalCollectionList from "@/hooks/resource-collection/useGetMinimalCollectionList";
import { useParams } from "next/navigation";
import useCollectCustomLink from "@/hooks/resource-collection/useCollectCustomLink";
import RequestLoader from "../loader/request-loading";
interface ICustomResourceLinkForm extends IResourceLink{
_id:string;
collectionId:string;
}
export default function CustomLinkFormDialog({children}: {children: React.ReactNode}) {
  const [open, setopen] = useState(false);
  const collectionId = useParams()?.id as string;
  const form = useForm<ICustomResourceLinkForm>();
  const validState = useState(false);
  const {data:collections,isLoading:isFetchingCollections} = useGetMinimalCollectionList((data)=>form.setValue("collectionId",collectionId||data.payload[0]._id||""))
  const [expand,setExpand] = useState(false);
  const {mutateAsync:collect,isLoading:isCollecting} = useCollectCustomLink()
  const  onSubmit: SubmitHandler<ICustomResourceLinkForm> =async (data,e) => {
  e?.stopPropagation();
  await collect({linkPayload:{title:data.title,description:data.description,url:data.url,},collectionId:data.collectionId});
  setopen(false);
  form.reset();
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
        <DialogTitle>Custom Link</DialogTitle>
        <DialogDescription>
          Your links will be stored in the selected collection and will only be available to you unless you publish it in the resource .
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


        
        <button className=" text-sm text-muted-foreground " onClick={()=>setExpand(false)}>Show less </button>
        </>:
        <button className=" text-sm text-muted-foreground" onClick={()=>setExpand(true)}>Setup description and tags </button>
}
  <FormField
    control={form.control}
    name="collectionId"
    rules={{required:true}}
    render={({field}) => (
      <FormItem>
        <FormLabel className="py-0">
        <Label className="font-semibold my-1" htmlFor="title"> Select Collection * </Label>
        
        </FormLabel>
        
        <FormControl>
          <Select
            {...field}
            loading={isFetchingCollections}
            className="w-full h-9 text-sm placeholder:!text-muted-foreground"
            placeholder="Select a collection"
            value={field.value}
            options={collections?collections?.payload?.map(e=>({value:e._id,label:e.name})):[]}
            onSelect={(value: string) =>{ form.setValue("collectionId", value);}}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            />
         </FormControl>
        <FormDescription  >
          Custom links will be stored in the selected collection
          </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />

        <DialogFooter className="mt-3">
          <Button type="submit" className="w-full hover:bg-secondary-foreground/90 transition-colors bg-secondary-foreground"  disabled={isCollecting}>
          {isCollecting?  <RequestLoader dark/> :"upload"}
          </Button>
        </DialogFooter>
      </form>
              </FormProvider>
    </DialogContent>
  </Dialog>
  )
}

