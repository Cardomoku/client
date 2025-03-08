'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardSuit, CardRank } from '@/types/game';

// 플레이어 손패 카드 확장 인터페이스
interface HandCard extends Card {
  id: string;
  selected?: boolean;
}

const PlayerHand: React.FC = () => {
  const [cards, setCards] = useState<HandCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  // 임시 손패 생성
  useEffect(() => {
    const generateHand = () => {
      const suits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
      const ranks: CardRank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      const newCards: HandCard[] = [];
      
      // 6장의 랜덤 카드 생성
      for (let i = 0; i < 6; i++) {
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
        
        newCards.push({
          id: `card-${i}`,
          suit: randomSuit,
          rank: randomRank
        });
      }
      
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
  
  // 카드 모양에 따른 색상 가져오기
  const getCardColor = (suit: CardSuit): string => {
    if (suit === 'hearts' || suit === 'diamonds') {
      return 'text-red-500';
    } else if (suit === 'clubs' || suit === 'spades') {
      return 'text-black dark:text-white';
    } else if (suit === 'joker') {
      return 'text-black dark:text-white';
    }
    return '';
  };
  
  // 카드 모양 기호 가져오기
  const getSuitSymbol = (suit: CardSuit): string => {
    switch(suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      case 'joker': return '★';
      default: return '';
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <h3 className="font-bold mb-1 text-gray-700 dark:text-gray-300 text-center md:text-left">내 카드</h3>
      
      <div className="flex flex-col h-full">
        {/* 통합 레이아웃 - 모바일: 6열 그리드, 데스크탑: 2열 x 3행 그리드 */}
        <div className="flex-1 min-h-0 max-h-[calc(100%-50px)] px-1 flex items-center">
          <div className="grid grid-cols-6 md:grid-cols-2 md:grid-rows-3 gap-1 md:gap-3 w-full">
            {cards.map((card) => (
              <div 
                key={card.id}
                className={`aspect-[3/4] w-full cursor-pointer relative flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md transition-all ${
                  card.selected 
                    ? 'ring-2 ring-blue-400 transform translate-y-[-4px]' 
                    : 'hover:ring-1 hover:ring-blue-600'
                }`}
                onClick={() => handleCardSelect(card.id)}
              >
                <div className={`absolute top-0 left-1 text-[0.6rem] md:text-xs ${getCardColor(card.suit)}`}>
                  {card.rank}
                </div>
                <div className={`text-xs sm:text-sm md:text-lg ${getCardColor(card.suit)}`}>
                  {getSuitSymbol(card.suit)}
                </div>
                <div className={`absolute bottom-0 right-1 text-[0.6rem] md:text-xs ${getCardColor(card.suit)}`}>
                  {card.rank}
                </div>
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