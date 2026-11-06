import { describe, it, expect } from 'vitest';
import { evaluateGuess } from '../game/evaluateGuess';

describe('evaluateGuess', () => {
  it('returns all bulls when the guess matches the secret', () => {
    const secretNumber = '123';
    const attempt = '123';

    expect(evaluateGuess(secretNumber, attempt)).toEqual({ bulls: 3, cows: 0 });
  });

  it('returns all cows when all digits are in wrong positions', () => {
    const secretNumber = '123';
    const attempt = '312';

    expect(evaluateGuess(secretNumber, attempt)).toEqual({ bulls: 0, cows: 3 });
  });

  it('returns correct bulls and cows for a mixed guess', () => {
    const secretNumber = '123';
    const attempt = '243';

    expect(evaluateGuess(secretNumber, attempt)).toEqual({ bulls: 1, cows: 1 });
  });

  it('returns zero bulls and cows when there are no matching digits', () => {
    const secretNumber = '123';
    const attempt = '456';

    expect(evaluateGuess(secretNumber, attempt)).toEqual({ bulls: 0, cows: 0 });
  });

  it('returns only one bull when there is one exact match', () => {
    const secretNumber = '123';
    const attempt = '156';

    expect(evaluateGuess(secretNumber, attempt)).toEqual({ bulls: 1, cows: 0 });
  });

  it('returns only one cow when there is one misplaced match', () => {
    const secretNumber = '123';
    const attempt = '415';

    expect(evaluateGuess(secretNumber, attempt)).toEqual({ bulls: 0, cows: 1 });
  });
});
