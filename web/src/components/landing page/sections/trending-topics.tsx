import React from 'react'
import { motion } from 'framer-motion'
import HeadingComp from '../components/heading-comp'
import useLoadTagsFeed from '@/hooks/feed/useLoadTagsFeed'
import TagsFeedLoader from '../loader/tag-loader'
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
export default function TrendingTopics() {
  const {data,isLoading}  = useLoadTagsFeed()
  const q = data?.payload
  if(isLoading) return <TagsFeedLoader/>
  return (
    <>
    <motion.section    {...fadeInUp}>
    <HeadingComp text={"🔥Trending Topics"}/>
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {
      q?.map((tag, index) => (
        <button key={index}  className="bg-secondary px-3 rounded-md py-1 text-sm  border-2 border-black font-bold hover:border-primary transition-colors">
          {tag.name}
        </button>
      ))}
    </div>
  </motion.section>
      </>
  )
}
