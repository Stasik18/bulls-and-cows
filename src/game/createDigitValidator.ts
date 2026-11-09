import { SYSTEMS } from '../constants/systems';

export function createDigitValidator(base: 2 | 8 | 10 | 16): (char: string) => boolean {
  return function (char: string) {
    const necessaryNumbers =
      SYSTEMS.find((system) => system.value === base)?.digits.split(' ') ?? [];

    if (typeof char === 'string') {
      char = char.toLowerCase();
    }

    return necessaryNumbers.includes(char);
  };
}
