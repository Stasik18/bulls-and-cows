export function evaluateGuess(secret: string, guess: string): { bulls: number; cows: number } {
  const secretChars = secret.toLowerCase().split('');
  const guessChars = guess.toLowerCase().split('');

  const answers = secretChars.map((item, index) => {
    if (guessChars[index] === item) return 'bull';
    if (guessChars.includes(item)) return 'cow';
    return null;
  });

  return answers
    .filter((item) => item !== null)
    .reduce(
      (acc, item) => {
        if (item === 'cow') {
          acc.cows += 1;
        } else {
          acc.bulls += 1;
        }
        return acc;
      },

      { bulls: 0, cows: 0 },
    );
}
