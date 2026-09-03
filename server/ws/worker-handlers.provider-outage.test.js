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
  __resetWorkerQueueForTest,
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
