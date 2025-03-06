'use client';

import React, { useState } from 'react';

interface RoomCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

const RoomCodeModal: React.FC<RoomCodeModalProps> = ({
  isOpen,
  onClose,
  onJoin,
}) => {
  const [roomCode, setRoomCode] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.trim()) {
      onJoin(roomCode);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 style-2 opacity-80"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative point rounded-lg p-6 w-96 max-w-md z-10">
        <h2 className="text-xl font-bold text-center mb-2">
          방 코드 입력
        </h2>
        <p className="text-sm text-gray-100 text-center mb-6">
          방 코드를 입력하여 비밀방에 입장합니다
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <div className="w-14 font-bold text-gray-100 mr-2">코드</div>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="ex) 000000"
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:text-black"
              autoFocus
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full mb-3 py-3 bg-gray-200 hover:bg-gray-600 text-black hover:text-white rounded-md font-bold transition-all"
            >
              입장
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-red-500 hover:bg-red-400 text-white rounded-md font-bold transition-all"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomCodeModal; 