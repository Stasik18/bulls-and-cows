import { el } from '../helpers/fabric-elemnt';

function formatDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export function winModal(attempts: number, durationMs: number, onNewGame: () => void) {
  const title = el(
    'h1',
    {
      id: 'win-title',
      className: 'text-4xl font-bold text-blue-500 text-center',
    },
    'Congratulations!',
  );

  const attemptsInfo = el(
    'p',
    { className: 'text-lg text-gray-700 text-center' },
    `Attempts: ${attempts}`,
  );

  const timeInfo = el(
    'p',
    { className: 'text-lg text-gray-700 text-center' },
    `Time: ${formatDuration(durationMs)}`,
  );

  const newGameButton = el(
    'button',
    {
      type: 'button',
      className: 'rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-600',
      onClick: onNewGame,
    },
    'New Game',
  );

  const content = el(
    'div',
    {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'win-title',
      className: 'flex w-full max-w-lg flex-col items-center gap-6 rounded-xl bg-white p-8',
    },
    title,
    el('div', { className: 'flex flex-col gap-2' }, attemptsInfo, timeInfo),
    newGameButton,
  );

  return el(
    'div',
    {
      className:
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm',
    },
    content,
  );
}
