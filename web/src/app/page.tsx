import { BackgroundBeamsWithCollision } from "@/shadcn/components/ui/background-beams-with-collision";
import React from "react";

export default function Home() {

return (
<BackgroundBeamsWithCollision>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
      Build Together, Shine Together {" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-primary via-accent-foreground to-accent py-4">
            <span className="">Welcome to Colabra .</span>
          </div>
        </div>
      </h2>
    </BackgroundBeamsWithCollision>
  );
}
