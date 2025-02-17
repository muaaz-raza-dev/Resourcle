import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import NewLinkDailogResourceForm from "./new-link-dailog-resource-form";
import { useFormContext } from "react-hook-form";
import { IResource, IResourceLink } from "@/types/Iresource";
import { CaretSortIcon } from "@radix-ui/react-icons";
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
    <section className="flex flex-col gap-2 rounded-md ">

      {
        links?.map((link, i) => {
          return (
            <section key={i + link.url} className="border rounded-md p-2">
              <div className="flex  gap-1  items-center ">
                <NewLinkDailogResourceForm
                  linkGroupIndex={index}
                  linkIndex={i + 1}
                  >
                    <Tooltip title="Add new link" placement="top">
                  <button type="button" className=" border text-secondary-foreground font-bold text-sm rounded-md p-2  aspect-square center hover:bg-primary/40 transition-colors">
                  <FaPlus   />
                  </button>
                  </Tooltip>
                </NewLinkDailogResourceForm>

                <div className="flex justify-between hover:rounded transition-all w-full rounded-md p-3">
              
                  <div className="flex max-md:flex-col md:items-center md:gap-2">
                    <p className=" cursor-default text-sm font-semibold transition-colors">{link.title}</p>
                    <a href={link.url} target="_blank" className="text-primary text-sm md:border-l md:px-3 text-wrap">{link.url}</a>
                  </div>
              
                
            <DetailsAndActionsLinkSection index={index} link={link} link_index={i}/>
                </div>
              </div>
            </section>
          );
        })
}
<div className="center">

<NewLinkDailogResourceForm linkGroupIndex={index} linkIndex={links.length}>
      <button type="button" className=" bg-primary/30 hover:bg-primary/40 w-max text-black  transition-colors px-4 py-1 font-semibold rounded-md text-sm  center gap-1">
         Add link
      </button>
</NewLinkDailogResourceForm>
</div>
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
        <PopoverContent side="bottom" align="center" className="max-md:w-4xl mr-4">
          <a href={link.url} target="_blank" className="text-primary underline text-wrap break-all  text-sm w-full">
            <p>
              {link.url}
              </p>
            </a>
          <p className="text-muted-foreground my-2 text-xs">
            {link.description || "no description"}
          </p>
          
      
      <div className="flex gap-2 pt-4 text-sm border-t">

<NewLinkDailogResourceForm
  data={link}
  linkGroupIndex={index}
  linkIndex={link_index}
  isEdit
>
  <button className="flex gap-2  border items-center px-4 py-1 bg-secondary font-semibold transition-colors rounded-md ">
    Edit <FaEdit  className="w-4 h-4" />
  </button>
</NewLinkDailogResourceForm>

<button type="button" onClick={() => DeleteLink(link_index)} className="flex py-1  items-center gap-2  border px-4  bg-destructive/40 text-white  transition-colors rounded-md p-2">
  Delete <FaTrash  />
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