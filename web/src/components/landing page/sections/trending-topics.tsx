import React from 'react'
import { motion } from 'framer-motion'
import HeadingComp from '../components/heading-comp'
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
export default function TrendingTopics() {
  return (
    <>
    <motion.section    {...fadeInUp}>
    <motion.div dragElastic drag dragSnapToOrigin>
    <HeadingComp text={"🔥Trending Topics"}/>
    </motion.div>
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {['React', 'Python', 'Data Science', 'Web3', 'UX Design'].map((topic, index) => (
        <button key={index}  className="bg-secondary px-3 rounded-md py-1 text-sm  border-2 border-black font-bold hover:border-primary transition-colors">
          {topic}
        </button>
      ))}
    </div>
  </motion.section>
      </>
  )
}
