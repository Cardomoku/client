'use client';

import Image from 'next/image';
import React from 'react';
import { Player, RoomType } from '@/types/game';

interface PlayerSectionProps {
  players: Player[];
  remainingCards: number;
  roomType: RoomType;
}

const PlayerSection: React.FC<PlayerSectionProps> = ({
  players,
  remainingCards,
  roomType
}) => {

  // 플레이어 색상 가져오기
  const getPlayerColor = (player: Player) => {
    const teamId = player.team;
    
    if (roomType === '1vs1' || roomType === '2vs2') {
      // 1vs1과 2vs2에서는 레드팀(1)과 블루팀(2)만 사용
      return teamId === 1 
        ? 'text-red-500 bg-red-300' 
        : 'text-blue-500 bg-blue-300';
    } else if (roomType === '1vs1vs1') {
      // 1vs1vs1에서는 레드(1), 블루(2), 그린(3) 사용
      switch (teamId) {
        case 1: return 'text-red-500 bg-red-300';
        case 2: return 'text-blue-500 bg-blue-300';
        case 3: return 'text-green-500 bg-green-300';
      }
    }
    
    return 'bg-gray-200 dark:bg-gray-700';
  };

  // 플레이어 팀 텍스트 색상 
  const getTeamTextColor = (player: Player) => {
    const teamId = player.team;
    
    if (roomType === '1vs1' || roomType === '2vs2') {
      return teamId === 1 ? 'text-red-500' : 'text-blue-500';
    } else if (roomType === '1vs1vs1') {
      switch (teamId) {
        case 1: return 'text-red-500';
        case 2: return 'text-blue-500';
        case 3: return 'text-green-500';
        default: return 'text-gray-500';
      }
    }
    
    return 'text-gray-500';
  };

  // 플레이어 팀/색상 이름 가져오기
  const getPlayerTeamName = (player: Player) => {
    const teamId = player.team;
    
    if (roomType === '1vs1') {
      return teamId === 1 ? '레드팀' : '블루팀';
    } else if (roomType === '2vs2') {
      return teamId === 1 ? '레드팀' : '블루팀';
    } else if (roomType === '1vs1vs1') {
      switch (teamId) {
        case 1: return '레드팀';
        case 2: return '블루팀';
        case 3: return '그린팀';
        default: return '';
      }
    }
    
    return '';
  };

  return (
    <div className="h-full flex flex-col">
      {/* 남은 카드 - 모바일에서는 가로, 데스크탑에서는 세로로 배치 */}
      <div className="flex md:flex-col items-center md:items-start mb-1 md:mb-2">
        <h3 className="font-bold text-sm md:text-base text-gray-700 mr-2 md:mr-0 md:mb-1">남은 카드</h3>
        <div className="flex items-center">
          <div className="w-5 h-7 md:w-8 md:h-12 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-md flex items-center justify-center text-xs md:text-sm font-bold">
          </div>
          <div className="ml-1 md:ml-2 text-base text-gray-800 md:text-lg font-bold">
            {remainingCards} 장
          </div>
        </div>
      </div>

      {/* 플레이어 목록 */}
      <h3 className="font-bold text-sm md:text-base mt-1 mb-1 text-gray-700">플레이어</h3>
      <div className="flex-1 flex md:flex-col gap-1 overflow-auto">
        {players.map((player) => (
          <div 
            key={player.id} 
            className={`flex-1 md:flex-none flex items-center p-1 md:p-2 rounded-lg ${getPlayerColor(player)}`}
          >
            <div className="w-6 h-6 md:w-8 md:h-8 relative rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 flex-shrink-0">
              <Image 
                src={player.profileImage} 
                alt={player.nickname}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="ml-1 md:ml-2 flex flex-col overflow-hidden">
              <div className="text-xs md:text-sm font-semibold truncate">{player.nickname}</div>
              <div className={`text-xs ${getTeamTextColor(player)}`}>
                {getPlayerTeamName(player)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerSection; 