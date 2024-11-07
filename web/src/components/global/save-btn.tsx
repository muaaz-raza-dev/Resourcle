import useSaveResource from "@/hooks/resource/useSaveResource";
import { Button } from "@/shadcn/components/ui/button";
import clsx from "clsx";
import { Bookmark } from "lucide-react";
import React, { useState } from "react";
import RequestLoader from "../loader/request-loading";

export default function SaveBtn({ isSaved:isSavedRemote,id,minimal }: { id:string;isSaved: boolean,minimal?:boolean }) {
    const [isSaved,setIsSaved] = useState(isSavedRemote)
    const {mutateAsync,isLoading} = useSaveResource()
    async function handleSave(){
        const previousState= isSaved;
        setIsSaved(!isSaved)
        try{
            await mutateAsync(id)
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch(_){
            setIsSaved(previousState)
        }
    }
    if(minimal ) return (
      <button
      onClick={handleSave}
      disabled={isLoading}
      >
              <Bookmark className={clsx("h-4 w-4 mr-1 hover:text-black transition-colors",isLoading&&"animate-ping hover:!text-black",isSaved&&"!text-black")} fill={isSaved ? "black" : "none"}  /> 
      </button>  
    )
  return (
    <Button
    onClick={handleSave}
    disabled={isLoading}
      variant="outline"
      className={clsx(
        "ml-auto hover:bg-secondary",
        isSaved &&
          "bg-secondary-foreground hover:bg-secondary-foreground hover:text-white text-white"
      )}
    >
        {
            isLoading ? <RequestLoader size="18"/> : 
            <>
            <Bookmark className="h-4 w-4 mr-1" fill={isSaved ? "white" : "none"} /> 
            Save{isSaved && "d"}
            </>
        }
    </Button>
  );
}
