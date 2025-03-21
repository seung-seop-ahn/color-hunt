import { useGameStore } from '@/store/useGameStore';

export const GameInfo = () => {
  const { stage, timeLeft, score } = useGameStore();

  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="text-sm text-gray-500">스테이지</p>
          <p className="text-2xl font-bold">{stage}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">남은 시간</p>
          <p className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-500' : ''}`}>
            {timeLeft}초
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">점수</p>
          <p className="text-2xl font-bold">{score}</p>
        </div>
      </div>
    </div>
  );
}; 