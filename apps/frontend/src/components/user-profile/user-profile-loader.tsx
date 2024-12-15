'use client'

import { motion } from 'framer-motion'

export default function ProfileSkeletonLoader() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Banner Skeleton */}
      <div className="relative h-52 bg-gradient-to-r from-secondary-foreground to-primary  rounded-lg overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-green-700/30 to-transparent"
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
    
      </div>

      {/* Profile Section */}
      <div className="px-8  mt-4">
        <div className="flex items-start gap-6">
          {/* Avatar Skeleton */}
          <div className="h-32 w-32 rounded-full bg-gray-200 animate-pulse ring-4 ring-white" />
          
          {/* Profile Info Skeleton */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-7 w-48 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="h-5 w-32 bg-gray-200 rounded-lg animate-pulse mb-2" />
            <div className="h-5 w-56 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      

      {/* Resources Count & Controls */}
      <div className="px-8 mt-6 flex items-center justify-between">
        <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse" />
        <div className="flex items-center gap-4">
          <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Resource Card Skeleton */}
      <div className="px-8 mt-6">
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex-1">
              <div className="h-5 w-32 bg-gray-200 rounded-lg animate-pulse mb-1" />
              <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-5 w-16 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-5 w-16 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-5 w-16 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

