import Image from "next/image";
import { memo } from "react";

interface CardProps {
  src: string;
  index: number;
}

const Card = ({ src, index }: CardProps) => {
  return (
    <div 
      className="w-[150px] h-[210px] flex-shrink-0 relative rounded-md overflow-hidden shadow-lg"
    >
      <Image
        src={src}
        alt={`카드 이미지 ${index + 1}`}
        fill
        sizes="150px"
        className="object-contain"
        unoptimized
      />
    </div>
  );
};

export default memo(Card); 