export function evaluateGuess(secret: string, guess: string): { bulls: number; cows: number } {
  const answers = secret.split('').map((item, index) => {
    if (guess.split('')[index].toLowerCase() === item.toLowerCase()) return 'bull';
    if (guess.split('').includes(item.toLowerCase())) return 'cow';
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
