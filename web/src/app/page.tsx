'use client'

import ActiveUsers from "@/components/landing page/sections/active-users";
import LovedResources from "@/components/landing page/sections/loved-resources";
import TrendingTopics from "@/components/landing page/sections/trending-topics";
import { TextGenerateEffect } from "@/shadcn/components/ui/text-generate-effect";

export default function DeveloperRoadmaps() {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl text-center pt-6 font-bold text-primary mb-4">
          Resource Ocean
        </h1>
        <TextGenerateEffect
          words={`resourcera.sh is a community effort to share resource , guides and other educational content
          to help guide users in picking up a path and guide their learnings.`}
          className="!text-white pb-4"
        />

        <LovedResources />
        <TrendingTopics/>
        <ActiveUsers/>
        
      </div>
    </div>
  );
}
