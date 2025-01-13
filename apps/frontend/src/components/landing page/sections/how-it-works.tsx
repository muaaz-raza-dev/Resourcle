import React from 'react';
import HeadingComp from '../components/heading-comp';
import {  FaSortAmountDown } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineFire } from 'react-icons/ai';
import { Separator } from '@/shadcn/components/ui/separator';

const steps = [
    {
      icon:  IoMdAdd ,
      title: "Resource Creation",
      description: "Users create resources by adding links to their favorite content and sharing valuable information.",
    },
    {
      icon:AiOutlineFire,
      title: "Community Engagement",
      description: "Other users can upvote and interact with the resources to highlight their usefulness and relevance.",
    },
    {
      icon:FaSortAmountDown ,
      title: "Organizing & Ranking",
      description: "The system organizes and ranks resources using advanced algorithms based on user engagement and relevance.",
    },

  ];
  
export default function HowItWorks() {
  return (
    <section className="py-8 w-full overflow-hidden">
    <div className=" max-md:px-0   py-4">
      <div className="w-full">
             <HeadingComp text='How it works'/>
      </div>
      <div className="flex flex-wrap">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center ">
              <div className="h-full aspect-square p-2 rounded-md bg-secondary  border  hover:bg-accent/10 transition-colors  mr-4  text-sm 
               flex items-center justify-center ">
                {step.icon({})}
              </div>
              <div>
                <h3 className="text-base font-semibold max-md:text-lg">{step.title}</h3>
                <p className="text-muted-foreground leading-snug max-md:text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Separator/>
          <div className='leading-snug bg-secondary  px-4 p-2  text-sm rounded-md   flex flex-col gap-1 my-4'>
            <h2 className='text-accent bg-accent/10  px-4 w-max py-1 rounded-md  font-semibold inline'>Good practice  </h2>
            <p className='font-medium text-base tracking-tight text-muted-foreground '>
             If you find a resource valuable, we kindly encourage you to upvote it. Your support plays a crucial role in motivating and driving our ongoing efforts.
            </p>
            </div>
            <Separator/>
  </section>
  )
}
