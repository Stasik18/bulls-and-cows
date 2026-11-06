import './style.css';

// import { HomePage } from './ui/home-page';
import { modal } from './ui/modal';
// import { GamePage } from './ui/game-page';
const body = document.querySelector('body');
const main = document.createElement('main');
main.className = 'min-h-screen w-full flex items-center justify-center p-4';

main.append(modal());

body?.append(main);
