import { countPossibleSecrets } from '@/game/countPossibleSecrets';
import { el } from '@/helpers/fabric-elemnt';
import { LEADERBOARD_KEY, getGameState, type LeaderboardEntry } from '@/storage/gameState';

function calculateScore(entry: LeaderboardEntry): number {
  const combinations = countPossibleSecrets(entry.length, entry.base);
  const timeMinutes = entry.durationMs / 60_000;

  return (100 * Math.log2(combinations)) / (entry.attempts * (1 + timeMinutes / 5));
}

function formatDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export function winModal(attempts: number, durationMs: number, onNewGame: () => void) {
  const { base, length, finishTime } = getGameState();

  const leaderboard: LeaderboardEntry[] = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) ?? '[]');

  const sortedLeaderboard = [...leaderboard].sort((a, b) => calculateScore(b) - calculateScore(a));

  const placeIndex = sortedLeaderboard.findIndex(
    (entry) =>
      entry.attempts === attempts &&
      entry.durationMs === durationMs &&
      entry.base === base &&
      entry.length === length &&
      entry.completedAt === finishTime,
  );

  const place = placeIndex === -1 ? 'Not ranked' : `${placeIndex + 1}`;

  const placeInfo = el(
    'div',
    {
      className:
        'flex flex-col gap-2 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-center',
    },
    el(
      'span',
      { className: 'text-xs font-semibold uppercase tracking-wider text-teal-700' },
      'Your place',
    ),
    el('strong', { className: 'text-3xl font-extrabold text-teal-700' }, `#${place}`),
  );
  const badge = el(
    'span',
    {
      className:
        'rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700',
    },
    'Code cracked',
  );

  const title = el(
    'h1',
    {
      id: 'win-title',
      className: 'text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 text-center',
    },
    'Congratulations!',
  );

  const description = el(
    'p',
    { className: 'text-center text-sm leading-relaxed text-slate-500' },
    'You found the secret number. Here are your results:',
  );

  const attemptsInfo = el(
    'div',
    {
      className: 'flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 text-center',
    },
    el(
      'span',
      { className: 'text-xs font-semibold uppercase tracking-wider text-slate-400' },
      'Attempts',
    ),
    el('strong', { className: 'text-3xl font-extrabold text-teal-700' }, attempts),
  );

  const timeInfo = el(
    'div',
    {
      className: 'flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 text-center',
    },
    el(
      'span',
      { className: 'text-xs font-semibold uppercase tracking-wider text-slate-400' },
      'Time',
    ),
    el(
      'strong',
      { className: 'text-3xl font-extrabold text-teal-700' },
      formatDuration(durationMs),
    ),
  );

  const statistics = el(
    'div',
    { className: 'grid w-full grid-cols-1 gap-3 sm:grid-cols-3' },
    placeInfo,
    attemptsInfo,
    timeInfo,
  );

  const newGameButton = el(
    'button',
    {
      type: 'button',
      className:
        'w-full rounded-xl bg-teal-700 px-5 py-3 font-bold text-white shadow-md shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-teal-500',
      onClick: onNewGame,
    },
    'Start New Game',
  );

  const content = el(
    'div',
    {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'win-title',
      className:
        'relative flex w-full max-w-lg flex-col items-center gap-6 overflow-hidden rounded-3xl border border-white/70 bg-slate-50 p-6 shadow-2xl sm:p-8',
    },
    el('div', {
      className:
        'absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500',
    }),
    badge,
    title,
    description,
    statistics,
    newGameButton,
  );

  return el(
    'div',
    {
      className:
        'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md',
    },
    content,
  );
}
