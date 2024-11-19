import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/shadcn/components/ui/sheet";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/state/auth.atom";
import { Cog, User } from "lucide-react";
import { LuLogOut } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import useLogOut from "@/hooks/auth/useLogOut";

export default function ProfileMenu() {
  const { user } = useRecoilValue(authAtom);
  const LogOut = useLogOut()
  return (
    <Sheet>
      <SheetTrigger>
        <Image src={user?.picture || "/user.png"} alt="name" quality={100} className="rounded-full w-10 h-10 bg-secondary-foreground" width={20} height={20}/>
      </SheetTrigger>
      <SheetContent className="!px-3">
        <SheetHeader>
          <div className="flex gap-2 items-center">
          <Image src={user?.picture || "/user.png"} alt="name" quality={100} className="rounded-full w-10 h-10 bg-secondary-foreground" width={25} height={25}/>
            <div className="font-semibold">
              <h1 className="leading-tight">{user?.name}</h1>
              <p className="text-muted-foreground font-normal text-sm leading-tight">
                {user?.email}
              </p>
            </div>
          </div>
        </SheetHeader>
        <section className="flex flex-col my-4 gap-1">
        <Link href={`/${user?._id}`} className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md" >
            <User className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Your profile</p>
        </Link>
    <Link href={"/settings/personal-info"}>
        <button className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md" >
            <Cog className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Settings</p>
        </button>
    </Link>



        <div className="bg-gray-500 w-full h-[2px] my-1"></div>

        <button onClick={LogOut} className="flex gap-2 items-center w-full py-2 px-2 hover:bg-secondary transition-colors rounded-md" >
            <LuLogOut className="text-gray-600" size={20}/>
            <p className="text-sm font-semibold text-gray-700 ">Log out</p>
        </button>

        </section>
      </SheetContent>
    </Sheet>
  );
}
