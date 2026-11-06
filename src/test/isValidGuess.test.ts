import { describe, it, expect } from 'vitest';
import { isValidGuess } from '../game/isValidGuess';

describe('isValidGuess', () => {
  it('returns true when the guess has valid length and unique digits', () => {
    const guess = '123';
    const length = 3;
    const base = 10;

    expect(isValidGuess(guess, length, base)).toBeTruthy();
  });

  it('returns false when the guess length does not match the required length', () => {
    const guess = '123';
    const length = 2;
    const base = 10;

    expect(isValidGuess(guess, length, base)).toBeFalsy();
  });

  it('returns false when the guess contains digits outside the base system', () => {
    const guess = '123A';
    const length = 4;
    const base = 10;

    expect(isValidGuess(guess, length, base)).toBeFalsy();
  });

  it('returns false when the guess contains duplicate digits', () => {
    const guess = '22';
    const length = 2;
    const base = 10;

    expect(isValidGuess(guess, length, base)).toBeFalsy();
  });

  it('returns true when the guess starts with zero', () => {
    const guess = '012';
    const length = 3;
    const base = 10;

    expect(isValidGuess(guess, length, base)).toBeTruthy();
  });

  it('returns true when the guess contains hexadecimal letters', () => {
    const guess = 'A12';
    const length = 3;
    const base = 16;

    expect(isValidGuess(guess, length, base)).toBeTruthy();
  });
});
