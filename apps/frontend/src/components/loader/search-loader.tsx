"use client";

import { dotPulse } from 'ldrs'
import { useEffect } from 'react';


// Default values shown



export default function SearchLoader() {
    useEffect(() => {
        dotPulse.register()
        
  }, []);
  return <l-dot-pulse
  size="15"
  speed="1.3" 
  color="black" 
></l-dot-pulse>
}