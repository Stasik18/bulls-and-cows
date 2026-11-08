export type Base = 2 | 8 | 10 | 16;

export interface GuessHistoryEntry {
  guess: string;
  bulls: number;
  cows: number;
}

export interface GameState {
  secret: string | null;
  length: number;
  base: Base;
  history: GuessHistoryEntry[];
  startTime: number | null;
  finishTime: number | null;
  status: 'idle' | 'playing' | 'won';
  modalStatus: 'open' | 'close';
}

let gameState: GameState = {
  secret: null,
  length: 2,
  base: 2,
  history: [],
  startTime: null,
  finishTime: null,
  status: 'idle',
  modalStatus: 'close',
};

const listeners = new Set<() => void>();

export function getGameState(): GameState {
  return gameState;
}

export function setGameState(updates: Partial<GameState>): void {
  gameState = {
    ...gameState,
    ...updates,
  };

  listeners.forEach((listener) => listener());
}

export function subscribeGameState(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}
