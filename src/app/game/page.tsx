'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PlayerSection from '../../components/PlayerSection';
import GameBoard from '../../components/GameBoard';
import PlayerHand from '../../components/PlayerHand';
import { Player, RoomType } from '@/types/game';

export default function GamePage() {
  const searchParams = useSearchParams();
  const roomType = searchParams.get('type') as RoomType || '1vs1';
  const roomCode = searchParams.get('code');
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [remainingCards, setRemainingCards] = useState(92);
  
  // 임시 플레이어 데이터 생성
  useEffect(() => {
    const generatePlayers = () => {
      let count = 2; // 기본값 1vs1
      if (roomType === '1vs1vs1') {
        count = 3;
      } else if (roomType === '2vs2') {
        count = 4;
      }
      
      const newPlayers: Player[] = [];
      
      for (let i = 1; i <= count; i++) {
        let team: number;
        
        if (roomType === '1vs1') {
          team = i; // 1 또는 2 (레드 또는 블루)
        } else if (roomType === '2vs2') {
          team = i % 2; // 1 또는 2 (레드팀 또는 블루팀)
        } else { // 1vs1vs1
          team = i; // 1, 2, 3 (레드, 블루, 그린)
        }
        
        newPlayers.push({
          id: `player-${i}`,
          nickname: `플레이어 ${i}`,
          profileImage: i % 2 === 0 ? '/images/profile_light.svg' : '/images/profile_dark.svg',
          team
        });
      }
      
      setPlayers(newPlayers);
    };
    
    generatePlayers();
  }, [roomType]);
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* 통합 반응형 레이아웃 - 전체 화면 사용 */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* 플레이어 섹션 (모바일: 상단, 데스크탑: 좌측) */}
        <div className="w-full md:w-64 h-[25vh] md:h-full order-1 md:order-1 flex-shrink-0 
                       bg-gray-400
                       p-2 md:p-4 
                       border-0
                       md:m-2 md:rounded-lg overflow-auto">
          <PlayerSection players={players} remainingCards={remainingCards} roomType={roomType} />
        </div>
        
        {/* 게임판 (중앙) */}
        <div className="flex-1 h-[50vh] md:h-full order-2 md:order-2 
                       bg-gray-200
                       overflow-hidden
                       md:m-2 md:rounded-lg">
          <GameBoard />
        </div>
        
        {/* 플레이어 손패 (모바일: 하단, 데스크탑: 우측) */}
        <div className="w-full md:w-64 h-[25vh] md:h-full order-3 md:order-3 flex-shrink-0
                       bg-gray-400
                       p-2 md:p-4 
                       border-0
                       md:m-2 md:rounded-lg overflow-auto">
          <PlayerHand />
        </div>
      </main>
    </div>
  );
}
