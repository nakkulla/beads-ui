import path from 'node:path';
import { describe, expect, test } from 'vitest';
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
            format.includes(`#{${row.marker}}`) ? row.key : '',
            row.dead
          ].join('\t')
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

/**
 * A file system that knows about exactly one Claude transcript.
 *
 * @param {{ present?: boolean }} [options]
 */
function makeFs(options = {}) {
  const dir = path.join(HOME, '.claude', 'projects', 'proj');
  const file = path.join(dir, `${SESSION_ID}.jsonl`);
  return {
    /** @param {string} p */
    readdirSync(p) {
      if (p === path.join(HOME, '.claude', 'projects')) {
        return ['proj'];
      }
      throw new Error(`ENOENT ${p}`);
    },
    /** @param {string} p */
    statSync(p) {
      if (options.present !== false && p === file) {
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
 * @param {{ tmux?: ReturnType<typeof makeTmux>, metadata?: any, present?: boolean, readIssue?: any }} [input]
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
    statFile: () => ({ mtimeMs: 0 }),
    now: () => 0,
    sessionRefOptions: {
      home_dir: HOME,
      hostname: HOST,
      fs: /** @type {any} */ (makeFs({ present: input.present !== false }))
    }
  });
  return { tmux, resolver };
}

describe('resolveFailureContext (UI-jw27 §4)', () => {
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

    expect(outcome.command).toBe(
      `claude --resume '${SESSION_ID}' --fork-session`
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
    expect(wrapper).toBe(
      `tmux set-option -p @bdui_resolve_bead '${BEAD}' && exec ` +
        `'/usr/local/bin/claude' '--resume' '${SESSION_ID}' '--fork-session' ` +
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

  test('falls back with provider_mismatch on a codex session_ref', async () => {
    const { resolver } = makeLauncher({
      metadata: { session_ref: `codex:${SESSION_ID}@${HOST}` }
    });

    const outcome = await resolver.resolve({
      workspace: REPO,
      repo: REPO,
      bead_id: BEAD,
      failure: FAILURE
    });

    expect(outcome.fallback_reason).toBe('provider_mismatch');
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
