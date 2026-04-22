import { describe, it, expect } from 'vitest';
import { calcMacro, clamp } from '../src/utils/gameLogic';

describe('calcMacro', () => {
  const baseEconomy = {
    gdp: 1000,
    growth: 2.5,
    inflation: 2.0,
    debt: 0,
    debt_gdp: 0,
    unemployment: 5.0,
    budget_balance: 0,
    reserves: 100,
    sectors: {
      agriculture: { level: 3, efficiency: 0.7, maintenance_cost: 5 },
      industry: { level: 3, efficiency: 0.6, maintenance_cost: 10 },
      services: { level: 4, efficiency: 0.8, maintenance_cost: 15 },
    },
  };

  it('dovrebbe calcolare PIL corretto con crescita positiva', () => {
    const result = calcMacro(baseEconomy, [], 'seed123');
    expect(result.gdp).toBeGreaterThan(1000);
  });

  it('dovrebbe ridurre la crescita con alto debito', () => {
    const highDebtEconomy = {
      ...baseEconomy,
      debt: 1600,
      debt_gdp: 1.6,
    };
    const result = calcMacro(highDebtEconomy, [], 'seed123');
    expect(result.growth).toBeLessThan(2.5);
  });

  it('dovrebbe aumentare inflation con spending eccessivo', () => {
    const result = calcMacro(baseEconomy, [
      { action_type: 'budget_increase' },
      { action_type: 'budget_increase' },
    ], 'seed123');
    expect(result.inflation).toBeGreaterThan(2.0);
  });

  it('dovrebbe rispettare i limiti di clamp per inflation', () => {
    const extremeEconomy = {
      ...baseEconomy,
      inflation: 11,
    };
    const result = calcMacro(extremeEconomy, [
      { action_type: 'budget_increase' },
      { action_type: 'budget_increase' },
      { action_type: 'budget_increase' },
      { action_type: 'budget_increase' },
    ], 'seed123');
    expect(result.inflation).toBeLessThanOrEqual(12);
    expect(result.inflation).toBeGreaterThanOrEqual(0.5);
  });

  it('dovrebbe essere deterministico con seed identico', () => {
    const result1 = calcMacro(baseEconomy, [], 'seed123');
    const result2 = calcMacro(baseEconomy, [], 'seed123');
    expect(result1.gdp).toBe(result2.gdp);
  });
});

describe('clamp', () => {
  it('dovrebbe mantenere i valori nel range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('dovrebbe limitare i valori fuori range', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});