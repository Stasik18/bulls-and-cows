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

  const pageHeader = el(
    'div',
    { className: 'flex flex-col items-center gap-3 text-center' },
    el(
      'span',
      {
        className:
          'rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700',
      },
      'Codebreaker / Game session',
    ),
    el(
      'h1',
      { className: 'text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl' },
      'Bulls and Cows',
    ),
    el(
      'p',
      { className: 'max-w-lg text-sm leading-relaxed text-slate-500' },
      'Crack the secret number. Every attempt brings you closer to the answer.',
    ),
  );

  const numberSystem = el(
    'div',
    { className: 'flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5' },
    el(
      'span',
      { className: 'text-xs font-bold uppercase tracking-wider text-slate-400' },
      'Number system',
    ),
    el('strong', { className: 'text-xl font-bold text-teal-700' }, systemName),
  );

  const secretNumberLength = el(
    'div',
    { className: 'flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5' },
    el(
      'span',
      { className: 'text-xs font-bold uppercase tracking-wider text-slate-400' },
      'Number length',
    ),
    el('strong', { className: 'text-xl font-bold text-teal-700' }, length),
  );

  const gameInfo = el(
    'div',
    { className: 'grid grid-cols-1 gap-3 sm:grid-cols-2' },
    numberSystem,
    secretNumberLength,
  );

  const guessLabel = el(
    'label',
    {
      htmlFor: 'guess-input',
      className: 'text-sm font-bold uppercase tracking-wide text-slate-700',
    },
    'Your guess',
  );

  const guessInput = el('input', {
    id: 'guess-input',
    name: 'guess',
    type: 'text',
    inputMode: base === 16 ? 'text' : 'numeric',
    autocomplete: 'off',
    placeholder: 'Enter your guess',
    maxLength: length,
    disabled: status === 'won',
    'aria-describedby': 'guess-help',
    className:
      'w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 text-center text-2xl font-bold tracking-[0.3em] text-slate-800 placeholder:text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none disabled:opacity-50',
    onInput: (event: Event) => {
      const input = event.currentTarget as HTMLInputElement;
      const rawValue = input.value.toUpperCase();

      const invalidChar = rawValue.split('').find((char) => !isDigitAllowed(char));

      const filteredValue = rawValue.split('').filter(isDigitAllowed).slice(0, length).join('');

      input.value = filteredValue;

      input.setCustomValidity('');

      if (invalidChar) {
        input.setCustomValidity(
          `Symbol "${invalidChar}" is not available for the numeral system ${systemName}`,
        );
        input.reportValidity();
      }

      if (filteredValue.length === length) {
        if (!isValidGuess(filteredValue, length, base)) {
          guessInput.setCustomValidity('Enter a valid number with unique digits.');
          guessInput.reportValidity();
        }

        if (history.some((entry) => entry.guess.toLowerCase() === filteredValue.toLowerCase())) {
          guessInput.setCustomValidity('You have already tried this number.');
          guessInput.reportValidity();
        }
      }
    },
  });

  const guessHint = el(
    'p',
    { id: 'guess-help', className: 'text-xs leading-relaxed text-slate-400' },
    `Enter ${length} unique digits. Available digits depend on the selected number system.`,
  );

  const guessContainer = el(
    'div',
    {
      className:
        'flex flex-col gap-4 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm sm:p-6',
    },
    guessLabel,
    guessInput,
    guessHint,
  );

  function handleGuess() {
    const guess = guessInput.value;

    // Оставил проверки по отправке для перестраховки.
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
      {
        guess,
        bulls: result.bulls,
        cows: result.cows,
      },
      ...history,
    ];

    const isWon = result.bulls === length;

    setGameState({
      history: newHistory,
      status: isWon ? 'won' : 'playing',
      finishTime: isWon ? Date.now() : null,
    });

    if (!isWon) {
      document.getElementById('guess-input')?.focus();
    }
  }

  const checkAnswer = el(
    'button',
    {
      type: 'submit',
      disabled: status === 'won',
      className:
        'w-full rounded-xl bg-teal-700 px-5 py-4 font-bold text-white shadow-md shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50',
    },
    'Check Answer',
  );

  const guessForm = el(
    'form',
    {
      className: 'flex flex-col gap-4',
      onSubmit: (event: Event) => {
        event.preventDefault();
        handleGuess();
      },
    },
    guessContainer,
    checkAnswer,
  );

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

  const historySection = el(
    'section',
    {
      className: 'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
    },
    historyHeader,
    tableContainer,
  );

  return el(
    'form',
    { className: 'flex w-full max-w-4xl flex-col gap-6 mx-auto p-8' },
    pageHeader,
    gameInfo,
    guessForm,
    historySection,
  );
}
