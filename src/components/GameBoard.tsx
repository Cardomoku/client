'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardSuit, CardRank } from '@/types/game';

const GameBoard: React.FC = () => {
  // 10x10 게임 보드 상태
  const [board, setBoard] = useState<Card[][]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  
  // 초기 보드 생성
  useEffect(() => {
    const initBoard = () => {
      const newBoard: Card[][] = [];
      
      for (let i = 0; i < 10; i++) {
        const row: Card[] = [];
        for (let j = 0; j < 10; j++) {
          // 모서리에는 조커 카드 배치
          if ((i === 0 && j === 0) || (i === 0 && j === 9) || 
              (i === 9 && j === 0) || (i === 9 && j === 9)) {
            row.push({ suit: 'joker', rank: 'joker' });
          } else {
            // 이미지의 게임판처럼 임의의 카드 생성
            const suits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
            const ranks: CardRank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
            
            // 임의로 보드의 약 70%는 비어있게 설정
            if (Math.random() < 0.7) {
              row.push({ suit: 'empty', rank: 'empty' });
            } else {
              const randomSuit = suits[Math.floor(Math.random() * suits.length)];
              const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
              row.push({ suit: randomSuit, rank: randomRank });
            }
          }
        }
        newBoard.push(row);
      }
      
      setBoard(newBoard);
    };
    
    initBoard();
    
    // 화면 크기에 따라 게임판 스케일 조정
    const handleResize = () => {
      if (boardRef.current && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const boardWidth = boardRef.current.scrollWidth;
        const boardHeight = boardRef.current.scrollHeight;
        
        // 가로와 세로 중 더 제한적인 비율 적용
        const scaleX = containerWidth / boardWidth;
        const scaleY = containerHeight / boardHeight;
        const newScale = Math.min(scaleX, scaleY, 1) * 0.95; // 95% 크기로 여유 공간 추가
        
        setScale(newScale);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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
    <div className="w-full h-full flex items-center justify-center" ref={containerRef}>
      <div 
        ref={boardRef}
        className="grid grid-cols-10 gap-1 touch-pan-y"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          transition: 'transform 0.2s ease'
        }}
      >
        {board.map((row, rowIndex) => (
          row.map((card, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-[3/4] w-8 sm:w-10 md:w-12 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm ${
                card.suit !== 'empty' ? 'relative' : 'opacity-50'
              }`}
            >
              {card.suit !== 'empty' && (
                <>
                  <div className={`absolute top-1 left-1 text-xs ${getCardColor(card.suit)}`}>
                    {card.rank !== 'joker' ? card.rank : ''}
                  </div>
                  <div className={`text-xl ${getCardColor(card.suit)}`}>
                    {getSuitSymbol(card.suit)}
                  </div>
                  <div className={`absolute bottom-1 right-1 text-xs ${getCardColor(card.suit)}`}>
                    {card.rank !== 'joker' ? card.rank : ''}
                  </div>
                </>
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default GameBoard; 