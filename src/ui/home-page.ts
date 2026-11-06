export function HomePage() {
  const form = document.createElement('form');
  form.className = 'flex flex-col gap-6 max-w-4xl mx-auto p-8 ';

  const titleHomePage = document.createElement('h1');
  const leaderBoardButton = document.createElement('button');
  const startGameButton = document.createElement('button');
  const descriptionHomePage = document.createElement('div');

  titleHomePage.textContent = 'Bulls and Cows';
  titleHomePage.className = 'text-4xl font-bold text-blue-500 text-center';

  descriptionHomePage.textContent =
    'Bulls and Cows — игра в угадывание секретного числа из уникальных цифр. Компьютер загадывает число заданной длины в заданной системе счисления, игрок вводит варианты, после каждой попытки получает подсказку: сколько цифр угаданы и стоят на своём месте (bulls), и сколько угаданы, но стоят не на своём месте (cows).';

  descriptionHomePage.className = 'text-gray-600 leading-relaxed';

  leaderBoardButton.textContent = 'Leaderboard';
  leaderBoardButton.type = 'button';
  leaderBoardButton.className = 'rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600';

  startGameButton.textContent = 'Start Game';
  startGameButton.type = 'button';
  startGameButton.className = 'rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600';

  const systems = [
    { label: 'Binary', value: '2', digits: '0 1' },
    { label: 'Octal', value: '8', digits: '0 1 2 3 4 5 6 7' },
    { label: 'Decimal', value: '10', digits: '0 1 2 3 4 5 6 7 8 9' },
    { label: 'Hexadecimal', value: '16', digits: '0 1 2 3 4 5 6 7 8 9 A B C D E F' },
  ];

  const systemsContainer = document.createElement('div');
  systemsContainer.className = 'flex flex-wrap gap-3';

  const currentSymbol = document.createElement('div');
  currentSymbol.className = 'rounded-lg bg-gray-100 p-4';

  const currentSymbolTitle = document.createElement('p');
  currentSymbolTitle.textContent = 'Secret Number Length';
  currentSymbolTitle.className = 'mb-2 font-semibold text-gray-700';

  const currentSymbolList = document.createElement('div');
  currentSymbolList.className = 'flex flex-wrap gap-2';

  function renderCurrentSymbol(digits: string) {
    currentSymbolList.replaceChildren();

    if (digits.split(' ').length <= 2) {
      const currentSymbolElement = document.createElement('span');

      currentSymbolElement.textContent = '2';
      currentSymbolElement.className =
        'flex h-9 w-9 items-center justify-center rounded-md bg-blue-500 font-bold text-white';
      currentSymbolList.append(currentSymbolElement);
    } else {
      Array.from({ length: 5 }, (_, index) => index + 2).forEach((digit) => {
        const labelSymbolElement = document.createElement('label');
        labelSymbolElement.className = 'cursor-pointer';

        const radioSymbolElement = document.createElement('input');
        radioSymbolElement.type = 'radio';
        radioSymbolElement.name = 'symbolElement';
        radioSymbolElement.value = String(digit);
        radioSymbolElement.checked = radioSymbolElement.value === '2';
        radioSymbolElement.className = 'sr-only peer';

        const symbolText = document.createElement('span');
        symbolText.textContent = String(digit);
        symbolText.className =
          'flex h-9 w-9 items-center justify-center rounded-md bg-gray-200 font-bold text-gray-700 peer-checked:bg-blue-500 peer-checked:text-white';

        labelSymbolElement.append(radioSymbolElement, symbolText);
        currentSymbolList.append(labelSymbolElement);
      });
    }
  }

  const digitsDisplay = document.createElement('div');
  digitsDisplay.className = 'rounded-lg bg-gray-100 p-4';

  const digitsTitle = document.createElement('p');
  digitsTitle.textContent = 'Available digits:';
  digitsTitle.className = 'mb-2 font-semibold text-gray-700';

  const digitsList = document.createElement('div');
  digitsList.className = 'flex flex-wrap gap-2';

  function renderDigits(digits: string) {
    digitsList.replaceChildren();

    digits.split(' ').forEach((digit) => {
      const digitElement = document.createElement('span');

      digitElement.textContent = digit;
      digitElement.className =
        'flex h-9 w-9 items-center justify-center rounded-md bg-blue-500 font-bold text-white';

      digitsList.append(digitElement);
    });
  }

  systems.forEach((system, index) => {
    const label = document.createElement('label');
    label.className =
      'cursor-pointer rounded-lg border border-gray-300 px-4 py-2 hover:border-blue-500';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'numberSystem';
    radio.value = system.value;
    radio.checked = index === 0;
    radio.className = 'mr-2';

    radio.addEventListener('change', () => {
      renderDigits(system.digits);
      renderCurrentSymbol(system.digits);
    });

    label.append(radio, system.label);
    systemsContainer.append(label);
  });

  renderDigits(systems[0].digits);
  renderCurrentSymbol(systems[0].digits);

  digitsDisplay.append(digitsTitle, digitsList);
  currentSymbol.append(currentSymbolTitle, currentSymbolList);
  form.append(
    titleHomePage,
    descriptionHomePage,
    systemsContainer,
    currentSymbol,
    digitsDisplay,
    startGameButton,
    leaderBoardButton,
  );

  return form;
}
