'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function Home() {
  const router = useRouter();
  
  // 각 모드별 룸 입장 핸들러
  const handleJoinPublic = () => {
    router.push('/room/public');
  };
  
  const handleCreateRoom = () => {
    router.push('/room/create');
  };
  
  const handleJoinPrivate = () => {
    router.push('/room/private');
  };
  
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <Header coins={108820} />
      
      <main className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-6">
        {/* PUBLIC 섹션 */}
        <div className="flex-1 rounded-lg p-8 flex flex-col items-center" style={{ backgroundColor: 'var(--section-bg)' }}>
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-4xl font-bold mb-4">PUBLIC</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">공개방에 빠르게 입장합니다</p>
          </div>
          <button 
            onClick={handleJoinPublic}
            className="bg-black text-white w-full max-w-[180px] py-3 px-4 rounded-md font-medium hover:opacity-90 transition-opacity mt-2"
          >
            공개방 입장
          </button>
        </div>
        
        {/* NEW 섹션 */}
        <div className="flex-1 rounded-lg p-8 flex flex-col items-center" style={{ backgroundColor: 'var(--section-bg)' }}>
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-4xl font-bold mb-4">NEW</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">새로운 방을 생성합니다</p>
          </div>
          <button 
            onClick={handleCreateRoom}
            className="bg-black text-white w-full max-w-[180px] py-3 px-4 rounded-md font-medium hover:opacity-90 transition-opacity mt-2"
          >
            방 생성
          </button>
        </div>
        
        {/* PRIVATE 섹션 */}
        <div className="flex-1 rounded-lg p-8 flex flex-col items-center" style={{ backgroundColor: 'var(--section-bg)' }}>
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-4xl font-bold mb-4">PRIVATE</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">방 코드로 비밀방에 입장합니다</p>
          </div>
          <button 
            onClick={handleJoinPrivate}
            className="bg-black text-white w-full max-w-[180px] py-3 px-4 rounded-md font-medium hover:opacity-90 transition-opacity mt-2"
          >
            비밀방 입장
          </button>
        </div>
      </main>
    </div>
  );
}
