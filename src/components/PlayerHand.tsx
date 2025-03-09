'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getRandomCards } from '@/utils/cardUtils';

// 플레이어 손패 카드 인터페이스
interface HandCard {
  id: string;
  image: string;
  selected?: boolean;
}

const PlayerHand: React.FC = () => {
  const [cards, setCards] = useState<HandCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  // 임시 손패 생성
  useEffect(() => {
    const generateHand = () => {
      // 6장의 무작위 카드 이미지 가져오기
      const randomCardImages = getRandomCards(6);
      
      const newCards: HandCard[] = randomCardImages.map((image, index) => ({
        id: `card-${index}`,
        image,
        selected: false
      }));
      
      setCards(newCards);
    };
    
    generateHand();
  }, []);
  
  // 카드 선택 핸들러
  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
    
    setCards(prevCards => 
      prevCards.map(card => ({
        ...card,
        selected: card.id === cardId && card.id !== selectedCard
      }))
    );
  };
  
  return (
    <div className="h-full flex flex-col">
      <h3 className="font-bold mb-1 text-gray-700 text-center md:text-left">내 카드</h3>
      
      <div className="flex flex-col h-full">
        {/* 통합 레이아웃 - 모바일: 6열 그리드, 데스크탑: 2열 x 3행 그리드 */}
        <div className="flex-1 min-h-0 max-h-[calc(100%-50px)] px-1 flex items-center">
          <div className="grid grid-cols-6 md:grid-cols-2 md:grid-rows-3 gap-1 md:gap-3 w-full">
            {cards.map((card) => (
              <div 
                key={card.id}
                className="aspect-[3/4] w-full cursor-pointer relative flex items-center justify-center"
                onClick={() => handleCardSelect(card.id)}
              >
                <Image 
                  src={card.image}
                  alt={`Card ${card.id}`}
                  width={80}
                  height={120}
                  className={`object-contain max-w-full max-h-full transition-all duration-200 ease-in-out ${
                    card.selected 
                      ? 'rounded-md ring-2 ring-blue-400 transform translate-y-[-4px]' 
                      : 'border rounded-md hover:ring-1 hover:ring-blue-600'
                  }`}
                  sizes="(max-width: 768px) 40px, (max-width: 1200px) 60px, 80px"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* 버튼 영역 - 고정 높이 및 위치 */}
        <div className="mt-auto pt-2 pb-2 flex-shrink-0 mb-2">
          <button 
            className="w-full py-2 md:py-3 bg-blue-800 hover:bg-blue-400 disabled:bg-gray-500 text-white rounded-md font-bold transition-all text-sm md:text-base"
            disabled={!selectedCard}
          >
            칩 놓기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerHand;