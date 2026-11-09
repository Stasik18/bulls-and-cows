import { describe, it, expect, vi } from 'vitest';
import { generateSecret } from '../game/generateSecret';
import { SYSTEMS } from '../constants/systems';

describe('generate', () => {
  it('generateSecret is function', () => {
    expect(typeof generateSecret === 'function').toBeTruthy();
  });

  it('secret number length equal parametr length ', () => {
    const length = 3;
    const base = 10;
    const mockFn = vi.fn().mockReturnValue(0.5);

    expect(generateSecret(length, base, mockFn).length === length).toBeTruthy();
  });

  it('secret number has unicale numbers', () => {
    const length = 2;
    const base = 8;
    const mockFn = vi.fn().mockReturnValue(0.5);

    const secretNumber = generateSecret(length, base, mockFn);

    expect(secretNumber.length === new Set(secretNumber).size).toBeTruthy();
  });

  it('numbers in secret number belong to the base system', () => {
    const length = 4;
    const base = 16;

    const mockFn = vi
      .fn()
      .mockReturnValueOnce(0.05)
      .mockReturnValueOnce(0.18)
      .mockReturnValueOnce(0.37)
      .mockReturnValueOnce(0.68);

    const secretNumber = generateSecret(length, base, mockFn).split('');

    const digits = SYSTEMS.find((system) => system.value === 16)?.digits.split(' ') ?? [];

    expect(secretNumber.every((digit) => digits.includes(digit))).toBe(true);
  });

  it('secret number can start zero', () => {
    const length = 3;
    const base = 10;
    const mockFn = vi.fn().mockReturnValue(0.99);
    expect(generateSecret(length, base, mockFn)[0]).toBe('0');
  });

  it('generateSecret has a random parametr', () => {
    const length = 3;
    const base = 10;
    const mockFn = vi.fn().mockReturnValue(0.5);

    generateSecret(length, base, mockFn);
    expect(mockFn).toHaveBeenCalled();
  });
});
