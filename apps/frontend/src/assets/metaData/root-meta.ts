import { Keywords } from "@/data/keywords";
import type { Metadata } from "next";
export const Rootmetadata: Metadata = {
    title: "Resourcle",
    description: "Resourcle is a community-driven platform for discovering, organizing, and sharing on valuable resources, from articles to tools, with a focus on knowledge sharing.",
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