import { beforeEach, describe, expect, test, vi } from 'vitest';
import { projectedResponse } from '../__fixtures__/bd-json/projected.js';

// Capture the argv passed to the bd runner.
const runBdInWorkspace = vi.fn();
const runBdJsonProjectedInWorkspace = vi.fn();

vi.mock('./context.js', () => ({
  runBdInWorkspace: (/** @type {any} */ ws, /** @type {any} */ args) =>
    runBdInWorkspace(ws, args),
  runBdJsonProjectedInWorkspace: (
    /** @type {any} */ ws,
    /** @type {any} */ command_family,
    /** @type {any} */ args,
    /** @type {any} */ options
  ) => runBdJsonProjectedInWorkspace(ws, command_family, args, options),
  getGitUserNameInWorkspace: () => Promise.resolve(''),
  log: () => {}
}));

vi.mock('./refresh.js', () => ({
  triggerMutationRefreshOnce: () => {}
}));

const { handleUpdateWorkflowMeta } = await import('./mutation-handlers.js');

/**
 * @returns {{ ws: any, sent: any[] }}
 */
function fakeWs() {
  /** @type {any[]} */
  const sent = [];
  return {
    ws: {
      send: (/** @type {string} */ s) => sent.push(JSON.parse(s))
    },
    sent
  };
}

describe('handleUpdateWorkflowMeta (worker-autorun-policy §6, 수용 기준 7)', () => {
  beforeEach(() => {
    runBdInWorkspace.mockReset();
    runBdJsonProjectedInWorkspace.mockReset();
    runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });
    runBdJsonProjectedInWorkspace.mockResolvedValue(
      projectedResponse(null, {
        code: 0,
        stdoutJson: { id: 'UI-1', metadata: { route: 'full_plan' } }
      })
    );
  });

  test('sets an enum value via --set-metadata and replies with the bd show readback', async () => {
    const { ws, sent } = fakeWs();
    await handleUpdateWorkflowMeta(ws, {
      id: 'r1',
      type: 'update-workflow-meta',
      payload: { id: 'UI-1', key: 'route', value: 'full_plan' }
    });
    expect(runBdInWorkspace).toHaveBeenCalledWith(expect.anything(), [
      'update',
      'UI-1',
      '--set-metadata',
      'route=full_plan'
    ]);
    expect(runBdJsonProjectedInWorkspace).toHaveBeenCalledWith(
      expect.anything(),
      'show',
      ['show', 'UI-1', '--json'],
      expect.objectContaining({ expected_id: 'UI-1' })
    );
    expect(sent[0].ok).toBe(true);
    expect(sent[0].payload).toEqual({
      id: 'UI-1',
      metadata: { route: 'full_plan' }
    });
  });

  test('an empty value unsets the key (--unset-metadata)', async () => {
    const { ws } = fakeWs();
    await handleUpdateWorkflowMeta(ws, {
      id: 'r1',
      type: 'update-workflow-meta',
      payload: { id: 'UI-1', key: 'route', value: '' }
    });
    expect(runBdInWorkspace).toHaveBeenCalledWith(expect.anything(), [
      'update',
      'UI-1',
      '--unset-metadata',
      'route'
    ]);
  });

  test('accepts quick_fix as a route value', async () => {
    const { ws, sent } = fakeWs();

    await handleUpdateWorkflowMeta(ws, {
      id: 'r1',
      type: 'update-workflow-meta',
      payload: { id: 'UI-1', key: 'route', value: 'quick_fix' }
    });

    expect(runBdInWorkspace).toHaveBeenCalledWith(expect.anything(), [
      'update',
      'UI-1',
      '--set-metadata',
      'route=quick_fix'
    ]);
    expect(sent[0].ok).toBe(true);
  });

  test('rejects the retired merge axis keys on both set and unset without touching bd', async () => {
    for (const payload of [
      { id: 'UI-1', key: 'merge_policy', value: 'pr_stop' },
      { id: 'UI-1', key: 'merge_policy', value: '' },
      { id: 'UI-1', key: 'drift_policy', value: 'halt' },
      { id: 'UI-1', key: 'drift_policy', value: '' }
    ]) {
      runBdInWorkspace.mockClear();
      const { ws, sent } = fakeWs();
      await handleUpdateWorkflowMeta(ws, {
        id: 'r1',
        type: 'update-workflow-meta',
        payload
      });
      expect(runBdInWorkspace).not.toHaveBeenCalled();
      expect(sent[0].ok).toBe(false);
      expect(sent[0].error.code).toBe('bad_request');
    }
  });

  test('rejects a non-enum value and an unknown key without touching bd', async () => {
    for (const payload of [
      { id: 'UI-1', key: 'route', value: 'foo' },
      { id: 'UI-1', key: 'spec_review', value: 'x' } // not an editable key
    ]) {
      runBdInWorkspace.mockClear();
      const { ws, sent } = fakeWs();
      await handleUpdateWorkflowMeta(ws, {
        id: 'r1',
        type: 'update-workflow-meta',
        payload
      });
      expect(runBdInWorkspace).not.toHaveBeenCalled();
      expect(sent[0].ok).toBe(false);
      expect(sent[0].error.code).toBe('bad_request');
    }
  });

  test('a bd failure surfaces as bd_error', async () => {
    runBdInWorkspace.mockResolvedValue({ code: 1, stderr: 'boom' });
    const { ws, sent } = fakeWs();
    await handleUpdateWorkflowMeta(ws, {
      id: 'r1',
      type: 'update-workflow-meta',
      payload: { id: 'UI-1', key: 'route', value: 'spec_backed' }
    });
    expect(sent[0].ok).toBe(false);
    expect(sent[0].error.code).toBe('bd_error');
  });
});
