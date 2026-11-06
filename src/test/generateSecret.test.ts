import { describe, it, expect, vi } from 'vitest';
import { generateSecret } from '../game/generateSecret';

const systems = [
  { label: 'Binary', value: '2', digits: '0 1' },
  { label: 'Octal', value: '8', digits: '0 1 2 3 4 5 6 7' },
  { label: 'Decimal', value: '10', digits: '0 1 2 3 4 5 6 7 8 9' },
  { label: 'Hexadecimal', value: '16', digits: '0 1 2 3 4 5 6 7 8 9 A B C D E F' },
];

describe('generate', () => {
  it('generateSecret is function', () => {
    expect(typeof generateSecret === 'function').toBeTruthy();
  });

  it('secter number length equal parametr length ', () => {
    const length = 3;
    const base = 10;
    const mockFn = vi.fn().mockReturnValue(0.5);

    expect(generateSecret(length, base, mockFn).length === length).toBeTruthy();
  });

  it('secter number has unicale numbers', () => {
    const length = 2;
    const base = 8;
    const mockFn = vi.fn().mockReturnValue(0.5);

    const secterNumber = generateSecret(length, base, mockFn);

    expect(secterNumber.length === new Set(secterNumber).size).toBeTruthy();
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

    const digits = systems.find((system) => system.value === '16')?.digits.split(' ') ?? [];

    expect(secretNumber.every((digit) => digits.includes(digit))).toBe(true);
  });

  it('secter number can start zero', () => {
    const length = 3;
    const base = 10;
    const mockFn = vi.fn().mockReturnValueOnce(0).mockReturnValue(0.4);
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
