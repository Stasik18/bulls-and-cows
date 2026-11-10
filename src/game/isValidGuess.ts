import { createDigitValidator } from '@/game/createDigitValidator';

export function isValidGuess(guess: string, length: number, base: 2 | 8 | 10 | 16): boolean {
  if (guess.length !== length) return false;

  const arrayGuess = guess.split('');

  if (guess.length !== new Set(arrayGuess.map((item) => item.toLowerCase())).size) return false;
  const isNecessaryChar = createDigitValidator(base);
  return arrayGuess.every((char) => isNecessaryChar(char));
}
