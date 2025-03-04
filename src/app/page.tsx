"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Home() {
  const { resolvedTheme } = useTheme();

  const logoSrc = resolvedTheme === 'dark' 
    ? '/icons/logo_text_gausian.webp' 
    : '/icons/logo_text.webp';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 p-4 w-full max-w-5xl mx-auto relative">
      <div className="absolute w-[200%] h-64 bg-gray-200 dark:bg-gray-700 top-2/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[30deg] origin-center"></div>
      <div className="absolute w-[200%] h-64 bg-gray-200 dark:bg-gray-700 top-6/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[30deg] origin-center"></div>
      
      <div className="w-full md:w-3/4 lg:w-2/3 h-32 sm:h-36 md:h-40 lg:h-44 relative z-10">
        <Image
          src={logoSrc}
          alt="Cardomoku Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
      
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 h-12 sm:h-14 relative z-10">
        <Image
          src="/images/kakao_login_button.png"
          alt="Kakao Login"
          fill
          className="object-contain cursor-pointer"
        />
      </div>
    </div>
  );
}
