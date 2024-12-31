import type { Metadata } from "next";
import 'react-loading-skeleton/dist/skeleton.css'
import "./globals.css";
import RecoilProvider from "@/components/providers/recoil-provider";
import Navbar from "@/components/global/navbar";
import  { Toaster } from 'react-hot-toast';
import QueryClientsProvider from "@/components/providers/query-client-provider";
import AuthUiValidator from "@/components/validators/auth-ui-validator";
import AuthReminderModal from "@/components/global/auth-reminder-modal";
import Footer from "@/components/global/footer";
import { GoogleOAuthProvider } from "@react-oauth/google";




export const metadata: Metadata = {
  title: "Resourcle - Discover, Share, and Collaborate on Resources",
  description: "Resourcle is a community-driven platform for discovering, sharing, and collaborating on valuable resources, from articles to tools, with a focus on knowledge sharing.",
  keywords: "resource sharing, community platform, discover resources, knowledge sharing, collaborate on resources, educational resources, online resources, resource links",
  authors: [{name:"Muaaz Raza",url:"https://linkedin.com/in/muaaz-raza"}],
  // Open Graph (Facebook) metadata
  openGraph: {
    type: "website",
    url: "https://resourcle.vercel.app",
    title: "Resourcle - Discover, Share, and Collaborate on Resources",
    description: "A community-driven platform where users can share, discover, and collaborate on educational resources and useful links.",
    images: [
      {
        url: "https://resourcle.vercel.app/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Resourcle logo",
      },
    ],
    siteName: "Resourcle",
  },
  twitter: {
    site: "@resourcleapp",
    creator: "@resourcleapp",
    title: "Resourcle - Discover, Share, and Collaborate on Resources",
    description: "Join Resourcle, a community-driven platform for discovering, sharing, and collaborating on educational and valuable resources.",
    images: "https://resourcle.vercel.app/logo/logo.png",
    card: "summary_large_image",  // Use large image for better visibility
  },

  // Additional metadata for advanced SEO
  robots: "index, follow",  // Allow search engines to index and follow links

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo/logo.ico" type="image/x-icon" />
      </head>
      <body className={`antialiased`}>
      <Toaster/>
        <GoogleOAuthProvider  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} >
        <RecoilProvider>
        <QueryClientsProvider>
              <AuthReminderModal/>
        <AuthUiValidator>
        <Navbar/>
        {children}
        <Footer/>
        </AuthUiValidator>
        </QueryClientsProvider>
        </RecoilProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
