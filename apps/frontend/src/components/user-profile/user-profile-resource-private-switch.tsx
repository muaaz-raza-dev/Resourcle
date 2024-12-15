import React, { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shadcn/components/ui/alert-dialog";
import RequestLoader from "../loader/request-loading";
import { UseMutationResult } from "react-query";

export default function ConfirmDialog({
  _id,
  description,
  title,
  mutationObject,
  resource_title,
  state: [State, setState],
}: {
  title: string;
  resource_title:string;
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationObject:UseMutationResult<any,any, string, unknown>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: [boolean, Dispatch<SetStateAction<any>>];
  description?: string;
}) {
  const { mutateAsync, isLoading } = mutationObject
  async function handleSwitch() {
    await mutateAsync(_id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState((e:any) => ({ ...e, privateSwitch: false }));
  }
  const handleOpenChange = (isOpen: boolean) => {
    if (!isLoading) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setState((e:any) => ({ ...e, privateSwitch: isOpen }));

      }
    }
  
  return (
    <AlertDialog open={State} onOpenChange={handleOpenChange} >
      <AlertDialogContent >
        <AlertDialogHeader>
          <AlertDialogTitle>{title} . Are you absolutely sure?</AlertDialogTitle>
          <p className="underline text-sm font-semibold ">{resource_title} </p>
          <AlertDialogDescription>
            {description ||
              "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-secondary" disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleSwitch}>
            {isLoading? <RequestLoader size="18"/>: "Continue" }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
