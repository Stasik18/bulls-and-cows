import { describe, it, expect } from 'vitest';
import { countPossibleSecrets } from '../game/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it('counts possible decimal secrets', () => {
    const length = 3;
    const base = 10;

    expect(countPossibleSecrets(length, base)).toBe(720);
  });

  it('counts possible binary secrets, including those starting with zero', () => {
    const length = 2;
    const base = 2;

    expect(countPossibleSecrets(length, base)).toBe(2);
  });

  it('counts possible octal secrets', () => {
    const length = 3;
    const base = 8;

    expect(countPossibleSecrets(length, base)).toBe(336);
  });

  it('counts possible hexadecimal secrets', () => {
    const length = 4;
    const base = 16;

    expect(countPossibleSecrets(length, base)).toBe(43680);
  });
});
