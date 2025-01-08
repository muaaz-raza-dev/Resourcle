import React from "react";
import HeadingComp from "../components/heading-comp";

import { Card, CardContent } from "@/shadcn/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shadcn/components/ui/avatar";
import { AnimatedTooltip } from "@/shadcn/components/ui/animated-tooltip";
import useLoadUsersFeed from "@/hooks/feed/useLoadUserFeed";
import ResourceLoader from "../loader/resource-loader";
import Link from "next/link";


export default function ActiveUsers() {
  const { isLoading, data } = useLoadUsersFeed();
  if (isLoading) return <ResourceLoader />;
  const users = data?.payload;
    if(!users||!users?.length) return null
    return (
    <>
      <HeadingComp text={" Top Contributers"} />
      <Card className="w-full max-w-full bg-transparent border-none shadow-none px-0">
        <CardContent className="p-0">
          <section className="flex flex-wrap justify-between gap-y-3">
            {users?.slice(0, 4)?.map(({ user }) => (
              <div
                key={user._id}
                className="flex items-center gap-3 py-4 lg:w-[48%] max-lg:w-full border-2 px-5 rounded-md"
              >
                <Avatar className="h-12 w-12  ">
                  <AvatarImage
                    src={user.picture || "/user.png"}
                    alt={user.name} 
                  />
                  <AvatarFallback className="bg-secondary-foreground text-white font-semibold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1  flex flex-col justify-betweeen">
                  <p className="text-sm font-semibold leading-none">
                    {user.name}
                  </p>
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
          {data?.payload&& data?.payload.length>5&&
          <section className="center py-4 gap-2 font-semibold">
            <AnimatedTooltip
              items={users
                ?.slice(0,8).map((e,i)=> ({
                  name: e.user.name,
                  image: e.user.picture || "/user.png",
                  designation: e.user.headline,
                  
                  id: i,
                }))||[]}
            ></AnimatedTooltip>
          </section>
            }
        </CardContent>
      </Card>
    </>
  );
}
