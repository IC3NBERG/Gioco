import { describe, it, expect } from 'vitest';
import { seededRandom, calculateSeed } from '../src/utils/gameLogic';

describe('seededRandom', () => {
  it('dovrebbe restituire valori nel range specificato', () => {
    const result = seededRandom('test_seed', 0, 100);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(100);
  });

  it('dovrebbe essere deterministico con seed identico', () => {
    const result1 = seededRandom('identical_seed', 0, 100);
    const result2 = seededRandom('identical_seed', 0, 100);
    expect(result1).toBe(result2);
  });

  it('dovrebbe produrre valori diversi con seed diversi', () => {
    const result1 = seededRandom('seed_1', 0, 100);
    const result2 = seededRandom('seed_2', 0, 100);
    expect(result1).not.toBe(result2);
  });

  it('dovrebbe coprire l\'intero range nel tempo', () => {
    const results = new Set<number>();
    for (let i = 0; i < 100; i++) {
      results.add(Math.floor(seededRandom(`seed_${i}`, 0, 10)));
    }
    expect(results.size).toBeGreaterThan(1);
  });

  it('dovrebbe supportare range negativi', () => {
    const result = seededRandom('test_seed', -50, 50);
    expect(result).toBeGreaterThanOrEqual(-50);
    expect(result).toBeLessThan(50);
  });
});

describe('calculateSeed', () => {
  it('dovrebbe generare seed deterministico', () => {
    const seed1 = calculateSeed('italia', 1, 'v1');
    const seed2 = calculateSeed('italia', 1, 'v1');
    expect(seed1).toBe(seed2);
  });

  it('dovrebbe generare seed diversi per turni diversi', () => {
    const seed1 = calculateSeed('italia', 1, 'v1');
    const seed2 = calculateSeed('italia', 2, 'v1');
    expect(seed1).not.toBe(seed2);
  });

  it('dovrebbe generare seed diversi per nazioni diverse', () => {
    const seed1 = calculateSeed('italia', 1, 'v1');
    const seed2 = calculateSeed('francia', 1, 'v1');
    expect(seed1).not.toBe(seed2);
  });

  it('dovrebbe generare seed della stessa lunghezza', () => {
    const seed1 = calculateSeed('italia', 1, 'v1');
    const seed2 = calculateSeed('francia', 2, 'v1');
    expect(seed1.length).toBe(seed2.length);
  });
});

describe('determinismo completo', () => {
  it('dovrebbe mantenere lo stesso stato con input identici', () => {
    const actions = [
      { action_type: 'trade_pact' },
      { action_type: 'budget_increase' },
    ];

    const seed = calculateSeed('italia', 1, 'v1');

    const results1 = [];
    const results2 = [];

    for (let i = 0; i < 5; i++) {
      results1.push(seededRandom(`${seed}_${i}`, 0, 100));
    }

    for (let i = 0; i < 5; i++) {
      results2.push(seededRandom(`${seed}_${i}`, 0, 100));
    }

    expect(results1).toEqual(results2);
  });
});