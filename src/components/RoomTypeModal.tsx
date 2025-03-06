'use client';

import React from 'react';

type RoomType = '1vs1' | '1vs1vs1' | '2vs2';

interface RoomTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (roomType: RoomType) => void;
  modalType: 'public' | 'create' | null;
}

const RoomTypeModal: React.FC<RoomTypeModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  modalType,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 어두운 흐림처리 */}
      <div 
        className="fixed inset-0 style-2 opacity-80"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative point rounded-lg p-6 w-80 max-w-md z-10">
        <h2 className="text-xl font-bold text-center mb-4">
          방 유형 선택
        </h2>
        <p className="text-sm text-gray-100 text-center mb-6">
          게임에 참여하는 인원 수를 선택합니다
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            className="w-full py-3 bg-gray-200 hover:bg-gray-600 text-black hover:text-white rounded-md font-bold transition-all"
            onClick={() => onSelect('1vs1')}
          >
            1vs1
          </button>
          
          <button 
            className="w-full py-3 bg-gray-200 hover:bg-gray-600 text-black hover:text-white rounded-md font-bold transition-all"
            onClick={() => onSelect('1vs1vs1')}
          >
            1vs1vs1
          </button>
          
          <button 
            className="w-full py-3 bg-gray-200 hover:bg-gray-600 text-black hover:text-white rounded-md font-bold transition-all"
            onClick={() => onSelect('2vs2')}
          >
            2vs2
          </button>
          
          <button 
            className="w-full py-3 bg-red-500 hover:bg-red-400 text-white rounded-md font-bold mt-2 transition-all"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeModal; 