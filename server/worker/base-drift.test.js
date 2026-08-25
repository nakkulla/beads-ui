/**
 * The post-hoc base invariant, rebuilt on the pre-push record (UI-1xcd §4).
 *
 * The old suite drove a reflog/rev-list provenance guess; these cases drive the
 * fact the hook writes instead. The regressions the design named are pinned by
 * name — the 2026-08-03 double false positive, the mixed absorb-without-push
 * state, and its control group where the attempt really did push.
 */
import { describe, expect, test, vi } from 'vitest';
import { observeBaseDrift } from './base-drift.js';

const PINNED = 'a'.repeat(40);
const MOVED = 'b'.repeat(40);
const MINE = 'c'.repeat(40);
const FOREIGN = 'e'.repeat(40);
const ZERO = '0'.repeat(40);

const BASE_REF = 'refs/heads/main';

/**
 * The forced base re-resolution seam.
 *
 * @param {string} [tip]
 * @param {string} [base]
 */
function resolveTo(tip = MOVED, base = 'main') {
  return vi.fn(async () => ({
    ok: /** @type {const} */ (true),
    base,
    declared: false,
    remote: 'origin',
    remote_ref: `refs/remotes/origin/${base}`,
    base_oid: tip,
    local_only: false
  }));
}

/**
 * A `git` runner answering only `merge-base --is-ancestor`, which is the single
 * command the judgment spends now.
 *
 * @param {{ reachable?: string[], code?: number }} [posture] - `reachable`
 * lists the oids the observed tip contains; `code` overrides the answer for
 * every call (an observation failure).
 */
function makeGit(posture = {}) {
  const reachable = posture.reachable ?? [];
  return vi.fn(async (/** @type {string[]} */ args) => {
    if (args[0] !== 'merge-base') {
      throw new Error(`unexpected git command: ${args.join(' ')}`);
    }
    if (posture.code !== undefined) {
      return { code: posture.code, stdout: '', stderr: 'boom' };
    }
    return {
      code: reachable.includes(args[2]) ? 0 : 1,
      stdout: '',
      stderr: ''
    };
  });
}

/**
 * A push record seam.
 *
 * @param {Record<string, unknown>[]} entries
 */
function pushLog(entries) {
  return vi.fn(() => ({ ok: /** @type {const} */ (true), entries }));
}

/** The record of an attempt that never had one (pre-deployment dispatch). */
function noPushLog() {
  return vi.fn(() => ({
    ok: /** @type {const} */ (false),
    reason: 'absent'
  }));
}

/**
 * One push line as the hook writes it.
 *
 * @param {string} remote_ref
 * @param {string} local_oid
 */
function pushed(remote_ref, local_oid) {
  return {
    local_ref: 'refs/heads/UI-1',
    local_oid,
    remote_ref,
    remote_oid: PINNED
  };
}

/**
 * @param {Partial<Parameters<typeof observeBaseDrift>[0]>} [overrides]
 */
function observe(overrides = {}) {
  return observeBaseDrift({
    attempt: {
      bead_id: 'UI-1',
      repo: '/repo',
      base_oid: PINNED,
      disposition: null
    },
    resolveBase: resolveTo(),
    git: makeGit(),
    readPushLog: pushLog([]),
    ...overrides
  });
}

describe('base-drift scope exclusions', () => {
  test('skips a disposition attempt without consulting anything', async () => {
    const readPushLog = pushLog([]);
    const git = makeGit();

    const verdict = await observe({
      attempt: {
        bead_id: 'B1',
        repo: '/repo',
        base_oid: PINNED,
        disposition: 'revise_fix'
      },
      git,
      readPushLog
    });

    expect(verdict).toEqual({
      violation: false,
      record: { skipped: 'disposition' }
    });
    expect(readPushLog).not.toHaveBeenCalled();
    expect(git).not.toHaveBeenCalled();
  });

  test('skips a quick_fix lane attempt without consulting anything', async () => {
    const readPushLog = pushLog([]);
    const git = makeGit();

    const verdict = await observe({
      attempt: {
        bead_id: 'B2',
        repo: '/repo',
        base_oid: PINNED,
        quickfix_lane: true
      },
      git,
      readPushLog
    });

    expect(verdict).toEqual({
      violation: false,
      record: { skipped: 'quickfix_lane' }
    });
    expect(readPushLog).not.toHaveBeenCalled();
    expect(git).not.toHaveBeenCalled();
  });

  test('skips an attempt that pinned no base', async () => {
    const verdict = await observe({
      attempt: { bead_id: 'X1', repo: '/repo', base_oid: null }
    });

    expect(verdict).toEqual({
      violation: false,
      record: { skipped: 'no_base_oid' }
    });
  });

  test('records no_repo when the attempt carries no repo', async () => {
    const verdict = await observe({
      attempt: { bead_id: 'UI-1', repo: null, base_oid: PINNED }
    });

    expect(verdict.record).toEqual({ pinned: PINNED, error: 'no_repo' });
  });

  test('records no_observer_deps when the push record seam is missing', async () => {
    const verdict = await observeBaseDrift({
      attempt: { bead_id: 'UI-1', repo: '/repo', base_oid: PINNED },
      resolveBase: resolveTo(),
      git: makeGit()
    });

    expect(verdict.record).toEqual({
      pinned: PINNED,
      error: 'no_observer_deps'
    });
  });
});

