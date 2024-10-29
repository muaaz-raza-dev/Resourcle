import React from 'react'
import HeadingComp from '../components/heading-comp'
import { FaPlus } from 'react-icons/fa'
import UpvoteBtn from '@/components/global/upvote-btn'
import { BookmarkIcon } from 'lucide-react'



const roadmaps = [
    "Frontend", "Backend", "DevOps",
    "Full Stack", "AI Engineer", "Data Analyst",
    "AI and Data Scientist", "Android", "iOS",
    "PostgreSQL", "Blockchain", "QA",
    "Software Architect", "Cyber Security", "UX Design"
  ]
export default function LovedResources() {
  return (
    <>
    
    <HeadingComp text={"❤️ Loved Resources"}/>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
      {roadmaps.map((roadmap, index) => (
        <section key={index} className="bg-secondary border-gray-700 py-3  rounded-md px-4 hover:border-black border border-transparent cursor-pointer transition-colors">
          <div className="flex flex-row   justify-between items-center h-max py-0   ">
            <h1 className="font-semibold ">{roadmap}</h1>
            <div className="flex gap-1 items-center">
            <UpvoteBtn/>
            <BookmarkIcon className="text-gray-700 py-0" size={18} />
            </div>
          </div>
        </section>
      ))}

      <button className="bg-secondary border-gray-700 py-3 hover:bg-white   rounded-md px-4 hover:border-black border border-dashed  transition-colors">
          <div className="flex flex-row   gap-2 items-center h-max py-0   ">
            <FaPlus overlineThickness={1}/>
            <h1 className="font-semibold ">Create your own resource</h1>
          </div>
        </button>
    </div>

    </>
  )
}
