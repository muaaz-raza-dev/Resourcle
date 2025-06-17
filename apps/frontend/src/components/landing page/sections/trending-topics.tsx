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
  if(!q||q.length==0) return null
  return (
    <>
    <motion.section  {...fadeInUp} className='w-full overflow-hidden '>
    <HeadingComp text={"Trending Categories"}/>
    <div className="flex  overflow-x-auto pb-4 flex-wrap gap-2">
      {
      q?.map((tag, index) => (
        <div key={index}  className="bg-secondary px-3 rounded-md  py-1 text-sm  border-2 border-black font-bold whitespace-nowrap hover:border-primary transition-colors">
          {tag.name}
        </div>
      ))}
    </div>
  </motion.section>
      </>
  )
}
