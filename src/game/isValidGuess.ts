import { createDigitValidator } from './createDigitValidator';

export function isValidGuess(guess: string, length: number, base: 2 | 8 | 10 | 16): boolean {
  if (guess.length !== length) return false;
  if (guess.length !== new Set(guess.split('').map((item) => item.toLowerCase())).size)
    return false;
  let flag = true;
  const isNecessaryChar = createDigitValidator(base);
  guess.split('').forEach((char) => {
    if (!isNecessaryChar(char)) flag = false;
  });

  return flag;
}
