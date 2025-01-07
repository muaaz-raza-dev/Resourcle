import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import { terms } from "./terms"
import { Metadata } from "next";
const name = process.env.NEXT_PUBLIC_NAME;

export const metadata: Metadata  = {
  title: "Terms and Conditions - Resourcle",
  description: "Read the terms of service for Resourcle, the ultimate platform to save and manage your favorite links in one place. Learn about your rights, responsibilities, and our policies to ensure a safe and efficient user experience.",
  keywords: [
    "Resourcle terms of service",
    "terms and conditions",
    "platform policies",
    "user agreement",
    "link management platform",
    "resource bookmarking terms"
  ],
  robots: "index, follow",

  openGraph: {
    title: "Terms of Service | Resource Diary",
    description: "Explore our terms of service to understand how to use Resource Diary responsibly and effectively. Your go-to platform for managing and organizing favorite links.",
    url: "https://resourcle.com/terms",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Resource Diary",
    description: "Discover the guidelines and policies for using Resource Diary, your favorite link management platform.",
  },
};

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto p-0">
      <Card className="shadow-none border-none bg-transparent">
        <CardHeader>
            <CardTitle className="text-3xl font-black flex  items-center justify-between">
            Terms and Conditions
            <p className="text-sm text-muted-foreground font-medium tracking-wide">Last Updated: [21-11-2024]</p>
                </CardTitle>
                <CardDescription>
                    <p className="text-base">
Welcome to {name} ! These Terms and Conditions govern your access to and use of our community-driven resource-sharing platform ({name}). By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree, please do not use the Platform.
                    </p>
                </CardDescription>
        </CardHeader>
        <CardContent className="">
            {terms.map((term)=>{
                return (
                    <section key={term.title} className="mb-6 ">
                    <h1 className="text-2xl font-black pb-1 ">{term.title}</h1>
                    {term.paragraphs.map((para,paraIndex)=>(
                     <div key={term.title+paraIndex} className="leading-7 antialiased  font-medium " dangerouslySetInnerHTML={{__html:para}}></div>
                    ))}
                      </section>
                )
            })}
   
       
        </CardContent>
      </Card>
    </div>
  )
}