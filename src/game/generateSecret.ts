const systems = [
  { value: 2, digits: '0 1' },
  { value: 8, digits: '0 1 2 3 4 5 6 7' },
  { value: 10, digits: '0 1 2 3 4 5 6 7 8 9' },
  { value: 16, digits: '0 1 2 3 4 5 6 7 8 9 A B C D E F' },
];

export function generateSecret(
  length: number,
  base: 2 | 8 | 10 | 16,
  random: () => number = Math.random,
): string {
  const necessaryNumbers = systems.find((system) => system.value === base)?.digits.split(' ') ?? [];

  for (let index = necessaryNumbers.length - 1; index > 0; index--) {
    const newIndex = Math.floor(random() * (index + 1));
    const temp = necessaryNumbers[index];
    necessaryNumbers[index] = necessaryNumbers[newIndex];
    necessaryNumbers[newIndex] = temp;
  }

  return necessaryNumbers.slice(0, length).join('');
}
