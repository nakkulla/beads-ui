import { html, render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import { buildLanes } from './lane-model.js';
import { miniRow } from './lanes.js';
import { pendingKey, prWaitRowsOf } from './pr-wait-row.js';

const WS_A = '/tmp/example/repo-a';

/**
 * One decorated queue snapshot of the repository under test.
 *
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function workspace(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    revision: 3,
    queue: [],
    serial_lanes: [],
    pr_wait: [],
    done: [],
    runnable: [],
    attempts: {},
    pr_observations: {},
    bead_titles: {},
    ...patch
  };
}

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function state(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    auto_advance: false,
    auto_merge: false,
    slots: 1,
    revision: 3,
    issue_prefix: 'A',
    ...patch
  };
}

/**
 * Project the PR 대기 rows of one snapshot the way the Monitor tab does: a
 * `nonempty` lane model, the repository's group from `groups_by_root`.
 *
 * @param {Record<string, any>} queue
 * @param {{ isPending?: (kind: 'merge'|'cleanup'|'resolve', root_dir: string, bead_id: string) => boolean }} [options]
 * @returns {any[]}
 */
function rowsOf(queue, options = {}) {
  const model = buildLanes([queue], [state()]);
  return prWaitRowsOf({
    root_dir: WS_A,
    queue,
    group: model.groups_by_root.get(WS_A) || null,
    model,
    isPending: options.isPending || (() => false),
    dependencyChipsOf: (item) => item.dependency_chips || null
  });
}

/**
 * The visible text of a row's status badge — a live badge is a template.
 *
 * @param {any} row
 * @returns {string}
 */
function badgeText(row) {
  const host = document.createElement('div');
  render(html`${row.badges}`, host);
  return (host.textContent || '').trim();
}

const FOREIGN_GATE = {
  enabled: false,
  tier: 'undecidable',
  gate_badge: '관측 오류',
  base_badge: '',
  reason: 'pr_repo_foreign'
};

/**
 * @param {Record<string, unknown>} entry
 * @returns {any}
 */
function foreignRow(entry) {
  return rowsOf(
    workspace({
      pr_wait: [{ bead_id: 'A-1', added_at: 1, external: true, ...entry }],
      pr_observations: { 'A-1': { pr: null, gate: FOREIGN_GATE } }
    })
  )[0];
}

const FOREIGN_ENTRY = {
  foreign: true,
  repo_slug: 'other/repo',
  pr_url: 'https://github.com/other/repo/pull/12',
  pr_number: 12
};

/**
 * A review-hold gate with the given reason.
 *
 * @param {string} reason
 * @param {string} [gate_badge]
 */
function reviewGate(reason, gate_badge = '') {
  return {
    pr: { number: 7, url: 'https://github.com/o/r/pull/7' },
    gate: {
      enabled: false,
      tier: 'review',
      gate_badge,
      base_badge: '최신',
      reason
    }
  };
}

const MERGED_GATE = {
  pr: { number: 7, url: 'https://github.com/o/r/pull/7' },
  gate: {
    enabled: false,
    tier: 'merged',
    gate_badge: '머지됨',
    base_badge: '머지됨',
    reason: null
  }
};

const GREEN_GATE = {
  pr: { number: 7, url: 'https://github.com/o/r/pull/7' },
  gate: {
    enabled: true,
    tier: 'eligible',
    gate_badge: '머지 가능',
    base_badge: '최신',
    reason: null
  }
};

describe('shared PR 대기 projection — 정리 멈춤 (UI-jw27 §3)', () => {
  const stopped = workspace({
    pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
    cleanup_failed: {
      'A-1': { step: 'branch_cleanup', reason: 'boom', at: 42 }
    },
    pr_observations: { 'A-1': MERGED_GATE }
  });

  test('names the stopped-cleanup action 워커로 이어가기', () => {
    const [row] = rowsOf(stopped);

    expect(row.merge_label).toBe('워커로 이어가기');
  });

  test('moves the resume step into the worker-continuation tooltip', () => {
    const [row] = rowsOf(stopped);

    expect(row.merge_title).toContain('단계부터 다시 돌립니다');
  });

  test('offers [세션에서 이어가기] on a stopped cleanup', () => {
    const [row] = rowsOf(stopped);

    expect(row.resolve_action).toBe(true);
  });

  test('anchors the session button before the stopped-cleanup primary button', () => {
    const [row] = rowsOf(stopped);

    expect(row.pair_anchor).toBe('merge');
  });

  test('locks [세션에서 이어가기] while that row of that repository waits', () => {
    const [row] = rowsOf(stopped, {
      isPending: (kind, root_dir, bead_id) =>
        kind === 'resolve' &&
        pendingKey(root_dir, bead_id) === pendingKey(WS_A, 'A-1')
    });

    expect(row.resolve_enabled).toBe(false);
  });

  test('draws the 워커로 이어가기 요청 중 window of a pending cleanup click', () => {
    const [row] = rowsOf(stopped, {
      isPending: (kind) => kind === 'cleanup'
    });

    expect(badgeText(row)).toBe('워커로 이어가기 요청 중');
  });
});

describe('shared PR 대기 projection — 외부 저장소 PR (UI-kyky §6)', () => {
  test('carries the foreign PR reference the registry verified', () => {
    const row = foreignRow(FOREIGN_ENTRY);

    expect([row.pr_url, row.pr_number, row.foreign_repo]).toEqual([
      'https://github.com/other/repo/pull/12',
      12,
      'other/repo'
    ]);
  });

  test('says 외부 저장소 PR rather than an observation error', () => {
    const row = foreignRow(FOREIGN_ENTRY);

    expect(row.badges).toEqual(['외부 저장소 PR']);
  });

  test('never re-derives foreign from the repo slug alone', () => {
    const row = foreignRow({
      repo_slug: 'other/repo',
      pr_url: 'https://github.com/other/repo/pull/12',
      pr_number: 12
    });

    expect([row.foreign_repo, row.pr_url]).toEqual([undefined, '']);
  });

  test('prefers the observed PR of a same-repo external row', () => {
    const [row] = rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1, external: true }],
        pr_observations: { 'A-1': GREEN_GATE }
      })
    );

    expect([row.pr_url, row.foreign_repo]).toEqual([
      'https://github.com/o/r/pull/7',
      undefined
    ]);
  });

  test('leaves merge and discard refused on a foreign row', () => {
    const row = foreignRow(FOREIGN_ENTRY);

    expect([row.merge_enabled, row.discard?.action ?? false]).toEqual([
      false,
      false
    ]);
  });
});

