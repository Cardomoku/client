'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import HomeSection from '@/components/HomeSection';

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
    <div className="min-h-screen flex flex-col">
      <Header coins={108820} />
      
      <main className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-6">
        <HomeSection 
          title="PUBLIC"
          description="공개방에 빠르게 입장합니다"
          buttonText="공개방 입장"
          onClick={handleJoinPublic}
          iconName="public"
        />
        
        <HomeSection 
          title="NEW"
          description="새로운 방을 생성합니다"
          buttonText="방 생성"
          onClick={handleCreateRoom}
          iconName="new"
        />
        
        <HomeSection 
          title="PRIVATE"
          description="방 코드로 비밀방에 입장합니다"
          buttonText="비밀방 입장"
          onClick={handleJoinPrivate}
          iconName="private"
        />
      </main>
    </div>
  );
}
