import { Spotlight } from "@/shadcn/components/ui/spotlight";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function GetGithubStars() {
  return (
    <section className="relative  navbar-bg    overflow-hidden backdrop-blur-md py-12   center mt-8">
          
          <Spotlight fill="green"/>
          <Spotlight fill="white" className="left-20"/>
      <div className="z-50 relative inset-0 flex flex-col items-center gap-4 justify-center  font-bold px-8 max-md:mx-2  text-5xl text-center md:text-5xl lg:text-7xl">
        <h2 className="bg-clip-text h-max py-4  text-transparent  drop-shadow-2xl bg-gradient-to-b from-black/90 to-black/80">
          Actively Maintained
        </h2>
        <p className="text-lg font-semibold max-md:font-normal max-md:text-sm">
          We are always improving our content, adding new resources and adding
          features to enhance your experience.
        </p>

        <Link href={"https://github.com/muaaz-raza-dev/resourcle"} target="_blank" className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6  text-slate-100 transition-colors focus:outline-none focus:ring-2  focus:ring-slate-400 gap-2 font-semibold focus:ring-offset-2 focus:ring-offset-slate-50 text-lg">
          <FaGithub /> Github
        </Link>
        <p className="text-sm font-medium">
          Leave a star on github to support us
        </p>
      </div>
    </section>
  );
}
