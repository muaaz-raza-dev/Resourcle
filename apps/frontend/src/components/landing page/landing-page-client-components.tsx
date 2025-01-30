"use client";
import React, { lazy,Suspense } from 'react';
const LovedResources = lazy(() =>import('@/components/landing page/sections/loved-resources'));
const ActiveUsers = lazy(() =>import('@/components/landing page/sections/active-users'));
const TrendingTopics = lazy(() =>import('@/components/landing page/sections/trending-topics'));
import ResourceLoader from "@/components/landing page/loader/resource-loader";
import TagsFeedLoader from "@/components/landing page/loader/tag-loader";
export default function LandingPageClientComponents() {
  return (
    <>
    <Suspense fallback={<ResourceLoader />}>
              <LovedResources />
              </Suspense>
              <Suspense fallback={<TagsFeedLoader/>}>
              <TrendingTopics />
              </Suspense>
              <Suspense fallback={<ResourceLoader/>}>
              <ActiveUsers />
              </Suspense>
    </>
  )
}
