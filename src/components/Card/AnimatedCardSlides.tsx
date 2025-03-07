import { useState, useEffect } from "react";
import CardSlide from "./CardSlide";
import { generateShuffledCardImages } from "./cardUtils";

const AnimatedCardSlides = () => {
  const [topCards, setTopCards] = useState<string[]>([]);
  const [bottomCards, setBottomCards] = useState<string[]>([]);
  
  // 컴포넌트가 마운트될 때 두 슬라이드에 사용할 무작위 카드 두 세트 생성
  useEffect(() => {
    // 첫 번째 세트
    const firstSet = generateShuffledCardImages();
    setTopCards(firstSet);
    
    // 두 번째 세트 (또 다른 무작위 카드 세트)
    const secondSet = generateShuffledCardImages();
    setBottomCards(secondSet);
  }, []);
  
  // 카드가 아직 로드되지 않았다면 아무것도 표시하지 않음
  if (topCards.length === 0 || bottomCards.length === 0) return null;
  
  return (
    <>
      {/* 첫 번째 슬라이드 (위쪽) */}
      <CardSlide 
        cards={topCards}
        speed={2}
        direction="ltr"
        containerClass="flex items-center space-x-6 py-4 absolute w-[200%] h-64 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[30deg] origin-center"
      />
      
      {/* 두 번째 슬라이드 (아래쪽) */}
      <CardSlide 
        cards={bottomCards}
        speed={2}
        direction="rtl"
        containerClass="flex items-center space-x-6 py-4 absolute w-[200%] h-64 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[30deg] origin-center"
      />
    </>
  );
};

export default AnimatedCardSlides; 