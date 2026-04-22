import { describe, it, expect } from 'vitest';
import { clamp, seededRandom, calculateSeed } from '../utils/gameLogic';

describe('gameLogic', () => {
  describe('clamp', () => {
    it('should clamp value to min', () => {
      expect(clamp(-10, 0, 100)).toBe(0);
    });

    it('should clamp value to max', () => {
      expect(clamp(150, 0, 100)).toBe(100);
    });

    it('should keep value in range', () => {
      expect(clamp(50, 0, 100)).toBe(50);
    });
  });

  describe('calculateSeed', () => {
    it('should generate consistent seeds', () => {
      const seed1 = calculateSeed('italia', 1, 'v1');
      const seed2 = calculateSeed('italia', 1, 'v1');
      expect(seed1).toBe(seed2);
    });

    it('should generate different seeds for different turns', () => {
      const seed1 = calculateSeed('italia', 1, 'v1');
      const seed2 = calculateSeed('italia', 2, 'v1');
      expect(seed1).not.toBe(seed2);
    });

    it('should generate different seeds for different nations', () => {
      const seed1 = calculateSeed('italia', 1, 'v1');
      const seed2 = calculateSeed('francia', 1, 'v1');
      expect(seed1).not.toBe(seed2);
    });
  });

  describe('seededRandom', () => {
    it('should return value in range', () => {
      const seed = calculateSeed('test', 1, 'v1');
      const result = seededRandom(seed, 0, 100);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    it('should be deterministic', () => {
      const seed = calculateSeed('test', 1, 'v1');
      const results = Array.from({ length: 10 }, () => seededRandom(seed, 0, 100));
      const first = results[0];
      results.forEach(r => expect(r).toBe(first));
    });
  });
});

describe('calcMacro', () => {
  it('should handle empty actions', () => {
    const { calcMacro } = require('../utils/gameLogic');
    const prevEconomy = {
      gdp: 1000,
      growth: 2.5,
      inflation: 2.0,
      debt: 0,
      reserves: 100,
    };
    const result = calcMacro(prevEconomy, [], 'seed');
    
    expect(result.gdp).toBeGreaterThan(900);
    expect(result.growth).toBeDefined();
    expect(result.inflation).toBeDefined();
  });
});

describe('updateConsensus', () => {
  it('should handle empty actions', () => {
    const { updateConsensus } = require('../utils/gameLogic');
    const prevConsensus = {
      general: 50,
      economic: 50,
      security: 50,
      freedom: 50,
    };
    const result = updateConsensus(prevConsensus, [], 'seed');
    
    expect(result.general).toBeGreaterThanOrEqual(0);
    expect(result.general).toBeLessThanOrEqual(100);
    expect(result.economic).toBeGreaterThanOrEqual(0);
    expect(result.economic).toBeLessThanOrEqual(100);
  });
});
}