import { HomePanel } from '@/components/home/home-panel';
import {
  changeGameLength,
  changeNumberSystem,
  openLeaderboard,
  startGame,
} from '@/controllers/home-controller';
import { getGameState } from '@/storage/gameState';

export function HomePage() {
  const { base, length } = getGameState();

  return HomePanel({
    base,
    length,
    onChangeLength: changeGameLength,
    onChangeSystem: changeNumberSystem,
    onStartGame: startGame,
    onOpenLeaderboard: openLeaderboard,
  });
}
