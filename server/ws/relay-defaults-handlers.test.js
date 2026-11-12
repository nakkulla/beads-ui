import { beforeEach, describe, expect, test, vi } from 'vitest';
import { relayDefaults } from '../relay-defaults.js';
import { handleMessage } from './connection.js';

vi.mock('../relay-defaults.js', () => ({ relayDefaults: vi.fn() }));
vi.mock('../worker/runner/index.js', async (importOriginal) => ({
  ...(await importOriginal()),
  runtimeCatalog: () => ({
    runners: { codex: { models: { sol: { id: 'gpt-6.1-sol' } } } }
  })
}));

beforeEach(() => {
  vi.mocked(relayDefaults).mockReset();
});

describe('relay defaults WebSocket dispatch', () => {
  test.each(['relay-defaults-get', 'relay-defaults-set'])(
    'routes %s independently of workspace settings',
    async (type) => {
      const send = vi.fn();
      const payload = {
        expected_revision: 3,
        values: { 'codex.speed': 'fast' }
      };
      vi.mocked(relayDefaults).mockResolvedValue({
        ok: true,
        snapshot: { revision: 4 }
      });

      await handleMessage(
        /** @type {any} */ ({ send }),
        Buffer.from(JSON.stringify({ id: 'relay', type, payload }))
      );

      expect(relayDefaults).toHaveBeenCalledExactlyOnceWith(
        type === 'relay-defaults-get' ? null : payload
      );
      expect(JSON.parse(send.mock.calls[0][0])).toMatchObject({
        id: 'relay',
        ok: true,
        type,
        payload: {
          ok: true,
          snapshot: { revision: 4 },
          codex_models: { sol: { id: 'gpt-6.1-sol' } }
        }
      });
    }
  );

  test.each(['conflict', 'invalid_value', 'hub_unavailable'])(
    'returns %s on the request envelope',
    async (code) => {
      const send = vi.fn();
      vi.mocked(relayDefaults).mockResolvedValue({
        ok: false,
        code,
        message: 'refused'
      });

      await handleMessage(
        /** @type {any} */ ({ send }),
        Buffer.from(
          JSON.stringify({
            id: 'relay',
            type: 'relay-defaults-set',
            payload: {}
          })
        )
      );

      expect(JSON.parse(send.mock.calls[0][0]).payload).toMatchObject({
        ok: false,
        code,
        message: 'refused'
      });
    }
  );
});
