import Image from "next/image";

import React, { useEffect } from "react";
import { zoomies } from 'ldrs'

export default function AppLoader() {
  useEffect(() => {
    zoomies.register()
  }, []);
  return (
    <main className="w-screen absolute top-0 left-0 bg-background z-[999]  h-screen center flex-col gap-5">
      <div className="flex-shrink-0 flex items-center">
        <Image
          height={140}
          width={140}
          src="/logo/logo-transparent.svg"
          alt="Logo"
          quality={50}
        />
      </div>

<l-zoomies
  stroke="10"
  speed="1.3"
  color="#0b110b"
  size="160"
  bg-opacity="0.1"
></l-zoomies>
    </main>
  );
}
