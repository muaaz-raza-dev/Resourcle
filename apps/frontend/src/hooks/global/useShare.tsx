"use client";
import { useState } from "react";

const useShare = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState("");

  const share = async ({ title, text,
     url=`${window.location.origin}${window.location.pathname}` 
    }:{title:string,text:string,url?:string}) => {
    if (!navigator.share && !navigator.clipboard) {
      setError("Sharing not supported on this browser.");
      return;
    }

    setIsSharing(true);
    try {
      if (navigator.share) {
        // Native Web Share API
        console.log(url,title,text)
        await navigator.share({ title, text, url });
      } else if (navigator.clipboard) {
        // Fallback to copy-to-clipboard
        await navigator.clipboard.writeText(`${url}`);
        alert("Link copied to clipboard!");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      setError(err.message);
    } finally {
      setIsSharing(false);
    }
  };

  return { share, isSharing, error };
};

export default useShare;
