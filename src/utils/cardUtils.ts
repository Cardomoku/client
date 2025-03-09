/**
 * 카드 이미지 경로를 생성하는 함수
 * @param suit 카드 모양 (clover, diamond, heart, spade, o)
 * @param number 카드 숫자 (a, 2-10, j, q, k, o)
 * @param version 카드 버전 (1-4)
 * @returns 카드 이미지 경로
 */
export const getCardImage = (suit: string, number: string, version: number): string => {
  return `/cards/webp/${suit}_${number}_${version}.webp`;
};

/**
 * 게임 보드용 고정 카드 이미지 배열
 */
export const boardCardImages = [
  // 1
  getCardImage('o', 'o', 1), getCardImage('spade', '2', 1), getCardImage('spade', '3', 1), getCardImage('spade', '4', 1), getCardImage('spade', '5', 1),
  getCardImage('spade', '6', 1), getCardImage('spade', '7', 1), getCardImage('spade', '8', 1), getCardImage('spade', '9', 1), getCardImage('o', 'o', 2),
  // 2
  getCardImage('clover', '6', 1), getCardImage('clover', '5', 1), getCardImage('clover', '4', 1), getCardImage('clover', '3', 1), getCardImage('clover', '2', 1),
  getCardImage('heart', 'a', 1), getCardImage('heart', 'k', 1), getCardImage('heart', 'q', 1), getCardImage('heart', '10', 1), getCardImage('spade', '10', 1),
  // 3
  getCardImage('clover', '7', 1), getCardImage('spade', 'a', 1), getCardImage('diamond', '2', 1), getCardImage('diamond', '3', 1), getCardImage('diamond', '4', 1),
  getCardImage('diamond', '5', 1), getCardImage('diamond', '6', 1), getCardImage('diamond', '7', 1), getCardImage('heart', '9', 1), getCardImage('spade', 'q', 1),
  // 4
  getCardImage('clover', '8', 1), getCardImage('spade', 'k', 1), getCardImage('clover', '6', 2), getCardImage('clover', '5', 2), getCardImage('clover', '4', 2),
  getCardImage('clover', '3', 2), getCardImage('clover', '2', 2), getCardImage('diamond', '8', 1), getCardImage('heart', '8', 1), getCardImage('spade', 'k', 2),
  // 5
  getCardImage('clover', '9', 1), getCardImage('spade', 'q', 2), getCardImage('clover', '7', 1), getCardImage('heart', '6', 1), getCardImage('heart', '5', 1),
  getCardImage('heart', '4', 1), getCardImage('heart', 'a', 2), getCardImage('diamond', '9', 1), getCardImage('heart', '7', 1), getCardImage('spade', 'a', 2),
  // 6
  getCardImage('clover', '10', 1), getCardImage('spade', '10', 2), getCardImage('clover', '8', 2), getCardImage('heart', '7', 2), getCardImage('heart', '2', 1),
  getCardImage('heart', '3', 1), getCardImage('heart', 'k', 2), getCardImage('diamond', '10', 1), getCardImage('heart', '6', 2), getCardImage('diamond', '2', 2),
  // 7
  getCardImage('clover', 'q', 1), getCardImage('spade', '9', 2), getCardImage('clover', '9', 2), getCardImage('heart', '8', 2), getCardImage('heart', '9', 2),
  getCardImage('heart', '10', 2), getCardImage('heart', 'q', 2), getCardImage('diamond', 'q', 1), getCardImage('heart', '5', 2), getCardImage('diamond', '3', 2),
  // 8
  getCardImage('clover', 'k', 1), getCardImage('spade', '8', 2), getCardImage('clover', '10', 2), getCardImage('clover', 'q', 2), getCardImage('clover', 'k', 2),
  getCardImage('clover', 'a', 1), getCardImage('diamond', 'a', 1), getCardImage('diamond', 'k', 1), getCardImage('heart', '4', 2), getCardImage('diamond', '4', 2),
  // 9
  getCardImage('clover', 'a', 2), getCardImage('spade', '7', 2), getCardImage('spade', '6', 2), getCardImage('spade', '5', 2), getCardImage('spade', '4', 2),
  getCardImage('spade', '3', 2), getCardImage('spade', '2', 2), getCardImage('heart', '2', 2), getCardImage('heart', '3', 2), getCardImage('diamond', '5', 2),
  // 10
  getCardImage('o', 'o', 3), getCardImage('diamond', 'a', 2), getCardImage('diamond', 'q', 2), getCardImage('diamond', 'k', 2), getCardImage('diamond', '10', 2),
  getCardImage('diamond', '9', 2), getCardImage('diamond', '8', 2), getCardImage('diamond', '7', 2), getCardImage('diamond', '6', 2), getCardImage('o', 'o', 4),
];

/**
 * 가능한 모든 카드 조합 생성
 */
export const generateAllCards = (): string[] => {
  const cards: string[] = [];
  const suits = ['clover', 'diamond', 'heart', 'spade'];
  const numbers = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
  const versions = [1, 2];
  
  // 조커 카드
  for (let v = 1; v <= 4; v++) {
    cards.push(getCardImage('o', 'o', v));
  }
  
  // 일반 카드
  for (const suit of suits) {
    for (const number of numbers) {
      for (const version of versions) {
        cards.push(getCardImage(suit, number, version));
      }
    }
  }
  
  return cards;
};

/**
 * 무작위 카드 가져오기
 * @param count 가져올 카드 수
 * @returns 무작위 카드 경로 배열
 */
export const getRandomCards = (count: number): string[] => {
  const allCards = generateAllCards();
  const shuffled = [...allCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};