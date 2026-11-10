import type { Base } from '../storage/gameState';

export const SYSTEMS: { label: string; value: Base; digits: string }[] = [
  { label: 'Binary', value: 2, digits: '0 1' },
  { label: 'Octal', value: 8, digits: '0 1 2 3 4 5 6 7' },
  { label: 'Decimal', value: 10, digits: '0 1 2 3 4 5 6 7 8 9' },
  { label: 'Hexadecimal', value: 16, digits: '0 1 2 3 4 5 6 7 8 9 A B C D E F' },
];
