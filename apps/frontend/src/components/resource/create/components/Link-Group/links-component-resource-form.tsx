import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import NewLinkDailogResourceForm from "./new-link-dailog-resource-form";
import { useFormContext } from "react-hook-form";
import { IResource, IResourceLink } from "@/types/Iresource";
import { Badge } from "@/shadcn/components/ui/badge";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { MdOutlineAddLink } from "react-icons/md";
import { Tooltip } from "antd";
export default function LinksComponentResourceForm({
  index,
}: {
  index: number;
}) {
  const form = useFormContext<IResource>();
  const links = form.watch(`content.${index}.links`);
 
  if(!links?.length) return <NoLinkFallback index={index}/>
  return (
    <section className="flex flex-col gap-2 border rounded-md p-2 py-4">

      {
        links?.map((link, i) => {
          return (
            <section key={i + link.url}>
              <div className="flex  gap-2  items-center">
                <NewLinkDailogResourceForm
                  linkGroupIndex={index}
                  linkIndex={i + 1}
                  >
                    <Tooltip title="Add new link" placement="top">
                  <button type="button" className="border-primary border text-primary font-bold text-sm rounded-md p-2  aspect-square center hover:bg-primary/20 transition-colors">
                  <MdOutlineAddLink size={24} />
                  </button>
                  </Tooltip>
                </NewLinkDailogResourceForm>

                <div className="flex justify-between bg-secondary hover:rounded transition-all w-full rounded-md p-3">
              
                  <div className="flex max-md:flex-col md:items-center md:gap-2">
                    <p className=" cursor-default text-sm font-semibold transition-colors">{link.title}</p>
                    <a href={link.url} target="_blank" className="text-primary text-sm border-l px-3">{link.url}</a>
                  </div>
              
                
            <DetailsAndActionsLinkSection index={index} link={link} link_index={i}/>
                </div>
              </div>
            </section>
          );
        })
}

    </section>
  )  
}


function DetailsAndActionsLinkSection({index,link,link_index}:{index:number;link:IResourceLink;link_index:number}){
  const [open, setOpen] = React.useState(false);
  const form = useFormContext<IResource>();
  function DeleteLink(linkIndex: number) {
    form.setValue(
      `content.${index}.links`,
      form.getValues(`content.${index}.links`).filter((_, i) => linkIndex != i)
    );
  }
  return (
    <Popover  open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
            <button type="button" className="`relative aspect-square  md:text-xs text-sm font-semibold  h-8 hover:bg-border transition-colors  border rounded-md p-1 px-2">
              <CaretSortIcon fontSize={24} />
            </button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="center">
          <a href={link.url} target="_blank" className="text-primary underline">{link.url}</a>
          <p className="text-muted-foreground my-2 text-xs">
            {link.description || "no description"}
          </p>
          {link?.tags?.length ? (
            <div className="flex gap-2 my-2 flex-wrap">
              {link.tags.map((tag) => {
                return (
                  <Badge
                    variant="secondary"
                    className="text-xs font-normal "
                    key={tag}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          ) : null}
      
      <div className="flex gap-2 flex-col pt-4 border-t">

<NewLinkDailogResourceForm
  data={link}
  linkGroupIndex={index}
  linkIndex={link_index}
  isEdit
>
  <div className="flex justify-between w-full ">
  <p className="text-sm font-semibold">Edit link details</p>
      <FaRegEdit  className="w-4 h-4" />
  </div>
</NewLinkDailogResourceForm>
<button type="button" onClick={() => DeleteLink(link_index)} className="flex justify-between w-full">
  <p className="text-sm font-semibold">Delete link</p>  
    <FaTrash className="text-destructive" />
  
  </button>

  </div>
      
        </PopoverContent>
      </Popover>
  )
}

function NoLinkFallback({index}:{index:number}){
  return  (

    <div className="center flex-col border rounded-md p-2 gap-1 py-8">
    
    <NewLinkDailogResourceForm linkGroupIndex={index} linkIndex={0}>
      <button type="button" className=" bg-primary/30 hover:bg-primary/40  text-black  transition-colors px-4 py-1 font-semibold rounded-md text-sm  center gap-1">
         Add links
      </button>
    </NewLinkDailogResourceForm>
    <p className="text-sm text-muted-foreground">
      Add links to organize the spreaded information into one place .
    </p>
    </div>
  )
}