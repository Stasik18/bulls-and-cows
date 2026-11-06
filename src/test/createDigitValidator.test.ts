import { describe, it, expect } from 'vitest';
import { createDigitValidator } from '../game/createDigitValidator';

describe('createDigitValidator', () => {
  it('returns a predicate function', () => {
    const base = 10;
    const predicate = createDigitValidator(base);
    expect(typeof predicate === 'function').toBeTruthy();
  });

  it('accepts valid binary digits', () => {
    const base = 2;
    const char = '1';
    const predicate = createDigitValidator(base);

    expect(predicate(char)).toBeTruthy();
  });

  it('rejects invalid binary digits', () => {
    const base = 2;
    const char = '2';

    const predicate = createDigitValidator(base);

    expect(predicate(char)).toBeFalsy();
  });

  it('accepts valid octal digits', () => {
    const base = 8;
    const char = '7';

    const predicate = createDigitValidator(base);

    expect(predicate(char)).toBeTruthy();
  });

  it('rejects invalid octal digits', () => {
    const base = 8;
    const char = '8';

    const predicate = createDigitValidator(base);

    expect(predicate(char)).toBeFalsy();
  });

  it('accepts valid decimal digits', () => {
    const base = 10;
    const char = '9';

    const predicate = createDigitValidator(base);

    expect(predicate(char)).toBeTruthy();
  });

  it('rejects invalid decimal digits', () => {
    const base = 10;
    const char = 'A';

    const predicate = createDigitValidator(base);

    expect(predicate(char)).toBeFalsy();
  });

  it('accepts valid hexadecimal digits', () => {
    const base = 16;
    const char = 'A';

    const predicate = createDigitValidator(base);

    expect(predicate(char)).toBeTruthy();
  });

  it('rejects invalid hexadecimal digits', () => {
    const base = 16;
    const char = 'G';

    const predicate = createDigitValidator(base);

    expect(predicate(char)).toBeFalsy();
  });

  it('accepts lowercase hexadecimal letters', () => {
    const base = 16;
    const char = 'f';

    const predicate = createDigitValidator(base);

    expect(predicate(char)).toBeTruthy();
  });
});