describe('base-drift base movement', () => {
  test('says nothing at all when the base never moved', async () => {
    const readPushLog = pushLog([pushed(BASE_REF, MINE)]);

    const verdict = await observe({
      resolveBase: resolveTo(PINNED),
      readPushLog
    });

    expect(verdict).toEqual({ violation: false, record: null });
    // Nothing to explain: the record is not even opened.
    expect(readPushLog).not.toHaveBeenCalled();
  });

  test('records the re-resolution failure without judging', async () => {
    const verdict = await observe({
      resolveBase: vi.fn(async () => ({
        ok: /** @type {const} */ (false),
        step: /** @type {const} */ ('fetch'),
        base: 'main',
        detail: 'no upstream'
      }))
    });

    expect(verdict).toEqual({
      violation: false,
      record: { pinned: PINNED, error: 'base_resolve:fetch' }
    });
  });

  test('records a throwing re-resolution without judging', async () => {
    const verdict = await observe({
      resolveBase: vi.fn(async () => {
        throw new Error('network');
      })
    });

    expect(verdict.record).toEqual({
      pinned: PINNED,
      error: 'base_resolve:threw'
    });
  });
});

describe('base-drift judges by the push record (UI-1xcd §4.3)', () => {
  // Regression 1 — the 2026-08-03 pair. Both attempts were blamed for a PR
  // merge commit and a human's direct spec push; neither had pushed anything.
  test('clears an attempt whose record holds no push at the base', async () => {
    const verdict = await observe({
      readPushLog: pushLog([pushed('refs/heads/UI-1', MINE)])
    });

    expect(verdict).toEqual({
      violation: false,
      record: { pinned: PINNED, observed: MOVED, landed: false, pushed: [] }
    });
  });

  test('clears an attempt whose record is empty', async () => {
    const verdict = await observe({ readPushLog: pushLog([]) });

    expect(verdict.violation).toBe(false);
    expect(verdict.record).toEqual({
      pinned: PINNED,
      observed: MOVED,
      landed: false,
      pushed: []
    });
  });

  // Regression 4 — the mixed state §1 makes ordinary: the attempt committed
  // locally AND absorbed the base, and someone else moved the remote base.
  test('clears the mixed absorb-without-push state', async () => {
    const git = makeGit({ reachable: [MINE, FOREIGN] });

    const verdict = await observe({
      git,
      readPushLog: pushLog([pushed('refs/heads/UI-1', MINE)])
    });

    expect(verdict.violation).toBe(false);
    // The graph is never walked: reachability is asked only of a recorded push.
    expect(git).not.toHaveBeenCalled();
  });

  // Regression 5 — the control group. Same mixed state, but this attempt DID
  // push its own commit at the base, and the commit is on the base now.
  test('flags the control group, where the attempt pushed at the base', async () => {
    const verdict = await observe({
      git: makeGit({ reachable: [MINE] }),
      readPushLog: pushLog([
        pushed('refs/heads/UI-1', FOREIGN),
        pushed(BASE_REF, MINE)
      ])
    });

    expect(verdict).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'direct_push',
        pushed: [MINE],
        shas: [MINE]
      }
    });
  });

  test('clears a recorded base push the hook actually refused', async () => {
    // Recorded (the attempt tried) but unreachable (the prevention layer held),
    // while the base moved by someone else's hand.
    const verdict = await observe({
      git: makeGit({ reachable: [FOREIGN] }),
      readPushLog: pushLog([pushed(BASE_REF, MINE)])
    });

    expect(verdict).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: false,
        pushed: [MINE]
      }
    });
  });

  test('ignores a push at ANOTHER branch that happens to be named alike', async () => {
    const verdict = await observe({
      git: makeGit({ reachable: [MINE] }),
      readPushLog: pushLog([pushed('refs/heads/main-backup', MINE)])
    });

    expect(verdict.violation).toBe(false);
  });

  test('follows the declared base rather than a hardcoded main', async () => {
    const verdict = await observe({
      resolveBase: resolveTo(MOVED, 'ilsun/dev'),
      git: makeGit({ reachable: [MINE] }),
      readPushLog: pushLog([pushed('refs/heads/ilsun/dev', MINE)])
    });

    expect(verdict.violation).toBe(true);
    expect(verdict.record?.shas).toEqual([MINE]);
  });

  test('drops a deletion push, which left no commit to reach', async () => {
    const git = makeGit();

    const verdict = await observe({
      git,
      readPushLog: pushLog([pushed(BASE_REF, ZERO)])
    });

    expect(verdict.violation).toBe(false);
    expect(verdict.record?.pushed).toEqual([]);
    expect(git).not.toHaveBeenCalled();
  });

  test('collapses repeated pushes of the same oid to one evidence entry', async () => {
    const verdict = await observe({
      git: makeGit({ reachable: [MINE] }),
      readPushLog: pushLog([pushed(BASE_REF, MINE), pushed(BASE_REF, MINE)])
    });

    expect(verdict.record?.shas).toEqual([MINE]);
  });
});

