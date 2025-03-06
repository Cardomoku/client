import React, { ReactNode } from 'react';
import Image from 'next/image';
import { useTheme } from '@/providers/ThemeProvider';

interface HomeSectionProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  iconName: 'public' | 'new' | 'private';
  buttonClassName?: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({
  title,
  description,
  buttonText,
  onClick,
  iconName,
  buttonClassName = ""
}) => {
  const { theme } = useTheme();
  
  const getIconSrc = () => {
    if (!iconName) return undefined;
    return `/images/${iconName}_${theme}.svg`;
  };

  return (
    <div className={`flex-1 rounded-lg p-8 flex flex-col items-center style-2 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-700/20`}>
      {iconName ? (
        <div className="mb-4">
          <img src={getIconSrc()} width={24} height={24} alt={`${iconName} icon`} />
        </div>
      ) : null}
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button 
        onClick={onClick}
        className={`point text-white w-full max-w-[180px] py-3 px-4 rounded-md font-bold hover:opacity-50 transition-opacity mt-2 ${buttonClassName}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default HomeSection; 