import { Spotlight } from "@/shadcn/components/ui/spotlight";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function GetGithubStars() {
  return (
    <section className="relative  min-h-[40vh]  center mt-8">
      <Spotlight
        className="-top-40 right-0 md:right-60 md:-top-20"
        fill="black"
      />

      <Spotlight
        className="-top-40 right-0 md:left-60 md:-top-20 "
        fill="green"
      />

      <div className="z-50 inset-0 flex flex-col items-center gap-4 justify-center  font-bold px-4  text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text h-max  text-transparent drop-shadow-2xl bg-gradient-to-b from-black/90 to-black/80">
          Actively Maintained
        </p>
        <p className="text-lg font-medium">
          We are always improving our content, adding new resources and adding
          features to enhance your experience.
        </p>

        <Link href={"https://github.com/muaaz-raza-dev"} target="_blank" className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6  text-slate-100 transition-colors focus:outline-none focus:ring-2  focus:ring-slate-400 gap-2 font-semibold focus:ring-offset-2 focus:ring-offset-slate-50 text-lg">
          <FaGithub /> Github
        </Link>
        <p className="text-sm font-medium">
          Leave a star on github to support us
        </p>
      </div>
    </section>
  );
}
