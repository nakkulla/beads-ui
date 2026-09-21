import { describe, expect, test, vi } from 'vitest';
import {
  ORCHESTRATION_KEYS,
  PRESET_KV_KEYS,
  QUICK_FIX_ORCHESTRATION_KEYS
} from '../settings-dialog/session-model.js';
import {
  defaultSelectedRoots,
  formatBulkResult,
  planBulkApply,
  retryRootsOf,
  runBulkApply
} from './bulk-preset-apply.js';

/**
 * Minimal deck row shape the module reads.
 *
 * @param {Partial<Record<string, any>>} overrides
 * @returns {Record<string, any>}
 */
function row(overrides) {
  return {
    root_dir: '/repo/a',
    name: 'a',
    auto_advance: false,
    revision: 1,
    quick_fix_orchestration_model: null,
    ...overrides
  };
}

/** The form as it stands before anyone touches it: 24 keys, all empty. */
const EMPTY_FORM = {
  kv_values: Object.fromEntries(PRESET_KV_KEYS.map((key) => [key, null])),
  queue_values: Object.fromEntries(
    [...ORCHESTRATION_KEYS, ...QUICK_FIX_ORCHESTRATION_KEYS].map((key) => [
      key,
      null
    ])
  ),
  equals_preset: false
};

/**
 * The form after a preset filled it and nothing moved.
 *
 * @param {Record<string, string|null>} [kv]
 * @returns {import('./bulk-preset-apply.js').BulkFormValues}
 */
function formValues(kv = {}) {
  return {
    kv_values: { ...EMPTY_FORM.kv_values, ...kv },
    queue_values: { ...EMPTY_FORM.queue_values },
    equals_preset: false
  };
}

describe('defaultSelectedRoots', () => {
  test('selects only rows with auto_advance true', () => {
    const rows = [
      row({ root_dir: '/repo/a', auto_advance: true }),
      row({ root_dir: '/repo/b', auto_advance: false })
    ];

    const selected = defaultSelectedRoots(rows);

    expect(selected).toEqual(['/repo/a']);
  });

  test('keeps a row with automation off in the caller rows array', () => {
    const rows = [
      row({ root_dir: '/repo/a', auto_advance: true }),
      row({ root_dir: '/repo/b', auto_advance: false })
    ];

    defaultSelectedRoots(rows);

    expect(rows).toHaveLength(2);
  });
});

