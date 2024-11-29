/* eslint-disable react/no-unescaped-entities */
import React, { ReactElement, ReactNode } from "react";
import Link from 'next/link'
import { motion } from 'framer-motion'
export default function NotFoundRenderer({
  errorMessage,
  isError,
  isLoading,
  Loader,
  children
}: {
  isError: boolean;
  errorMessage?:string;
  isLoading?: boolean;
  Loader?: ReactElement;
  children: ReactNode;
}) {
  if (isLoading) return Loader;
  if (isError) {
    return(  <main className="flex flex-col items-center justify-center min-h-[80vh]  px-4 overflow-hidden">
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Oops! User Not Found
          </motion.h1>
          <div className="flex justify-center space-x-4 mb-8">
            <h1 className="text-9xl font-bold text-accent">
            404
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl mb-8"
          >
            {errorMessage|| `We couldn't find what you're looking for. They may have been deleted or never existed.`
            }
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4"
          >
            
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-secondary-foreground text-white rounded-md transition-colors duration-300 text-lg font-semibold"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </main>
      )
  
}
else return children 
}
