"use client";

import React, { lazy,Suspense } from 'react';
import ResourceLoader from "@/components/landing page/loader/resource-loader";
import TagsFeedLoader from "@/components/landing page/loader/tag-loader";
import { FAQSection } from "@/components/landing page/sections/faqs";
import GetGithubStars from "@/components/landing page/sections/get-github-stars";
import HeroSection from "@/components/landing page/sections/hero-section";
const LovedResources = lazy(() =>import('@/components/landing page/sections/loved-resources'));
const ActiveUsers = lazy(() =>import('@/components/landing page/sections/active-users'));
const TrendingTopics = lazy(() =>import('@/components/landing page/sections/trending-topics'));

export default function DeveloperRoadmaps() {
  return (
    <main>
      <div className="min-h-screen  p-8 ">
        <div className="lg:max-w-4xl   mx-auto ">

          <HeroSection />
          <Suspense fallback={<ResourceLoader />}>
          <LovedResources />
          </Suspense>
          <Suspense fallback={<TagsFeedLoader/>}>
          <TrendingTopics />
          </Suspense>
          <Suspense fallback={<ResourceLoader/>}>
          <ActiveUsers />
          </Suspense>
      <FAQSection/>
      <GetGithubStars />
        </div>
      </div>
    </main>
  );
}
