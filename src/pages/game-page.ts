import { GamePanel } from '@/components/game/game-panel';
import { HistorySection } from '@/components/game/history-section';
import { handleGuess } from '@/controllers/game-controller';
import { el } from '@/helpers/fabric-elemnt';
import { getGameState } from '@/storage/gameState';

export function GamePage() {
  const { secret, length, base, history, status } = getGameState();

  if (!secret) {
    return el('div', {}, 'Game has not started');
  }

  return el(
    'div',
    { className: 'flex w-full max-w-4xl flex-col gap-6 mx-auto p-8' },
    GamePanel({
      length,
      base,
      history,
      status,
      onGuess: handleGuess,
    }),
    HistorySection(history),
  );
}
