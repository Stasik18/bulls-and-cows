import { el } from '../helpers/fabric-elemnt';

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

  const leaderList = el('ul', {
    className:
      'flex min-h-80 w-full flex-col divide-y divide-slate-200 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4',
  });

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
    leaderList,
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
