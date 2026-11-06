export function modal() {
  const modal = document.createElement('form');
  modal.className = 'flex flex-col gap-6 max-w-4xl mx-auto p-8 bg-gray-100';

  const overlay = document.createElement('div');
  overlay.className =
    'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 background-blur-sm';

  const titleModaL = document.createElement('h1');
  const closeButton = document.createElement('button');
  const leaderList = document.createElement('ul');

  titleModaL.textContent = 'Leader Board';
  titleModaL.className = 'text-4xl font-bold text-blue-500 text-center';

  leaderList.className = 'min-h-80 flex-1';

  closeButton.textContent = 'Close';
  closeButton.type = 'button';
  closeButton.className = 'rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600';

  modal.append(titleModaL, leaderList, closeButton);
  overlay.append(modal);

  return overlay;
}