describe('planBulkApply preset path', () => {
  const preset_state = {
    revision: 7,
    presets: [{ id: 'p1', compatible: true }]
  };

  test('emits payloads in deck row order with revision and root_dir', () => {
    const rows = [
      row({ root_dir: '/repo/a', name: 'a', revision: 3 }),
      row({ root_dir: '/repo/b', name: 'b', revision: 5 })
    ];

    const plan = planBulkApply({
      rows,
      selected_roots: new Set(['/repo/a', '/repo/b']),
      preset_state,
      preset_id: 'p1',
      form: { ...formValues(), equals_preset: true }
    });

    expect(plan.targets).toEqual([
      {
        root_dir: '/repo/a',
        name: 'a',
        mode: 'preset',
        payload: {
          preset_id: 'p1',
          expected_revision: 7,
          expected_queue_revision: 3,
          root_dir: '/repo/a'
        }
      },
      {
        root_dir: '/repo/b',
        name: 'b',
        mode: 'preset',
        payload: {
          preset_id: 'p1',
          expected_revision: 7,
          expected_queue_revision: 5,
          root_dir: '/repo/b'
        }
      }
    ]);
  });

  test('disables a form-less plan that names no preset', () => {
    const rows = [row({ root_dir: '/repo/a' })];

    const plan = planBulkApply({
      rows,
      selected_roots: new Set(['/repo/a']),
      preset_state,
      preset_id: ''
    });

    expect(plan.disabled_reason).toBe('적용할 실행 프리셋을 고르세요');
  });

  test('disables when zero repos are selected', () => {
    const rows = [row({ root_dir: '/repo/a' })];

    const plan = planBulkApply({
      rows,
      selected_roots: new Set(),
      preset_state,
      preset_id: 'p1'
    });

    expect(plan.disabled_reason).toBe('적용할 저장소를 고르세요');
  });

  test('disables with the incompatibility reason when the chosen preset is incompatible', () => {
    const rows = [row({ root_dir: '/repo/a' })];
    const incompatible_state = {
      revision: 7,
      presets: [
        {
          id: 'p1',
          compatible: false,
          incompatibility_reason: '카탈로그에 없는 프리셋입니다'
        }
      ]
    };

    const plan = planBulkApply({
      rows,
      selected_roots: new Set(['/repo/a']),
      preset_state: incompatible_state,
      preset_id: 'p1'
    });

    expect(plan.disabled_reason).toBe('카탈로그에 없는 프리셋입니다');
  });

  test('disables for a legacy server lacking the quick_fix key on every row', () => {
    const rows = [
      { root_dir: '/repo/a', name: 'a', revision: 1 },
      { root_dir: '/repo/b', name: 'b', revision: 1 }
    ];

    const plan = planBulkApply({
      rows,
      selected_roots: new Set(['/repo/a', '/repo/b']),
      preset_state,
      preset_id: 'p1'
    });

    expect(plan.disabled_reason).toBe('서버가 quick_fix 값을 받지 않습니다');
  });

  test('disables while a run is already in progress', () => {
    const rows = [row({ root_dir: '/repo/a' })];

    const plan = planBulkApply({
      rows,
      selected_roots: new Set(['/repo/a']),
      preset_state,
      preset_id: 'p1',
      running: true
    });

    expect(plan.disabled_reason).toBe('적용 중입니다');
  });
});

describe('planBulkApply form path (UI-628r §4.2)', () => {
  const preset_state = {
    revision: 7,
    presets: [{ id: 'p1', compatible: true, settings: { impl_model: 'sol' } }]
  };

  test('enables an untouched form that names no preset', () => {
    const rows = [row({ root_dir: '/repo/a', revision: 3 })];

    const plan = planBulkApply({
      rows,
      selected_roots: ['/repo/a'],
      preset_state,
      preset_id: '',
      form: EMPTY_FORM
    });

    expect(plan.disabled_reason).toBe(null);
  });

  test('sends every kv and queue key of an untouched form as null', () => {
    const rows = [row({ root_dir: '/repo/a', revision: 3 })];

    const plan = planBulkApply({
      rows,
      selected_roots: ['/repo/a'],
      preset_state,
      preset_id: '',
      form: EMPTY_FORM
    });

    expect(Object.keys(plan.targets[0].kv_payload?.values || {})).toHaveLength(
      18
    );
    expect(plan.targets[0].kv_payload).toEqual({
      values: EMPTY_FORM.kv_values,
      root_dir: '/repo/a'
    });
    expect(plan.targets[0].queue_payload).toEqual({
      values: EMPTY_FORM.queue_values,
      root_dir: '/repo/a',
      expected_revision: 3
    });
    expect(Object.values(plan.targets[0].queue_payload?.values || {})).toEqual([
      null,
      null,
      null,
      null,
      null,
      null
    ]);
  });

  test('takes the form path when the form no longer equals the chosen preset', () => {
    const rows = [row({ root_dir: '/repo/a' })];

    const plan = planBulkApply({
      rows,
      selected_roots: ['/repo/a'],
      preset_state,
      preset_id: 'p1',
      form: formValues({ impl_model: 'opus' })
    });

    expect(plan.targets.map((target) => target.mode)).toEqual(['form']);
  });
});

/**
 * @param {string} root_dir
 * @param {string} name
 * @param {number} revision
 * @returns {import('./bulk-preset-apply.js').BulkTarget}
 */
