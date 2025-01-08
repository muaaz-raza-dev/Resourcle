import useTrackUserProfileVisit from '@/hooks/user-activity/useTrackUserVisit'
import useGetUserProfileInfomartion from '@/hooks/user-profile/useGetUserInfomartion'
import React from 'react'

export default function UserProfileBanner() {
  useTrackUserProfileVisit()
  const {data}  = useGetUserProfileInfomartion({hitApi:false})
  const q= data?.payload
  return (
    <div className="relative h-48 w-full mb-4 overflow-hidden bg-gradient-to-r border-none from-secondary-foreground to-primary  ">
    {/* Animated circles */}
    <div className="absolute top-3/4 right-3/4 h-8 w-8 rounded-full bg-white opacity-10 animate-bounce"></div>
    <div className="absolute top-1/4 left-1/4 h-16 w-16 rounded-full bg-white opacity-10 animate-pulse"></div>
    <div className="absolute top-1/2 left-3/4 h-16 w-16 rounded-full bg-white opacity-10 animate-ping"></div>
    <div className="absolute bottom-1/4 right-1/4 h-20 w-20 rounded-full bg-white opacity-10 animate-bounce"></div>
    

    
    {/* Banner content */}
    <div className="flex h-full items-center justify-center flex-col">
      <div className="text-4xl max-md:text-2xl max-sm:text-xl font-bold text-white text-shadow flex gap-2">
        I am <h2 className='bg-white/40 text-white '> {q?.name}</h2>
      </div>
      {q?.headline?
      <p className='text-gray-300 font-semibold animate-pulse'>{q?.headline}.</p> : null
      }
    </div>
  </div>

  )
}
