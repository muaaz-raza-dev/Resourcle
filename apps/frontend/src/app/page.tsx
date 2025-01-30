



import LandingPageClientComponents from "@/components/landing page/landing-page-client-components";
import { FAQSection } from "@/components/landing page/sections/faqs";
import GetGithubStars from "@/components/landing page/sections/get-github-stars";
import HeroSection from "@/components/landing page/sections/hero-section";
import HowItWorks from '@/components/landing page/sections/how-it-works';


export default function DeveloperRoadmaps() {
  return (
    <main>
      <div className="min-h-screen relative  p-8 ">
        <div className="lg:max-w-4xl   mx-auto ">
          <HeroSection />
      <LandingPageClientComponents />           
      <FAQSection/>
      <HowItWorks/>
      <GetGithubStars />

        </div>
      </div>
    </main>
  );
}
