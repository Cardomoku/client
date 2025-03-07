'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import HomeSection from '@/components/HomeSection';
import RoomTypeModal from '@/components/RoomTypeModal';
import RoomCodeModal from '@/components/RoomCodeModal';

type RoomType = '1vs1' | '1vs1vs1' | '2vs2';
type ModalType = 'public' | 'create' | null;

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isRoomCodeModalOpen, setIsRoomCodeModalOpen] = useState(false);
  
  // 각 모드별 룸 입장 핸들러
  const handleJoinPublic = () => {
    setModalType('public');
    setIsModalOpen(true);
  };
  
  const handleCreateRoom = () => {
    setModalType('create');
    setIsModalOpen(true);
  };
  
  const handleJoinPrivate = () => {
    setIsRoomCodeModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };
  
  const handleCloseRoomCodeModal = () => {
    setIsRoomCodeModalOpen(false);
  };
  
  const handleJoinRoom = (code: string) => {
    router.push(`/game/?code=${code}`);
    setIsRoomCodeModalOpen(false);
  };
  
  const handleSelectRoomType = (roomType: RoomType) => {
    if (modalType === 'public') {
      router.push(`/game/?type=${roomType}`);
    } else if (modalType === 'create') {
      router.push(`/game/?type=${roomType}`);
    }
    setIsModalOpen(false);
    setModalType(null);
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
      
      <RoomTypeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectRoomType}
        modalType={modalType}
      />
      
      <RoomCodeModal
        isOpen={isRoomCodeModalOpen}
        onClose={handleCloseRoomCodeModal}
        onJoin={handleJoinRoom}
      />
    </div>
  );
}
