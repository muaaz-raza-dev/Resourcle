import React from "react";
import { FaClock, FaEdit, FaPlus } from "react-icons/fa";
import NewLinkDailogResourceForm from "./new-link-dailog-resource-form";
import { useFormContext } from "react-hook-form";
import { IResource } from "@/types/Iresource";
export default function LinksComponentResourceForm({index}:{index:number}) {
  const form = useFormContext<IResource>();

  return (
    <section className="flex flex-col gap-2">
    {
        form.watch(`content.${index}.links`).map((link,index)=>
        {
            return (
            
            <section className="px-4" key={index+link.url}>
            <div className="flex  gap-2  items-center">
              <NewLinkDailogResourceForm data={link}>
              <button className="bg-secondary font-bold text-sm rounded-full aspect-square w-6 h-6 center">
                <FaPlus />
              </button>
              </NewLinkDailogResourceForm>
     
            
              <div className="flex justify-between bg-secondary w-full rounded-md p-3">
                <div className="flex gap-2">
                  <h1 className="font-semibold">
                    {link.title}
                  </h1>
                  
                  <div className="px-2 p-1 rounded-xl bg-primary font-medium text-white text-sm">
                    {link.isPaid? "Premium":"Free"}
                  </div>
                  <div className="px-2 p-1 rounded-xl bg-primary font-medium text-white text-sm flex gap-2 items-center">
                    <FaClock />  {link.consumption_time}
                  </div>
                  <div className="px-2 p-1 rounded-xl bg-accent font-medium text-white text-sm">
                  {link.skill_level}
                  </div>
                </div>
                <button className="">
                  <FaEdit />
                </button>
              </div>
      
            </div>
          </section>
            )
        }

        )
    }
  
    </section>
  );
}
