import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createQueueStore } from './queue-store.js';
import {
  SPEC_DRAFT_IDLE_LIMIT_HOURS,
  createSpecAuthoring,
  projectSpecAuthoring,
  specAuthoringState,
  specDraftInProgress,
  specDraftLimitAt
} from './spec-authoring.js';
import { SPEC_AUTHORING_PANE_MARKER } from './tmux-launcher.js';

const ROOT = '/tmp/spec-authoring-rig';
const B = 'UI-spec';
const O = 'UI-original';
const BLOCKERS = [{ id: B, rig: null, status: 'open' }];
const HOUR_MS = 3_600_000;
const UPDATED_AT = '2026-11-17T09:41:37Z';
const UPDATED_MS = Date.parse(UPDATED_AT);
const LIMIT_MS = UPDATED_MS + SPEC_DRAFT_IDLE_LIMIT_HOURS * HOUR_MS;
/** @type {string} */
let tmp;
/** @type {string|undefined} */
let prior_state;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'spec-authoring-'));
  prior_state = process.env.XDG_STATE_HOME;
  process.env.XDG_STATE_HOME = tmp;
});

afterEach(() => {
  if (prior_state === undefined) {
    delete process.env.XDG_STATE_HOME;
  } else {
    process.env.XDG_STATE_HOME = prior_state;
  }
  fs.rmSync(tmp, { recursive: true, force: true });
});

/** @param {Record<string, any>} [patch] */
function issue(patch = {}) {
  return {
    id: B,
    status: 'open',
    labels: [],
    metadata: { route: 'spec_backed' },
    ...patch
  };
}

/** @param {Record<string, any>} [patch] */
function judgment(patch = {}) {
  return {
    issue: issue(),
    queue: { queue: [], attempts: {} },
    ready: true,
    root: ROOT,
    blocks: true,
    ...patch
  };
}

/** @param {Record<string, any>} [overrides] */
function fixture(overrides = {}) {
  const store = createQueueStore({ now: () => 1000 });
  store.place(ROOT, {
    bead_id: O,
    expected_revision: store.snapshot(ROOT).revision
  });
  store.recordAdmission(ROOT, {
    bead_id: O,
    reason: 'prerequisite_unmet',
    blockers: BLOCKERS
  });
  /** @type {Record<string, any>} */
  const issues = {
    [B]: issue(),
    [O]: { id: O, notes: 'prerequisite: UI-spec의 설계가 필요함' }
  };
  const launcher = {
    listPanes: vi.fn(async () => ({ ok: true, rows: [] })),
    launch: vi.fn(async (/** @type {any} */ input) => ({
      session: 'launched',
      tmux_session: input.placement === 'user' ? 'personal' : 'inquiry',
      tmux_window: B,
      pane_id: '%1',
      placement: input.placement
    }))
  };
  const notifier = { conversationConfirm: vi.fn(async () => true) };
  const deps = {
    store,
    launcher,
    notifier,
    listRoots: () => [ROOT],
    readIssue: vi.fn(
      async (/** @type {string} */ root, /** @type {string} */ id) =>
        issues[id] || null
    ),
    readReady: vi.fn(async () => true),
    currentRunner: () => 'codex',
    conversationSettings: () => ({ fresh_runtime: 'inherit' }),
    autoLaunchEnabled: () => true,
    getConfig: () => ({
      worker_direction_inquiry: { enabled: true, tmux_session: 'inquiry' }
    }),
    existsSync: () => true,
    now: () => 1000,
    ...overrides
  };
  const create = (/** @type {any} */ patch = {}) =>
    createSpecAuthoring(/** @type {any} */ ({ ...deps, ...patch }));
  return {
    store,
    launcher,
    notifier,
    issues,
    deps,
    create,
    authoring: create()
  };
}

