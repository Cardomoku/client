// 게임 관련 타입 정의

// 게임 모드 타입
export type RoomType = '1vs1' | '1vs1vs1' | '2vs2';

// 플레이어 정보 인터페이스
export interface Player {
  id: string;
  nickname: string;
  profileImage: string;
  team: number; // 색상/팀 식별자 (1: 레드, 2: 블루, 3: 그린)
}

// 카드 모양 타입
export type CardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades' | 'joker' | 'empty';

// 카드 숫자 타입
export type CardRank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'joker' | 'empty';

// 카드 인터페이스
export interface Card {
  suit: CardSuit;
  rank: CardRank;
  owner?: string; // 카드를 놓은 플레이어의 ID
  team?: number;  // 팀 번호
  selected?: boolean; // 선택된 카드 여부
} 