describe('shared PR 대기 projection — 리뷰 보류 (UI-qksl §4)', () => {
  test('alerts on an undetermined review verdict', () => {
    const [row] = rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        pr_observations: { 'A-1': reviewGate('review_receipt_undetermined') }
      })
    );

    expect([row.badges, row.alert]).toEqual([['최종 변경 리뷰 필요'], true]);
  });

  test('still alerts on a stale review verdict', () => {
    const [row] = rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        pr_observations: {
          'A-1': reviewGate('review_receipt_stale', '리뷰 확인 필요')
        }
      })
    );

    expect(row.alert).toBe(true);
  });

  test('labels the review-hold button 리뷰 후 머지', () => {
    const [row] = rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        pr_observations: { 'A-1': reviewGate('review_receipt_missing') }
      })
    );

    expect(row.merge_label).toBe('리뷰 후 머지');
  });

  test('says a running automatic review session on the row badge', () => {
    const [row] = rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        pr_observations: { 'A-1': reviewGate('review_receipt_missing') },
        attempts: {
          r1: {
            attempt_id: 'r1',
            bead_id: 'A-1',
            status: 'running',
            started_at: 50,
            kind: 'review_session',
            origin: 'auto'
          }
        }
      })
    );

    expect(badgeText(row)).toBe('최종 변경 리뷰 필요 · 자동 리뷰 세션 실행 중');
  });
});

