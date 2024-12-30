import React from 'react';
import HeadingComp from '../components/heading-comp';

const steps = [
    {
      title: "Resource Creation",
      description: "Users create resources by adding links to their favorite content and sharing valuable information.",
    },
    {
      title: "Community Engagement",
      description: "Other users can upvote and interact with the resources to highlight their usefulness and relevance.",
    },
    {
      title: "Organizing & Ranking",
      description: "The system organizes and ranks resources using advanced algorithms based on user engagement and relevance.",
    },

  ];
  
export default function HowItWorks() {
  return (
    <section className="py-8 ">
    <div className="container mx-auto px-4 py-8">
             <HeadingComp text='How it works'/>
      <div className="flex flex-wrap">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center ">
              <div className="w-3 h-3 p-2 rounded-full  border border-secondary-foreground hover:border-accent transition-colors border-dashed mr-4  text-sm text-white flex items-center justify-center ">
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
          <div className='leading-snug bg-secondary px-4 p-2 border text-sm rounded-md font-medium text-muted-foreground '>
            <b>Good practice : </b> If you find a resource valuable, we kindly encourage you to upvote it. Your support plays a crucial role in motivating and driving our ongoing efforts.
            </div>
  </section>
  )
}
