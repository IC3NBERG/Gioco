import { beforeAll } from 'vitest';

beforeAll(() => {
  global.fetch = global.fetch || (async () => {
    throw new Error('fetch not implemented in test environment');
  });
});