import { Keywords } from "@/data/keywords";
import type { Metadata } from "next";

export const Rootmetadata: Metadata = {
    "title": "Resourcle – Explore Best Resources & Community Web Links",
    "description": "Explore, save & share top resources, tools and guides curated by learners. Resourcle helps you organize valuable web resources and level up your skills.",
  keywords: Keywords, // Ensure this is an array of strings
  authors: [{ name: "Muaaz Raza", url: "https://linkedin.com/in/muaaz-raza" }],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico", // ✅ Favicon for better branding
  },
  openGraph: {
    type: "website",
    url: "https://resourcle.com",
    title: "Resourcle - Discover, Organize & Share Resources",
    description:
      "A community-driven platform where users can share, discover, and collaborate on educational resources and useful links.",
    images: [
      {
        url: "https://resourcle.com/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Resourcle logo",
      },
    ],
    siteName: "Resourcle",
    locale: "en_US", // ✅ Specify locale for better reach
  },
  twitter: {
    site: "@resourcleapp",
    creator: "@muaazraza",
    title: "Resourcle - Your Hub for Free Learning Resources",
    description:
      "Join Resourcle, a community-driven platform for discovering, sharing, and collaborating on educational and valuable resources.",
    images: "https://resourcle.com/logo/logo.png",
    card: "summary_large_image",
  },
};
