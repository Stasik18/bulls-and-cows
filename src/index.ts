import './style.css';

import { HomePage } from './ui/home-page';
const body = document.querySelector('body');
const main = document.createElement('main');

main.append(HomePage());

body?.append(main);
