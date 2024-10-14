import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/shadcn/components/ui/sheet";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/state/user-info.atom";
import { Cog, User } from "lucide-react";
import { GoProject } from "react-icons/go";
import { FiStar } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

export default function ProfileMenu() {
  const { user } = useRecoilValue(authAtom);
  return (
    <Sheet>
      <SheetTrigger>
        <Image src={user?.picture || "/logo.png"} alt="name" quality={100} className="rounded-full w-10 h-10 bg-secondary-foreground" width={20} height={20}/>
      </SheetTrigger>
      <SheetContent className="!px-3">
        <SheetHeader>
          <div className="flex gap-2 items-center">
          <Image src={user?.picture || "/logo.png"} alt="name" quality={100} className="rounded-full w-10 h-10 bg-secondary-foreground" width={25} height={25}/>
            <div className="font-semibold">
              <h1 className="leading-tight">{user?.name}</h1>
              <p className="text-muted-foreground font-normal text-sm leading-tight">
                {user?.email}
              </p>
            </div>
          </div>
        </SheetHeader>
        <section className="flex flex-col my-4 gap-1">
        <button className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md" >
            <User className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Your profile</p>
        </button>
    <Link href={"/profile"}>
        <button className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md" >
            <Cog className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Settings</p>
        </button>
    </Link>


        <button className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md" >
            <GoProject className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Your projects</p>
        </button>


        <button className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md" >
            <FiStar className="text-gray-600"  size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Your Stars</p>
        </button>

        <div className="bg-gray-500 w-full h-[2px] my-1"></div>
        <button className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md" >
            <LuLogOut className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Log out</p>
        </button>
        </section>
      </SheetContent>
    </Sheet>
  );
}
