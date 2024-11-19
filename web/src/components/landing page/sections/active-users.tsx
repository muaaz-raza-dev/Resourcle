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
import { AiFillFire } from "react-icons/ai";

export default function ActiveUsers() {
  const { isLoading, data } = useLoadUsersFeed();
  if (isLoading) return <ResourceLoader />;
  const users = data?.payload;
  return (
    <>
      <HeadingComp text={"🚀 Active users"} />
      <Card className="w-full max-w-full bg-transparent border-none shadow-none">
        <CardContent>
          <section className="flex flex-wrap justify-between gap-y-3">
            {users?.slice(0, 4)?.map(({ user, top_posts, upvotes }) => (
              <div
                key={user._id}
                className="flex items-center gap-3 py-4 w-[48%] bg-secondary px-5 rounded-md"
              >
                <Avatar className="h-10 w-10">
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
                  <p className="text-sm text-muted-foreground">
                    {user.headline} 
                  </p>
                  <div className="flex gap-2 items-center text-xs ">

                    <div  className="border p-0.5 rounded">
                  Top Resources {top_posts}
                    </div>
                    <div  className="flex gap-1 items-center border p-0.5 rounded">
                      <AiFillFire fill="rgb(249 115 22)" />

                  Upvotes {upvotes}
                   </div>
                  </div>
                  
                </div>
                <div className="flex " />
                <Link href={`${user._id}`} className="text-sm text-white transition-colors duration-200 bg-primary hover:bg-primary-dark rounded-md py-1 px-2">
                  Visit
                </Link>
              </div>
            ))}
          </section>
          <section className="center py-4 gap-2 font-semibold">
            <AnimatedTooltip
              items={users
                ?.slice(4,8).map((e,i)=> ({
                  name: e.user.name,
                  image: e.user.picture || "/user.png",
                  designation: e.user.headline,
                  id: i,
                }))||[]}
            ></AnimatedTooltip>
            { users && (users?.length-8) > 0 && <p>+{users?.length-8} more</p>}
          </section>
        </CardContent>
      </Card>
    </>
  );
}
