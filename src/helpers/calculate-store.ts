import { countPossibleSecrets } from '@/game/countPossibleSecrets';
import type { LeaderboardEntry } from '@/storage/gameState';

export function calculateScore(entry: LeaderboardEntry): number {
  const combinations = countPossibleSecrets(entry.length, entry.base);
  const timeMinutes = entry.durationMs / 60_000;

  return (100 * Math.log2(combinations)) / (entry.attempts * (1 + timeMinutes / 5));
}
