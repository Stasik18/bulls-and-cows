import { el } from '@/helpers/fabric-elemnt';
import type { GuessHistoryEntry } from '@/storage/gameState';

export function HistorySection(history: GuessHistoryEntry[]) {
  const historyTitle = el('h2', { className: 'text-xl font-bold text-slate-800' }, 'Guess history');

  const historyCount = el(
    'span',
    {
      className: 'rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700',
    },
    `${history.length} attempts`,
  );

  const historyHeader = el(
    'div',
    { className: 'flex items-center justify-between gap-3 bg-slate-100 p-4 sm:p-5' },
    historyTitle,
    historyCount,
  );

  const headerRow = el(
    'tr',
    {},
    ...['Attempt', 'Bulls', 'Cows'].map((title) =>
      el(
        'th',
        {
          scope: 'col',
          className: 'border-b border-slate-200 p-3 text-sm font-bold text-slate-500',
        },
        title,
      ),
    ),
  );

  const tableHead = el('thead', { className: 'bg-slate-100' }, headerRow);

  const tableRows = history.map((entry) =>
    el(
      'tr',
      { className: 'transition hover:bg-teal-50/50' },
      el(
        'td',
        { className: 'border-b border-slate-100 p-3 font-bold tracking-wider text-slate-800' },
        entry.guess,
      ),
      el(
        'td',
        { className: 'border-b border-slate-100 p-3 font-semibold text-teal-700' },
        entry.bulls,
      ),
      el(
        'td',
        { className: 'border-b border-slate-100 p-3 font-semibold text-slate-600' },
        entry.cows,
      ),
    ),
  );

  if (history.length === 0) {
    tableRows.push(
      el(
        'tr',
        {},
        el(
          'td',
          {
            colSpan: 3,
            className: 'p-10 text-center text-sm text-slate-400',
          },
          'Your guesses will appear here.',
        ),
      ),
    );
  }

  const tableBody = el('tbody', {}, ...tableRows);

  const table = el('table', { className: 'w-full text-center' }, tableHead, tableBody);

  const tableContainer = el('div', { className: 'overflow-x-auto' }, table);

  return el(
    'section',
    {
      className: 'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
    },
    historyHeader,
    tableContainer,
  );
}
