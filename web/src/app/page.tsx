"use client";

import ActiveUsers from "@/components/landing page/sections/active-users";
import { FAQSection } from "@/components/landing page/sections/faqs";
import GetGithubStars from "@/components/landing page/sections/get-github-stars";
import HeroSection from "@/components/landing page/sections/hero-section";
import LovedResources from "@/components/landing page/sections/loved-resources";
import TrendingTopics from "@/components/landing page/sections/trending-topics";

export default function DeveloperRoadmaps() {
  return (
    <main>
      <div className="min-h-screen  p-8">
        <div className="max-w-4xl   mx-auto">
          <HeroSection />
          <LovedResources />
          <TrendingTopics />
          <ActiveUsers />
        </div>
      </div>
      <FAQSection/>
      <GetGithubStars />
    </main>
  );
}
