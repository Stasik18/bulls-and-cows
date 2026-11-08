import { el } from '../helpers/fabric-elemnt';

export function modal(onClose: () => void) {
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

  const title = el(
    'h1',
    { className: 'text-4xl font-bold text-blue-500 text-center' },
    'Leaderboard',
  );

  const leaderList = el('ul', {
    className: 'min-h-80 flex-1',
  });

  const closeButton = el(
    'button',
    {
      type: 'button',
      className: 'rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600',
      onClick: close,
    },
    'Close',
  );

  const content = el(
    'div',
    {
      className: 'flex flex-col gap-6 max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg w-full',
      onClick: (event: MouseEvent) => event.stopPropagation(),
    },
    title,
    leaderList,
    closeButton,
  );

  const overlay = el(
    'div',
    {
      className:
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm',
      onClick: (event: MouseEvent) => {
        if (event.target === overlay) close();
      },
    },
    content,
  );

  window.addEventListener('keydown', handleKeyDown);

  return overlay;
}
