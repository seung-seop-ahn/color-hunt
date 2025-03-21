export interface GameState {
  stage: number;
  timeLeft: number;
  score: number;
  correctColor: string;
  wrongColor: string;
  isPlaying: boolean;
  gridSize: number;
}

export interface GameStore extends GameState {
  // 게임 시작
  startGame: () => void;
  // 게임 종료
  endGame: () => void;
  // 다음 스테이지로 이동
  nextStage: () => void;
  // 시간 감소
  decreaseTime: () => void;
  // 오답 선택시 페널티
  applyPenalty: () => void;
  // 점수 계산 및 업데이트
  updateScore: (timeBonus: number) => void;
  // 색상 생성
  generateColors: () => void;
} 