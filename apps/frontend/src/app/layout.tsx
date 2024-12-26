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
  title: "Resourcin",
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
