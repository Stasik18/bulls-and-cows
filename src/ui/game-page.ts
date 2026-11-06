export function GamePage() {
  const form = document.createElement('form');
  form.className = 'flex flex-col  gap-6 w-full max-w-4xl   mx-auto p-8';

  const titleGamePage = document.createElement('h1');
  titleGamePage.textContent = 'Bulls and Cows';
  titleGamePage.className = 'text-4xl font-bold text-blue-500 text-center';

  const gameInfo = document.createElement('div');
  gameInfo.className = 'flex flex-col gap-6 rounded-lg bg-gray-100 p-4';

  const numberSystem = document.createElement('p');
  numberSystem.textContent = 'Number system: Decimal';

  const secretNumberLength = document.createElement('p');
  secretNumberLength.textContent = 'Number length: 3';

  gameInfo.append(numberSystem, secretNumberLength);

  const guessContainer = document.createElement('div');
  guessContainer.className = 'flex flex-col gap-3';

  const guessLabel = document.createElement('label');
  guessLabel.textContent = 'Your guess';
  guessLabel.htmlFor = 'guess-input';
  guessLabel.className = 'font-semibold text-gray-700';

  const guessInput = document.createElement('input');
  guessInput.id = 'guess-input';
  guessInput.name = 'guess';
  guessInput.type = 'text';
  guessInput.inputMode = 'numeric';
  guessInput.autocomplete = 'off';
  guessInput.placeholder = 'Enter your guess';
  guessInput.className =
    'rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none';

  guessContainer.append(guessLabel, guessInput);

  const checkAnswer = document.createElement('button');
  checkAnswer.textContent = 'Check Answer';
  checkAnswer.type = 'button';
  checkAnswer.className =
    'rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-600';

  const history = document.createElement('section');
  history.className = 'text-center rounded-lg bg-gray-100 p-4';

  const historyTitle = document.createElement('h2');
  historyTitle.textContent = 'History';
  historyTitle.className = 'p-4 text-xl font-bold bg-gray-200 ';

  const tableContainer = document.createElement('div');
  tableContainer.className = 'overflow-x-auto';

  const table = document.createElement('table');
  table.className = 'w-full text-center';

  const tableHead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  ['Attempt', 'Bulls', 'Cows'].forEach((title) => {
    const th = document.createElement('th');
    th.textContent = title;
    th.scope = 'col';
    th.className = 'border-b border-gray-300 p-3 font-semibold';
    headerRow.append(th);
  });

  tableHead.append(headerRow);

  const tableBody = document.createElement('tbody');

  table.append(tableHead, tableBody);
  tableContainer.append(table);
  history.append(historyTitle, tableContainer);

  form.append(titleGamePage, gameInfo, guessContainer, checkAnswer, history);

  return form;
}
