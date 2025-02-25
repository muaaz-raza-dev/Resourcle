import React, { useState, memo } from "react";
import { useFormContext, Controller,  } from "react-hook-form";
import { FaLink, FaTrash } from "react-icons/fa";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import LinksComponentResourceForm from "./links-component-resource-form";
import { IResource } from "@/types/Iresource";

function LinkGroupResourceForm({ index }: { index: number }) {
  const form = useFormContext<IResource>();
  const isGrouped = form.watch("isGroupLinks");
  const [collapse, setCollapse] = useState(false);

  function DeleteLinkGroup() {
    
    form.setValue(
      "content",
      form.getValues("content").filter((_, i) => i !== index)
    );
  }

  return (
    <div className="w-full rounded-md  flex flex-col  gap-4 ">
      { isGrouped &&
      <header className="flex justify-between gap-2 items-center py-2 sm:px-2 px-4 w-full border rounded-md ">
        <GroupLabelInput index={index} />
        <div className="flex gap-1 ">
          <div className="rounded-md p-2 items-center bg-secondary  flex gap-1 font-semibold text-sm">
            <FaLink size={12} />{" "}
            {form.watch(`content.${index}.links`)?.length}
          </div>
          <button
            type="button"
            className="rounded-md px-2 p-1 hover:bg-secondary transition-colors"
            onClick={() => setCollapse((e) => !e)}
          >
            {collapse ? <BsArrowsExpand  className="w-5 h-5" /> : <BsArrowsCollapse className="w-5 h-5" />}
          </button>

          <button
            type="button"
            className="rounded-md p-1  text-destructive"
            onClick={DeleteLinkGroup}
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      </header>
    }
      {(( isGrouped  && !collapse)||!isGrouped) ? <LinksComponentResourceForm index={index} />: null }
    </div>
  );
}

const GroupLabelInput = memo(({ index }: { index: number }) => {
  const { control } = useFormContext<IResource>();

  return (
    <Controller
      control={control}
      name={`content.${index}.label`}
      rules={{ required: "Label of the link group is required" }}
      render={({ field, fieldState }) => (
        <div className="w-full">
        <input
          {...field}
          max={60}
          className=" h-max p-0  font-semibold placeholder:font-semibold border-none w-full max-md:font-medium outline-none  placeholder:text-gray-400 bg-transparent"
          placeholder="Label of the link group e.g Yotube channels"
          />
          {fieldState.error?.message&& <span className="text-red-500  text-xs">{fieldState.error?.message}</span>}
          </div>
      )}
    />
  );
});

// Assigning a display name
GroupLabelInput.displayName = "GroupLabelInput";


export default LinkGroupResourceForm;
