
import "./globals.css";
import dynamic from "next/dynamic";
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import { Rootmetadata } from "@/assets/metaData/root-meta";
import { RootSchemaOrgData } from "@/assets/metaData/root-schema-org";

// Dynamically import the components to reduce initial bundle size
const Navbar = dynamic(() => import('@/components/global/navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/global/footer'), { ssr: true });
const RecoilProvider = dynamic(() => import('@/components/providers/recoil-provider'), { ssr: false });
const QueryClientsProvider = dynamic(() => import('@/components/providers/query-client-provider'), { ssr: false });
const AuthReminderModal = dynamic(() => import('@/components/global/auth-reminder-modal'), { ssr: false });
const AuthUiValidator = dynamic(() => import('@/components/validators/auth-ui-validator'), { ssr: false });

export const metadata=Rootmetadata;


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"  />
        <link rel="canonical" href="https://resourcle.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(RootSchemaOrgData),
          }}
        />
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
