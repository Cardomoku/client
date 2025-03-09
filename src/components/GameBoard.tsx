'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { boardCardImages } from '@/utils/cardUtils';

// 카드 인터페이스 (간소화)
interface Card {
  image: string;
  isEmpty: boolean;
}

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
      
      // boardCardImages를 이용해 10x10 그리드로 변환
      let imageIndex = 0;
      for (let i = 0; i < 10; i++) {
        const row: Card[] = [];
        for (let j = 0; j < 10; j++) {
          const cardPath = boardCardImages[imageIndex++];
          row.push({
            image: cardPath,
            isEmpty: cardPath.includes('o_o') // 조커 카드가 비어있는 칸 역할
          });
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
              className={`aspect-[3/4] w-12 sm:w-14 md:w-16 flex items-center justify-center rounded-md shadow-sm`}
            >
              <div className="relative w-full h-full">
                <Image 
                  src={card.image}
                  alt={`Card ${rowIndex}-${colIndex}`}
                  fill
                  className="object-contain rounded-md"
                  sizes="(max-width: 768px) 40px, (max-width: 1200px) 50px, 60px"
                  priority={rowIndex < 3} // 우선 로드할 카드
                />
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default GameBoard;