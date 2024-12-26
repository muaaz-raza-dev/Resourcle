import { useState, useEffect } from "react";
const useScreenSizeTracker = () => {
      const [size, setSize] = useState<"lg" | "md" | "sm">("lg");
   
      const handleResize = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
          setSize("lg");
        } else if (width >= 768) {
          setSize("md");
        } else {
          setSize("sm");
        }
      };
    
      useEffect(() => {
        handleResize(); // Set initial size
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      return size;
    
}

export default useScreenSizeTracker