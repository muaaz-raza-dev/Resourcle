import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/shadcn/components/ui/sheet";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/state/auth.atom";
import { Cog, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BsCollectionFill } from "react-icons/bs";
import LogoutDialog from "./logout-dialog";

export default function ProfileMenu() {
  const [open, setopen] = useState(false)
  const { user } = useRecoilValue(authAtom);
  
  return (
    <Sheet open={open} onOpenChange={(o)=>setopen(o)} >
      <SheetTrigger>
        <Image src={user?.picture || "/user.png"} alt="name" quality={100} className="rounded-full w-8 h-8 bg-secondary-foreground" width={20} height={20}/>
      </SheetTrigger>
      <SheetContent className="!px-3">
        <SheetHeader>
          <div className="flex gap-2 items-center">
          <Image src={user?.picture || "/user.png"} alt="name" quality={100} className="rounded-full w-10 h-10 bg-secondary-foreground" width={25} height={25}/>
            <div className="font-semibold">
              <h1 className="text-left leading-tight">{user?.name}</h1>
              <p className="text-muted-foreground font-normal text-sm leading-tight">
                {user?.email}
              </p>
            </div>
          </div>
        </SheetHeader>
        <section className="flex flex-col my-4 gap-1" >
        <Link href={`/${user?._id}`} className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md border" onClick={()=>setopen(false)}>
            <User className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Your profile</p>
        </Link>
    <Link href={"/settings/personal-info"} onClick={()=>setopen(false)}>
        <button className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md border" >
            <Cog className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Settings</p>
        </button>
    </Link>
        <Link href={`/resource/create`} className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md border" onClick={()=>setopen(false)}>
            <IoMdAdd  className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Create Resoruce</p>
        </Link>
        <Link href={`/collection`} className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md border" onClick={()=>setopen(false)}>
            <BsCollectionFill  className="text-gray-600" size={16}/>
            <p className="text-sm font-semibold text-gray-700 ">Resoruce Collections</p>
        </Link>



        <div className="bg-gray-500 w-full h-[1px] my-1"></div>

      <LogoutDialog/>

        </section>
      </SheetContent>
    </Sheet>
  );
}
