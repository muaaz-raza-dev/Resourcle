import { FlipWords } from '@/shadcn/components/ui/flip-words';
import React from 'react'

export default function SearchingAnimation() {
  const words = ["Best Engineering Blogs"," Top Productivity Tools", "Trending Design Resources"];
  return (
    <div className=" mx-auto text-xl  font-medium center text-transparent drop-shadow-2xl  bg-clip-text bg-gradient-to-b from-accent to-accent-foreground ">
      Searching for <FlipWords words={words}/>
  </div>
  )
}
