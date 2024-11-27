import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import { terms } from "./terms"
const name = process.env.NEXT_PUBLIC_NAME
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