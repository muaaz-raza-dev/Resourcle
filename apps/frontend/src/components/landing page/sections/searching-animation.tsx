import { FlipWords } from '@/shadcn/components/ui/flip-words';
import { Search } from 'lucide-react';
import React from 'react'

const words = [
  "Top resources to learn React.js",
  "Best websites for quick meal recipes",
  "Recommended books for personal growth",
  "Resources to understand artificial intelligence",
  "Top platforms for movie reviews and updates",
  "Best study tools for exam preparation",
  "Travel blogs for winter vacation ideas",
  "Guides to creating a REST API with Node.js",
  "Meditation apps for beginners",
  "Websites to follow for web development trends",
  "Top CSS design libraries for responsive UI",
  "Best motivational podcasts for entrepreneurs",
  "Websites to start a side hustle effectively",
  "Free platforms for online coding courses",
  "Articles to understand blockchain technology",
  "Videos for healthy back exercises",
  "Tools to grow your social media presence",
  "Documentaries on space exploration",
  "Tutorials for debugging JavaScript code",
  "Resources for improving public speaking skills",
];


export default function SearchingAnimation() {
  return (
    <div className=" mx-auto text-base max-md:text-sm  font-semibold bg-secondary w-max min-w-3xl border  rounded-md px-4 center drop-shadow-2xl  flex gap-2 items-end py-2">
      <Search size={14}/>
      <div className="flex">
        <p className='max-md:hidden'>
      Searching for
        </p>
       <FlipWords  words={words} className='text-accent'/>
      </div>
  </div>
  )
}
