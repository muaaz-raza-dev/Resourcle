import React from "react";
import HeadingComp from "../components/heading-comp";

import { Card, CardContent } from "@/shadcn/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shadcn/components/ui/avatar";
import { Avatar as AvatarAntd } from "antd";
import { AnimatedTooltip } from "@/shadcn/components/ui/animated-tooltip";
const users = [
  {
    name: "Muaaz",
    avatar: "/user.png",
    headline: "scientist will beat einstien",
    id: "govindam",
  },
  {
    name: "Muaaz",
    avatar: "/user.png",
    headline: "scientist will beat einstien",
    id: "govindam",
  },
  {
    name: "Muaaz",
    avatar: "/user.png",
    headline: "scientist will beat einstien",
    id: "govindam",
  },
  {
    name: "Muaaz",
    avatar: "/user.png",
    headline: "scientist will beat einstien",
    id: "govindam",
  },
];
export default function ActiveUsers() {
  return (
    <>
      <HeadingComp text={"🚀 Active users"} />
      <Card className="w-full max-w-full bg-transparent border-none shadow-none">
        <CardContent>
          <section className="flex flex-wrap justify-between gap-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 py-4 w-[48%] bg-secondary px-5 rounded-md"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 ">
                  <p className="text-sm font-semibold leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user.headline}
                  </p>
                </div>
                <div className="flex " />
                <button className="text-sm text-white transition-colors duration-200 bg-primary hover:bg-primary-dark rounded-md py-1 px-2">
                  Follow
                </button>
              </div>
            ))}
          </section>
          <section className="center py-4 gap-2 font-semibold">
              <AnimatedTooltip
                items={[
                  {
                    id: 2,
                    name: "Munna",
                    designation: "asdfasdfasf",
                    image: "/logo2.png",
                  },
                  {
                    id: 2,
                    name: "Munna",
                    designation: "asdfasdfasf",
                    image: "/logo2.png",
                  },
                  {
                    id: 2,
                    name: "Munna",
                    designation: "asdfasdfasf",
                    image: "/logo2.png",
                  },
                  {
                    id: 2,
                    name: "Munna",
                    designation: "asdfasdfasf",
                    image: "/logo2.png",
                  },
                ]}
              ></AnimatedTooltip>
            <p>+34 more</p>
          </section>
        </CardContent>
      </Card>
    </>
  );
}
