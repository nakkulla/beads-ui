import { afterEach, describe, expect, test } from 'vitest';
import { getConfig } from './config.js';

afterEach(() => {
  delete process.env.BDUI_FRONTEND_MODE;
});

describe('getConfig', () => {
  test('returns live frontend_mode when env is live', () => {
    process.env.BDUI_FRONTEND_MODE = 'live';

    const config = getConfig();

    expect(config.frontend_mode).toBe('live');
  });

  test('returns static frontend_mode when env is not live', () => {
    process.env.BDUI_FRONTEND_MODE = 'unexpected';

    const config = getConfig();

    expect(config.frontend_mode).toBe('static');
  });
});
