import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  buildResolvePrompt,
  createResolveSession,
  resolveFailureContext
} from './resolve-session.js';

const BEAD = 'UI-jw27';
const REPO = '/tmp/example-workspace/project-a';
const HOST = 'test-host';
const SESSION_ID = 'ff11a2b3-4c5d-6e7f-8091-a2b3c4d5e6f7';
const HOME = '/tmp/fake-home';

let codex_home = '';
beforeEach(() => {
  codex_home = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-resolve-codex-'));
  vi.stubEnv('CODEX_HOME', codex_home);
});
afterEach(() => {
  vi.unstubAllEnvs();
  fs.rmSync(codex_home, { recursive: true, force: true });
});

/**
 * A marker-aware fake tmux. A pane row carries the marker it was written with,
 * and a listing only reports that pane's key when the `-F` format asks for the
 * SAME marker — which is what makes "the two session kinds do not share a
 * duplicate guard" testable at all.
 *
 * @param {{ panes?: Array<{ session?: string, pane?: string, marker?: string, key?: string, dead?: string }>, new_window?: { code: number, stdout?: string } }} [script]
 */
function makeTmux(script = {}) {
  /** @type {string[][]} */
  const calls = [];
  /** @type {Array<{ session: string, pane: string, marker: string, key: string, dead: string }>} */
  const panes = (script.panes ?? []).map((row) => ({
    session: row.session ?? 'bdui-inquiry',
    pane: row.pane ?? '%1',
    marker: row.marker ?? '',
    key: row.key ?? '',
    dead: row.dead ?? '0'
  }));
  /**
   * @param {string[]} args
   */
  const runTmux = async (args) => {
    calls.push(args);
    if (args[0] === 'list-panes') {
      const format = args[args.indexOf('-F') + 1];
      const body = panes
        .map((row) =>
          [
            row.session,
            row.pane,
            row.dead,
            format.includes(`#{${row.marker}}`) ? row.key : ''
          ].join(':')
        )
        .join('\n');
      return {
        code: 0,
        stdout: body.length > 0 ? `${body}\n` : '',
        stderr: ''
      };
    }
    if (args[0] === 'new-session') {
      return { code: 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'new-window') {
      const opened = { code: 0, stdout: '%9\n', ...(script.new_window ?? {}) };
      if (opened.code === 0) {
        panes.push({
          session: 'bdui-inquiry',
          pane: '%9',
          marker: '@bdui_resolve_bead',
          key: BEAD,
          dead: '0'
        });
      }
      return { ...opened, stderr: '' };
    }
    return { code: 1, stdout: '', stderr: 'unknown command' };
  };
  return { calls, runTmux, names: () => calls.map((c) => c[0]) };
}

const CODEX_ROLLOUT = `rollout-2026-09-08T00-00-00-${SESSION_ID}.jsonl`;

/**
 * A file system that knows about exactly one Claude transcript, and — when
 * `codex` is asked for — one codex rollout for the same id.
 *
 * @param {{ present?: boolean, codex?: boolean }} [options]
 */
function makeFs(options = {}) {
  const dir = path.join(HOME, '.claude', 'projects', 'proj');
  const file = path.join(dir, `${SESSION_ID}.jsonl`);
  const codex_root = path.join(HOME, '.codex', 'sessions');
  return {
    /** @param {string} p */
    readdirSync(p) {
      if (p === path.join(HOME, '.claude', 'projects')) {
        return ['proj'];
      }
      if (options.codex === true && p.startsWith(codex_root)) {
        return [CODEX_ROLLOUT];
      }
      throw new Error(`ENOENT ${p}`);
    },
    /** @param {string} p */
    statSync(p) {
      if (options.present !== false && p === file) {
        return { mtimeMs: 1_700_000_000_000 };
      }
      if (options.codex === true && path.basename(p) === CODEX_ROLLOUT) {
        return { mtimeMs: 1_700_000_000_000 };
      }
      throw new Error(`ENOENT ${p}`);
    }
  };
}

const FAILURE = {
  failure_class: '배포 실패',
  reason: 'deploy_script_failure',
  stage: 'repo_operations',
  detail: null
};

/**
 * @param {{ tmux?: ReturnType<typeof makeTmux>, metadata?: any, present?: boolean, readIssue?: any, codex?: boolean, resolveRunner?: (runner: string) => string|null, currentRunner?: () => 'claude'|'codex'|null, store?: import('./resolve-session.js').ResolveSessionDeps['store'] }} [input]
 */
function makeLauncher(input = {}) {
  const tmux = input.tmux ?? makeTmux();
  const resolver = createResolveSession({
    getConfig: () => ({ worker_direction_inquiry: { enabled: false } }),
    bd: {
      readIssue:
        input.readIssue ??
        (async () => ({ id: BEAD, metadata: input.metadata ?? {} }))
    },
    runTmux: tmux.runTmux,
    resolveClaude: () => '/usr/local/bin/claude',
    resolveRunner:
      input.resolveRunner ??
      ((/** @type {string} */ runner) =>
        runner === 'claude' || runner === 'codex'
          ? `/usr/local/bin/${runner}`
          : null),
    statFile: () => ({ mtimeMs: 0 }),
    now: () => 0,
    store: input.store,
    ...(input.currentRunner ? { currentRunner: input.currentRunner } : {}),
    sessionRefOptions: {
      home_dir: HOME,
      hostname: HOST,
      fs: /** @type {any} */ (
        makeFs({
          present: input.present !== false,
          codex: input.codex === true
        })
      )
    }
  });
  return { tmux, resolver };
}

describe('resolveFailureContext (UI-jw27 §4)', () => {
  test('reads a holding intent as a fix-commit exit', () => {
    const queue = {
      completion_intents: {
        [BEAD]: {
          phase: 'holding',
          hold: {
            reason: 'script_failed',
            summary: 'build failed',
            log_path: '/logs/verify.log'
          }
        }
      }
    };

    const context = resolveFailureContext(queue, BEAD);

    expect(context).toEqual({
      failure_class: '머지 전 검증 실패',
      reason: 'script_failed',
      stage: 'verify',
      detail: 'build failed · 로그 /logs/verify.log',
      exit: 'fix_commit_push'
    });
  });

  test('omits absent holding detail', () => {
    const queue = {
      completion_intents: {
        [BEAD]: { phase: 'holding', hold: { reason: 'script_failed' } }
      }
    };

    const context = resolveFailureContext(queue, BEAD);

    expect(context?.detail).toBeNull();
  });
  test('reads a needs_human completion terminal as its stage class', () => {
    const queue = {
      completion_intents: {
        [BEAD]: {
          phase: 'needs_human',
          terminal_reason: {
            reason: 'deploy_script_failure',
            stage: 'repo_operations',
            evidence: 'exit 1'
          }
        }
      }
    };

    const context = resolveFailureContext(queue, BEAD);

    expect(context).toEqual({
      failure_class: '배포 실패',
      reason: 'deploy_script_failure',
      stage: 'repo_operations',
      detail: 'exit 1'
    });
  });

  test('prefers the completion terminal over the cleanup record it wrote', () => {
    const queue = {
      completion_intents: {
        [BEAD]: {
          phase: 'needs_human',
          terminal_reason: {
            reason: 'post_merge_job_failed',
            stage: 'post_merge_jobs'
          }
        }
      },
      cleanup_failed: { [BEAD]: { step: 'post_merge_jobs', reason: 'x' } }
    };

    const context = resolveFailureContext(queue, BEAD);

    expect(context?.failure_class).toBe('post-merge 잡 실패');
  });

  test('reads a stopped cleanup as 정리 중단', () => {
    const queue = {
      cleanup_failed: {
        [BEAD]: {
          step: 'child_sweep',
          reason: 'child_close_failed',
          detail: 'RD-1.1'
        }
      }
    };

    const context = resolveFailureContext(queue, BEAD);

    expect(context).toEqual({
      failure_class: '정리 중단',
      reason: 'child_close_failed',
      stage: 'child_sweep',
      detail: 'RD-1.1'
    });
  });

  test('reads a failed discard operation as 폐기 실패', () => {
    const queue = {
      discard_operations: {
        op1: {
          bead_id: BEAD,
          phase: 'closing_pr',
          last_error: 'pr_close_failed',
          requested_at: 5
        }
      }
    };

    const context = resolveFailureContext(queue, BEAD);

    expect(context?.failure_class).toBe('폐기 실패');
  });

  test('reads the latest implementation park as 파킹', () => {
    const queue = {
      attempts: {
        old: {
          bead_id: BEAD,
          status: 'failed'
        },
        review: {
          bead_id: BEAD,
          kind: 'review_session',
          status: 'parked',
          cause_detail: { awaiting_user: 'ignored' }
        },
        parked: {
          bead_id: BEAD,
          kind: 'implementation',
          status: 'parked',
          cause_detail: {
            awaiting_user: 'impl_review_conflict:design',
            summary: '구현과 설계가 충돌함'
          }
        }
      }
    };

    const context = resolveFailureContext(queue, BEAD);

    expect(context).toEqual({
      failure_class: '파킹',
      reason: 'impl_review_conflict:design',
      stage: null,
      detail: '구현과 설계가 충돌함'
    });
  });

  test('prefers a discard failure over a parked attempt', () => {
    const queue = {
      discard_operations: {
        op1: {
          bead_id: BEAD,
          phase: 'closing_pr',
          last_error: 'pr_close_failed',
          requested_at: 5
        }
      },
      attempts: {
        parked: {
          bead_id: BEAD,
          status: 'parked',
          cause_detail: { awaiting_user: 'generic' }
        }
      }
    };

    const context = resolveFailureContext(queue, BEAD);

    expect(context?.failure_class).toBe('폐기 실패');
  });

  test('ignores an abandoned discard failure', () => {
    const queue = {
      discard_operations: {
        op1: {
          bead_id: BEAD,
          phase: 'abandoned',
          last_error: 'pr_close_failed',
          requested_at: 5
        }
      }
    };

    const context = resolveFailureContext(queue, BEAD);

    expect(context).toBeNull();
  });

  test('returns null for a bead with no terminal failure', () => {
    const queue = {
      completion_intents: { [BEAD]: { phase: 'cleaning' } },
      cleanup_failed: {},
      discard_operations: {}
    };

    expect(resolveFailureContext(queue, BEAD)).toBeNull();
  });
});

describe('buildResolvePrompt (UI-jw27 §4)', () => {
  test.each([null, 'no_session_ref'])(
    'explains the held PR exit with fallback %s',
    (fallback_reason) => {
      const failure = {
        ...FAILURE,
        exit: /** @type {const} */ ('fix_commit_push')
      };

      const prompt = buildResolvePrompt({
        bead_id: BEAD,
        failure,
        checkout: REPO,
        fallback_reason
      });

      expect(prompt).toContain(
        `이 세션이 맡았던 Bead ${BEAD}의 PR이 머지 전 검증에 실패해 보류 중입니다. 수정 커밋을 같은 브랜치에 push하면 Worker가 자동으로 재검증·머지합니다.`
      );
      expect(prompt).toContain(
        '2. 고칠 수 있는 원인이면 고쳐서 같은 브랜치에 push한다 — 재검증과 머지는 Worker가 자동으로 잇는다.'
      );
      expect(prompt).toContain(
        '금지: 머지·폐기 실행 · Worker 큐 상태 직접 편집 · 실패 기록 삭제.'
      );
      if (fallback_reason) {
        expect(prompt).toContain(`bd show ${BEAD} --json`);
      }
    }
  );

  test.each([undefined, 'fix_commit_push'])(
    'includes attempt-continuation guidance for exit %s',
    (exit) => {
      const failure = {
        ...FAILURE,
        exit: /** @type {'fix_commit_push'|undefined} */ (exit)
      };

      const prompt = buildResolvePrompt({
        bead_id: BEAD,
        failure,
        checkout: REPO,
        fallback_reason: null
      });

      expect(prompt).toContain(
        '이 세션은 Worker attempt를 이어받은 승계 세션이다 — workflow `Attempt continuation`대로 `impl_entry`·`plan_approval`을 쓰지 않고 `workflow_mode=fast_track`으로 잇는다.'
      );
    }
  );
  test('states the class, cause code and bead id', () => {
    const prompt = buildResolvePrompt({
      bead_id: BEAD,
      failure: FAILURE,
      checkout: REPO,
      fallback_reason: null
    });

    expect(prompt).toContain(`Bead ${BEAD}`);
    expect(prompt).toContain('- 클래스: 배포 실패');
    expect(prompt).toContain('- 원인 코드: deploy_script_failure');
  });

  test('names the refused fork in a fallback prompt', () => {
    const prompt = buildResolvePrompt({
      bead_id: BEAD,
      failure: FAILURE,
      checkout: REPO,
      fallback_reason: 'no_session_ref'
    });

    expect(prompt).toContain('no_session_ref');
  });
});

describe('createResolveSession (UI-jw27 §4)', () => {
  test('records the attempt fork with the UUID passed to claude', async () => {
    const recordInteractiveSession = vi.fn();
    const { resolver, tmux } = makeLauncher({
      metadata: { session_ref: 'codex:missing@box' },
      store: { recordInteractiveSession }
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      bead_id: BEAD,
      failure: FAILURE,
      attempt: { attempt_id: 'a1', runner: 'claude', session_id: SESSION_ID }
    });

    const wrapper = tmux.calls.find((call) => call[0] === 'new-window')?.at(-1);
    const launch_id = wrapper?.match(/'--session-id' '([^']+)'/)?.[1];
    expect(launch_id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
    expect(wrapper).toContain(
      `'--resume' '${SESSION_ID}' '--fork-session' '--session-id' '${launch_id}'`
    );
    expect(outcome.source).toBe('attempt');
    expect(recordInteractiveSession).toHaveBeenCalledExactlyOnceWith(REPO, {
      bead_id: BEAD,
      kind: 'resolve',
      provider: 'claude',
      session_id: launch_id,
      session_id_source: 'launch',
      mode: 'fork',
      source: 'attempt',
      forked_from: SESSION_ID,
      fallback_reason: null,
      attempt_id: 'a1',
      failure_class: FAILURE.failure_class,
      tmux_session: 'bdui-inquiry',
      tmux_window: `resolve-${BEAD}`,
      pane_id: '%9',
      cwd: REPO,
      launched_at: 0,
      last_seen_alive_at: 0,
      settled_at: null,
      settled_by: null,
      state: 'live',
      exit_requested_at: null,
      defer_since: null
    });
  });

  test('assigns a launch UUID to a fresh claude session', async () => {
    const recordInteractiveSession = vi.fn();
    const { resolver, tmux } = makeLauncher({
      store: { recordInteractiveSession }
    });

    await resolver.resolve({
      workspace: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    const record = recordInteractiveSession.mock.calls[0][1];
    expect(record).toMatchObject({
      mode: 'fresh',
      source: 'fresh',
      session_id_source: 'launch',
      forked_from: null,
      attempt_id: null
    });
    expect(
      tmux.calls.find((call) => call[0] === 'new-window')?.at(-1)
    ).toContain(
      `exec '/usr/local/bin/claude' '--session-id' '${record.session_id}'`
    );
  });

  test.each([true, false])(
    'leaves codex session identity unknown after launch with fork=%s',
    async (fork) => {
      const recordInteractiveSession = vi.fn();
      const { resolver, tmux } = makeLauncher({
        store: { recordInteractiveSession },
        codex: true,
        metadata: fork ? { session_ref: `codex:${SESSION_ID}@${HOST}` } : {},
        currentRunner: () => 'codex'
      });

      await resolver.resolve({
        workspace: REPO,
        bead_id: BEAD,
        failure: FAILURE
      });

      expect(recordInteractiveSession.mock.calls[0][1]).toMatchObject({
        provider: 'codex',
        session_id: null,
        session_id_source: null,
        mode: fork ? 'fork' : 'fresh'
      });
      const wrapper = tmux.calls
        .find((call) => call[0] === 'new-window')
        ?.at(-1);
      expect(wrapper).not.toContain('--session-id');
      expect(wrapper).toContain(
        fork
          ? `exec '/usr/local/bin/codex' 'fork' '${SESSION_ID}'`
          : `exec '/usr/local/bin/codex' 'Bead`
      );
    }
  );

  test('does not record a session that is already running', async () => {
    const recordInteractiveSession = vi.fn();
    const { resolver } = makeLauncher({
      store: { recordInteractiveSession },
      tmux: makeTmux({ panes: [{ key: BEAD, marker: '@bdui_resolve_bead' }] })
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect(outcome.session).toBe('already_running');
    expect(recordInteractiveSession).not.toHaveBeenCalled();
  });

  test('does not record a refused launch', async () => {
    const recordInteractiveSession = vi.fn();
    const { resolver } = makeLauncher({
      store: { recordInteractiveSession },
      tmux: makeTmux({ new_window: { code: 1 } })
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect(outcome.session).toBe('not_launched');
    expect(recordInteractiveSession).not.toHaveBeenCalled();
  });

  test('preserves a successful launch when recording throws', async () => {
    const { resolver } = makeLauncher({
      store: {
        recordInteractiveSession: () => {
          throw new Error('unavailable');
        }
      }
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect(outcome.session).toBe('launched');
  });

  test('explains settlement immediately after the continuation instruction', () => {
    const input = {
      bead_id: BEAD,
      failure: FAILURE,
      checkout: REPO,
      fallback_reason: null
    };

    const prompt = buildResolvePrompt(input);

    expect(prompt).toContain(
      '`workflow_mode=fast_track`으로 잇는다.\n이 Bead가 머지·close·폐기로 정산되면 Worker가 이 세션을 닫고(claude: `/exit`) Discord 스레드는 아카이브된다.'
    );
  });

  test('forks the recorded claude session', async () => {
    const { tmux, resolver } = makeLauncher({
      metadata: { session_ref: `claude:${SESSION_ID}@${HOST}` }
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    const wrapper = (tmux.calls.find((c) => c[0] === 'new-window') || []).at(
      -1
    );
    expect([outcome.launched, outcome.mode, outcome.fallback_reason]).toEqual([
      true,
      'fork',
      null
    ]);
    expect(wrapper).toContain(`--resume' '${SESSION_ID}' '--fork-session`);
  });

  test('reports the assembled resume command', async () => {
    const { resolver } = makeLauncher({
      metadata: { session_ref: `claude:${SESSION_ID}@${HOST}` }
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect(outcome.command).toMatch(
      new RegExp(
        `^claude --resume '${SESSION_ID}' --fork-session --session-id '[0-9a-f-]{36}'$`
      )
    );
  });

  test('writes the resolve marker before it execs claude', async () => {
    const { tmux, resolver } = makeLauncher({
      metadata: { session_ref: `claude:${SESSION_ID}@${HOST}` }
    });

    await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    const wrapper = (tmux.calls.find((c) => c[0] === 'new-window') || []).at(
      -1
    );
    const launch_id = wrapper?.match(/'--session-id' '([^']+)'/)?.[1];
    expect(wrapper).toBe(
      `tmux set-option -p -t "$TMUX_PANE" @bdui_resolve_bead '${BEAD}' && exec ` +
        `'/usr/local/bin/claude' '--resume' '${SESSION_ID}' '--fork-session' '--session-id' '${launch_id}' ` +
        `'${buildResolvePrompt({
          bead_id: BEAD,
          failure: FAILURE,
          checkout: REPO,
          fallback_reason: null
        })}'`
    );
  });

  test('falls back to a fresh session when no session_ref exists', async () => {
    const { tmux, resolver } = makeLauncher({ metadata: {} });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    const wrapper = (tmux.calls.find((c) => c[0] === 'new-window') || []).at(
      -1
    );
    expect([outcome.launched, outcome.mode, outcome.fallback_reason]).toEqual([
      true,
      'fresh',
      'no_session_ref'
    ]);
    expect(wrapper).not.toContain('--fork-session');
  });

  test('falls back with not_local when the transcript is on another machine', async () => {
    const { resolver } = makeLauncher({
      metadata: { session_ref: `claude:${SESSION_ID}@other-host` },
      present: false
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect([outcome.mode, outcome.fallback_reason]).toEqual([
      'fresh',
      'not_local'
    ]);
  });

  test('forks a recorded codex session with codex', async () => {
    const { resolver } = makeLauncher({
      metadata: { session_ref: `codex:${SESSION_ID}@${HOST}` },
      codex: true
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect({
      mode: outcome.mode,
      runner: outcome.runner,
      fallback_reason: outcome.fallback_reason
    }).toEqual({ mode: 'fork', runner: 'codex', fallback_reason: null });
  });

  test('keeps codex for a fresh session when the codex transcript is missing', async () => {
    const { resolver } = makeLauncher({
      metadata: { session_ref: `codex:${SESSION_ID}@${HOST}` },
      present: false
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect({
      mode: outcome.mode,
      runner: outcome.runner,
      fallback_reason: outcome.fallback_reason
    }).toEqual({
      mode: 'fresh',
      runner: 'codex',
      fallback_reason: 'not_local'
    });
  });

  test('refuses an unsafe recorded id without retargeting to claude', async () => {
    const { resolver } = makeLauncher({
      metadata: { session_ref: `codex:-danger@${HOST}` },
      codex: true
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect({
      mode: outcome.mode,
      runner: outcome.runner,
      fallback_reason: outcome.fallback_reason
    }).toEqual({
      mode: 'fresh',
      runner: 'codex',
      fallback_reason: 'unsafe_session_id'
    });
  });

  test('follows current execution settings when the bead names no session', async () => {
    const { resolver } = makeLauncher({
      metadata: {},
      currentRunner: () => 'codex'
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect({
      mode: outcome.mode,
      runner: outcome.runner,
      fallback_reason: outcome.fallback_reason
    }).toEqual({
      mode: 'fresh',
      runner: 'codex',
      fallback_reason: 'no_session_ref'
    });
  });

  test('runs the measured codex interactive fork argv', async () => {
    const { tmux, resolver } = makeLauncher({
      metadata: { session_ref: `codex:${SESSION_ID}@${HOST}` },
      codex: true
    });

    await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    const wrapper = tmux.calls.find((c) => c[0] === 'new-window')?.at(-1) ?? '';
    expect(wrapper).toContain(
      `exec '/usr/local/bin/codex' 'fork' '${SESSION_ID}'`
    );
  });

  test('keeps the claude fork argv for a recorded claude session', async () => {
    const { tmux, resolver } = makeLauncher({
      metadata: { session_ref: `claude:${SESSION_ID}@${HOST}` }
    });

    await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    const wrapper = tmux.calls.find((c) => c[0] === 'new-window')?.at(-1) ?? '';
    expect(wrapper).toContain(
      `exec '/usr/local/bin/claude' '--resume' '${SESSION_ID}' '--fork-session'`
    );
  });

  test('reports codex_not_found when the codex executable is missing', async () => {
    const { resolver } = makeLauncher({
      metadata: { session_ref: `codex:${SESSION_ID}@${HOST}` },
      codex: true,
      resolveRunner: (runner) =>
        runner === 'claude' ? '/usr/local/bin/claude' : null
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect(outcome.reason).toBe('launch_failed:codex_not_found');
  });

  test('names an unreadable bead as its own fallback reason', async () => {
    const { resolver } = makeLauncher({
      readIssue: async () => {
        throw new Error('bd exploded');
      }
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect(outcome.fallback_reason).toBe('bd_unavailable');
  });

  test('opens no second window while one resolution session is alive', async () => {
    const { tmux, resolver } = makeLauncher({
      tmux: makeTmux({
        panes: [
          { pane: '%3', marker: '@bdui_resolve_bead', key: BEAD, dead: '0' }
        ]
      })
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect(outcome.session).toBe('already_running');
    expect(tmux.names()).toEqual(['list-panes']);
  });

  test('opens one window for two concurrent clicks on the same bead', async () => {
    const { tmux, resolver } = makeLauncher();

    const [first, second] = await Promise.all([
      resolver.resolve({
        workspace: REPO,
        repo: REPO,
        bead_id: BEAD,
        failure: FAILURE
      }),
      resolver.resolve({
        workspace: REPO,
        repo: REPO,
        bead_id: BEAD,
        failure: FAILURE
      })
    ]);

    expect(
      tmux.names().filter((/** @type {string} */ name) => name === 'new-window')
    ).toHaveLength(1);
    expect([first.session, second.session].sort()).toEqual([
      'already_running',
      'launched'
    ]);
  });

  test('is not blocked by this bead direction-inquiry pane', async () => {
    const { tmux, resolver } = makeLauncher({
      tmux: makeTmux({
        panes: [
          { pane: '%3', marker: '@bdui_inquiry_bead', key: BEAD, dead: '0' }
        ]
      }),
      metadata: {}
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect(outcome.launched).toBe(true);
    expect(tmux.names()).toContain('new-window');
  });

  test('reports a tmux it could not reach without launching', async () => {
    const tmux = {
      calls: /** @type {string[][]} */ ([]),
      /** @param {string[]} args */
      runTmux: async (args) => {
        tmux.calls.push(args);
        return { code: 1, stdout: '', stderr: 'no server running' };
      },
      names: () => tmux.calls.map((c) => c[0])
    };
    const { resolver } = makeLauncher({ tmux: /** @type {any} */ (tmux) });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect([outcome.launched, outcome.reason]).toEqual([
      false,
      'tmux_unavailable'
    ]);
  });
});
