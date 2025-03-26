interface SuhuCounterStore {
  counter: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementByAmount: (amount: number) => void;
  decrementByAmount: (amount: number) => void;
}

export type { SuhuCounterStore };
