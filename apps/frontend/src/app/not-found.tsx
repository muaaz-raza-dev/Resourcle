/* eslint-disable react/no-unescaped-entities */
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
function AnimatedNumber({ number }: { number: string }) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-9xl font-bold text-accent"
      >
        {number}
      </motion.span>
    )
  }
  
export default function NotFound() {
  return (
  <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br  px-4 overflow-hidden">
           
            <div className="relative z-10 text-center ">
              
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl font-bold mb-4"
              >
                Oops! Page Not Found
              </motion.h1>
              <div className="flex justify-center space-x-4 mb-8">
                <AnimatedNumber number="4" />
                <AnimatedNumber number="0" />
                <AnimatedNumber number="4" />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl mb-8 max-w-md mx-auto"
              >
                The page you're looking for doesn't exist or has been moved.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link
                  href="/"
                  className="px-8 py-3 bg-primary text-white rounded-md  duration-300 text-lg font-semibold"
                >
                  Return Home
                </Link>
              </motion.div>
            </div>
          </main>
  )
}
