import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { execSync } from 'child_process';

const require = createRequire(import.meta.url);
const { createNumberCardSVG, createFaceCardSVG, createAceCardSVG, createOCardSVG, getNumberPositions } = require('../../public/cards/CardTemplate.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../../public');
const CARD_DIR = path.join(PUBLIC_DIR, 'cards/svg');
const WEBP_DIR = path.join(PUBLIC_DIR, 'cards/webp');

// SVG 디렉토리가 없으면 생성
if (!fs.existsSync(CARD_DIR)) {
  fs.mkdirSync(CARD_DIR, { recursive: true });
}

// WebP 디렉토리가 없으면 생성
if (!fs.existsSync(WEBP_DIR)) {
  fs.mkdirSync(WEBP_DIR, { recursive: true });
}

// SVG를 WebP로 변환하는 함수
function convertSvgToWebp(svgPath, webpPath) {
  try {
    execSync(`magick -background none -density 300 -quality 95 ${svgPath} ${webpPath}`);
    
    console.log(`생성 완료: ${webpPath}`);
  } catch (error) {
    console.error(`변환 실패 (${svgPath} → ${webpPath}):`, error.message);
  }
}

// 모든 무늬
const suits = {
  spade: '♠',
  heart: '♥',
  diamond: '♦',
  clover: '♣'
};

// 숫자 카드 생성 (2-10)
Object.entries(suits).forEach(([suitName, suitSymbol]) => {
  for (let num = 2; num <= 10; num++) {
    for (let version = 1; version <= 2; version++) {
      const svg = createNumberCardSVG(suitSymbol, num.toString(), getNumberPositions(num.toString()));
      const svgPath = path.join(CARD_DIR, `${suitName}_${num}_${version}.svg`);
      const webpPath = path.join(WEBP_DIR, `${suitName}_${num}_${version}.webp`);
      
      // SVG 파일 저장
      fs.writeFileSync(svgPath, svg);
      
      // WebP로 변환
      convertSvgToWebp(svgPath, webpPath);
    }
  }
});

// 문자 카드 생성 (J,Q,K)
const faceCards = ['j', 'q', 'k'];
Object.entries(suits).forEach(([suitName, suitSymbol]) => {
  faceCards.forEach(rank => {
    // 한눈 버전
    const svg1 = createFaceCardSVG(suitSymbol, rank.toUpperCase(), true);
    const svgPath1 = path.join(CARD_DIR, `${suitName}_${rank}_1.svg`);
    const webpPath1 = path.join(WEBP_DIR, `${suitName}_${rank}_1.webp`);
    
    fs.writeFileSync(svgPath1, svg1);
    convertSvgToWebp(svgPath1, webpPath1);
    
    // 두눈 버전
    const svg2 = createFaceCardSVG(suitSymbol, rank.toUpperCase(), false);
    const svgPath2 = path.join(CARD_DIR, `${suitName}_${rank}_2.svg`);
    const webpPath2 = path.join(WEBP_DIR, `${suitName}_${rank}_2.webp`);
    
    fs.writeFileSync(svgPath2, svg2);
    convertSvgToWebp(svgPath2, webpPath2);
  });
});

// A 카드 생성
Object.entries(suits).forEach(([suitName, suitSymbol]) => {
  for (let version = 1; version <= 2; version++) {
    const svg = createAceCardSVG(suitSymbol);
    const svgPath = path.join(CARD_DIR, `${suitName}_a_${version}.svg`);
    const webpPath = path.join(WEBP_DIR, `${suitName}_a_${version}.webp`);
    
    fs.writeFileSync(svgPath, svg);
    convertSvgToWebp(svgPath, webpPath);
  }
});

// O 카드 생성
for (let i = 1; i <= 4; i++) {
  const svg = createOCardSVG();
  const svgPath = path.join(CARD_DIR, `o_o_${i}.svg`);
  const webpPath = path.join(WEBP_DIR, `o_o_${i}.webp`);
  
  fs.writeFileSync(svgPath, svg);
  convertSvgToWebp(svgPath, webpPath);
}