import './style.css';

import { HomePage } from './ui/home-page';
import { GamePage } from '@/pages/game-page';

import { el } from './helpers/fabric-elemnt';
import { getGameState, setGameState, subscribeGameState } from './storage/gameState';
import { leaderModal } from './components/modals/leader-modal';
import { winModal } from './components/modals/win-modal';

const main = el('main', {
  className: 'min-h-screen w-full flex items-center justify-center p-4',
});

function renderApp() {
  const { status, modalStatus, history, startTime, finishTime } = getGameState();

  const page = status === 'idle' ? HomePage() : GamePage();

  main.replaceChildren(page);

  if (modalStatus === 'open') {
    main.append(
      leaderModal(() => {
        setGameState({ modalStatus: 'close' });
      }),
    );
  }

  if (status === 'won') {
    const duration = startTime !== null && finishTime !== null ? finishTime - startTime : 0;

    main.append(
      winModal(history.length, duration, () => {
        setGameState({
          status: 'idle',
          secret: null,
          history: [],
          startTime: null,
          finishTime: null,
          modalStatus: 'close',
        });
      }),
    );
  }
}

document.body.append(main);

renderApp();
subscribeGameState(renderApp);
