import { el } from '../helpers/fabric-elemnt';
import { SYSTEMS } from '../constants/systems';
import { LEADERBOARD_KEY, type LeaderboardEntry } from '../storage/gameState';
import { countPossibleSecrets } from '../game/countPossibleSecrets';

function calculateScore(entry: LeaderboardEntry): number {
  const combinations = countPossibleSecrets(entry.length, entry.base);
  const timeMinutes = entry.durationMs / 60_000;

  return (100 * Math.log2(combinations)) / (entry.attempts * (1 + timeMinutes / 5));
}

export function leaderModal(onClose: () => void) {
  let isClosed = false;

  const close = () => {
    if (isClosed) return;

    isClosed = true;
    window.removeEventListener('keydown', handleKeyDown);
    onClose();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close();
    }
  };

  const badge = el(
    'span',
    {
      className:
        'rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700',
    },
    'Top Players',
  );

  const title = el(
    'h1',
    {
      className: 'text-3xl font-extrabold tracking-tight text-slate-800 text-center sm:text-4xl',
    },
    'Leaderboard',
  );

  const description = el(
    'p',
    { className: 'text-center text-sm text-slate-500' },
    'The best results of your games',
  );

  const leaderboard: LeaderboardEntry[] = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) ?? '[]');

  const topResults = [...leaderboard]
    .sort((a, b) => calculateScore(b) - calculateScore(a))
    .slice(0, 10);

  const rows = topResults.map((entry, index) => {
    const systemName =
      SYSTEMS.find((system) => system.value === entry.base)?.label ?? String(entry.base);

    const totalSeconds = Math.floor(entry.durationMs / 1000);
    const time = `${Math.floor(totalSeconds / 60)}m ${totalSeconds % 60}s`;

    return el(
      'tr',
      { className: 'transition hover:bg-teal-50/50' },
      el('td', { className: 'border-b border-slate-100 p-3 font-bold text-teal-700' }, index + 1),
      el(
        'td',
        { className: 'border-b border-slate-100 p-3 font-semibold text-slate-800' },
        entry.attempts,
      ),
      el('td', { className: 'border-b border-slate-100 p-3 text-slate-600' }, time),
      el('td', { className: 'border-b border-slate-100 p-3 text-slate-600' }, systemName),
      el('td', { className: 'border-b border-slate-100 p-3 text-slate-600' }, entry.length),
      el('td', {}, calculateScore(entry).toFixed(1)),
    );
  });

  if (rows.length === 0) {
    rows.push(
      el(
        'tr',
        {},
        el(
          'td',
          { colSpan: 5, className: 'p-10 text-center text-slate-400' },
          'No results yet. Complete your first game!',
        ),
      ),
    );
  }

  const leaderboardTable = el(
    'table',
    { className: 'w-full min-w-[500px] text-center' },
    el(
      'thead',
      { className: 'bg-slate-100' },
      el(
        'tr',
        {},
        ...['Place', 'Attempts', 'Time', 'System', 'Length', 'Score'].map((title) =>
          el(
            'th',
            { className: 'border-b border-slate-200 p-3 text-xs font-bold text-slate-500' },
            title,
          ),
        ),
      ),
    ),
    el('tbody', {}, ...rows),
  );

  const tableContainer = el(
    'div',
    { className: 'w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white' },
    leaderboardTable,
  );

  const closeButton = el(
    'button',
    {
      type: 'button',
      className:
        'w-full rounded-xl bg-teal-700 px-5 py-3 font-bold text-white shadow-md shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-teal-500',
      onClick: close,
    },
    'Close',
  );

  const content = el(
    'div',
    {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'leaderboard-title',
      className:
        'relative flex w-full max-w-2xl flex-col items-center gap-6 overflow-hidden rounded-3xl border border-white/70 bg-slate-50 p-6 shadow-2xl sm:p-8',
      onClick: (event: MouseEvent) => event.stopPropagation(),
    },
    el('div', {
      className:
        'absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500',
    }),
    badge,
    el('div', { className: 'flex flex-col gap-2' }, title, description),
    tableContainer,
    closeButton,
  );

  const overlay = el(
    'div',
    {
      className:
        'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md',
      onClick: (event: MouseEvent) => {
        if (event.target === overlay) close();
      },
    },
    content,
  );

  window.addEventListener('keydown', handleKeyDown);

  return overlay;
}
