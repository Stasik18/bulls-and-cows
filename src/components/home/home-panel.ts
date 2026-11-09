import { SYSTEMS } from '@/constants/systems';
import { countPossibleSecrets } from '@/game/countPossibleSecrets';
import { el } from '@/helpers/fabric-elemnt';
import type { Base } from '@/storage/gameState';

interface HomePanelProps {
  base: Base;
  length: number;
  onChangeLength: (length: number) => void;
  onChangeSystem: (base: Base) => void;
  onStartGame: () => void;
  onOpenLeaderboard: () => void;
}

export function HomePanel({
  base,
  length,
  onChangeLength,
  onChangeSystem,
  onStartGame,
  onOpenLeaderboard,
}: HomePanelProps) {
  const selectedSystem = SYSTEMS.find((system) => system.value === base) ?? SYSTEMS[0];

  const titleHomePage = el(
    'h1',
    {
      className: 'text-4xl font-extrabold tracking-tight text-slate-800 text-center sm:text-5xl',
    },
    'Bulls and Cows',
  );

  const descriptionHomePage = el(
    'p',
    {
      className:
        'mx-auto max-w-2xl text-center text-sm leading-relaxed text-slate-500 sm:text-base',
    },
    'A number guessing game. The computer creates a secret number with unique digits, and your task is to crack the code using bulls and cows.',
  );

  const hero = el(
    'div',
    { className: 'flex flex-col items-center gap-4 text-center' },
    el(
      'span',
      {
        className:
          'rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700',
      },
      'Codebreaker / New session',
    ),
    titleHomePage,
    descriptionHomePage,
  );

  const settingsTitle = el(
    'h2',
    { className: 'text-xl font-bold text-slate-800' },
    'Game settings',
  );

  const settingsDescription = el(
    'p',
    { className: 'text-sm text-slate-500' },
    'Choose your number system and secret number length.',
  );

  const systemsContainer = el('div', {
    className: 'flex flex-wrap gap-3',
  });

  const currentSymbolList = el('div', {
    className: 'flex flex-wrap gap-3',
  });

  const currentSymbol = el(
    'div',
    { className: 'flex flex-col gap-3' },
    el(
      'p',
      { className: 'text-sm font-bold uppercase tracking-wide text-slate-600' },
      'Secret number length',
    ),
    currentSymbolList,
  );

  const digitsList = el('div', {
    className: 'flex flex-wrap gap-2',
  });

  const digitsDisplay = el(
    'div',
    { className: 'flex flex-col gap-3' },
    el(
      'p',
      { className: 'text-sm font-bold uppercase tracking-wide text-slate-600' },
      'Available digits',
    ),
    digitsList,
  );

  const countVariantsDisplay = el(
    'div',
    {
      className:
        'flex flex-col gap-2 rounded-2xl border border-teal-100 bg-teal-50 p-5 sm:flex-row sm:items-center sm:justify-between',
    },
    el(
      'div',
      { className: 'flex flex-col gap-1' },
      el('span', { className: 'text-sm font-bold text-teal-800' }, 'Possible combinations'),
      el('span', { className: 'text-xs text-teal-700/70' }, 'Number of unique secret numbers'),
    ),
    el(
      'strong',
      { className: 'text-3xl font-extrabold tracking-tight text-teal-700' },
      countPossibleSecrets(length, base).toLocaleString(),
    ),
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
          onChangeLength(digit);
        },
      });

      const symbolText = el(
        'span',
        {
          className:
            'flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 font-bold text-slate-600 transition peer-checked:border-teal-700 peer-checked:bg-teal-700 peer-checked:text-white',
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
            'flex h-10 w-10 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 font-bold text-teal-800',
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
      className: 'accent-teal-700',
      onChange: () => {
        onChangeSystem(system.value);
      },
    });

    return el(
      'label',
      {
        className:
          'flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-teal-500 has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-800',
      },
      radio,
      system.label,
    );
  });

  systemsContainer.append(...systemElements);

  const systemSection = el(
    'div',
    { className: 'flex flex-col gap-3' },
    el(
      'p',
      { className: 'text-sm font-bold uppercase tracking-wide text-slate-600' },
      'Number system',
    ),
    systemsContainer,
  );

  const settingsContent = el(
    'div',
    {
      className: 'flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6',
    },
    el('div', { className: 'flex flex-col gap-1' }, settingsTitle, settingsDescription),
    systemSection,
    el(
      'div',
      { className: 'grid grid-cols-1 gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2' },
      currentSymbol,
      digitsDisplay,
    ),
    countVariantsDisplay,
  );

  renderDigits(selectedSystem.digits);
  renderCurrentSymbol(selectedSystem.digits, length);

  const startGameButton = el(
    'button',
    {
      type: 'button',
      className:
        'w-full rounded-xl bg-teal-700 px-5 py-4 font-bold text-white shadow-md shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg',
      onClick: onStartGame,
    },
    'Start Game',
  );

  const leaderBoardButton = el(
    'button',
    {
      type: 'button',
      className:
        'w-full rounded-xl border border-slate-300 bg-white px-5 py-4 font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-teal-50 hover:text-teal-800',
      onClick: onOpenLeaderboard,
    },
    'Leaderboard',
  );

  const actions = el(
    'div',
    { className: 'grid grid-cols-1 gap-3 sm:grid-cols-2' },
    startGameButton,
    leaderBoardButton,
  );

  return el(
    'form',
    {
      className:
        'flex w-full max-w-4xl flex-col gap-7 rounded-3xl border border-white/70 bg-slate-50 p-6 shadow-2xl sm:p-10',
    },
    hero,
    settingsContent,
    actions,
  );
}
