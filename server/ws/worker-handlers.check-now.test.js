import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { __resetWorkerAttachmentsForTest } from '../worker/attach.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { setConnWorkspace } from './context.js';
import {
  __resetWorkerQueueForTest,
  handleWorkerExternalWait
} from './worker-handlers.js';

vi.mock('../registry-watcher.js', async (importOriginal) => ({
  ...(await importOriginal()),
  getAvailableWorkspaces: () => [{ path: WS }]
}));
const WS = '/tmp/external-wait-workspace';
/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-external-ops-'));
  vi.stubEnv('XDG_STATE_HOME', tmp_state);
  __resetWorkerQueueForTest();
});
afterEach(() => {
  __resetWorkerAttachmentsForTest();
  __resetWorkerQueueForTest();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * @param {import('../../app/protocol.js').MessageType} type
 * @param {Record<string, any>} [patch]
 */
async function request(type, patch = {}) {
  const socket = /** @type {any} */ ({ send: vi.fn() });
  setConnWorkspace(socket, { root_dir: WS, db_path: '' });
  await handleWorkerExternalWait(socket, {
    id: 'action-1',
    type,
    payload: { root_dir: WS, wait_id: 'w-0123456789ab', ...patch }
  });
  return JSON.parse(socket.send.mock.calls.at(-1)[0]);
}

describe('external wait operations', () => {
  test.each(
    /** @type {const} */ ([
      ['external_wait_check', 'check', undefined, '[지금 확인] 클릭'],
      ['external_wait_stop', 'stop', undefined, '[관찰 중단] 클릭'],
      ['external_wait_resume', 'resume', 'fork', '[이어하기] 클릭'],
      ['external_wait_resume', 'resume', 'fresh', '[새 세션으로] 클릭']
    ])
  )(
    'routes %s mode %s and records its consumer action',
    async (type, method, mode, summary) => {
      const runtime = getWorkerRuntime();
      vi.spyOn(runtime.externalWait, 'get').mockReturnValue(
        /** @type {any} */ ({ bead_id: 'A-1' })
      );
      const op = vi
        .spyOn(runtime.externalWait, method)
        .mockResolvedValue(/** @type {any} */ ({ ok: true }));
      const timeline = vi.spyOn(runtime.queueStore, 'recordTimelineEvent');

      const reply = await request(type, mode ? { mode } : {});

      expect(op).toHaveBeenCalledWith(
        WS,
        'w-0123456789ab',
        ...(mode ? [mode] : [])
      );
      expect(reply.ok).toBe(true);
      expect(reply.payload.queue.external_waits).toEqual([]);
      expect(timeline).toHaveBeenCalledWith(
        WS,
        expect.objectContaining({
          bead_id: 'A-1',
          kind: 'user_action',
          summary
        })
      );
    }
  );

  test('records a completing stop as the release click', async () => {
    const runtime = getWorkerRuntime();
    vi.spyOn(runtime.externalWait, 'get').mockReturnValue(
      /** @type {any} */ ({ bead_id: 'A-1', stage: 'completing' })
    );
    vi.spyOn(runtime.externalWait, 'stop').mockResolvedValue(
      /** @type {any} */ ({ ok: true })
    );
    const timeline = vi.spyOn(runtime.queueStore, 'recordTimelineEvent');

    await request('external_wait_stop');

    expect(timeline).toHaveBeenCalledWith(
      WS,
      expect.objectContaining({ summary: '[대기 해제] 클릭' })
    );
  });

  test('returns the service failure as a protocol error', async () => {
    vi.spyOn(getWorkerRuntime().externalWait, 'check').mockResolvedValue({
      ok: false,
      status: 409,
      error: 'invalid_stage'
    });

    const reply = await request('external_wait_check');

    expect(reply).toMatchObject({
      ok: false,
      error: { code: 'invalid_stage' }
    });
  });

  test.each([
    { root_dir: '' },
    { root_dir: '/unregistered' },
    { wait_id: '' },
    { wait_id: 'bad' }
  ])('rejects invalid coordinates %j', async (patch) => {
    const check = vi.spyOn(getWorkerRuntime().externalWait, 'check');

    const reply = await request('external_wait_check', patch);

    expect(reply).toMatchObject({ ok: false, error: { code: 'bad_request' } });
    expect(check).not.toHaveBeenCalled();
  });

  test('rejects an unsupported resume mode', async () => {
    const resume = vi.spyOn(getWorkerRuntime().externalWait, 'resume');

    const reply = await request('external_wait_resume', { mode: 'auto' });

    expect(reply.error.code).toBe('bad_request');
    expect(resume).not.toHaveBeenCalled();
  });
});
