import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';

interface CardSlideProps {
  cards: string[]; // 카드 이미지 경로 배열
  speed: number;   // 슬라이드 속도
  direction: 'ltr' | 'rtl'; // 슬라이드 방향 (ltr: 왼쪽→오른쪽, rtl: 오른쪽→왼쪽)
  containerClass: string; // 컨테이너 클래스
}

/**
 * 무한 슬라이드 카드 컴포넌트
 */
const CardSlide = ({ 
  cards, 
  speed, 
  direction,
  containerClass
}: CardSlideProps) => {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<string[]>([...cards, ...cards]); // 카드를 두 번 복제하여 무한 슬라이드 효과 구현

  // 슬라이드 컨테이너 위치 계산
  const getContainerStyle = () => {
    if (direction === 'ltr') {
      // 왼쪽 → 오른쪽으로 슬라이드
      return {
        transform: `translateX(${-position}px)`,
        transition: 'transform 0.05s linear',
      };
    } else {
      // 오른쪽 → 왼쪽으로 슬라이드
      return {
        transform: `translateX(${position}px)`,
        transition: 'transform 0.05s linear',
      };
    }
  };
  
  return (
    <div className={containerClass} ref={containerRef}>
      {cardsRef.current.map((card, i) => (
        <Card 
          key={`${i}`}
          src={card}
          index={i}
        />
      ))}
    </div>
  );
};

export default CardSlide; 