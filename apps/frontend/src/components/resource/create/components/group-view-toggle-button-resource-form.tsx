import React from "react";
import clsx from "clsx";
import { FaThList } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import { IResource } from "@/types/Iresource";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/shadcn/components/ui/alert-dialog"
import { AiOutlineUngroup } from "react-icons/ai";
export default function GroupViewToggleButtonResourceForm() {
  const methods = useFormContext<IResource>();
  const { watch, setValue } = methods;
  const isGrouped = watch("isGroupLinks");

  function handleGroupToggle(group:boolean){
    setValue("isGroupLinks", group);
    const groups = watch("content");
    if(!group){
        if(groups.length>1){
           setValue("content",[{label:"default",links:groups.flatMap(e=>e.links)}])     
        }
    }
    else {
        setValue("content",[{label:"",links:groups.flatMap(e=>e.links)}])     
    }
    
  }
  return (
    <>
     <AlertDialog>

      <AlertDialogTrigger disabled={!isGrouped} asChild>
      <button
        type="button"
        className={clsx(
          "p-4 py-2 text-sm font-semibold cursor-pointer bg-secondary hover:scale-95 rounded-md flex items-center gap-2 transition-transform border",
          !isGrouped && "!bg-secondary-foreground !text-white scale-95"
        )}
      >
        <AiOutlineUngroup  />
        <span>No Group</span>
      </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will bring all the organized links in one place.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-border transition-colors" >Cancel</AlertDialogCancel>
          <AlertDialogAction  onClick={() => handleGroupToggle(false)} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <AlertDialog >
      <AlertDialogTrigger disabled={isGrouped} asChild>
      <button
        type="button"
        className={clsx(
          "p-4 py-2 text-sm font-semibold cursor-pointer bg-secondary hover:scale-95 rounded-md flex items-center gap-2 transition-transform border",
          isGrouped && "!bg-secondary-foreground !text-white scale-95"
        )}
      >
        <FaThList size={14} />
        <span>Group Links</span>
      </button>  
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will bring all the links into grouped form.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-border transition-colors">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleGroupToggle(true)} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    
    </>
  );
}