describe('prerequisite spec target judgment', () => {
  test('accepts an open unpublished spec_backed blocker with all four conditions', () => {
    const state = specAuthoringState(judgment());

    expect(state).toBe('spec_needed');
  });

  test.each(
    /** @type {Array<[string, Record<string, any>]>} */ ([
      ['blocks nothing', { blocks: false }],
      ['has no repository', { root: null }],
      [
        'waits for its own prerequisite',
        { issue: issue({ labels: ['spec-after-blocker'] }), ready: false }
      ],
      [
        'has an unreadable ready judgment',
        { issue: issue({ labels: ['spec-after-blocker'] }), ready: null }
      ],
      ...['quick_fix', 'full_plan', undefined].map((route) => [
        `has route ${route}`,
        { issue: issue({ metadata: { route } }) }
      ]),
      ...['in_progress', 'deferred', 'resolved', 'closed'].map((status) => [
        `has status ${status}`,
        { issue: issue({ status }) }
      ]),
      ['is a proxy gate', { issue: issue({ issue_type: 'gate' }) }],
      ['is deferred', { issue: issue({ defer: 'later' }) }],
      ['is queued', { queue: { queue: [{ bead_id: B }] } }],
      [
        'is running',
        { queue: { attempts: { a: { bead_id: B, status: 'running' } } } }
      ]
    ])
  )('rejects a blocker that %s', (_name, patch) => {
    const state = specAuthoringState(judgment(/** @type {any} */ (patch)));

    expect(state).toBeNull();
  });

  test('excludes a blocker whose spec is published', () => {
    const state = specAuthoringState(
      judgment({
        issue: issue({
          spec_id: 'docs/spec.md',
          metadata: {
            route: 'spec_backed',
            spec_review: `self@${'a'.repeat(40)}`
          }
        })
      })
    );

    expect(state).toBeNull();
  });
});

/** @param {Record<string, any>} [patch] */
function draft(patch = {}) {
  return issue({ spec_id: 'docs/spec.md', updated_at: UPDATED_AT, ...patch });
}

describe('spec draft in progress judgment', () => {
  test('holds a draft inside the idle limit', () => {
    const result = specDraftInProgress(draft(), LIMIT_MS - 1);

    expect(result).toBe(true);
  });

  test('releases a draft past the idle limit', () => {
    const result = specDraftInProgress(draft(), LIMIT_MS + 1);

    expect(result).toBe(false);
  });

  test('releases a draft exactly at the idle limit', () => {
    const result = specDraftInProgress(draft(), LIMIT_MS);

    expect(result).toBe(false);
  });

  test('reports the limit instant of a held draft', () => {
    const limit = specDraftLimitAt(draft(), UPDATED_MS);

    expect(limit).toBe(LIMIT_MS);
  });

  test('reports no limit instant once the draft is released', () => {
    const limit = specDraftLimitAt(draft(), LIMIT_MS);

    expect(limit).toBeNull();
  });

  test('ignores a Bead without spec evidence', () => {
    const result = specDraftInProgress(
      issue({ updated_at: UPDATED_AT }),
      UPDATED_MS
    );

    expect(result).toBe(false);
  });

  test('ignores a published spec', () => {
    const result = specDraftInProgress(
      draft({
        metadata: {
          route: 'spec_backed',
          spec_review: `self@${'a'.repeat(40)}`
        }
      }),
      UPDATED_MS
    );

    expect(result).toBe(false);
  });

  test('ignores a draft without updated_at', () => {
    const result = specDraftInProgress(
      draft({ updated_at: undefined }),
      UPDATED_MS
    );

    expect(result).toBe(false);
  });

  test.each(['not a time', '', null, 12345])(
    'ignores a draft whose updated_at is %j',
    (updated_at) => {
      const result = specDraftInProgress(draft({ updated_at }), UPDATED_MS);

      expect(result).toBe(false);
    }
  );

  test('holds a draft updated in the future', () => {
    const result = specDraftInProgress(draft(), UPDATED_MS - HOUR_MS);

    expect(result).toBe(true);
  });
});

