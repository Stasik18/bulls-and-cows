import { evaluateGuess } from '@/game/evaluateGuess';
import {
  getGameState,
  setGameState,
  LEADERBOARD_KEY,
  type LeaderboardEntry,
} from '@/storage/gameState';

export function handleGuess(guess: string): boolean {
  const { secret, length, base, history, startTime } = getGameState();

  if (!secret) return false;

  const result = evaluateGuess(secret, guess);

  const newHistory = [
    {
      guess,
      bulls: result.bulls,
      cows: result.cows,
    },
    ...history,
  ];

  const isWon = result.bulls === length;
  const finishTime = isWon ? Date.now() : null;

  if (isWon && startTime !== null && finishTime !== null) {
    const leaderboard: LeaderboardEntry[] = JSON.parse(
      localStorage.getItem(LEADERBOARD_KEY) ?? '[]',
    );

    leaderboard.push({
      attempts: newHistory.length,
      durationMs: finishTime - startTime,
      base,
      length,
      completedAt: finishTime,
    });

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
  }

  setGameState({
    history: newHistory,
    status: isWon ? 'won' : 'playing',
    finishTime,
  });

  return isWon;
}