function target(root_dir, name, revision) {
  return {
    root_dir,
    name,
    mode: 'preset',
    payload: {
      preset_id: 'p1',
      expected_revision: 7,
      expected_queue_revision: revision,
      root_dir
    }
  };
}

/**
 * @param {string} root_dir
 * @param {string} name
 * @param {number} [revision]
 * @returns {import('./bulk-preset-apply.js').BulkTarget}
 */
function formTarget(root_dir, name, revision = 1) {
  return {
    root_dir,
    name,
    mode: 'form',
    kv_payload: { values: { impl_model: 'sol' }, root_dir },
    queue_payload: {
      values: { orchestration_model: null },
      root_dir,
      expected_revision: revision
    }
  };
}

/** What `set-session-defaults` answers on success. */
const KV_OK = { values: {}, warnings: [] };

describe('runBulkApply preset path', () => {
  test('sends one request per target in deck order', async () => {
    const send = vi
      .fn()
      .mockResolvedValue({ applied: true, queue_applied: true });
    const adopt = vi.fn();
    const targets = [target('/repo/a', 'a', 1), target('/repo/b', 'b', 1)];

    await runBulkApply({ targets, send, adopt });

    expect(send.mock.calls.map((call) => call[1].root_dir)).toEqual([
      '/repo/a',
      '/repo/b'
    ]);
  });

  test('sends the preset op exactly once per repo', async () => {
    const send = vi
      .fn()
      .mockResolvedValue({ applied: true, queue_applied: true });
    const targets = [target('/repo/a', 'a', 1), target('/repo/b', 'b', 1)];

    await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(send.mock.calls.map((call) => call[0])).toEqual([
      'apply-impl-preset-global',
      'apply-impl-preset-global'
    ]);
  });

  test('adopts the response queue for both success and failure', async () => {
    const adopt = vi.fn();
    const send = vi
      .fn()
      .mockResolvedValueOnce({
        applied: true,
        queue_applied: true,
        queue: { revision: 2 }
      })
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        queue: { revision: 9 }
      });
    const targets = [target('/repo/a', 'a', 1), target('/repo/b', 'b', 1)];

    await runBulkApply({ targets, send, adopt });

    expect(adopt).toHaveBeenCalledWith('/repo/a', { revision: 2 });
    expect(adopt).toHaveBeenCalledWith('/repo/b', { revision: 9 });
  });

  test('retries the same repo once with the queue revision when queue_applied is false', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce({
        applied: true,
        queue_applied: false,
        queue: { revision: 4 }
      })
      .mockResolvedValueOnce({ applied: true, queue_applied: true });
    const targets = [target('/repo/a', 'a', 1)];

    await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[1][1].expected_queue_revision).toBe(4);
  });

  test('marks applied true then queue_applied false as partial', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce({ applied: true, queue_applied: false })
      .mockResolvedValueOnce({ applied: true, queue_applied: false });
    const targets = [target('/repo/a', 'a', 1)];

    const results = await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(results[0].state).toBe('partial');
  });

  test('keeps a repo partial when the retry answers applied false', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce({
        applied: true,
        queue_applied: false,
        queue: { revision: 4 }
      })
      .mockResolvedValueOnce({ applied: false, queue: { revision: 5 } });
    const targets = [target('/repo/a', 'a', 1)];

    const results = await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(results[0]).toEqual({
      root_dir: '/repo/a',
      name: 'a',
      state: 'partial',
      detail: '큐가 방금 변경되었습니다'
    });
  });

  test('keeps a repo partial and quotes the error when the retry throws', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce({
        applied: true,
        queue_applied: false,
        queue: { revision: 4 }
      })
      .mockRejectedValueOnce(new Error('network down'));
    const targets = [target('/repo/a', 'a', 1)];

    const results = await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(results[0]).toEqual({
      root_dir: '/repo/a',
      name: 'a',
      state: 'partial',
      detail: 'network down'
    });
  });

  test('marks a first response without applied as failed', async () => {
    const send = vi.fn().mockResolvedValue({
      applied: false,
      queue_applied: false,
      queue_conflict: true
    });
    const targets = [target('/repo/a', 'a', 1)];

    const results = await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(results[0].state).toBe('failed');
  });

  test('stops remaining targets as skipped on a preset conflict', async () => {
    const send = vi.fn().mockResolvedValue({ applied: false, conflict: true });
    const targets = [
      target('/repo/a', 'a', 1),
      target('/repo/b', 'b', 1),
      target('/repo/c', 'c', 1)
    ];

    const results = await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(results.map((result) => result.state)).toEqual([
      'failed',
      'skipped',
      'skipped'
    ]);
  });

  test('sends nothing further after a preset conflict stops the run', async () => {
    const send = vi.fn().mockResolvedValue({ applied: false, conflict: true });
    const targets = [target('/repo/a', 'a', 1), target('/repo/b', 'b', 1)];

    await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(send).toHaveBeenCalledTimes(1);
  });

  test('marks a repo failed on a thrown send and continues to the next target', async () => {
    const send = vi
      .fn()
      .mockRejectedValueOnce(new Error('network down'))
      .mockResolvedValueOnce({ applied: true, queue_applied: true });
    const targets = [target('/repo/a', 'a', 1), target('/repo/b', 'b', 1)];

    const results = await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(results.map((result) => result.state)).toEqual([
      'failed',
      'applied'
    ]);
  });

  test('marks a repo failed on an error response and continues to the next target', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce({ error: '거부됨' })
      .mockResolvedValueOnce({ applied: true, queue_applied: true });
    const targets = [target('/repo/a', 'a', 1), target('/repo/b', 'b', 1)];

    const results = await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(results.map((result) => result.state)).toEqual([
      'failed',
      'applied'
    ]);
  });

  test('stops sending remaining targets when isCancelled becomes true', async () => {
    const send = vi
      .fn()
      .mockResolvedValue({ applied: true, queue_applied: true });
    const targets = [target('/repo/a', 'a', 1), target('/repo/b', 'b', 1)];
    let calls = 0;
    const isCancelled = () => {
      calls += 1;
      return calls > 1;
    };

    await runBulkApply({ targets, send, adopt: vi.fn(), isCancelled });

    expect(send).toHaveBeenCalledTimes(1);
  });

  test('skips the queue retry when cancelled after the first response', async () => {
    const adopt = vi.fn();
    let cancelled = false;
    const send = vi.fn(async () => {
      cancelled = true;
      return { applied: true, queue_applied: false, queue: { revision: 4 } };
    });

    const results = await runBulkApply({
      targets: [target('/repo/a', 'a', 1)],
      send,
      adopt,
      isCancelled: () => cancelled
    });

    expect(send).toHaveBeenCalledTimes(1);
    expect(adopt).toHaveBeenCalledWith('/repo/a', { revision: 4 });
    expect(results.map((result) => result.state)).toEqual(['partial']);
  });
});

