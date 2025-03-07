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
      <h3 className="font-bold mb-1 text-gray-700 text-center md:text-left">내 카드</h3>
      
      <div className="flex-1 flex flex-col">
        {/* 모바일에서는 스크롤 가능한 가로 레이아웃, 데스크탑에서는 세로 레이아웃 */}
        <div className="flex flex-row md:flex-col flex-wrap justify-center md:justify-start gap-1 overflow-auto flex-1">
          {cards.map((card) => (
            <div 
              key={card.id}
              className={`flex-shrink-0 aspect-[3/4] w-[calc(16.66%-4px)] md:w-full max-w-[80px] md:max-h-[calc((100%-70px)/6)] cursor-pointer relative flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md transition-all ${
                card.selected 
                  ? 'ring-2 ring-blue-500 dark:ring-blue-400 transform md:translate-x-2' 
                  : 'hover:ring-1 hover:ring-blue-300 dark:hover:ring-blue-600'
              }`}
              onClick={() => handleCardSelect(card.id)}
            >
              <div className={`absolute top-1 left-1 text-xs ${getCardColor(card.suit)}`}>
                {card.rank}
              </div>
              <div className={`text-sm sm:text-lg md:text-xl ${getCardColor(card.suit)}`}>
                {getSuitSymbol(card.suit)}
              </div>
              <div className={`absolute bottom-1 right-1 text-xs ${getCardColor(card.suit)}`}>
                {card.rank}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-1 md:mt-2">
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