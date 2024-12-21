import React from 'react'
import { BackgroundBeams } from "@/shadcn/components/ui/background-beams";
import { TextGenerateEffect } from "@/shadcn/components/ui/text-generate-effect";
import {motion} from "framer-motion"
import { Search } from "lucide-react";
export default function HeroSection() {
  return (
    <div className="w-full relative overflow-hidden center flex-col ">
        <BackgroundBeams    />
    <button className="border border-dashed border-accent font-semibold center gap-2 text-accent rounded-md px-3 py-1 ">
      <div className="flex  items-center text-black gap-1 ">
        <Search size={15}/>
        Search 
      </div>
      Discover all useful links in one place
    </button>
  <motion.h1
    initial={{ opacity: 0, x: 10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{
      duration: 0.1,
      ease: "easeInOut",
    }}
    className="bg-gradient-to-br from-slate-300 to-slate-500  bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
  >
    <h1 className="text-5xl text-center pt-4 font-bold   flex flex-col gap-2 bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/90 to-black/80">
    Your Place for Organized, High-Quality Resources. 
    </h1>
  </motion.h1>
  <TextGenerateEffect
      words={`resourcera.sh is a community effort to share resource , guides and other educational content
      to help guide users in picking up a path and guide their learnings.`}
      className="!text-white pb-4"
      duration={0.2}
    />
    </div>
  )
}
