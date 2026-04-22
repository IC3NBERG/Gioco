import { describe, it, expect } from 'vitest';
import { updateRelation, clamp } from '../src/utils/gameLogic';

describe('updateRelation', () => {
  it('dovrebbe aumentare relazione con trade_pact', () => {
    const result = updateRelation(0, 'trade_pact', 'Diplomatic', 'seed123');
    expect(result).toBeGreaterThan(0);
  });

  it('dovrebbe diminuire relazione con sanctions', () => {
    const result = updateRelation(0, 'sanctions', 'Diplomatic', 'seed123');
    expect(result).toBeLessThan(0);
  });

  it('dovrebbe rispettare limiti -100/100', () => {
    const resultPositive = updateRelation(95, 'trade_pact', 'Diplomatic', 'seed123');
    expect(resultPositive).toBeLessThanOrEqual(100);

    const resultNegative = updateRelation(-95, 'sanctions', 'Aggressive', 'seed123');
    expect(resultNegative).toBeGreaterThanOrEqual(-100);
  });

  it('dovrebbe applicare modifier personalità aggressiva', () => {
    const resultDiplomatic = updateRelation(0, 'trade_pact', 'Diplomatic', 'seed123');
    const resultAggressive = updateRelation(0, 'trade_pact', 'Aggressive', 'seed123');
    expect(resultAggressive).toBeLessThan(resultDiplomatic);
  });

  it('dovrebbe applicare decay con azione none', () => {
    const result = updateRelation(10, 'none', 'Diplomatic', 'seed123');
    expect(result).toBeLessThan(10);
  });

  it('dovrebbe essere deterministico con seed identico', () => {
    const result1 = updateRelation(0, 'trade_pact', 'Diplomatic', 'seed123');
    const result2 = updateRelation(0, 'trade_pact', 'Diplomatic', 'seed123');
    expect(result1).toBe(result2);
  });
});

describe('clamp per relazioni', () => {
  it('dovrebbe mantenere relazioni nel range valido', () => {
    expect(clamp(0, -100, 100)).toBe(0);
    expect(clamp(-100, -100, 100)).toBe(-100);
    expect(clamp(100, -100, 100)).toBe(100);
  });

  it('dovrebbe limitare valori estremi', () => {
    expect(clamp(-150, -100, 100)).toBe(-100);
    expect(clamp(150, -100, 100)).toBe(100);
  });
});