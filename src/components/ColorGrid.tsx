import { useGameStore } from '@/store/useGameStore';
import { useEffect, useMemo } from 'react';

export const ColorGrid = () => {
  const { 
    gridSize, 
    correctColor, 
    wrongColor, 
    isPlaying,
    nextStage,
    applyPenalty,
    updateScore,
    timeLeft,
    stage
  } = useGameStore();

  // 정답 위치 랜덤 생성 (스테이지가 변경될 때마다 새로 계산)
  const correctPosition = useMemo(() => {
    const totalTiles = gridSize * gridSize;
    return Math.floor(Math.random() * totalTiles);
  }, [gridSize, stage]); // stage 의존성 추가

  const handleTileClick = (index: number) => {
    if (!isPlaying) return;

    if (index === correctPosition) {
      // 정답 선택시
      updateScore(timeLeft * 10); // 남은 시간에 따른 보너스 점수
      nextStage();
    } else {
      // 오답 선택시
      applyPenalty();
    }
  };

  return (
    <div 
      className="grid gap-4 p-4 bg-white/5 rounded-xl"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        width: `${Math.min(gridSize * 100, 600)}px`,
      }}
    >
      {Array.from({ length: gridSize * gridSize }).map((_, index) => (
        <button
          key={`${stage}-${index}`} // key에 stage 추가하여 재렌더링 보장
          className="aspect-square rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md"
          style={{
            backgroundColor: index === correctPosition ? correctColor : wrongColor,
            minWidth: '60px',
            minHeight: '60px'
          }}
          onClick={() => handleTileClick(index)}
          disabled={!isPlaying}
        />
      ))}
    </div>
  );
}; 