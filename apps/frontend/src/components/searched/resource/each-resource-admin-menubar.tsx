import ConfirmDialog from "@/components/user-profile/user-profile-resource-private-switch";
import useDeleteResource from "@/hooks/resource/useDeleteResource";
import useSwitchResourceVisiblity from "@/hooks/resource/useSwitchResourceVisiblity";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { FaEdit, FaGlobe, FaLock, FaTrash } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

export default function EachResourceAdminMenubar({
  _id,
  title,
  isPrivate,
  setPrivate,
  index
}: {
  title: string;
  setPrivate:React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  isPrivate: boolean;
  index:number;
}) {
  const switchResourceMutationObject = useSwitchResourceVisiblity(setPrivate);
  const deleteResourceMutationObject =useDeleteResource(index)
  const [dialogs, setdialogs] = useState({ privateSwitch: false ,Delete:false,});
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            className="ml-auto hover:bg-secondary text-black text-sm bg-secondary"
          >
            <SlOptionsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Instant actions </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/resource/edit/${_id}`}>
          <DropdownMenuItem className="gap-2 text-sm py-2 font-semibold">
             <FaEdit size={12} />
            Edit
          </DropdownMenuItem>
            </Link>
          <DropdownMenuItem
            className="justify-between text-sm py-2 font-semibold"
            onSelect={() => setdialogs((d) => ({ ...d, privateSwitch: true }))}
          >
            <div className="flex items-center gap-2">
            {isPrivate ? <FaGlobe size={12} /> :<FaLock size={12} /> }
              Switch to {isPrivate ? (
                <>
                  public 
                </>
              ) : (
                <>
                  private 
                </>
              )}
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2 text-sm py-2 font-semibold hover:text-destructive text-destructive"
           onSelect={() => setdialogs((d) => ({ ...d, Delete: true }))}>
             <FaTrash size={12} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {dialogs.privateSwitch && (
        <ConfirmDialog
        mutationObject={switchResourceMutationObject}
          state={[dialogs.privateSwitch, setdialogs]}
          _id={_id}
          resource_title={title}
          title={`Switch to ${isPrivate ? "public" : "private"}`}
          description={
            isPrivate
              ? "Switching to public will take this resource to the public feed. Everyone can access and interact it"
              : "Switching to private will take this resource to the private feed. Only you can access it"
          }
        />
      )}
      
      {dialogs.Delete && (
        <ConfirmDialog
        mutationObject={deleteResourceMutationObject}
          state={[dialogs.Delete, setdialogs]}
          _id={_id}
          resource_title={title}
        />
      )}
    </>
  );
}
