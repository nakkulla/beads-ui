import { afterEach, describe, expect, test, vi } from 'vitest';
import { projectedResponse } from './__fixtures__/bd-json/projected.js';
import { runBd, runBdJsonProjected } from './bd.js';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest
} from './worker/attach.js';
import { __resetWorkerRuntimeForTest } from './worker/runtime.js';
import { handleMessage } from './ws.js';
import { setConnWorkspace } from './ws/context.js';

// The workspace effect gate has its own tests; these state an open gate rather
// than probing the live bd binary.
vi.mock('./bd-effect-gate.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    requireBdJsonCapabilityForWorkspace: async () => ({ ok: true })
  };
});

vi.mock('./bd.js', () => ({
  runBd: vi.fn(),
  runBdJsonProjected: vi.fn()
}));

function makeStubSocket() {
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

afterEach(() => {
  __resetWorkerAttachmentsForTest();
  __resetWorkerRuntimeForTest();
  vi.mocked(runBd).mockReset();
  vi.mocked(runBdJsonProjected).mockReset();
});

/**
 * @param {ReturnType<typeof makeStubSocket>} ws
 * @param {ReturnType<typeof vi.fn>} tick
 */
function registerSerialWorkspace(ws, tick) {
  setConnWorkspace(/** @type {any} */ (ws), {
    root_dir: '/ws-labels',
    db_path: '/ws-labels/.beads/beads.db'
  });
  __registerWorkerAttachmentForTest(
    '/ws-labels',
    /** @type {any} */ ({ scheduler: { tick } })
  );
}

describe('ws labels handlers', () => {
  test('label-add validates payload', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({
          id: 'x',
          type: /** @type {any} */ ('label-add'),
          payload: {}
        })
      )
    );
    const obj = JSON.parse(ws.sent[0]);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('bad_request');
  });

  test('label-add runs bd and replies with show', async () => {
    const rb = /** @type {import('vitest').Mock} */ (runBd);
    const rj = /** @type {import('vitest').Mock} */ (runBdJsonProjected);
    rb.mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' });
    rj.mockResolvedValueOnce(
      projectedResponse(null, {
        code: 0,
        stdoutJson: { id: 'UI-1', labels: ['frontend'] }
      })
    );

    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({
          id: 'a',
          type: /** @type {any} */ ('label-add'),
          payload: { id: 'UI-1', label: 'frontend' }
        })
      )
    );

    const call = rb.mock.calls[0][0];
    expect(call.slice(0, 3)).toEqual(['label', 'add', 'UI-1']);
    const obj = JSON.parse(ws.sent[ws.sent.length - 1]);
    expect(obj.ok).toBe(true);
    expect(obj.payload && obj.payload.id).toBe('UI-1');
  });

  test('label-remove runs bd and replies with show', async () => {
    const rb = /** @type {import('vitest').Mock} */ (runBd);
    const rj = /** @type {import('vitest').Mock} */ (runBdJsonProjected);
    rb.mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' });
    rj.mockResolvedValueOnce(
      projectedResponse(null, {
        code: 0,
        stdoutJson: { id: 'UI-1', labels: [] }
      })
    );

    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({
          id: 'b',
          type: /** @type {any} */ ('label-remove'),
          payload: { id: 'UI-1', label: 'frontend' }
        })
      )
    );

    const call = rb.mock.calls[rb.mock.calls.length - 1][0];
    expect(call.slice(0, 3)).toEqual(['label', 'remove', 'UI-1']);
    const obj = JSON.parse(ws.sent[ws.sent.length - 1]);
    expect(obj.ok).toBe(true);
    expect(obj.payload && obj.payload.id).toBe('UI-1');
  });

  test('worker-serial label mutations no longer tick the scheduler (UI-04vo)', async () => {
    const rb = /** @type {import('vitest').Mock} */ (runBd);
    const rj = /** @type {import('vitest').Mock} */ (runBdJsonProjected);
    const tick = vi.fn(async () => {});
    const ws = makeStubSocket();
    registerSerialWorkspace(ws, tick);
    rb.mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' });
    rj.mockResolvedValueOnce(
      projectedResponse(null, {
        code: 0,
        stdoutJson: { id: 'UI-1', title: '직렬', labels: ['worker-serial'] }
      })
    );

    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({
          id: 'serial-add',
          type: /** @type {any} */ ('label-add'),
          payload: { id: 'UI-1', label: ' worker-serial ' }
        })
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(tick).not.toHaveBeenCalled();
  });
});