describe('shared PR 대기 projection — 회계 잔여 칩 (UI-h6t1 §4.2)', () => {
  /**
   * @param {string[]} badge_codes
   */
  function receiptRow(badge_codes) {
    return rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        pr_observations: {
          'A-1': {
            pr: { number: 7, url: 'https://github.com/o/r/pull/7' },
            receipt_check: {
              ok: badge_codes.length === 0,
              probe_error: false,
              codes: badge_codes,
              blocking_codes: [],
              badge_codes
            }
          }
        }
      })
    )[0];
  }

  test('carries the receipt badge codes', () => {
    const row = receiptRow(['absent']);

    expect(row.receipt_badge).toEqual({ codes: ['absent'] });
  });

  test('omits the receipt badge field for an empty code list', () => {
    const row = receiptRow([]);

    expect('receipt_badge' in row).toBe(false);
  });

  test('omits the receipt badge field without an observation', () => {
    const [row] = rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        pr_observations: {
          'A-1': { pr: { number: 7, url: 'https://github.com/o/r/pull/7' } }
        }
      })
    );

    expect('receipt_badge' in row).toBe(false);
  });
});

describe('shared PR 대기 projection — 머지 재료 (UI-f2sy §4)', () => {
  const queued = workspace({
    pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
    pr_observations: { 'A-1': GREEN_GATE },
    merge_queue: [{ bead_id: 'A-1', authority: { source: 'manual' } }]
  });

  test('reads the merge queue position of a repository with only PR 대기', () => {
    const [row] = rowsOf(queued);

    expect(row.badges).toEqual(['머지 대기 #1']);
  });

  test('offers [취소] instead of [머지] on a queued row', () => {
    const [row] = rowsOf(queued);

    expect([row.merge_action, row.cancel_action]).toEqual([false, true]);
  });

  test('says 자동 제외 for a row the automatic enroller passes over', () => {
    const [row] = rowsOf(
      workspace({
        auto_merge: true,
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        pr_observations: {
          'A-1': { ...GREEN_GATE, pr: { ...GREEN_GATE.pr, head_sha: 'h1' } }
        },
        auto_merge_skips: { 'A-1': { head_sha: 'h1', reason: 'merge_error' } }
      })
    );

    expect(row.badges).toEqual(['자동 제외 — 머지 오류']);
  });

  test('draws the 큐 등록 중 window of a pending merge click', () => {
    const [row] = rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        pr_observations: { 'A-1': GREEN_GATE }
      }),
      { isPending: (kind) => kind === 'merge' }
    );

    expect(badgeText(row)).toBe('큐 등록 중');
  });

  test('asks the in-flight sets with the row repository and bead', () => {
    /** @type {string[]} */
    const asked = [];

    rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        pr_observations: { 'A-1': GREEN_GATE }
      }),
      {
        isPending: (kind, root_dir, bead_id) => {
          asked.push(`${kind}:${pendingKey(root_dir, bead_id)}`);
          return false;
        }
      }
    );

    expect(asked).toEqual([
      `merge:${pendingKey(WS_A, 'A-1')}`,
      `cleanup:${pendingKey(WS_A, 'A-1')}`,
      `resolve:${pendingKey(WS_A, 'A-1')}`
    ]);
  });
});

describe('shared PR 대기 projection — 폐기 실패 짝 (UI-18a5 §3.4)', () => {
  const taken_over = workspace({
    pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
    pr_observations: { 'A-1': GREEN_GATE },
    discard_operations: {
      op1: {
        operation_id: 'op1',
        bead_id: 'A-1',
        phase: 'closing_pr',
        last_error: 'pr_close_failed',
        requested_at: 5
      }
    },
    interactive_sessions: {
      'A-1:resolve': {
        bead_id: 'A-1',
        kind: 'resolve',
        provider: 'claude',
        session_id: 'sid',
        mode: 'fork',
        source: 'attempt',
        tmux_session: 'dev',
        tmux_window: 'resolve-A-1',
        state: 'live',
        settled_at: null,
        launched_at: 1,
        conversation: {
          result: { kind: 'takeover', line: '인수 · 내가 끝낸다', at: 2 },
          handoff: null
        }
      }
    }
  });

  test('draws no discard retry on a row the conversation took over', () => {
    const [row] = rowsOf(taken_over);
    const host = document.createElement('div');

    render(miniRow(row), host);

    const labels = Array.from(host.querySelectorAll('button')).map((button) =>
      button.textContent?.trim()
    );
    expect(labels).not.toContain('워커로 이어가기');
  });
});

