import React from "react";
import HeadingComp from "../components/heading-comp";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import {
  Avatar,
  AvatarFallback,
} from "@/shadcn/components/ui/avatar";
import useLoadUsersFeed from "@/hooks/feed/useLoadUserFeed";
import ResourceLoader from "../loader/resource-loader";
import Link from "next/link";
import Image from "next/image";


export default function ActiveUsers() {
  const { isLoading, data } = useLoadUsersFeed();
  if (isLoading) return <ResourceLoader />;
  const users = data?.payload;
  if(!users||!users?.length) return null
    return (
    <>
      <Card className="w-full max-w-full bg-transparent border-none shadow-none px-0 overflow-hidden">
      <HeadingComp text={" Top Contributers"} />
        <CardContent className="p-0">
          <section className="flex flex-wrap justify-between gap-y-3">
            {users?.map(({ user }) => (
              <div
                key={user._id}
                className="flex items-center gap-3 py-4 lg:w-[48%] max-lg:w-full border-2 px-5 rounded-md"
              >
                <Link href={`/u/${user._id}`}>
                <Avatar className="h-12 w-12  ">
                  <Image
                    src={user.picture || "/user.png"}
                    alt={user.name} 
                    width={40}
                    height={40}
                    className="rounded-full"
                    quality={50}
                    priority
                    />
                  <AvatarFallback className="bg-secondary-foreground text-white font-semibold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                    </Link>
                <div className="flex-1  flex flex-col justify-betweeen">
                  <Link href={`/u/${user._id}`}>
                  <p className="font-semibold text-sm ">
                    {user.name}
                  </p>
                  </Link>
                  <p className="text-xs max-md:text-sm leading-tight text-muted-foreground">
                    {user.headline} 
                  </p>
                 
                  
                </div>
                <div className="flex " />
                
                <Link href={`/u/${user._id}`} className="text-xs text-white transition-colors duration-200 
                bg-secondary-foreground hover:bg-primary-dark rounded-md py-1 px-4">
                   Profile
                </Link>
              </div>
            ))}
          </section>
        
        </CardContent>
      </Card>
    </>
  );
}
