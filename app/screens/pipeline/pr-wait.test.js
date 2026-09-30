import { afterEach, describe, expect, test } from 'vitest';
import { NOW, mountPipeline, payloadsOf, settle } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
});

const REPO_A = '/fixture/repo-a';

/**
 * Mount the pipeline with repo-a's PR row (A-5) reshaped by `patch`.
 *
 * @param {Record<string, any>} patch - Fields merged onto repo-a's row.
 * @param {Parameters<typeof mountPipeline>[0]} [options]
 */
function mountPr(patch, options = {}) {
  const handle = mountPipeline({
    now: NOW,
    ...options,
    edit: (fixture) => {
      Object.assign(fixture.workspaces[0], patch);
    }
  });
  mounted.push(handle);
  return handle;
}

/**
 * @param {Record<string, any>} [gate]
 * @returns {Record<string, any>}
 */
function observations(gate = {}) {
  return {
    'A-5': {
      pr: { number: 300, url: 'https://example.test/pr/0', head_sha: 'h' },
      gate: {
        enabled: false,
        tier: 'blocked',
        gate_badge: '관측 대기',
        base_badge: '최신',
        reason: null,
        ...gate
      }
    }
  };
}

/**
 * @param {ParentNode} root
 * @returns {HTMLElement}
 */
function prRow(root) {
  const row = root.querySelector(
    `[data-lane-body="pr_wait"] .pl-row[data-bead-id="A-5"][data-root-dir="${REPO_A}"]`
  );
  if (!(row instanceof HTMLElement)) {
    throw new Error('missing PR row');
  }
  return row;
}

/**
 * @param {ParentNode} root
 * @param {string} op
 * @returns {HTMLButtonElement}
 */
function button(root, op) {
  const found = prRow(root).querySelector(`[data-op="${op}"]`);
  if (!(found instanceof HTMLButtonElement)) {
    throw new Error(`missing ${op}`);
  }
  return found;
}

describe('PR 대기 행 (UI-dbn6 P1-r2)', () => {
  test('appends · 세션 to an external PR row title', () => {
    const { mount: root } = mountPr({
      pr_wait: [{ bead_id: 'A-5', added_at: 1, external: true }]
    });

    const title = prRow(root).querySelector('.pl-title')?.textContent;

    expect(title?.replace(/\s+/g, ' ').trim()).toBe(
      'PR 대기 — 칩 문법 정리 (repo-a) · 세션'
    );
  });

  test('draws the live status evidence as the badge tooltip', () => {
    const { mount: root } = mountPr({
      completion_status: {
        'A-5': {
          phase: 'retrying',
          auto_resolution: {
            attempts: 1,
            attempt_cap: 3,
            origin_reason: 'verify_red'
          }
        }
      }
    });

    const badge = prRow(root).querySelector('.pl-badge--live');

    expect(badge?.textContent?.trim()).toBe('재시도 1/3');
    expect(badge?.getAttribute('title')).toBe('원 사유: verify_red');
  });

  test('offers 세션에서 해결 on a PR row whose cleanup stopped', () => {
    const { mount: root } = mountPr({
      pr_observations: observations({ tier: 'merged', gate_badge: '머지됨' }),
      cleanup_failed: { 'A-5': { step: 'child_sweep', reason: 'boom' } }
    });

    const resolve = button(root, 'resolve');

    expect(resolve.textContent?.trim()).toBe('세션에서 해결');
  });

  test('locks 취소 with its reason while the completion merges', () => {
    const { mount: root } = mountPr({
      pr_observations: observations({ enabled: true }),
      merge_queue: [{ bead_id: 'A-5', authority: { source: 'manual' } }],
      merge_queue_state: { active: null, failures: {} },
      completion_status: { 'A-5': { phase: 'merging' } }
    });

    const cancel = button(root, 'merge-cancel');

    expect(cancel.disabled).toBe(true);
    expect(cancel.title).toBe(
      '머지 중 — 중단하려면 상단 자동 머지 중단을 사용하세요'
    );
  });

  test('shows 큐 등록 중 while the merge request is in flight', async () => {
    /** @type {(value: any) => void} */
    let answer = () => {};
    const { mount: root } = mountPr(
      {
        pr_observations: observations({
          enabled: true,
          gate_badge: '머지 가능'
        })
      },
      {
        reply: (type) =>
          type === 'worker-merge-queue-add'
            ? new Promise((resolve) => {
                answer = resolve;
              })
            : undefined
      }
    );

    button(root, 'merge').click();
    await settle();

    expect(prRow(root).textContent).toContain('큐 등록 중');
    expect(button(root, 'merge').disabled).toBe(true);
    answer({ applied: true });
  });

  test('toasts the refusal sentence of a merge the server did not apply', async () => {
    const { mount: root, toast } = mountPr(
      {
        pr_observations: observations({
          enabled: true,
          gate_badge: '머지 가능'
        })
      },
      {
        reply: (type) =>
          type === 'worker-merge-queue-add'
            ? { applied: false, reason: 'lane_occupied' }
            : undefined
      }
    );

    button(root, 'merge').click();
    await settle();

    expect(toast).toHaveBeenCalledWith(
      '실행 레인에 남아 있어 머지 대상이 아닙니다',
      'error',
      2400
    );
  });

  test('toasts a connection failure when the merge send rejects', async () => {
    const { mount: root, toast } = mountPr(
      {
        pr_observations: observations({
          enabled: true,
          gate_badge: '머지 가능'
        })
      },
      {
        reply: (type) =>
          type === 'worker-merge-queue-add'
            ? Promise.reject(new Error('socket closed'))
            : undefined
      }
    );

    button(root, 'merge').click();
    await settle();

    expect(toast).toHaveBeenCalledWith(
      '머지 클릭이 서버에 전달되지 않았습니다(연결 문제) — 연결 복구 후 다시 눌러주세요',
      'error',
      3200
    );
  });

  test('toasts a merge conflict that survived the retry', async () => {
    const { mount: root, toast } = mountPr(
      {
        pr_observations: observations({
          enabled: true,
          gate_badge: '머지 가능'
        })
      },
      {
        reply: (type) =>
          type === 'worker-merge-queue-add'
            ? { applied: false, conflict: true }
            : undefined
      }
    );

    button(root, 'merge').click();
    await settle();

    expect(toast).toHaveBeenCalledWith(
      '큐가 바뀌어 머지 클릭이 적용되지 않았습니다 — 다시 눌러주세요',
      'error',
      2400
    );
  });

  test('sends worker-cleanup-retry from a stopped cleanup row button', async () => {
    const { mount: root, send } = mountPr({
      pr_observations: observations({ tier: 'merged', gate_badge: '머지됨' }),
      cleanup_failed: { 'A-5': { step: 'child_sweep', reason: 'boom' } }
    });

    button(root, 'merge').click();
    await settle();

    expect(payloadsOf(send, 'worker-cleanup-retry')).toEqual([
      { bead_id: 'A-5', root_dir: REPO_A, expected_revision: 10 }
    ]);
    expect(payloadsOf(send, 'worker-merge-queue-add')).toEqual([]);
  });
});