describe('pinned foreign PR rows (UI-k467 §3.8)', () => {
  const TARGET = {
    slug: 'acme/research-repo-template',
    repo_name: 'research-repo-template',
    base: 'main',
    path: '/targets/research-repo-template',
    handoff: null,
    base_sha: 'f'.repeat(40),
    verify_declared: false
  };
  const ELIGIBLE = {
    enabled: true,
    tier: 'eligible',
    gate_badge: '머지 가능',
    base_badge: '최신',
    reason: null
  };

  /**
   * A Worker-delivered pinned row with an observation of its target.
   *
   * @param {Record<string, any>} [obs]
   * @returns {any}
   */
  function pinnedRow(obs = {}) {
    return rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        pr_observations: {
          'A-1': {
            pr: {
              number: 4,
              url: 'https://github.com/acme/research-repo-template/pull/4'
            },
            foreign: TARGET,
            gate: ELIGIBLE,
            ...obs
          }
        }
      })
    )[0];
  }

  /**
   * @param {string} cause
   * @returns {any}
   */
  function handoffRow(cause) {
    return pinnedRow({
      error: `foreign_handoff:${cause}`,
      foreign: { ...TARGET, handoff: cause },
      gate: {
        enabled: false,
        tier: 'undecidable',
        gate_badge: '관측 오류',
        base_badge: '',
        reason: `foreign_handoff:${cause}`
      }
    });
  }

  test('labels the merge button with the target repository name', () => {
    const row = pinnedRow();

    expect(row.merge_label).toBe('머지 ↗ research-repo-template');
  });

  test('puts the full owner/repo in the merge title', () => {
    const row = pinnedRow();

    expect(row.merge_title.startsWith('acme/research-repo-template')).toBe(
      true
    );
  });

  test('draws the labelled button on the truncating part variant', () => {
    const row = pinnedRow();

    expect(row.merge_truncate).toBe(true);
  });

  test('labels a review-held row 리뷰 후 머지 with the target name', () => {
    const row = pinnedRow({
      gate: {
        enabled: false,
        tier: 'review',
        gate_badge: '리뷰 확인 필요',
        base_badge: '최신',
        reason: 'review_receipt_missing'
      }
    });

    expect(row.merge_label).toBe('리뷰 후 머지 ↗ research-repo-template');
  });

  test('marks the slot 1 repository as one this Worker merges', () => {
    const row = pinnedRow();

    expect([row.foreign_repo, row.foreign_pinned]).toEqual([
      'acme/research-repo-template',
      true
    ]);
  });

  test('opens [보관] on a pinned row', () => {
    const row = pinnedRow();

    expect(row.shelve_action).toBe('shelve');
  });

  test('wears the 외부 PR 사람 처리 필요 badge on a handoff row', () => {
    const row = handoffRow('foreign_conflict_needs_human');

    expect(badgeText(row)).toBe('외부 PR 사람 처리 필요');
  });

  test('keeps [머지] disabled on a handoff row', () => {
    const row = handoffRow('foreign_pr_base_mismatch');

    expect(row.merge_enabled).toBe(false);
    expect(row.merge_title).toContain('[머지]로 풀리지 않습니다');
  });

  test('keeps [보관] on a handoff row', () => {
    const row = handoffRow('foreign_pr_base_mismatch');

    expect(row.shelve_action).toBe('shelve');
  });

  test('offers [세션에서 이어가기] and no [워커로 이어가기] on a handoff row', () => {
    const row = handoffRow('foreign_deploy_unsupported');

    expect(row.resolve_action).toBe(true);
    expect(row.handoff_action).toBeUndefined();
    expect(row.merge_label).not.toBe('워커로 이어가기');
  });

  test('titles the handoff session with the no-[머지] exit', () => {
    const row = handoffRow('foreign_conflict_needs_human');

    expect(row.resolve_title).toContain('[머지]로 풀리지 않습니다');
  });

  test('hands a post-merge deploy stop to a person without a cleanup retry', () => {
    const row = rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
        cleanup_failed: {
          'A-1': {
            step: 'repo_operations',
            reason: 'foreign_handoff:foreign_deploy_unsupported'
          }
        },
        pr_observations: {
          'A-1': {
            pr: { number: 4, url: 'https://github.com/acme/x/pull/4' },
            foreign: TARGET,
            gate: {
              enabled: false,
              tier: 'merged',
              gate_badge: '머지됨',
              base_badge: '머지됨',
              reason: null
            }
          }
        }
      })
    )[0];

    expect(badgeText(row)).toBe('외부 PR 사람 처리 필요');
    expect(row.merge_label).not.toBe('워커로 이어가기');
    expect(row.resolve_action).toBe(true);
  });

  test('keeps the pin-less foreign row exactly as before', () => {
    const row = foreignRow(FOREIGN_ENTRY);

    expect([row.foreign_pinned, row.merge_truncate, row.shelve_action]).toEqual(
      [undefined, undefined, null]
    );
  });

  test('labels a pinned external row from the registry before any observation', () => {
    const row = rowsOf(
      workspace({
        pr_wait: [
          {
            bead_id: 'A-1',
            added_at: 1,
            external: true,
            foreign_target: {
              slug: 'acme/research-repo-template',
              repo_name: 'research-repo-template'
            }
          }
        ]
      })
    )[0];

    expect(row.foreign_repo).toBe('acme/research-repo-template');
  });

  test('offers [폐기] on a pinned session-registered external row', () => {
    const row = rowsOf(
      workspace({
        pr_wait: [
          {
            bead_id: 'A-1',
            added_at: 1,
            external: true,
            pr_url: 'https://github.com/acme/research-repo-template/pull/4',
            pr_number: 4,
            foreign_target: {
              slug: 'acme/research-repo-template',
              repo_name: 'research-repo-template'
            }
          }
        ],
        pr_observations: {
          'A-1': {
            pr: {
              number: 4,
              url: 'https://github.com/acme/research-repo-template/pull/4'
            },
            foreign: TARGET,
            gate: ELIGIBLE
          }
        }
      })
    )[0];

    expect([row.discard_action, row.discard_enabled]).toEqual([true, true]);
  });

  test('keeps [폐기] hidden on a pin-less external row', () => {
    const row = foreignRow(FOREIGN_ENTRY);

    expect(row.discard_action).toBe(false);
  });
});

