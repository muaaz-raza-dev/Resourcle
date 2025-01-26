import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/components/ui/avatar'
import { User } from 'lucide-react'
import { Tooltip } from 'antd'
import useGetUserProfileInfomartion from '@/hooks/user-profile/useGetUserInfomartion'
import Link from 'next/link'
export default function UserProfileInformation() {
  const {data}  = useGetUserProfileInfomartion({hitApi:false})
  const q= data?.payload
  return (
    <main className=' '>

    


    <section className='justify-between flex md:items-center gap-4 flex-wrap max-md:flex-col'>

    
    <div className=" flex items-center gap-3  ">


    <div className="flex flex-col sm:flex-row items-center gap-4 self-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className=''
      >
        <Avatar className="w-32 h-32 max-md:w-16 max-md:h-16 aspect-square  dark:border-gray-800 " >
          <AvatarImage src={q?.picture||"/user.png"} alt={q?.name}  />
          <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
        </Avatar>
      </motion.div>
    </div>
      <div className=" ">
        <p className="text-muted-foreground leading-none text-sm">{q?.username}</p>
        <h1 className="text-3xl max-md:text-2xl font-bold leading-none text-gray-900 dark:text-gray-100">{q?.name}</h1>
        <p className="text-muted-foreground  leading-tight  ">{q?.headline||""}</p>
      </div>
      </div>
      <div className="md:mt-2">
        <h2 className='font-semibold text-muted-foreground text-sm md:hidden'> Links</h2>
        <div className="flex gap-2 flex-wrap ">
          {
            q?.links?.map(link=> <Link target='_blank' href={link.url} key={link.url}  className="inline-flex items-center max-md:text-xs  hover:bg-primary/10 transition-colors  py-2
            max-md:py-1 text-sm px-4 border-2 border-black font-semibold  h-max  rounded-md ">
              <Tooltip placement='bottom' title={link.url}>
              {link.label.slice(0,10)}
              </Tooltip>
              </Link>
              )
            }
            </div>
        </div>
</section>
      

{
  q?.about ?
<div className='mt-4 max-md:mt-2'>
  <h2 className='font-semibold text-muted-foreground text-sm'> About me</h2>
  <p className=" text-sm leading-tight ">{q.about}</p>
  </div>:null
}
      </main>
  )
}
