"use client";
import { useEffect } from 'react';
const ConfirmBeforeUnload = () => {
  useEffect(() => {
    const handleBeforeUnload = (event:BeforeUnloadEvent) => {
      const confirmationMessage = "Are you sure you want to leave? Any unsaved changes will be lost.";
      event.returnValue = confirmationMessage; // Standard for most browsers
      return confirmationMessage; // For older browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Empty dependency array means this runs only once when the component mounts

  return null; // This component does not render anything
};

export default ConfirmBeforeUnload;
