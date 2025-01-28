import type { Metadata } from "next";
import 'react-loading-skeleton/dist/skeleton.css';
import "./globals.css";
import RecoilProvider from "@/components/providers/recoil-provider";
import Navbar from "@/components/global/navbar";
import { Toaster } from 'react-hot-toast';
import QueryClientsProvider from "@/components/providers/query-client-provider";
import AuthUiValidator from "@/components/validators/auth-ui-validator";
import AuthReminderModal from "@/components/global/auth-reminder-modal";
import Footer from "@/components/global/footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Keywords } from "@/data/keywords";

export const metadata: Metadata = {

  title: "Resourcle",
  description: "Resourcle is a community-driven platform for discovering, sharing, and collaborating on valuable resources, from articles to tools, with a focus on knowledge sharing.",
  keywords: Keywords,
  authors: [{ name: "Muaaz Raza", url: "https://linkedin.com/in/muaaz-raza" }],
  // Open Graph (Facebook) metadata
  openGraph: {
    type: "website",
    url: "https://resourcle.com",
    title: "Resourcle",
    description: "A community-driven platform where users can share, discover, and collaborate on educational resources and useful links.",
    images: [
      {
        url: "https://resourcle.com/logo/logo.png",
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
    title: "Resourcle",
    description: "Join Resourcle, a community-driven platform for discovering, sharing, and collaborating on educational and valuable resources.",
    images: "https://resourcle.com/logo/logo.png",
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
        {/* Google verification tag */}
        <meta name="google-site-verification" content="coRJi_s_5EGqv50oNGEGIIij14T0DrAtA9rYfELy0Kc" />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <RecoilProvider>
            <QueryClientsProvider>
              <AuthReminderModal />
              <AuthUiValidator>
                <Navbar />
                {children}
                <Footer />
              </AuthUiValidator>
            </QueryClientsProvider>
          </RecoilProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
