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
            variant={"outline"}
            className="ml-auto hover:bg-secondary text-sm"
          >
            <SlOptionsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Instant actions </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-between text-sm py-2 font-semibold">
            Edit <FaEdit size={12} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="justify-between text-sm py-2 font-semibold"
            onSelect={() => setdialogs((d) => ({ ...d, privateSwitch: true }))}
          >
            <div className="flex justify-between items-center gap-3">
              Switch to{" "}
              {isPrivate ? (
                <>
                  public <FaGlobe size={12} />
                </>
              ) : (
                <>
                  private <FaLock size={12} />
                </>
              )}
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="justify-between text-sm py-2 font-semibold text-destructive"
           onSelect={() => setdialogs((d) => ({ ...d, Delete: true }))}>
            Delete <FaTrash size={12} />
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
          title={``}
        />
      )}
    </>
  );
}
