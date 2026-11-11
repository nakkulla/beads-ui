import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createAutoPoolStore } from '../auto-pool-store.js';
import { loadExecutionDefaults } from '../worker/execution-defaults.js';
import {
  __resetAutoPoolForTest,
  detachAutoPool,
  handleAutoPoolSet,
  handleSubscribeAutoPool,
  handleUnsubscribeAutoPool,
  notifyAutoPoolCatalogChanged
} from './auto-pool-handlers.js';
import { handleMessage } from './connection.js';

// The workspace effect gate has its own tests; these state an open gate rather
// than probing the live bd binary.
vi.mock('../bd-effect-gate.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    requireBdJsonCapabilityForWorkspace: async () => ({ ok: true })
  };
});

vi.mock('../bd.js', () => ({ runBd: vi.fn(), runBdJson: vi.fn() }));

/** The pinned projection's `implementation` block — no `auto_pool_defaults`. */
const IMPLEMENTATION = loadExecutionDefaults().session?.implementation ?? null;

/** A Codex catalog with two aliases and two pinned names. */
const CATALOG = /** @type {any} */ ({
  runners: {
    claude: { models: { opus: { id: 'opus' } } },
    codex: {
      models: {
        sol: { id: 'gpt-6.1-sol' },
        luna: { id: 'gpt-6-luna' },
        'sol-6.1': { id: 'gpt-6.1-sol' },
        'terra-6.1': { id: 'gpt-6.1-terra' }
      }
    }
  },
  model_index: {}
});

/** @type {string} */
let tmp_dir;

/**
 * @returns {{ sent: string[], readyState: number, OPEN: number, send(msg: string): void }}
 */
function fakeSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      this.sent.push(String(msg));
    }
  };
}

/**
 * @param {string} id
 * @param {string} type
 * @param {Record<string, unknown>} [payload]
 * @returns {any}
 */
function request(id, type, payload) {
  return { id, type, payload };
}

/**
 * @param {{ sent: string[] }} sock
 * @returns {any[]}
 */
function snapshots(sock) {
  return sock.sent
    .map((m) => JSON.parse(m))
    .filter((m) => m.type === 'auto-pool-snapshot')
    .map((m) => m.payload);
}

/**
 * @param {{ sent: string[] }} sock
 * @param {string} id
 * @returns {any}
 */
function replyTo(sock, id) {
  return sock.sent.map((m) => JSON.parse(m)).find((m) => m.id === id);
}

/**
 * @param {Record<string, any>|null} implementation
 */
function resetWith(implementation) {
  __resetAutoPoolForTest({
    store: (() => {
      const store = createAutoPoolStore({
        filePath: () => path.join(tmp_dir, 'auto-pool.json'),
        warn: () => {},
        implementation: () => implementation
      });
      return () => store;
    })(),
    implementation: () => implementation,
    catalog: () => CATALOG
  });
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-auto-pool-ws-'));
  resetWith(IMPLEMENTATION);
});

