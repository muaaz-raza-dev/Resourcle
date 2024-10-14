import type { Metadata } from "next";
import "./globals.css";
import RecoilProvider from "@/components/providers/recoil-provider";
import Navbar from "@/components/global/navbar";
import  { Toaster } from 'react-hot-toast';
import QueryClientsProvider from "@/components/providers/query-client-provider";
import AuthUiValidator from "@/components/validators/auth-ui-validator";




export const metadata: Metadata = {
  title: "Colabra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo2.png" type="image/x-icon" />
      </head>
      <body className={`antialiased`}>
      <Toaster/>
        <RecoilProvider>
        <QueryClientsProvider>
        <AuthUiValidator>
        <Navbar/>
        {children}
        </AuthUiValidator>
        </QueryClientsProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
