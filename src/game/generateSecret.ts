import { SYSTEMS } from '../constants/systems';

export function generateSecret(
  length: number,
  base: 2 | 8 | 10 | 16,
  random: () => number = Math.random,
): string {
  const necessaryNumbers = SYSTEMS.find((system) => system.value === base)?.digits.split(' ') ?? [];

  for (let index = necessaryNumbers.length - 1; index > 0; index--) {
    const newIndex = Math.floor(random() * (index + 1));
    const temp = necessaryNumbers[index];
    necessaryNumbers[index] = necessaryNumbers[newIndex];
    necessaryNumbers[newIndex] = temp;
  }

  return necessaryNumbers.slice(0, length).join('');
}
