import { Separator } from "@/shadcn/components/ui/separator";
import React from "react";

export default function HeadingComp({text}:{text:string}) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <Separator className="max-w-[40%]" />
      <h2 className=" whitespace-nowrap font-semibold my-6 py-1 text-center  bg-secondary-foreground text-white antialiased rounded-md px-6 ">
        {text}
      </h2>
      <Separator className="max-w-[40%]" />
    </div>
  );
}
