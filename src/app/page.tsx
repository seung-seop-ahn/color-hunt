'use client';

import { GameInfo } from '@/components/GameInfo';
import { ColorGrid } from '@/components/ColorGrid';
import { useGameStore } from '@/store/useGameStore';
import { useEffect } from 'react';

export default function Home() {
  const { isPlaying, startGame, decreaseTime } = useGameStore();

  // 타이머 설정
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      decreaseTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, decreaseTime]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-white">Color Hunt</h1>
      
      {!isPlaying ? (
        <button
          className="px-8 py-4 bg-blue-500 text-white rounded-lg text-xl font-bold hover:bg-blue-600 transition-colors mb-8"
          onClick={startGame}
        >
          게임 시작
        </button>
      ) : (
        <>
          <GameInfo />
          <div className="flex-1 flex items-center justify-center my-8">
            <ColorGrid />
          </div>
        </>
      )}
      
      <div className="text-center text-gray-400 text-sm">
        <p>다른 색상의 타일을 찾아보세요!</p>
        <p>스테이지가 올라갈수록 색상 차이가 줄어듭니다.</p>
      </div>
    </div>
  );
}