describe('automatic prerequisite spec conversations', () => {
  test('deduplicates settlement and dispatch observations, including after restart', async () => {
    const h = fixture();
    h.store.appendAttempt(ROOT, {
      expected_revision: h.store.snapshot(ROOT).revision,
      attempt: {
        attempt_id: 'original-attempt',
        bead_id: O,
        repo: ROOT,
        status: 'waiting',
        cause: 'prerequisite_unmet',
        cause_detail: { blockers: BLOCKERS }
      }
    });

    await Promise.all([
      h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS }),
      h.create().observe({ workspace: ROOT, blockers: BLOCKERS })
    ]);
    const restarted = createQueueStore();
    await h
      .create({ store: restarted })
      .observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.launcher.launch).toHaveBeenCalledTimes(1);
    expect(h.notifier.conversationConfirm).toHaveBeenCalledTimes(1);
    expect(restarted.snapshot(ROOT).spec_authoring_launches[B]).toMatchObject({
      at: 1000,
      session: 'launched'
    });
  });

  test('notifies once without launching when the shared switch is off', async () => {
    const h = fixture({ autoLaunchEnabled: () => false });

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });
    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.launcher.launch).not.toHaveBeenCalled();
    expect(h.notifier.conversationConfirm).toHaveBeenCalledTimes(1);
    expect(h.store.snapshot(ROOT).spec_authoring_launches[B].reason).toBe(
      'disabled'
    );
  });

  test.each([
    { source: 'row', enabled: true },
    { source: 'pane', enabled: true },
    { source: 'row', enabled: false },
    { source: 'pane', enabled: false }
  ])(
    'silently skips a live $source conversation with auto launch $enabled',
    async ({ source, enabled }) => {
      const h = fixture({ autoLaunchEnabled: () => enabled });
      if (source === 'row') {
        h.store.recordInteractiveSession(ROOT, {
          bead_id: B,
          kind: 'inquiry',
          provider: 'claude',
          pane_id: '%2',
          tmux_session: 'user',
          tmux_window: B,
          launched_at: 10,
          state: 'live'
        });
      } else {
        h.launcher.listPanes.mockResolvedValue(
          /** @type {any} */ ({
            ok: true,
            rows: [{ key: B, dead: '0' }]
          })
        );
      }

      await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

      expect(h.store.snapshot(ROOT).spec_authoring_launches).toEqual({});
      expect(h.store.snapshot(ROOT).conversation_refusals).toEqual({});
      expect(h.launcher.launch).not.toHaveBeenCalled();
      expect(h.notifier.conversationConfirm).not.toHaveBeenCalled();
    }
  );

  test('launches on a later observation after the live pane disappears', async () => {
    const h = fixture();
    h.launcher.listPanes.mockResolvedValueOnce(
      /** @type {any} */ ({ ok: true, rows: [{ key: B, dead: '0' }] })
    );

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });
    await h.create().observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.launcher.launch).toHaveBeenCalledTimes(1);
    expect(h.notifier.conversationConfirm).toHaveBeenCalledTimes(1);
    expect(h.store.snapshot(ROOT).spec_authoring_launches[B]).toMatchObject({
      session: 'launched'
    });
  });

  test.each(['tmux_unavailable', 'error'])(
    'retains a failed %s launch without an automatic retry',
    async (reason) => {
      const h = fixture();
      if (reason === 'tmux_unavailable') {
        h.launcher.listPanes.mockResolvedValue(
          /** @type {any} */ ({ ok: false })
        );
      } else {
        h.launcher.launch.mockRejectedValue(new Error('spawn failed'));
      }

      await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });
      await h
        .create({ store: createQueueStore() })
        .observe({ workspace: ROOT, blockers: BLOCKERS });

      expect(h.store.snapshot(ROOT).spec_authoring_launches[B]).toMatchObject({
        session: 'not_launched',
        reason
      });
      expect(h.store.snapshot(ROOT).conversation_refusals[B]).toMatchObject({
        kind: 'spec_authoring',
        reason
      });
      expect(h.notifier.conversationConfirm).toHaveBeenCalledTimes(1);
    }
  );

  test('rejudges a failed lookup on the next observation', async () => {
    const h = fixture();
    h.deps.readIssue.mockRejectedValueOnce(new Error('rig unreadable'));

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });
    expect(h.store.snapshot(ROOT).spec_authoring_launches).toEqual({});
    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.launcher.launch).toHaveBeenCalledTimes(1);
  });

  test.each(['quick_fix', 'full_plan', undefined, 'published'])(
    'omits launch and notification for %s',
    async (route) => {
      const h = fixture();
      h.issues[B] =
        route === 'published'
          ? issue({
              spec_id: 'spec.md',
              metadata: {
                route: 'spec_backed',
                spec_review: `self@${'b'.repeat(40)}`
              }
            })
          : issue({ metadata: { route } });

      await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

      expect(h.launcher.launch).not.toHaveBeenCalled();
      expect(h.notifier.conversationConfirm).not.toHaveBeenCalled();
    }
  );

  test('opens fresh at B root and preserves the original attempt and queue slot', async () => {
    const h = fixture();
    h.store.appendAttempt(ROOT, {
      expected_revision: h.store.snapshot(ROOT).revision,
      attempt: {
        attempt_id: 'kept',
        bead_id: O,
        repo: ROOT,
        status: 'waiting',
        cause: 'prerequisite_unmet',
        session_id: 'original-session',
        cause_detail: { blockers: BLOCKERS }
      }
    });
    const before = h.store.snapshot(ROOT);

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });
    const after = h.store.snapshot(ROOT);

    expect(after.attempts).toEqual(before.attempts);
    expect(after.queue).toEqual(before.queue);
    expect(after.admission).toEqual(before.admission);
    expect(h.launcher.launch).toHaveBeenCalledWith(
      expect.objectContaining({
        marker: SPEC_AUTHORING_PANE_MARKER,
        key: B,
        cwd: ROOT,
        runner: 'codex',
        placement: 'inquiry',
        commandArgs: [expect.stringContaining(`- 대상 Bead: ${B}`)]
      })
    );
    expect(h.launcher.launch.mock.calls[0][0].commandArgs[0]).toContain(
      `${ROOT}/.worktrees/${O}`
    );
    expect(h.launcher.launch.mock.calls[0][0].commandArgs[0]).toContain(
      '- 열린 경로: 자동'
    );
    expect(after.interactive_sessions[`${B}:spec_authoring`]).toMatchObject({
      mode: 'fresh',
      attempt_id: null,
      conversation: null
    });
  });

  test('uses the foreign prerequisite resolver for the owning root', async () => {
    const h = fixture();
    const foreign_root = '/tmp/spec-authoring-foreign';
    const blockers = [{ id: B, rig: 'foreign', status: 'open' }];
    h.store.recordAdmission(ROOT, {
      bead_id: O,
      reason: 'prerequisite_unmet',
      blockers
    });
    const resolveForeign = vi.fn(async () => ({
      ok: true,
      owner_root: foreign_root
    }));

    await h.create({ resolveForeign }).observe({ workspace: ROOT, blockers });

    expect(resolveForeign).toHaveBeenCalledWith(B, ROOT);
    expect(h.launcher.launch).toHaveBeenCalledWith(
      expect.objectContaining({ cwd: foreign_root, key: B })
    );
    expect(
      h.store.snapshot(foreign_root).spec_authoring_launches[B]
    ).toBeDefined();
    expect(h.store.snapshot(ROOT).spec_authoring_launches).toEqual({});
  });
});

