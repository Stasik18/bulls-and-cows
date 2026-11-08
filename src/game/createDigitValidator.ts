const systems = [
  { value: 2, digits: '0 1' },
  { value: 8, digits: '0 1 2 3 4 5 6 7' },
  { value: 10, digits: '0 1 2 3 4 5 6 7 8 9' },
  { value: 16, digits: '0 1 2 3 4 5 6 7 8 9 a b c d e f' },
];

export function createDigitValidator(base: 2 | 8 | 10 | 16): (char: string) => boolean {
  return function (char: string) {
    const necessaryNumbers =
      systems.find((system) => system.value === base)?.digits.split(' ') ?? [];

    if (typeof char === 'string') {
      char = char.toLowerCase();
    }

    return necessaryNumbers.includes(char);
  };
}