afterEach(() => {
  __resetAutoPoolForTest();
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('auto pool channel', () => {
  test('emits the stored document and choices on subscribe', () => {
    const sock = fakeSocket();

    handleSubscribeAutoPool(
      /** @type {any} */ (sock),
      request('s1', 'subscribe-auto-pool', { id: 'ap' })
    );

    const [snapshot] = snapshots(sock);
    expect(snapshot).toMatchObject({ id: 'ap', revision: 0, runtimes: {} });
    expect(snapshot.choices.claude).toEqual({
      models: ['opus', 'sonnet', 'haiku'],
      efforts: ['low', 'medium', 'high', 'xhigh'],
      defaults: null,
      catalog_models: null
    });
  });

  test('offers the Codex families and the catalog pinned names up to xhigh', () => {
    const sock = fakeSocket();

    handleSubscribeAutoPool(
      /** @type {any} */ (sock),
      request('s1', 'subscribe-auto-pool')
    );

    const [snapshot] = snapshots(sock);
    expect(snapshot.choices.codex).toEqual({
      models: ['astra', 'sol', 'terra', 'luna', 'sol-6.1', 'terra-6.1'],
      efforts: ['low', 'medium', 'high', 'xhigh'],
      defaults: null,
      catalog_models: ['sol', 'luna', 'sol-6.1', 'terra-6.1']
    });
  });

  test('carries the projection defaults when the pin has them', () => {
    resetWith({
      ...IMPLEMENTATION,
      auto_pool_defaults: {
        codex: { models: ['sol'], effort: { min: 'high', max: 'xhigh' } }
      }
    });
    const sock = fakeSocket();

    handleSubscribeAutoPool(
      /** @type {any} */ (sock),
      request('s1', 'subscribe-auto-pool')
    );

    const [snapshot] = snapshots(sock);
    expect(snapshot.choices.codex.defaults).toEqual({
      models: ['sol'],
      effort: { min: 'high', max: 'xhigh' }
    });
    expect(snapshot.choices.claude.defaults).toBeNull();
  });

  test('pushes the new snapshot to every subscriber after a set', () => {
    const editor = fakeSocket();
    const watcher = fakeSocket();
    handleSubscribeAutoPool(
      /** @type {any} */ (editor),
      request('s1', 'subscribe-auto-pool')
    );
    handleSubscribeAutoPool(
      /** @type {any} */ (watcher),
      request('s2', 'subscribe-auto-pool')
    );

    handleAutoPoolSet(
      /** @type {any} */ (editor),
      request('w1', 'auto-pool-set', {
        expected_revision: 0,
        runtimes: {
          codex: {
            models: ['terra-6.1', 'sol-6.1'],
            effort: { min: 'high', max: 'xhigh' }
          }
        }
      })
    );

    const expected = {
      revision: 1,
      runtimes: {
        codex: {
          models: ['terra-6.1', 'sol-6.1'],
          effort: { min: 'high', max: 'xhigh' }
        }
      }
    };
    expect(replyTo(editor, 'w1')).toMatchObject({ ok: true });
    expect(snapshots(editor).at(-1)).toMatchObject(expected);
    expect(snapshots(watcher).at(-1)).toMatchObject(expected);
  });

  test('answers a rejection with its code, runtime, and the current snapshot', () => {
    const sock = fakeSocket();

    handleAutoPoolSet(
      /** @type {any} */ (sock),
      request('w1', 'auto-pool-set', {
        expected_revision: 0,
        runtimes: {
          claude: { models: ['fable'], effort: { min: 'low', max: 'high' } }
        }
      })
    );

    const reply = replyTo(sock, 'w1');
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('unknown_model');
    expect(reply.error.details.runtime).toBe('claude');
    expect(reply.error.details.snapshot).toMatchObject({
      revision: 0,
      runtimes: {}
    });
  });

  test('pushes nothing to subscribers after a rejection', () => {
    const watcher = fakeSocket();
    handleSubscribeAutoPool(
      /** @type {any} */ (watcher),
      request('s1', 'subscribe-auto-pool')
    );

    handleAutoPoolSet(
      /** @type {any} */ (fakeSocket()),
      request('w1', 'auto-pool-set', { expected_revision: 5, runtimes: {} })
    );

    expect(snapshots(watcher)).toHaveLength(1);
  });

  test('stops pushing to an unsubscribed connection', () => {
    const watcher = fakeSocket();
    handleSubscribeAutoPool(
      /** @type {any} */ (watcher),
      request('s1', 'subscribe-auto-pool')
    );
    handleUnsubscribeAutoPool(
      /** @type {any} */ (watcher),
      request('u1', 'unsubscribe-auto-pool')
    );

    notifyAutoPoolCatalogChanged();

    expect(snapshots(watcher)).toHaveLength(1);
    expect(replyTo(watcher, 'u1').payload).toEqual({
      id: 'auto-pool',
      unsubscribed: true
    });
  });

  test('pushes a fresh snapshot when the Codex catalog changes', () => {
    const watcher = fakeSocket();
    handleSubscribeAutoPool(
      /** @type {any} */ (watcher),
      request('s1', 'subscribe-auto-pool')
    );

    notifyAutoPoolCatalogChanged();

    expect(snapshots(watcher)).toHaveLength(2);
  });

  test('drops a closed connection from the subscribers', () => {
    const watcher = fakeSocket();
    handleSubscribeAutoPool(
      /** @type {any} */ (watcher),
      request('s1', 'subscribe-auto-pool')
    );
    detachAutoPool(/** @type {any} */ (watcher));

    notifyAutoPoolCatalogChanged();

    expect(snapshots(watcher)).toHaveLength(1);
  });

  test('routes the subscribe message through the connection switch', async () => {
    const sock = fakeSocket();

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({ id: 's1', type: 'subscribe-auto-pool', payload: {} })
      )
    );

    expect(snapshots(sock)).toHaveLength(1);
  });
});
