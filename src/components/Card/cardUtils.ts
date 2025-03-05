/**
 * 카드 이미지 경로 생성 및 랜덤 정렬을 위한 유틸리티 함수
 */

/**
 * 모든 카드 이미지 경로를 생성하고 섞어서 반환합니다.
 * @returns 섞인 카드 이미지 경로 배열
 */
export const generateShuffledCardImages = (): string[] => {
  const suits = ['clover', 'diamond', 'heart', 'spade'];
  const ranks = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
  const version = ['1', '2'];
  
  const allCards: string[] = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      version.forEach(v => {
        allCards.push(`/cards/webp/${suit}_${rank}_${v}.webp`);
      });
    });
  });
  
  // 카드를 완전히 랜덤하게 섞기
  return [...allCards].sort(() => Math.random() - 0.5);
};