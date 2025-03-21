import { create } from 'zustand';
import { GameStore } from '@/types/game';

const INITIAL_TIME = 15;
const PENALTY_TIME = 3;
const BASE_SCORE = 100;

export const useGameStore = create<GameStore>((set, get) => ({
  stage: 1,
  timeLeft: INITIAL_TIME,
  score: 0,
  correctColor: '#000000',
  wrongColor: '#000000',
  isPlaying: false,
  gridSize: 2,

  startGame: () => {
    set({
      stage: 1,
      timeLeft: INITIAL_TIME,
      score: 0,
      isPlaying: true,
      gridSize: 2,
    });
    get().generateColors();
  },

  endGame: () => {
    set({
      isPlaying: false,
    });
  },

  nextStage: () => {
    const { stage } = get();
    const newGridSize = Math.floor(stage / 2) + 2;
    set({
      stage: stage + 1,
      timeLeft: INITIAL_TIME,
      gridSize: newGridSize,
    });
    get().generateColors();
  },

  decreaseTime: () => {
    const { timeLeft, isPlaying } = get();
    if (!isPlaying) return;
    
    if (timeLeft <= 0) {
      get().endGame();
      return;
    }
    
    set({ timeLeft: timeLeft - 1 });
  },

  applyPenalty: () => {
    const { timeLeft } = get();
    set({ timeLeft: Math.max(0, timeLeft - PENALTY_TIME) });
  },

  updateScore: (timeBonus: number) => {
    const { stage, score } = get();
    const newScore = score + (BASE_SCORE * stage) + timeBonus;
    set({ score: newScore });
  },

  generateColors: () => {
    const { stage } = get();
    const hue = Math.random() * 360;
    const saturation = Math.min(90, 60 + stage * 2);
    const lightness = 60;
    
    // 스테이지가 올라갈수록 색상 차이가 줄어듦
    const difference = Math.max(8, 40 - stage * 2);
    
    const correctColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const wrongColor = `hsl(${hue}, ${saturation}%, ${lightness - difference}%)`;
    
    set({ correctColor, wrongColor });
  },
})); 