import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Keywords } from "@/data/keywords";
import Head from "next/head";

// Dynamically import the components to reduce initial bundle size
const Navbar = dynamic(() => import('@/components/global/navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/global/footer'), { ssr: false });
const RecoilProvider = dynamic(() => import('@/components/providers/recoil-provider'), { ssr: false });
const QueryClientsProvider = dynamic(() => import('@/components/providers/query-client-provider'), { ssr: false });
const AuthReminderModal = dynamic(() => import('@/components/global/auth-reminder-modal'), { ssr: false });
const AuthUiValidator = dynamic(() => import('@/components/validators/auth-ui-validator'), { ssr: false });

export const metadata: Metadata = {
  title: "Resourcle",
  description: "Resourcle is a community-driven platform for discovering, sharing, and collaborating on valuable resources, from articles to tools, with a focus on knowledge sharing.",
  keywords: Keywords,
  authors: [{ name: "Muaaz Raza", url: "https://linkedin.com/in/muaaz-raza" }],
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
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/logo/logo.ico" type="image/x-icon" />
        <meta name="google-site-verification" content="coRJi_s_5EGqv50oNGEGIIij14T0DrAtA9rYfELy0Kc" />
      </Head>
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
