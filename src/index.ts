import './style.css';

import { HomePage } from './ui/home-page';
import { GamePage } from './ui/game-page';
import { modal } from './ui/modal';
import { getGameState, setGameState, subscribeGameState } from './storage/gameState';
import { el } from './helpers/fabric-elemnt';

const main = el('main', { className: 'min-h-screen w-full flex items-center justify-center p-4' });

function renderApp() {
  const { status, modalStatus } = getGameState();

  const page = status === 'idle' ? HomePage() : GamePage();

  main.replaceChildren(page);

  if (modalStatus === 'open') {
    main.append(
      modal(() => {
        setGameState({ modalStatus: 'close' });
      }),
    );
  }
}

document.body.append(main);

renderApp();
subscribeGameState(renderApp);
