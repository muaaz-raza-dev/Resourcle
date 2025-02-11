import { Button } from "@/shadcn/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaCaretUp } from "react-icons/fa";
import { LuMousePointerClick } from "react-icons/lu";

export default function SearchedLinkComponent({
  link,
  Close,
}: {
  link: {
    title: string;
    resource: string;
    clicks: number;
    upvotes: number;
    url: string;
  };
  Close: () => void;
}) {
  return (
    <>
      <div className=" w-full flex gap-3  justify-between  items-center ">
        <div className="flex items-center gap-2 ">
        
          <div className="">
            <Link
              onClick={Close}
              target="_blank"
              href={`${link.url}`}
            >
              <h2 className="whitespace-wrap  font-medium leading-none">
                {link.title}
              </h2>
            </Link>
            <Link
              onClick={Close}
              target="_blank"
              href={`${link.url}`}
              className="text-xs underline text-primary whitespace-wrap leading-none"
            >
                {link.url}
            </Link>
            
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1  ">
            <div className="flex gap-1  p-1 px-2 rounded text-xs w-max whitespace-nowrap border items-center ">
              <FaCaretUp fontSize={12} />
              {link.upvotes||0} upvotes
            </div>

            <div className="flex gap-1  p-1 px-2 rounded text-xs text-muted-foreground w-max whitespace-nowrap border items-center">
              <LuMousePointerClick  className="text-accent w-2 h-2" />
              {link.clicks||0} clicks
            </div>
            <div className="md:border-l md:px-1 ">
                    <Link href={`/resource/${link.resource}`} >
                  <Button  className="bg-secondary hover:bg-secondary transition-colors text-accent flex text-sm items-center  shadow-none  gap-1  "> <p className="max-md:hidden ">Resource </p> <FaArrowRight className="!w-3 !h-3 "/> </Button>
                    </Link>
                </div>
          </div>
        </div>
      </div>
    </>
  );
}
