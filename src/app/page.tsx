"use client";

import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AnimatedCardSlides from "../components/Card/AnimatedCardSlides";

export default function Home() {
  const { theme } = useTheme();
  const router = useRouter();
  
  // 홈 페이지 사전 로딩
  useEffect(() => {
    router.prefetch('/home');
  }, [router]);

  const logoSrc = theme === 'dark' 
    ? '/icons/logo_text_gausian.webp' 
    : '/icons/logo_text.webp';

  const handleLogin = () => {
    // 버튼 클릭 즉시 페이지 이동 전에 시각적 피드백 제공
    const button = document.activeElement;
    if (button instanceof HTMLButtonElement) {
      button.style.opacity = '0.7';
    }
    
    // 작은 timeout으로 UI 변화를 볼 수 있는 시간 제공 후 페이지 이동
    setTimeout(() => {
      router.push('/home');
    }, 10);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 p-4 w-full max-w-5xl mx-auto relative" style={{ backgroundColor: 'var(--background)' }}>
      {/* 카드 슬라이드 애니메이션 */}
      <AnimatedCardSlides />
      
      <div className="w-full md:w-3/4 lg:w-2/3 h-32 sm:h-36 md:h-40 lg:h-44 relative z-10">
        <Image
          src={logoSrc}
          alt="Cardomoku Logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
          priority
          className="object-contain"
        />
      </div>
      
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 h-12 sm:h-14 relative z-10">
        <div className="absolute inset-0"></div>
        <button onClick={handleLogin} className="w-full h-full relative">
          <Image
            src="/images/kakao_login_button.png"
            alt="Kakao Login"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 66vw, (max-width: 1024px) 50vw, 40vw"
            className="object-contain cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}