describe('base-drift distinguishes an absent record from an empty one', () => {
  // The migration boundary: an attempt dispatched before the hook wrote a log
  // must not read as "pushed nothing" — that would retire the invariant for
  // every legacy attempt silently.
  test('records push_log_absent rather than clearing the attempt', async () => {
    const verdict = await observe({ readPushLog: noPushLog() });

    expect(verdict).toEqual({
      violation: false,
      record: { pinned: PINNED, observed: MOVED, error: 'push_log_absent' }
    });
  });

  test('treats a throwing read the same way', async () => {
    const verdict = await observe({
      readPushLog: vi.fn(() => {
        throw new Error('EACCES');
      })
    });

    expect(verdict.record).toEqual({
      pinned: PINNED,
      observed: MOVED,
      error: 'push_log_absent'
    });
  });
});

describe('base-drift never turns an observation failure into a verdict', () => {
  test('records a failed reachability query without flagging', async () => {
    const verdict = await observe({
      git: makeGit({ code: 128 }),
      readPushLog: pushLog([pushed(BASE_REF, MINE)])
    });

    expect(verdict).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        pushed: [MINE],
        error: 'reachability:merge_base'
      }
    });
  });

  test('records a throwing reachability query without flagging', async () => {
    const verdict = await observe({
      git: vi.fn(async () => {
        throw new Error('git missing');
      }),
      readPushLog: pushLog([pushed(BASE_REF, MINE)])
    });

    expect(verdict.violation).toBe(false);
    expect(verdict.record?.error).toBe('reachability:merge_base');
  });
});

describe('base-drift honors the docs-only exemption (UI-7ufi §2.4)', () => {
  /**
   * One push line the prevention layer let through, or one carrying an
   * `exempt` value this layer does not know.
   *
   * @param {string} local_oid
   * @param {string} [value]
   */
  function exempted(local_oid, value = 'docs_only') {
    return { ...pushed(BASE_REF, local_oid), exempt: value };
  }

  test('clears an exempted base push and preserves it as an artifact push', async () => {
    const verdict = await observe({
      git: makeGit({ reachable: [MINE] }),
      readPushLog: pushLog([exempted(MINE)])
    });

    expect(verdict).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: false,
        pushed: [],
        artifact_pushed: [MINE]
      }
    });
  });

  test('flags only the non-exempt oid when the record mixes both', async () => {
    const verdict = await observe({
      git: makeGit({ reachable: [MINE, FOREIGN] }),
      readPushLog: pushLog([exempted(MINE), pushed(BASE_REF, FOREIGN)])
    });

    expect(verdict).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'direct_push',
        pushed: [FOREIGN],
        shas: [FOREIGN],
        artifact_pushed: [MINE]
      }
    });
  });

  test('treats an unknown exempt value as an ordinary landing candidate', async () => {
    const verdict = await observe({
      git: makeGit({ reachable: [MINE] }),
      readPushLog: pushLog([exempted(MINE, 'something_else')])
    });

    expect(verdict.violation).toBe(true);
    expect(verdict.record).toEqual({
      pinned: PINNED,
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [MINE],
      shas: [MINE]
    });
  });

  test('asks git nothing when every base push was exempted', async () => {
    const git = makeGit({ reachable: [MINE] });

    await observe({ git, readPushLog: pushLog([exempted(MINE)]) });

    expect(git).not.toHaveBeenCalled();
  });
});
