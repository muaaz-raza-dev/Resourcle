"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/components/ui/accordion"
import { faqs } from '@/data/faqs-landing.data'



export function FAQSection() {
  return (
    <section className="py-14 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <motion.h2 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-secondary-foreground to-black/70"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <AccordionItem value={`item-${index}`} className="border border-primary/20 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <AccordionTrigger className="text-left text-lg font-semibold p-6 bg-white hover:bg-primary/10 transition-colors duration-300">
                    <span>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="bg-white">
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 text-gray-600"
                      >
                        {faq.answer}
                      </motion.div>
                    </AnimatePresence>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      
      </motion.div>
    </section>
  )
}

