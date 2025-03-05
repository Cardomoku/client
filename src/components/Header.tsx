'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../providers/ThemeProvider';

interface HeaderProps {
  coins?: number;
}

export default function Header({ coins = 0 }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  
  const logoSrc = theme === 'dark' 
    ? '/icons/logo_text_white.webp' 
    : '/icons/logo_text.webp';
  
  return (
    <header className="w-full px-4 py-3 flex items-center justify-between shadow-md" style={{ backgroundColor: 'var(--header-bg)' }}>
      <Link href="/" className="flex items-center">
        <div className="relative w-32 h-7">
          <Image
            key={theme}
            src={logoSrc}
            alt="Cardomoku Logo"
            fill
            sizes="128px"
            priority
            className="object-contain"
          />
        </div>
      </Link>
      
      <div className="flex items-center gap-4">
        {/* 코인 표시 */}
        <div className="flex items-center gap-2 bg-white dark:bg-black rounded-full py-1 px-3">
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-yellow-400 text-yellow-600">
              <span className="text-xs">C</span>
            </div>
          </div>
          <span className="text-sm font-medium text-black dark:text-white">{coins.toLocaleString()}</span>
        </div>
        
        {/* 알림 아이콘 */}
        <button className="relative w-6 h-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black dark:text-white">
            <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
            <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* 프로필 아이콘 */}
        <div className="w-8 h-8 bg-black dark:bg-white rounded-md overflow-hidden flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white dark:text-black">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </header>
  );
} 