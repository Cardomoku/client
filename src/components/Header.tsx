'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../providers/ThemeProvider';
import { useState, useEffect } from 'react';

interface HeaderProps {
  coins?: number;
}

export default function Header({ coins = 0 }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="w-full px-4 py-3 flex items-center justify-between shadow-md style-1">
      <Link href="/" className="flex items-center">
        <div className="relative w-32 h-7">
          <Image
            src={theme === 'dark' ? '/icons/logo_text_white.webp' : '/icons/logo_text.webp'}
            alt="Cardomoku 로고"
            fill
            className="object-contain"
          />
        </div>
      </Link>
      
      <div className="flex items-center gap-4">
        {/* 코인 표시 */}
        <div className="flex items-center gap-2 bg-gray-300 rounded-full py-1 px-3">
          <div className="relative w-5 h-5">
            <Image
              src="/images/coin.svg"
              alt="코인"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium text-black">{coins.toLocaleString()}</span>
        </div>

        {/* 테마 토글 버튼 */}
        <button 
          onClick={toggleTheme}
          className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Image
            src={theme === 'dark' ? '/images/theme_dark.svg' : '/images/theme_light.svg'}
            alt={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            width={24}
            height={24}
            className="object-contain"
          />
        </button>
        
        {/* 알림 아이콘 */}
        <button className="relative w-6 h-6">
          <Image
            src={theme === 'dark' ? '/images/notification_dark.svg' : '/images/notification_light.svg'}
            alt="알림"
            width={24}
            height={24}
            className="object-contain"
          />
        </button>
        
        {/* 프로필 아이콘 */}
        <div className="w-8 h-8 bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
          <Image
            src={theme === 'dark' ? '/images/profile_dark.svg' : '/images/profile_light.svg'}
            alt="프로필"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      </div>
    </header>
  );
} 