describe('⏸ 보류로 전환 on PR 대기 rows (UI-0d9i §3.1)', () => {
  /**
   * @param {Record<string, any>} [entry]
   * @param {Record<string, any>} [patch]
   * @returns {any}
   */
  function shelvedRow(entry = {}, patch = {}) {
    return rowsOf(
      workspace({
        pr_wait: [{ bead_id: 'A-1', added_at: 1, ...entry }],
        merge_shelved: { 'A-1': { at: 1 } },
        ...patch
      })
    )[0];
  }

  test('stands on a shelved row', () => {
    const row = shelvedRow();

    expect([row.shelve_action, row.defer_action]).toEqual(['unshelve', true]);
  });

  test('stays off a row that is not shelved', () => {
    const row = rowsOf(
      workspace({ pr_wait: [{ bead_id: 'A-1', added_at: 1 }] })
    )[0];

    expect(row.defer_action).toBe(false);
  });

  test('stays off a shelved row whose merge was observed', () => {
    const row = shelvedRow({ merge_sha: 'c'.repeat(40) });

    expect(row.defer_action).toBe(false);
  });

  test('stays off a shelved row whose cleanup stopped', () => {
    const row = shelvedRow(
      {},
      {
        cleanup_failed: { 'A-1': { step: 'branch_cleanup', reason: 'boom' } }
      }
    );

    expect(row.defer_action).toBe(false);
  });

  test('draws the button on the op-btn part right after [보관 해제]', () => {
    const host = document.createElement('div');

    render(miniRow(shelvedRow()), host);

    const actions = Array.from(
      host.querySelectorAll('.worker-mini__actions > button')
    ).map((button) => button.className);
    const shelve = actions.indexOf('op-btn worker-mini__shelve');
    expect(actions[shelve + 1]).toBe('op-btn worker-mini__defer');
    expect(host.querySelector('.worker-mini__defer')?.textContent?.trim()).toBe(
      '⏸ 보류로 전환'
    );
  });
});
