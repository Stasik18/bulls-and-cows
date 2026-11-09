import { SYSTEMS } from '@/constants/systems';

export function createDigitValidator(base: 2 | 8 | 10 | 16): (char: string) => boolean {
  const necessaryNumbers =
    SYSTEMS.find((system) => system.value === base)
      ?.digits.toLowerCase()
      .split(' ') ?? [];

  return function (char: string) {
    const validChar = char.toLowerCase();

    return necessaryNumbers.includes(validChar);
  };
}
