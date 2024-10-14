import React from "react";
import "./apploader.css";
export default function AppLoader() {
  return (
    <div className="bg-[#ffe5cf] w-screen h-screen center absolute z-[9999] top-0 left-0 flex-col gap-8">
      <div className="loader">
      <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
    </div>
  );
}
