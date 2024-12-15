import { ring } from "ldrs";
import Image from "next/image";

import React, { useEffect } from "react";
export default function AppLoader() {
  useEffect(() => {
    ring.register();
  }, []);
  return (
    <main className="w-screen absolute top-0 left-0 bg-background z-[999]  h-screen center flex-col gap-5">
      <div className="flex-shrink-0 flex items-center">
        <Image
          height={150}
          width={150}
          src="/logo/logo-transparent.svg"
          alt="Logo"
        />
      </div>
      <l-ring
        size="80"
        stroke="10"
        speed="2"
        color="#0b110b"
      ></l-ring>
    </main>
  );
}