describe('deferring a draft that is still being written', () => {
  /**
   * @param {Record<string, any>} [overrides]
   * @returns {ReturnType<typeof fixture> & { clock: { now: number }, hooks: { onDraftDeferred: ReturnType<typeof vi.fn>, onDraftSettled: ReturnType<typeof vi.fn> } }}
   */
  function draftFixture(overrides = {}) {
    const clock = { now: UPDATED_MS + 4 * 60_000 };
    const hooks = { onDraftDeferred: vi.fn(), onDraftSettled: vi.fn() };
    const h = fixture({ now: () => clock.now, ...hooks, ...overrides });
    h.issues[B] = draft();
    return { ...h, clock, hooks };
  }

  test('skips every launch side effect for a spec_id written four minutes ago', async () => {
    const h = draftFixture();

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.launcher.launch).not.toHaveBeenCalled();
    expect(h.notifier.conversationConfirm).not.toHaveBeenCalled();
    expect(h.store.snapshot(ROOT).spec_authoring_launches).toEqual({});
    expect(h.store.snapshot(ROOT).conversation_refusals).toEqual({});
  });

  test('skips the disabled notification while the draft is in progress', async () => {
    const h = draftFixture({ autoLaunchEnabled: () => false });

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.notifier.conversationConfirm).not.toHaveBeenCalled();
    expect(h.store.snapshot(ROOT).spec_authoring_launches).toEqual({});
    expect(h.store.snapshot(ROOT).conversation_refusals).toEqual({});
  });

  test('reports the deferral with the limit instant', async () => {
    const h = draftFixture();

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.hooks.onDraftDeferred).toHaveBeenCalledExactlyOnceWith({
      workspace: ROOT,
      root: ROOT,
      blocker: BLOCKERS[0],
      until_ms: LIMIT_MS
    });
    expect(h.hooks.onDraftSettled).not.toHaveBeenCalled();
  });

  test('opens once after the idle limit and not on a third observation', async () => {
    const h = draftFixture();

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });
    h.clock.now = LIMIT_MS;
    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });
    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.launcher.launch).toHaveBeenCalledTimes(1);
    expect(h.notifier.conversationConfirm).toHaveBeenCalledTimes(1);
    expect(h.store.snapshot(ROOT).spec_authoring_launches[B]).toMatchObject({
      session: 'launched'
    });
  });

  test('releases the wake-up when the draft is no longer deferred', async () => {
    const h = draftFixture();
    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    h.clock.now = LIMIT_MS;
    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.hooks.onDraftSettled).toHaveBeenCalledWith({
      root: ROOT,
      bead_id: B
    });
  });

  test('keeps the wake-up when the prerequisite read fails', async () => {
    const h = draftFixture();
    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });
    delete h.issues[B];

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.hooks.onDraftSettled).not.toHaveBeenCalled();
  });

  test('releases the wake-up once a review receipt lands', async () => {
    const h = draftFixture();
    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });
    h.issues[B] = draft({
      metadata: {
        route: 'spec_backed',
        spec_review: `self@${'c'.repeat(40)}`
      }
    });

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.hooks.onDraftSettled).toHaveBeenCalledExactlyOnceWith({
      root: ROOT,
      bead_id: B
    });
  });

  test('does nothing after a review receipt lands during the deferral', async () => {
    const h = draftFixture();
    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });
    h.issues[B] = draft({
      metadata: {
        route: 'spec_backed',
        spec_review: `self@${'c'.repeat(40)}`
      }
    });
    h.clock.now = LIMIT_MS;

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.launcher.launch).not.toHaveBeenCalled();
    expect(h.notifier.conversationConfirm).not.toHaveBeenCalled();
    expect(h.store.snapshot(ROOT).spec_authoring_launches).toEqual({});
  });

  test('opens at once for a Bead without spec evidence', async () => {
    const h = draftFixture();
    h.issues[B] = issue({ updated_at: UPDATED_AT });

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.launcher.launch).toHaveBeenCalledTimes(1);
    expect(h.hooks.onDraftDeferred).not.toHaveBeenCalled();
  });

  test('opens at once for a draft whose updated_at is unreadable', async () => {
    const h = draftFixture();
    h.issues[B] = draft({ updated_at: 'garbled' });

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.launcher.launch).toHaveBeenCalledTimes(1);
    expect(h.notifier.conversationConfirm).toHaveBeenCalledTimes(1);
  });

  test('notifies only for an unreadable draft while the switch is off', async () => {
    const h = draftFixture({ autoLaunchEnabled: () => false });
    h.issues[B] = draft({ updated_at: 'garbled' });

    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    expect(h.launcher.launch).not.toHaveBeenCalled();
    expect(h.notifier.conversationConfirm).toHaveBeenCalledTimes(1);
  });
});

