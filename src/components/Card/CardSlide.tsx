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
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardStyles, setCardStyles] = useState<{[key: number]: React.CSSProperties}>({});
  const animationInProgressRef = useRef(false);
  
  // 각 위치에 표시할 카드의 인덱스
  const [positionIndices, setPositionIndices] = useState<number[]>(
    Array.from({ length: cards.length }, (_, i) => i)
  );
  
  // 상수 정의
  const cardGap = 24;
  const cardWidth = 150;
  
  // 애니메이션 시작 - 항상 0에서 translateValue로만 이동
  const startAnimation = () => {
    // 애니메이션이 이미 진행 중이면 중복 실행 방지
    if (animationInProgressRef.current) return;
    animationInProgressRef.current = true;
    
    const translateValue = direction === 'ltr' 
      ? cardWidth + cardGap  // 오른쪽으로 이동
      : -(cardWidth + cardGap); // 왼쪽으로 이동
    
    // 모든 카드를 0 -> translateValue로 이동
    const newStyles: {[key: number]: React.CSSProperties} = {};
    positionIndices.forEach((cardIndex, i) => {
      newStyles[cardIndex] = {
        transform: `translateX(${translateValue}px)`,
        transition: `transform ${speed}s linear`,
      };
    });
    
    setCardStyles(newStyles);
  };
  
  // 컴포넌트 마운트 시 최초 애니메이션 시작
  useEffect(() => {
    startAnimation();
  }, []);
  
  // setCardStyles 후에 실행되는 useEffect
  useEffect(() => {
    // 빈 객체일 경우(초기 상태) 무시
    if (Object.keys(cardStyles).length === 0) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'transform') {
        // 인덱스 업데이트 로직 계산
        const newIndices = [...positionIndices];
        const updatedIndices = direction === 'ltr'
          // 왼쪽에서 오른쪽으로 이동: 모든 위치의 인덱스 감소
          ? newIndices.map(idx => idx === 0 ? cards.length - 1 : idx - 1)
          // 오른쪽에서 왼쪽으로 이동: 모든 위치의 인덱스 증가
          : newIndices.map(idx => (idx + 1) % cards.length);
        
        // 새 인덱스로 상태 업데이트
        setPositionIndices(updatedIndices);

        const resetStyles: {[key: number]: React.CSSProperties} = {};
        updatedIndices.forEach((cardIndex, i) => {
          resetStyles[cardIndex] = {
            transform: 'translateX(0)',
            transition: 'none', // 트랜지션 없이 즉시 이동
          };
        });
        
        setCardStyles(resetStyles);
        animationInProgressRef.current = false;
        
        // 브라우저 리페인트를 위한 최소 지연 후 다음 애니메이션 시작
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            startAnimation();
          });
        });
      }
    };
    
    container.addEventListener('transitionend', handleTransitionEnd);
    
    return () => {
      container.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [cardStyles, cards.length, direction]);
  
  return (
    <div className={containerClass} ref={containerRef}>
      {positionIndices.map((cardIndex, position) => (
        <div
          key={`card-${cardIndex}`}
          style={cardStyles[cardIndex] || {}}
          className="inline-block"
        >
          <Card
            src={cards[cardIndex]}
            index={cardIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default CardSlide; 