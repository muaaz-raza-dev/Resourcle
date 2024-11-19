import { IResource } from "@/types/Iresource";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaLink, FaTrash } from "react-icons/fa";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import LinksComponentResourceForm from "./links-component-resource-form";
export default function LinkGroupResourceForm({ index }: { index: number }) {
  const form = useFormContext<IResource>();
  const [collapse, setcollapse] = useState(false)


  function DeleteLinkGroup() {
    form.setValue("content",form.getValues("content").filter((_, i) => i != index));
  }
  
  return (
    <div className="w-full rounded-md p-2 flex flex-col  border-2 py-4 gap-4">
      <header className="flex justify-between rounded-md w-full">
        <input
        {...form.register(`content.${index}.label`,{required:"Label of the link group is required"})}
          className="text-xl px-2 h-max rounded-md  border-none w-full  outline-none font-bold placeholder:text-gray-400 bg-transparent"
          placeholder="Youtube videos links"
          autoFocus
        />
        <div className="flex gap-2 ">
          <div className="rounded-xl px-2 p-1 items-center border-2 border-accent bg-orange-50 flex gap-1 font-semibold text-sm">
            <FaLink size={12} />  {form.watch(`content.${index}.links`)?.length}
          </div>
          <button type="button" className=" rounded-md px-2 p-1 hover:bg-secondary transition-colors" onClick={()=>setcollapse(e=>!e)}>
            {
              collapse? <BsArrowsExpand size={20} /> : <BsArrowsCollapse size={20} />
            }
          </button>

          <button type="button" className=" rounded-md  p-1 hover:bg-secondary text-destructive " onClick={DeleteLinkGroup}>
            <FaTrash  />
          </button>
          
        </div>
      </header>

      {!collapse&&<LinksComponentResourceForm index={index} />}
    </div>
  );
}