describe('runBulkApply form path (UI-628r §4.2)', () => {
  test('sends the kv write before the queue write for each repo', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce(KV_OK)
      .mockResolvedValueOnce({ applied: true, queue: { revision: 2 } })
      .mockResolvedValueOnce(KV_OK)
      .mockResolvedValueOnce({ applied: true, queue: { revision: 2 } });
    const targets = [formTarget('/repo/a', 'a'), formTarget('/repo/b', 'b')];

    await runBulkApply({ targets, send, adopt: vi.fn() });

    expect(send.mock.calls.map((call) => [call[0], call[1].root_dir])).toEqual([
      ['set-session-defaults', '/repo/a'],
      ['worker-queue-set-orchestration-defaults', '/repo/a'],
      ['set-session-defaults', '/repo/b'],
      ['worker-queue-set-orchestration-defaults', '/repo/b']
    ]);
  });

  test('retries the queue write once with the revision the response carried', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce(KV_OK)
      .mockResolvedValueOnce({ applied: false, queue: { revision: 9 } })
      .mockResolvedValueOnce({ applied: false, queue: { revision: 11 } });

    await runBulkApply({
      targets: [formTarget('/repo/a', 'a')],
      send,
      adopt: vi.fn()
    });

    expect(send).toHaveBeenCalledTimes(3);
    expect(send.mock.calls[2][1].expected_revision).toBe(9);
  });

  test('reports a written kv with an unwritten queue as partial', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce(KV_OK)
      .mockResolvedValue({ applied: false, queue: { revision: 9 } });

    const results = await runBulkApply({
      targets: [formTarget('/repo/a', 'a')],
      send,
      adopt: vi.fn()
    });

    expect(results[0]).toEqual({
      root_dir: '/repo/a',
      name: 'a',
      state: 'partial',
      detail: '큐 충돌, 실행 설정만 저장'
    });
  });

  test('reports both writes landing as applied', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce(KV_OK)
      .mockResolvedValueOnce({ applied: true, queue: { revision: 2 } });

    const results = await runBulkApply({
      targets: [formTarget('/repo/a', 'a')],
      send,
      adopt: vi.fn()
    });

    expect(results[0].state).toBe('applied');
  });

  test('sends no queue write once the kv write is refused', async () => {
    const send = vi.fn().mockResolvedValueOnce({ error: '거부됨' });

    const results = await runBulkApply({
      targets: [formTarget('/repo/a', 'a')],
      send,
      adopt: vi.fn()
    });

    expect(send).toHaveBeenCalledTimes(1);
    expect(results[0]).toEqual({
      root_dir: '/repo/a',
      name: 'a',
      state: 'failed',
      detail: '거부됨'
    });
  });
});

