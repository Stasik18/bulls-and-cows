import { SYSTEMS } from '../constants/systems';
import { createDigitValidator } from '../game/createDigitValidator';
import { evaluateGuess } from '../game/evaluateGuess';
import { isValidGuess } from '../game/isValidGuess';
import { el } from '../helpers/fabric-elemnt';
import { getGameState, setGameState } from '../storage/gameState';

export function GamePage() {
  const { secret, length, base, history, status } = getGameState();

  if (!secret) {
    return el('div', {}, 'Game has not started');
  }

  const systemName = SYSTEMS.find((system) => system.value === base)?.label ?? String(base);
  const isDigitAllowed = createDigitValidator(base);

  const titleGamePage = el(
    'h1',
    { className: 'text-4xl font-bold text-blue-500 text-center' },
    'Bulls and Cows',
  );

  const numberSystem = el('p', {}, `Number system: ${systemName}`);
  const secretNumberLength = el('p', {}, `Number length: ${length}`);

  const gameInfo = el(
    'div',
    { className: 'flex flex-col gap-6 rounded-lg bg-gray-100 p-4' },
    numberSystem,
    secretNumberLength,
  );

  const guessLabel = el(
    'label',
    {
      htmlFor: 'guess-input',
      className: 'font-semibold text-gray-700',
    },
    'Your guess',
  );

  const guessInput = el('input', {
    id: 'guess-input',
    name: 'guess',
    type: 'text',
    inputMode: base === 10 ? 'numeric' : 'text',
    autocomplete: 'off',
    placeholder: 'Enter your guess',
    maxLength: length,
    disabled: status === 'won',
    className: 'rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none',
    onInput: (event: Event) => {
      const input = event.currentTarget as HTMLInputElement;

      const filteredValue = input.value
        .toUpperCase()
        .split('')
        .filter(isDigitAllowed)
        .slice(0, length)
        .join('');

      input.value = filteredValue;
      input.setCustomValidity('');
    },
  });

  const guessContainer = el('div', { className: 'flex flex-col gap-3' }, guessLabel, guessInput);

  function handleGuess() {
    const guess = guessInput.value;

    if (!isValidGuess(guess, length, base)) {
      guessInput.setCustomValidity('Enter a valid number with unique digits.');
      guessInput.reportValidity();
      return;
    }

    if (history.some((entry) => entry.guess.toLowerCase() === guess.toLowerCase())) {
      guessInput.setCustomValidity('You have already tried this number.');
      guessInput.reportValidity();
      return;
    }
    if (secret === null) return;
    const result = evaluateGuess(secret, guess);

    const newHistory = [
      ...history,
      {
        guess,
        bulls: result.bulls,
        cows: result.cows,
      },
    ];

    const isWon = result.bulls === length;

    setGameState({
      history: newHistory,
      status: isWon ? 'won' : 'playing',
      finishTime: isWon ? Date.now() : null,
    });
  }

  const checkAnswer = el(
    'button',
    {
      type: 'submit',
      disabled: status === 'won',
      className:
        'rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-600 disabled:opacity-50',
    },
    'Check Answer',
  );

  const historyTitle = el('h2', { className: 'p-4 text-xl font-bold bg-gray-200' }, 'History');

  const headerRow = el(
    'tr',
    {},
    ...['Attempt', 'Bulls', 'Cows'].map((title) =>
      el(
        'th',
        {
          scope: 'col',
          className: 'border-b border-gray-300 p-3 font-semibold',
        },
        title,
      ),
    ),
  );

  const tableHead = el('thead', {}, headerRow);

  const tableRows = history.map((entry) =>
    el(
      'tr',
      {},
      el('td', { className: 'border-b border-gray-200 p-3' }, entry.guess),
      el('td', { className: 'border-b border-gray-200 p-3' }, entry.bulls),
      el('td', { className: 'border-b border-gray-200 p-3' }, entry.cows),
    ),
  );

  const tableBody = el('tbody', {}, ...tableRows);

  const table = el('table', { className: 'w-full text-center' }, tableHead, tableBody);

  const tableContainer = el('div', { className: 'overflow-x-auto' }, table);

  const historySection = el(
    'section',
    { className: 'text-center rounded-lg bg-gray-100 p-4' },
    historyTitle,
    tableContainer,
  );

  const form = el(
    'form',
    {
      className: 'flex flex-col gap-6 w-full max-w-4xl mx-auto p-8',
      onSubmit: (event: Event) => {
        event.preventDefault();
        handleGuess();
      },
    },
    titleGamePage,
    gameInfo,
    guessContainer,
    checkAnswer,
    historySection,
  );

  return form;
}
