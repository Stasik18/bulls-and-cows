const cache = new Map<string, number>();

function calculateRecursively(length: number, base: number): number {
  const key = `${length}:${base}`;

  const cachedResult = cache.get(key);

  if (cachedResult !== undefined) {
    return cachedResult;
  }

  if (length === 0) return 1;
  if (length > base) return 0;

  const result = base * calculateRecursively(length - 1, base - 1);

  cache.set(key, result);

  return result;
}

export function countPossibleSecrets(length: number, base: 2 | 8 | 10 | 16): number {
  return calculateRecursively(length, base);
}