describe('formatBulkResult', () => {
  test('phrases the applied state', () => {
    const text = formatBulkResult({
      root_dir: '/repo/a',
      name: 'a',
      state: 'applied',
      detail: ''
    });

    expect(text).toEqual({ icon: '✓', text: 'a 적용됨' });
  });

  test('phrases the partial state with detail', () => {
    const text = formatBulkResult({
      root_dir: '/repo/a',
      name: 'a',
      state: 'partial',
      detail: '오케스트레이션 값 미적용'
    });

    expect(text).toEqual({
      icon: '⚠',
      text: 'a 부분 적용 — 오케스트레이션 값 미적용'
    });
  });

  test('phrases the form path partial reason', () => {
    const text = formatBulkResult({
      root_dir: '/repo/a',
      name: 'a',
      state: 'partial',
      detail: '큐 충돌, 실행 설정만 저장'
    });

    expect(text).toEqual({
      icon: '⚠',
      text: 'a 부분 적용 — 큐 충돌, 실행 설정만 저장'
    });
  });

  test('phrases the skipped state', () => {
    const text = formatBulkResult({
      root_dir: '/repo/a',
      name: 'a',
      state: 'skipped',
      detail: ''
    });

    expect(text).toEqual({ icon: '–', text: 'a 미실행' });
  });

  test('phrases the failed state with detail', () => {
    const text = formatBulkResult({
      root_dir: '/repo/a',
      name: 'a',
      state: 'failed',
      detail: '큐가 방금 변경되었습니다'
    });

    expect(text).toEqual({
      icon: '✕',
      text: 'a 실패 — 큐가 방금 변경되었습니다'
    });
  });
});

describe('retryRootsOf', () => {
  test('returns only failed and partial roots', () => {
    const roots = retryRootsOf([
      { root_dir: '/repo/a', name: 'a', state: 'applied', detail: '' },
      { root_dir: '/repo/b', name: 'b', state: 'failed', detail: 'x' },
      { root_dir: '/repo/c', name: 'c', state: 'partial', detail: 'y' },
      { root_dir: '/repo/d', name: 'd', state: 'skipped', detail: '' }
    ]);

    expect(roots).toEqual(['/repo/b', '/repo/c']);
  });
});
