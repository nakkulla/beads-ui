import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MESSAGE_TYPES } from '../../app/protocol.js';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest
} from '../worker/attach.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { setConnWorkspace } from './context.js';
import {
  __refreshWorkerAccountCatalogForTest,
  __resetWorkerQueueForTest,
  __setWorkerAccountCatalogForTest,
  decorateQueue,
  handleSubscribeWorkerQueue,
  handleWorkerAttemptResume,
  handleWorkerProviderAutoSwitchToggle
} from './worker-handlers.js';

const WS = '/tmp/provider-outage-handler-workspace';

/** @type {string} */
let tmp_state;

/**
 * Build one WebSocket-shaped recorder.
 */
function fakeSocket() {
  return /** @type {any} */ ({ send: vi.fn() });
}

/**
 * Parse every envelope sent to a fake socket.
 *
 * @param {any} socket
 */
function sent(socket) {
  return socket.send.mock.calls.map((/** @type {any[]} */ call) =>
    JSON.parse(call[0])
  );
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-provider-ws-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
});

afterEach(() => {
  __resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('worker provider auto-switch handler', () => {
  test('declares the auto-switch message in the shared protocol', () => {
    expect(MESSAGE_TYPES).toContain('worker-provider-auto-switch-toggle');
  });

  test('toggles with CAS and fans a queue snapshot', () => {
    const subscriber = fakeSocket();
    const caller = fakeSocket();
    setConnWorkspace(subscriber, { root_dir: WS, db_path: '/tmp/db' });
    setConnWorkspace(caller, { root_dir: WS, db_path: '/tmp/db' });
    handleSubscribeWorkerQueue(
      subscriber,
      /** @type {any} */ ({
        id: 'subscribe-1',
        type: 'subscribe-worker-queue',
        payload: { id: 'client-1' }
      })
    );
    subscriber.send.mockClear();
    const revision = getWorkerRuntime().queueStore.snapshot(WS).revision;

    handleWorkerProviderAutoSwitchToggle(
      caller,
      /** @type {any} */ ({
        id: 'toggle-1',
        type: 'worker-provider-auto-switch-toggle',
        payload: { on: false, expected_revision: revision }
      })
    );

    expect(sent(caller)[0].payload).toMatchObject({
      applied: true,
      conflict: false,
      queue: { provider_auto_switch: false }
    });
    expect(sent(subscriber)).toContainEqual(
      expect.objectContaining({
        type: 'worker-queue-snapshot',
        payload: expect.objectContaining({
          queue: expect.objectContaining({ provider_auto_switch: false })
        })
      })
    );
  });
});

describe('worker provider queue projection', () => {
  test('refreshes Claude accounts after a queue subscription', async () => {
    const socket = fakeSocket();
    setConnWorkspace(socket, { root_dir: WS, db_path: '/tmp/db' });
    __setWorkerAccountCatalogForTest({
      listClaude: vi.fn(async () => ({
        ok: true,
        accounts: [
          {
            email: 'one@example.com',
            alias: '업무',
            status: 'ok',
            windows: [{ key: '5h', pct: 20, resetsAt: null }]
          }
        ]
      }))
    });

    handleSubscribeWorkerQueue(
      socket,
      /** @type {any} */ ({
        id: 'subscribe-accounts',
        type: 'subscribe-worker-queue',
        payload: { id: 'client-accounts' }
      })
    );
    await vi.waitFor(() => {
      expect(
        sent(socket).some(
          (/** @type {any} */ message) =>
            message.type === 'worker-queue-snapshot' &&
            message.payload?.queue?.account_catalog?.claude?.[0]?.email ===
              'one@example.com'
        )
      ).toBe(true);
    });
  });

  test('adds the first outage probe time without changing durable state', () => {
    const since = Date.now();
    const raw = {
      ...getWorkerRuntime().queueStore.snapshot(WS),
      provider_hold: {
        claude: {
          since,
          generation: 1,
          targets: [
            {
              kind: 'outage',
              model: 'opus',
              account: null,
              detail: 'overloaded_529',
              last_error: 'API Error: 529',
              resets_at: null,
              rearm_count: 0,
              attempt_ids: ['attempt-1']
            }
          ]
        }
      }
    };

    const projected = decorateQueue(WS, raw);

    expect(
      /** @type {any} */ (projected).provider_hold.claude.targets[0]
        .next_probe_at
    ).toBe(since + 60_000);
    expect(raw.provider_hold.claude.targets[0]).not.toHaveProperty(
      'next_probe_at'
    );
  });

  test('omits an expired first-probe estimate', () => {
    const raw = {
      ...getWorkerRuntime().queueStore.snapshot(WS),
      provider_hold: {
        claude: {
          since: Date.now() - 120_000,
          generation: 1,
          targets: [
            {
              kind: 'outage',
              model: 'opus',
              account: null,
              detail: 'overloaded_529',
              last_error: 'API Error: 529',
              resets_at: null,
              rearm_count: 0,
              attempt_ids: ['attempt-1']
            }
          ]
        }
      }
    };

    const projected = decorateQueue(WS, raw);

    expect(
      /** @type {any} */ (projected).provider_hold.claude.targets[0]
    ).not.toHaveProperty('next_probe_at');
  });

  test('adds the reset grace to a future usage-limit probe', () => {
    const resets_at = Date.now() + 120_000;
    const raw = {
      ...getWorkerRuntime().queueStore.snapshot(WS),
      provider_hold: {
        claude: {
          since: Date.now(),
          generation: 1,
          targets: [
            {
              kind: 'usage_limit',
              model: 'opus',
              account: 'one@example.com',
              detail: 'usage_limit',
              last_error: 'usage limit',
              resets_at,
              rearm_count: 0,
              attempt_ids: ['attempt-1']
            }
          ]
        }
      }
    };

    const projected = decorateQueue(WS, raw);

    expect(
      /** @type {any} */ (projected).provider_hold.claude.targets[0]
        .next_probe_at
    ).toBe(resets_at + 60_000);
  });

  test('projects normalized Claude account rows from the account catalog', async () => {
    __setWorkerAccountCatalogForTest({
      listClaude: vi.fn(async () => ({
        ok: true,
        accounts: [
          {
            email: 'one@example.com',
            alias: '업무',
            status: 'ok',
            windows: [{ key: '5h', pct: 20, resetsAt: null }],
            ignored: 'private'
          }
        ]
      }))
    });

    await __refreshWorkerAccountCatalogForTest();
    const projected = decorateQueue(
      WS,
      getWorkerRuntime().queueStore.snapshot(WS)
    );

    expect(/** @type {any} */ (projected).account_catalog).toEqual({
      claude: [
        {
          email: 'one@example.com',
          alias: '업무',
          status: 'ok',
          windows: [{ key: '5h', pct: 20, resetsAt: null }]
        }
      ]
    });
  });

  test('omits the account catalog when its source fails', async () => {
    __setWorkerAccountCatalogForTest({
      listClaude: vi.fn(async () => ({ ok: false, reason: 'unavailable' }))
    });

    await __refreshWorkerAccountCatalogForTest();
    const projected = decorateQueue(
      WS,
      getWorkerRuntime().queueStore.snapshot(WS)
    );

    expect(projected).not.toHaveProperty('account_catalog');
  });
});

describe('worker attempt resume override handler', () => {
  test('rejects a malformed override without calling the scheduler', async () => {
    const socket = fakeSocket();
    const resume = vi.fn();
    setConnWorkspace(socket, { root_dir: WS, db_path: '/tmp/db' });
    __registerWorkerAttachmentForTest(
      WS,
      /** @type {any} */ ({ scheduler: { resume } })
    );
    const revision = getWorkerRuntime().queueStore.snapshot(WS).revision;

    await handleWorkerAttemptResume(
      socket,
      /** @type {any} */ ({
        id: 'resume-invalid',
        type: 'worker-attempt-resume',
        payload: {
          attempt_id: 'attempt-1',
          expected_revision: revision,
          exec_override: { runner: 'claude', extra: 'partial' }
        }
      })
    );

    expect(sent(socket)[0].payload).toMatchObject({
      resumed: false,
      reason: 'exec_override_invalid'
    });
    expect(resume).not.toHaveBeenCalled();
  });

  test('passes a normalized override and returns transcript fallback', async () => {
    const socket = fakeSocket();
    const resume = vi.fn(async () => ({
      ok: true,
      attempt_id: 'attempt-2',
      fallback: 'transcript_missing'
    }));
    setConnWorkspace(socket, { root_dir: WS, db_path: '/tmp/db' });
    __registerWorkerAttachmentForTest(
      WS,
      /** @type {any} */ ({ scheduler: { resume } })
    );
    const revision = getWorkerRuntime().queueStore.snapshot(WS).revision;

    await handleWorkerAttemptResume(
      socket,
      /** @type {any} */ ({
        id: 'resume-valid',
        type: 'worker-attempt-resume',
        payload: {
          attempt_id: 'attempt-1',
          expected_revision: revision,
          exec_override: {
            runner: ' claude ',
            model: ' opus-4.8 ',
            effort: ' xhigh ',
            claude_account: ' next@example.com '
          }
        }
      })
    );

    expect(resume).toHaveBeenCalledWith(WS, 'attempt-1', {
      continuation: undefined,
      decision_token: undefined,
      instructions: undefined,
      exec_override: {
        runner: 'claude',
        model: 'opus-4.8',
        effort: 'xhigh',
        claude_account: 'next@example.com'
      }
    });
    expect(sent(socket)[0].payload).toMatchObject({
      resumed: true,
      new_attempt_id: 'attempt-2',
      fallback: 'transcript_missing'
    });
  });
});
