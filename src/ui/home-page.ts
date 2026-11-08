import { SYSTEMS } from '../constants/systems';
import { generateSecret } from '../game/generateSecret';
import { el } from '../helpers/fabric-elemnt';
import { getGameState, setGameState } from '../storage/gameState';

export function HomePage() {
  const { base, length } = getGameState();

  const selectedSystem = SYSTEMS.find((system) => system.value === base) ?? SYSTEMS[0];

  const titleHomePage = el(
    'h1',
    { className: 'text-4xl font-bold text-blue-500 text-center' },
    'Bulls and Cows',
  );

  const descriptionHomePage = el(
    'div',
    { className: 'text-gray-600 leading-relaxed' },
    'Bulls and Cows — игра в угадывание секретного числа из уникальных цифр. Компьютер загадывает число заданной длины в заданной системе счисления, игрок вводит варианты, после каждой попытки получает подсказку: сколько цифр угаданы и стоят на своём месте (bulls), и сколько угаданы, но стоят не на своём месте (cows).',
  );

  const leaderBoardButton = el(
    'button',
    {
      type: 'button',
      className: 'rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600',
      onClick: () => {
        setGameState({
          modalStatus: 'open',
        });
      },
    },
    'Leaderboard',
  );

  const startGameButton = el(
    'button',
    {
      type: 'button',
      className: 'rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600',
      onClick: () => {
        const { length, base } = getGameState();

        setGameState({
          status: 'playing',
          secret: generateSecret(length, base),
          startTime: Date.now(),
          finishTime: null,
          history: [],
        });
      },
    },
    'Start Game',
  );

  const SYSTEMSContainer = el('div', {
    className: 'flex flex-wrap gap-3',
  });

  const currentSymbolList = el('div', {
    className: 'flex flex-wrap gap-2',
  });

  const currentSymbol = el(
    'div',
    { className: 'rounded-lg bg-gray-100 p-4' },
    el('p', { className: 'mb-2 font-semibold text-gray-700' }, 'Secret Number Length'),
    currentSymbolList,
  );

  const digitsList = el('div', {
    className: 'flex flex-wrap gap-2',
  });

  const digitsDisplay = el(
    'div',
    { className: 'rounded-lg bg-gray-100 p-4' },
    el('p', { className: 'mb-2 font-semibold text-gray-700' }, 'Available digits:'),
    digitsList,
  );

  function renderCurrentSymbol(digits: string, selectedLength: number) {
    const availableLengths = digits.split(' ').length <= 2 ? [2] : [2, 3, 4, 5, 6];

    const lengthElements = availableLengths.map((digit) => {
      const radio = el('input', {
        type: 'radio',
        name: 'symbolElement',
        value: String(digit),
        checked: digit === selectedLength,
        className: 'sr-only peer',
        onChange: () => {
          setGameState({ length: digit });
        },
      });

      const symbolText = el(
        'span',
        {
          className:
            'flex h-9 w-9 items-center justify-center rounded-md bg-gray-200 font-bold text-gray-700 peer-checked:bg-blue-500 peer-checked:text-white',
        },
        digit,
      );

      return el('label', { className: 'cursor-pointer' }, radio, symbolText);
    });

    currentSymbolList.replaceChildren(...lengthElements);
  }

  function renderDigits(digits: string) {
    const digitElements = digits.split(' ').map((digit) =>
      el(
        'span',
        {
          className:
            'flex h-9 w-9 items-center justify-center rounded-md bg-blue-500 font-bold text-white',
        },
        digit,
      ),
    );

    digitsList.replaceChildren(...digitElements);
  }

  const systemElements = SYSTEMS.map((system) => {
    const radio = el('input', {
      type: 'radio',
      name: 'numberSystem',
      value: system.value,
      checked: system.value === base,
      className: 'mr-2',
      onChange: () => {
        setGameState({
          base: system.value,
          length: 2,
        });
      },
    });

    return el(
      'label',
      {
        className:
          'cursor-pointer rounded-lg border border-gray-300 px-4 py-2 hover:border-blue-500',
      },
      radio,
      system.label,
    );
  });

  SYSTEMSContainer.append(...systemElements);

  renderDigits(selectedSystem.digits);
  renderCurrentSymbol(selectedSystem.digits, length);

  return el(
    'form',
    { className: 'flex flex-col gap-6 max-w-4xl mx-auto p-8' },
    titleHomePage,
    descriptionHomePage,
    SYSTEMSContainer,
    currentSymbol,
    digitsDisplay,
    startGameButton,
    leaderBoardButton,
  );
}
