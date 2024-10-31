'use client'

import ActiveUsers from "@/components/landing page/sections/active-users";
import GetGithubStars from "@/components/landing page/sections/get-github-stars";
import LovedResources from "@/components/landing page/sections/loved-resources";
import TrendingTopics from "@/components/landing page/sections/trending-topics";
import { SparklesCore } from "@/shadcn/components/ui/sparkles";

import { TextGenerateEffect } from "@/shadcn/components/ui/text-generate-effect";
import {motion} from "framer-motion"
export default function DeveloperRoadmaps() {
  return (
    <main>

    
    <div className="min-h-screen  p-8">
      <div className="max-w-4xl mx-auto">

      <motion.h1
        initial={{ opacity: 0.5, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        <h1 className="text-5xl text-center pt-6 font-bold   flex flex-col gap-2 bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/90 to-black/80">
        Your Place for Organized, High-Quality Resources. 
        </h1>
      </motion.h1>
      <TextGenerateEffect
          words={`resourcera.sh is a community effort to share resource , guides and other educational content
          to help guide users in picking up a path and guide their learnings.`}
          className="!text-white pb-4"
        />
      <SparklesCore 
    
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={200}
          className="w-full h-12"
          particleColor="#000"
        />
         

          
 

        

        <LovedResources />
        <TrendingTopics/>
        <ActiveUsers/>
        
      </div>
    </div>
      <GetGithubStars/>
      </main>
  );
}
