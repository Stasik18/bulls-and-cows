import { generateSecret } from '@/game/generateSecret';
import { getGameState, setGameState } from '@/storage/gameState';
import type { Base } from '@/storage/gameState';

export function changeGameLength(length: number): void {
  setGameState({ length });
}

export function changeNumberSystem(base: Base): void {
  setGameState({
    base,
    length: 2,
  });
}

export function startGame(): void {
  const { length, base } = getGameState();

  setGameState({
    status: 'playing',
    secret: generateSecret(length, base),
    startTime: Date.now(),
    finishTime: null,
    history: [],
  });
}

export function openLeaderboard(): void {
  setGameState({ modalStatus: 'open' });
}
