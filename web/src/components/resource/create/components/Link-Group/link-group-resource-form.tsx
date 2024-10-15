import { IResource } from "@/types/Iresource";
import React from "react";
import { useFormContext } from "react-hook-form";
import {  FaLink } from "react-icons/fa";
import { BsArrowsCollapse } from "react-icons/bs";
import LinksComponentResourceForm from "./links-component-resource-form";
export default function LinkGroupResourceForm({ index }: { index: number }) {
  const form = useFormContext<IResource>();
  function DeleteLinkGroup(
    key: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (key.key == "Backspace") {
      const toBeDelelted = form.getValues("content").find((_, i) => i == index);
      if (toBeDelelted?.label == "" && toBeDelelted?.links.length == 0) {
        form.setValue(
          "content",
          form.getValues("content").filter((_, i) => i != index)
        );
      }
    } else if (key.key == "Enter") {
    }
  }
  return (
    <div className="w-full rounded-md p-2 flex flex-col gap-4">

        <header className="flex justify-between w-full">
      <input
        className="text-xl px-2 h-max rounded-md  border-none w-full  outline-none font-bold placeholder:text-gray-400 bg-transparent"
        placeholder="Youtube videos links"
        onKeyDown={(e) => DeleteLinkGroup(e, index)}
        autoFocus
      />
      <div className="flex gap-2 ">
        <div className="rounded-xl px-2 p-1 items-center border-2 border-accent bg-orange-50 flex gap-1 font-semibold text-sm"><FaLink size={12}/> 32 </div>
        <button className=" rounded-md px-2 p-1 hover:bg-accent">
        <BsArrowsCollapse size={24} />
        </button>
      </div>
        </header>

      <LinksComponentResourceForm index={index}/>

    </div>
  );
}