describe('spec conversation clicks', () => {
  test('opens a draft that is still in progress', async () => {
    const h = fixture({ now: () => UPDATED_MS + 4 * 60_000 });
    h.issues[B] = draft();

    const result = await h.authoring.launchForClick({
      workspace: ROOT,
      bead_id: B
    });

    expect(result.launched).toBe(true);
  });

  test('opens without an attempt while the automatic switch is off', async () => {
    const h = fixture({ autoLaunchEnabled: () => false });

    const result = await h.authoring.launchForClick({
      workspace: ROOT,
      bead_id: B
    });

    expect(result.launched).toBe(true);
    expect(h.launcher.launch).toHaveBeenCalledWith(
      expect.objectContaining({ placement: 'user' })
    );
    expect(h.launcher.launch.mock.calls[0][0].commandArgs[0]).toContain(
      '- 열린 경로: 클릭'
    );
    expect(h.store.snapshot(ROOT).spec_authoring_launches).toEqual({});
    expect(h.notifier.conversationConfirm).not.toHaveBeenCalled();
  });

  test('opens after an automatic record has already been consumed', async () => {
    const h = fixture({ autoLaunchEnabled: () => false });
    await h.authoring.observe({ workspace: ROOT, blockers: BLOCKERS });

    const result = await h.authoring.launchForClick({
      workspace: ROOT,
      bead_id: B
    });

    expect(result.launched).toBe(true);
    expect(h.store.snapshot(ROOT).spec_authoring_launches[B].reason).toBe(
      'disabled'
    );
  });

  test('refuses a live conversation of another kind on B', async () => {
    const h = fixture();
    h.store.recordInteractiveSession(ROOT, {
      bead_id: B,
      kind: 'inquiry',
      provider: 'claude',
      pane_id: '%2',
      tmux_session: 'user',
      tmux_window: B,
      launched_at: 10,
      state: 'live'
    });

    const result = await h.authoring.launchForClick({
      workspace: ROOT,
      bead_id: B
    });

    expect(result).toMatchObject({
      launched: false,
      reason: 'live_conversation'
    });
    expect(h.launcher.launch).not.toHaveBeenCalled();
  });

  test('refuses a non-target Bead', async () => {
    const h = fixture();
    h.issues[B].metadata.route = 'quick_fix';

    const result = await h.authoring.launchForClick({
      workspace: ROOT,
      bead_id: B
    });

    expect(result).toMatchObject({ launched: false, reason: 'not_target' });
    expect(h.launcher.launch).not.toHaveBeenCalled();
  });

  test('refuses a blocker whose spec is published', async () => {
    const h = fixture();
    h.issues[B] = issue({
      spec_id: 'spec.md',
      metadata: { route: 'spec_backed', spec_review: `self@${'f'.repeat(40)}` }
    });

    const result = await h.authoring.launchForClick({
      workspace: ROOT,
      bead_id: B
    });

    expect(result).toMatchObject({ launched: false, reason: 'not_target' });
  });

  test('refuses unknown_runner instead of launching claude for an unregistered inherited runner', async () => {
    const h = fixture({ currentRunner: () => 'agy' });

    const result = await h.authoring.launchForClick({
      workspace: ROOT,
      bead_id: B
    });

    expect(result).toMatchObject({ launched: false, reason: 'unknown_runner' });
    expect(h.launcher.launch).not.toHaveBeenCalled();
  });

  test('refuses unknown_runner when the wired resolver yields no runner', async () => {
    const h = fixture({ currentRunner: () => null });

    const result = await h.authoring.launchForClick({
      workspace: ROOT,
      bead_id: B
    });

    expect(result).toMatchObject({ launched: false, reason: 'unknown_runner' });
    expect(h.launcher.launch).not.toHaveBeenCalled();
  });

  test('launches claude for an inherited claude runner', async () => {
    const h = fixture({ currentRunner: () => 'claude' });

    await h.authoring.launchForClick({ workspace: ROOT, bead_id: B });

    expect(h.launcher.launch).toHaveBeenCalledWith(
      expect.objectContaining({ runner: 'claude' })
    );
  });
});

describe('spec card projections', () => {
  test('projects spec_needed on B and the queued original', () => {
    const h = fixture();

    const projection = projectSpecAuthoring({
      workspace: ROOT,
      roots: [ROOT],
      snapshot: () => h.store.snapshot(ROOT),
      issue: () => issue(),
      ready: () => true,
      owner: () => ROOT
    });

    expect(projection[B]).toMatchObject([
      { bead_id: B, root_dir: ROOT, state: 'spec_needed' }
    ]);
    expect(projection[O]).toEqual(projection[B]);
  });
});
