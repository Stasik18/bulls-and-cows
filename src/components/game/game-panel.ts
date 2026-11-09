import { SYSTEMS } from '@/constants/systems';
import { createDigitValidator } from '@/game/createDigitValidator';
import { isValidGuess } from '@/game/isValidGuess';
import { el } from '@/helpers/fabric-elemnt';
import type { Base, GuessHistoryEntry, GameState } from '@/storage/gameState';

interface GamePanelProps {
  length: number;
  base: Base;
  history: GuessHistoryEntry[];
  status: GameState['status'];
  onGuess: (guess: string) => boolean;
}

interface GuessInputHandlerProps {
  input: HTMLInputElement;
  checkAnswer: HTMLButtonElement;
  length: number;
  base: Base;
  history: GuessHistoryEntry[];
  status: GameState['status'];
  systemName: string;
  isDigitAllowed: (char: string) => boolean;
}

function handleGuessInput({
  input,
  checkAnswer,
  length,
  base,
  history,
  status,
  systemName,
  isDigitAllowed,
}: GuessInputHandlerProps): void {
  const rawValue = input.value.toUpperCase();
  const characters = rawValue.split('');

  const invalidChar = characters.find((char) => !isDigitAllowed(char));
  const filteredValue = characters.filter(isDigitAllowed).slice(0, length).join('');

  input.value = filteredValue;
  input.setCustomValidity('');

  const isDuplicate = history.some(
    (entry) => entry.guess.toLowerCase() === filteredValue.toLowerCase(),
  );

  if (invalidChar) {
    input.setCustomValidity(
      `Symbol "${invalidChar}" is not available for the numeral system ${systemName}`,
    );
    input.reportValidity();
  } else if (filteredValue.length === length && !isValidGuess(filteredValue, length, base)) {
    input.setCustomValidity('Enter a valid number with unique digits.');
    input.reportValidity();
  } else if (isDuplicate) {
    input.setCustomValidity('You have already tried this number.');
    input.reportValidity();
  }

  checkAnswer.disabled =
    status === 'won' || !isValidGuess(filteredValue, length, base) || isDuplicate;
}

export function GamePanel({ length, base, history, status, onGuess }: GamePanelProps) {
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
      { className: 'text-4xl font-extrabold tracking-tight text-teal-800 sm:text-5xl' },
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

  const checkAnswer = el(
    'button',
    {
      type: 'submit',
      disabled: true,
      className:
        'w-full rounded-xl bg-teal-700 px-5 py-4 font-bold text-white shadow-md shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50',
    },
    'Check Answer',
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
      handleGuessInput({
        input: event.currentTarget as HTMLInputElement,
        checkAnswer,
        length,
        base,
        history,
        status,
        systemName,
        isDigitAllowed,
      });
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

  const guessForm = el(
    'form',
    {
      className: 'flex flex-col gap-4',
      onSubmit: (event: Event) => {
        event.preventDefault();

        const isWon = onGuess(guessInput.value);

        if (!isWon) {
          document.getElementById('guess-input')?.focus();
        }
      },
    },
    guessContainer,
    checkAnswer,
  );

  return el('div', { className: 'flex flex-col gap-6' }, pageHeader, gameInfo, guessForm);
}
