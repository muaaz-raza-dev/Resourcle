

 export const RootSchemaOrgData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Resourcle - Top Learning Resources & Web Links",
    "description": "Discover the web’s best free resources, tools, and learning materials—all curated by the community! Join Resourcle to explore, organize, and share valuable knowledge effortlessly.",
    "publisher": {
      "@type": "Organization",
      "name": "Resourcle",
      "logo": {
        "@type": "ImageObject",
        "url": "https://resourcle.com/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://resourcle.com"
    },
    "image": "https://resourcle.com/favicon.ico", // This could be your site logo or main image
    "url": "https://resourcle.com", // Landing page URL
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://resourcle.com/search?search={search_term}",
      "query-input": "required name=search_term"
    }
  };


