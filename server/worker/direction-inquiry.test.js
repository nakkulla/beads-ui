import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  CONVERSATION_ENTRY_BLOCK,
  createDirectionInquiry,
  fillConversationEntry,
  inquiryWrapper,
  parkSentence,
  recoverySentence,
  shellQuote,
  stopConversationReason
} from './direction-inquiry.js';

/**
 * Digest of the fenced `text` block under `## Worker 세션 대화` in dotfiles
 * `src/shared/skills/flow/workflow/references/execution-common.md` at commit
 * `9e04a76d966994048d2e2e948b277adbce141db1` (dotfiles-ids1k, UI-jbl1 §3.5),
 * taken over the block's inner content WITHOUT a trailing newline (3179
 * bytes). The two repositories are deliberately NOT compared at runtime: the
 * Worker `[verify]` checkout has no dotfiles path, so a cross-repo read would
 * be a test that never runs.
 */
const ENTRY_BLOCK_DIGEST =
  'c08b50d08a5f1eddd32934db725972f9ade06e6a9de8bc5a9816660bbba0ea53';

const BEAD = 'UI-7uid';
const AWAITING = 'spec_review_stale:revise';
const WORKTREE = `/repo/.worktrees/${BEAD}`;

let codex_home = '';
beforeEach(() => {
  codex_home = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-inquiry-codex-'));
  vi.stubEnv('CODEX_HOME', codex_home);
});
afterEach(() => {
  vi.unstubAllEnvs();
  fs.rmSync(codex_home, { recursive: true, force: true });
});

/**
 * A fake tmux runner. Records every argv and answers from a scripted table
 * keyed by the tmux command; the two `list-panes` reads (liveness, then marker
 * confirmation) can be scripted independently.
 *
 * `panes_seq` replaces the two-stage pair when a case needs more than two
 * reads — the click path probes the marker itself before the launcher's own
 * liveness read. The last entry repeats for any further `list-panes`.
 *
 * @param {{
 *   panes?: string[][],
 *   panes_after?: string[][],
 *   panes_seq?: string[][][],
 *   list_code?: number,
 *   new_session?: { code: number, stdout?: string, stderr?: string },
 *   new_window?: { code: number, stdout?: string, stderr?: string },
 *   sessions?: string,
 *   throw_on?: string
 * }} [script]
 */
function makeTmux(script = {}) {
  /** @type {string[][]} */
  const calls = [];
  let listed = 0;
  /**
   * @param {string[][]} rows
   * @returns {string}
   */
  const render = (rows) =>
    rows
      .map(([session, pane, key, dead]) => [session, pane, dead, key].join(':'))
      .join('\n') + (rows.length > 0 ? '\n' : '');
  /**
   * @param {string[]} args
   */
  const runTmux = async (args) => {
    calls.push(args);
    if (script.throw_on && args[0] === script.throw_on) {
      throw new Error(`tmux ${args[0]} exploded`);
    }
    if (args[0] === 'list-panes') {
      listed += 1;
      if (typeof script.list_code === 'number' && script.list_code !== 0) {
        return {
          code: script.list_code,
          stdout: '',
          stderr: 'no server running'
        };
      }
      const sequence = script.panes_seq;
      const rows = sequence
        ? (sequence[Math.min(listed, sequence.length) - 1] ?? [])
        : listed === 1
          ? (script.panes ?? [])
          : (script.panes_after ?? []);
      return { code: 0, stdout: render(rows), stderr: '' };
    }
    if (args[0] === 'new-session') {
      return { code: 0, stdout: '', stderr: '', ...(script.new_session ?? {}) };
    }
    if (args[0] === 'new-window') {
      return {
        code: 0,
        stdout: '%9\n',
        stderr: '',
        ...(script.new_window ?? {})
      };
    }
    if (args[0] === 'list-sessions' && script.sessions !== undefined) {
      return { code: 0, stdout: script.sessions, stderr: '' };
    }
    if (args[0] === 'select-window') {
      return { code: 0, stdout: '', stderr: '' };
    }
    return { code: 1, stdout: '', stderr: 'unknown command' };
  };
  /** @returns {string} */
  const wrapper = () =>
    calls.find((call) => call[0] === 'new-window')?.at(-1) ?? '';
  return { calls, runTmux, names: () => calls.map((c) => c[0]), wrapper };
}

/** A tmux script whose launch confirms the new pane. */
function launchingTmux() {
  return makeTmux({ panes_after: [['bdui-inquiry', '%9', BEAD, '0']] });
}

const NOTES = [
  '2026-08-28 재리뷰 시작.',
  'park: impl_review_conflict:design — 대상: ADR 12 — finding: major',
  `park: ${AWAITING} — 방향 충돌 · ADR 0012`,
  'rereview: direction_conflict — ADR 0012와 정면 충돌'
].join('\n');

/**
 * Fake transcript filesystem for session selection.
 *
 * @param {string[]} session_ids
 * @param {string[]} [codex_ids]
 */
function sessionFs(session_ids, codex_ids = []) {
  return {
    /** @param {string} file_path */
    readdirSync(file_path) {
      if (file_path === '/home/.claude/projects') {
        return ['project'];
      }
      if (
        codex_ids.length > 0 &&
        file_path.startsWith('/home/.codex/sessions')
      ) {
        return codex_ids.map(
          (session_id) => `rollout-2026-09-08T00-00-00-${session_id}.jsonl`
        );
      }
      throw new Error('ENOENT');
    },
    /** @param {string} file_path */
    statSync(file_path) {
      if (
        session_ids
          .concat(codex_ids)
          .some((session_id) => file_path.endsWith(`${session_id}.jsonl`))
      ) {
        return { mtimeMs: 1 };
      }
      throw new Error('ENOENT');
    }
  };
}

/** Session lookup options that find both providers' test transcripts. */
const SESSION_OPTIONS = {
  home_dir: '/home',
  hostname: 'host',
  fs: sessionFs(['claude-sid'], ['codex-sid'])
};

/**
 * @param {Record<string, any>} [over]
 * @returns {Record<string, any>}
 */
function issue(over = {}) {
  return {
    id: BEAD,
    title: '방향 질의 트리거',
    notes: NOTES,
    metadata: { awaiting_user: AWAITING },
    ...over
  };
}

/**
 * @param {Record<string, any>} [over]
 */
function attempt(over = {}) {
  return {
    attempt_id: 'a1',
    repo: '/repo',
    runner: 'codex',
    session_id: 'codex-sid',
    ...over
  };
}

/** Conversation settings that keep every launch's provider (`inherit`). */
const INHERIT_SETTINGS = {
  auto_launch: true,
  fresh_runtime: 'inherit',
  claude_model: null,
  claude_effort: null,
  codex_model: null,
  codex_effort: null
};

/**
 * Build a launcher with fake tmux/bd runners and an enabled config.
 *
 * @param {{
 *   tmux?: ReturnType<typeof makeTmux>,
 *   enabled?: boolean,
 *   readIssue?: any,
 *   statFile?: any,
 *   resolveClaude?: any,
 *   resolveRunner?: any,
 *   currentRunner?: import('./direction-inquiry.js').DirectionInquiryDeps['currentRunner'],
 *   readAttempt?: any,
 *   store?: import('./direction-inquiry.js').DirectionInquiryDeps['store'],
 *   sessionRefOptions?: any,
 *   observeProcess?: any,
 *   existsSync?: (file_path: string) => boolean,
 *   now?: () => number,
 *   handoffPending?: (workspace: string, bead_id: string) => boolean,
 *   autoLaunchEnabled?: (config_enabled: boolean) => boolean,
 *   conversationSettings?: () => any,
 *   launchFlags?: (runner: string) => string[]
 * }} [over]
 */
function makeInquiry(over = {}) {
  const tmux = over.tmux || makeTmux();
  const resolveClaude =
    over.resolveClaude || (() => '/opt/homebrew/bin/claude');
  const conversationConfirm = vi.fn(async () => true);
  const inquiry = createDirectionInquiry({
    getConfig: () => ({
      worker_direction_inquiry: {
        enabled: over.enabled !== false,
        tmux_session: 'bdui-inquiry'
      }
    }),
    bd: { readIssue: over.readIssue || (async () => issue()) },
    notifier: { conversationConfirm },
    runTmux: tmux.runTmux,
    resolveClaude,
    resolveRunner:
      over.resolveRunner ||
      ((/** @type {string} */ runner) =>
        runner === 'claude'
          ? resolveClaude()
          : runner === 'codex'
            ? '/opt/homebrew/bin/codex'
            : null),
    statFile: over.statFile || (() => ({ mtimeMs: 1000 })),
    now: over.now || (() => 2000),
    store: over.store,
    currentRunner: over.currentRunner,
    readAttempt: over.readAttempt || (async () => attempt()),
    sessionRefOptions: over.sessionRefOptions || SESSION_OPTIONS,
    observeProcess: over.observeProcess,
    existsSync: over.existsSync || (() => true),
    handoffPending: over.handoffPending,
    // The shared switch and the launch settings default to config.toml and
    // "원래 세션 따름" here, so each test states the setting it is about.
    autoLaunchEnabled:
      over.autoLaunchEnabled || ((/** @type {boolean} */ value) => value),
    conversationSettings: over.conversationSettings || (() => INHERIT_SETTINGS),
    launchFlags: over.launchFlags || (() => []),
    log: () => {}
  });
  return { inquiry, tmux, conversationConfirm };
}

/**
 * @param {Record<string, any>} [over]
 * @returns {any}
 */
function parkedInput(over = {}) {
  return {
    workspace: '/ws',
    bead_id: BEAD,
    attempt_id: 'a1',
    repo: '/repo',
    target_base: 'main',
    awaiting_user: AWAITING,
    ...over
  };
}

/**
 * @param {Record<string, any>} [over]
 * @returns {any}
 */
function recoveryInput(over = {}) {
  return parkedInput({
    awaiting_user: null,
    recovery: { reason: 'authority' },
    ...over
  });
}

describe('direction-inquiry entry block', () => {
  test('pins the dotfiles entry block digest', () => {
    const digest = createHash('sha256')
      .update(CONVERSATION_ENTRY_BLOCK)
      .digest('hex');

    expect(digest).toBe(ENTRY_BLOCK_DIGEST);
  });

  test('carries no trailing newline', () => {
    const bytes = Buffer.byteLength(CONVERSATION_ENTRY_BLOCK, 'utf8');

    expect(bytes).toBe(3179);
    expect(CONVERSATION_ENTRY_BLOCK.endsWith('\n')).toBe(false);
  });

  test('fills the conversation reason in the opening, the reason line, and step 2', () => {
    const block = fillConversationEntry({
      reason: '멈춤 recovery:authority',
      situation: '범위 밖',
      worktree: WORKTREE,
      checkout: '/repo'
    });

    expect(block.split('\n')[0]).toContain(
      'Worker 작업이 멈춤 recovery:authority에 이르러'
    );
    expect(block).toContain('- 대화 사유: 멈춤 recovery:authority\n');
    expect(block).toContain(
      '`대화 결정: 멈춤 recovery:authority — 사용자 답: <원문>`'
    );
    expect(block).not.toContain('<대화 사유>');
  });

  test('fills the situation and the two paths positionally', () => {
    const block = fillConversationEntry({
      reason: '멈춤 awaiting_user=x',
      situation: '세션 문장',
      worktree: WORKTREE,
      checkout: '/repo'
    });

    expect(block).toContain('- 상황: 세션 문장\n');
    expect(block).toContain(`- 구현 워크트리: ${WORKTREE}\n`);
    expect(block).toContain('- target_base 체크아웃: /repo\n');
  });

  test('prefixes a stop label with the 멈춤 kind word', () => {
    const reason = stopConversationReason('awaiting_user=x');

    expect(reason).toBe('멈춤 awaiting_user=x');
  });

  test('leaves the session-owned slots untouched', () => {
    const block = fillConversationEntry({
      reason: 's',
      situation: 'x',
      worktree: '/w',
      checkout: '/c'
    });

    expect(block).toContain('<원문>');
    expect(block).toContain('`인계 · <결정 한 줄>`');
    expect(block).toContain('`인수 · <한 줄>`');
    expect(block).toContain('`보류 · <한 줄>`');
  });

  test('prints absent values explicitly', () => {
    const block = fillConversationEntry({
      reason: 's',
      situation: null,
      worktree: null,
      checkout: null
    });

    expect(block).toContain('- 상황: (없음)\n');
    expect(block).toContain('- 구현 워크트리: (없음)\n');
  });

  test('never rescans a value that quotes a slot', () => {
    const block = fillConversationEntry({
      reason: 's',
      situation: '- target_base 체크아웃: <path>',
      worktree: '/w',
      checkout: '/c'
    });

    expect(block).toContain('- 상황: - target_base 체크아웃: <path>\n');
    expect(block).toContain('\n- target_base 체크아웃: /c\n');
  });
});

describe('direction-inquiry sentences', () => {
  test('reads the last park line naming the park value', () => {
    const sentence = parkSentence(NOTES, AWAITING);

    expect(sentence).toBe(`park: ${AWAITING} — 방향 충돌 · ADR 0012`);
  });

  test('falls back to the last park line', () => {
    const sentence = parkSentence(NOTES, 'unknown_value');

    expect(sentence).toBe(`park: ${AWAITING} — 방향 충돌 · ADR 0012`);
  });

  test('returns null when notes carry no park line', () => {
    const sentence = parkSentence('메모만 있다', AWAITING);

    expect(sentence).toBeNull();
  });

  test('strips the blocker prefix off the first summary line', () => {
    const sentence = recoverySentence('blocker: 승인 필요\n무시');

    expect(sentence).toBe('승인 필요');
  });
});

describe('direction-inquiry same-session launch', () => {
  test('resumes the Codex attempt session without a fork', async () => {
    const tmux = launchingTmux();
    const recordInteractiveSession = vi.fn();
    const { inquiry } = makeInquiry({
      tmux,
      store: { recordInteractiveSession }
    });

    const outcome = await inquiry.onParkedAttempt(recoveryInput());

    expect(tmux.wrapper()).toContain(
      "exec '/opt/homebrew/bin/codex' 'resume' 'codex-sid' '이 세션은"
    );
    expect(tmux.wrapper()).not.toContain("'fork'");
    expect(outcome).toMatchObject({
      session: 'launched',
      mode: 'resume',
      source: 'attempt',
      session_id: 'codex-sid',
      command: "codex resume 'codex-sid'"
    });
  });

  test('resumes the Claude attempt session without a new session id', async () => {
    const tmux = launchingTmux();
    const { inquiry } = makeInquiry({
      tmux,
      readAttempt: async () =>
        attempt({ runner: 'claude', session_id: 'claude-sid' })
    });

    const outcome = await inquiry.onParkedAttempt(recoveryInput());

    expect(tmux.wrapper()).toContain(
      "exec '/opt/homebrew/bin/claude' '--resume' 'claude-sid' '이 세션은"
    );
    expect(tmux.wrapper()).not.toContain('--fork-session');
    expect(tmux.wrapper()).not.toContain('--session-id');
    expect(outcome?.command).toBe("claude --resume 'claude-sid'");
  });

  test('opens the conversation in the attempt worktree', async () => {
    const tmux = launchingTmux();
    const { inquiry } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(recoveryInput());

    const args = tmux.calls.find((call) => call[0] === 'new-window') || [];
    expect(args[args.indexOf('-c') + 1]).toBe(WORKTREE);
  });

  test('sends only the filled entry block as the first input', async () => {
    const tmux = launchingTmux();
    const { inquiry } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(recoveryInput());

    const expected = fillConversationEntry({
      reason: '멈춤 recovery:authority',
      situation: null,
      worktree: WORKTREE,
      checkout: '/repo'
    });
    expect(tmux.wrapper().endsWith(shellQuote(expected))).toBe(true);
    expect(tmux.wrapper()).not.toContain('정산되면');
  });

  test('records a resume conversation with its stop label', async () => {
    const recordInteractiveSession = vi.fn();
    const { inquiry } = makeInquiry({
      tmux: launchingTmux(),
      store: { recordInteractiveSession }
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(recordInteractiveSession).toHaveBeenCalledExactlyOnceWith(
      '/ws',
      expect.objectContaining({
        bead_id: BEAD,
        kind: 'inquiry',
        provider: 'codex',
        session_id: 'codex-sid',
        session_id_source: 'launch',
        mode: 'resume',
        source: 'attempt',
        forked_from: null,
        fallback_reason: null,
        attempt_id: 'a1',
        cwd: WORKTREE,
        launched_at: 2000,
        state: 'live',
        conversation: {
          stop: `멈춤 awaiting_user=${AWAITING}`,
          wait_id: null,
          processed_message_at: null,
          message_excerpt: null,
          result: null,
          handoff: null,
          takeover_notified_at: null
        }
      })
    );
  });

  test('fills the park sentence from the notes', async () => {
    const tmux = launchingTmux();
    const { inquiry } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.wrapper()).toContain(
      `- 상황: park: ${AWAITING} — 방향 충돌 · ADR 0012`
    );
  });

  test('fills the recovery sentence from the attempt summary', async () => {
    const tmux = launchingTmux();
    const { inquiry } = makeInquiry({
      tmux,
      readAttempt: async () =>
        attempt({ cause_detail: { summary: 'blocker: 범위 밖 파일\n둘째' } })
    });

    await inquiry.onParkedAttempt(recoveryInput());

    expect(tmux.wrapper()).toContain('- 상황: 범위 밖 파일');
  });

  test('labels a legacy recovery stop as an old record', async () => {
    const tmux = launchingTmux();
    const { inquiry } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(
      recoveryInput({ recovery: { reason: 'verification' } })
    );

    expect(tmux.wrapper()).toContain(
      '- 대화 사유: 멈춤 recovery:verification (옛 기록)'
    );
  });
});

describe('direction-inquiry fresh fallback', () => {
  test.each([
    [
      'attempt_transcript_missing',
      attempt({ session_id: 'gone-sid' }),
      'codex'
    ],
    ['attempt_session_missing', attempt({ session_id: null }), 'codex'],
    ['runner_unknown', attempt({ runner: 'gemini' }), 'claude']
  ])(
    'opens a fresh same-provider session for %s',
    async (reason, record, provider) => {
      const recordInteractiveSession = vi.fn();
      const { inquiry } = makeInquiry({
        tmux: launchingTmux(),
        readAttempt: async () => record,
        store: { recordInteractiveSession }
      });

      await inquiry.onParkedAttempt(recoveryInput());

      expect(recordInteractiveSession.mock.calls[0]?.[1]).toMatchObject({
        provider,
        mode: 'fresh',
        source: 'fresh',
        fallback_reason: reason
      });
    }
  );

  test('opens a fresh session in the checkout when the worktree is gone', async () => {
    const tmux = launchingTmux();
    const recordInteractiveSession = vi.fn();
    const { inquiry } = makeInquiry({
      tmux,
      existsSync: () => false,
      store: { recordInteractiveSession }
    });

    await inquiry.onParkedAttempt(recoveryInput());

    expect(recordInteractiveSession.mock.calls[0]?.[1]).toMatchObject({
      mode: 'fresh',
      fallback_reason: 'worktree_missing',
      cwd: '/repo'
    });
  });

  test('passes only the block to a fresh Codex session', async () => {
    const tmux = launchingTmux();
    const { inquiry } = makeInquiry({
      tmux,
      readAttempt: async () => attempt({ session_id: null })
    });

    await inquiry.onParkedAttempt(recoveryInput());

    expect(tmux.wrapper()).toContain(
      "exec '/opt/homebrew/bin/codex' '이 세션은"
    );
  });

  test('gives a fresh Claude session its own id', async () => {
    const tmux = launchingTmux();
    const recordInteractiveSession = vi.fn();
    const { inquiry } = makeInquiry({
      tmux,
      readAttempt: async () => attempt({ runner: 'claude', session_id: null }),
      store: { recordInteractiveSession }
    });

    const outcome = await inquiry.onParkedAttempt(recoveryInput());

    const record = recordInteractiveSession.mock.calls[0]?.[1];
    expect(record.session_id).toMatch(/^[0-9a-f-]{36}$/);
    expect(tmux.wrapper()).toContain(
      `'--session-id' '${record.session_id}' '이 세션은`
    );
    expect(outcome?.command).toBe(`claude --session-id '${record.session_id}'`);
  });

  test('opens a fresh fallback on the configured runtime', async () => {
    const recordInteractiveSession = vi.fn();
    const { inquiry } = makeInquiry({
      tmux: launchingTmux(),
      readAttempt: async () => attempt({ session_id: null }),
      conversationSettings: () => ({
        ...INHERIT_SETTINGS,
        fresh_runtime: 'claude'
      }),
      store: { recordInteractiveSession }
    });

    await inquiry.onParkedAttempt(recoveryInput());

    expect(recordInteractiveSession.mock.calls[0]?.[1]).toMatchObject({
      provider: 'claude',
      mode: 'fresh'
    });
  });

  test('keeps the attempt runtime for its own session over the setting', async () => {
    const recordInteractiveSession = vi.fn();
    const { inquiry } = makeInquiry({
      tmux: launchingTmux(),
      conversationSettings: () => ({
        ...INHERIT_SETTINGS,
        fresh_runtime: 'claude'
      }),
      store: { recordInteractiveSession }
    });

    await inquiry.onParkedAttempt(recoveryInput());

    expect(recordInteractiveSession.mock.calls[0]?.[1]).toMatchObject({
      provider: 'codex',
      mode: 'resume'
    });
  });

  test('uses the current runner when the attempt names none', async () => {
    const currentRunner = vi.fn(() => /** @type {const} */ ('codex'));
    const recordInteractiveSession = vi.fn();
    const { inquiry } = makeInquiry({
      tmux: launchingTmux(),
      readAttempt: async () => attempt({ runner: null }),
      currentRunner,
      store: { recordInteractiveSession }
    });

    await inquiry.onParkedAttempt(recoveryInput());

    expect(recordInteractiveSession.mock.calls[0]?.[1].provider).toBe('codex');
  });
});

describe('direction-inquiry runner liveness', () => {
  const identity = { pid: 42, pgid: 42, started_at: 5000 };

  test('refuses while the attempt runner is still alive', async () => {
    const tmux = launchingTmux();
    const { inquiry } = makeInquiry({
      tmux,
      readAttempt: async () => attempt({ process_identity: identity }),
      observeProcess: () => ({
        ok: true,
        identity: { pid: 42, process_started_at: 5500 }
      })
    });

    const outcome = await inquiry.onParkedAttempt(recoveryInput());

    expect(outcome).toMatchObject({
      session: 'not_launched',
      reason: 'runner_alive'
    });
    expect(tmux.names()).not.toContain('new-window');
  });

  test('refuses when the runner cannot be observed', async () => {
    const { inquiry, tmux } = makeInquiry({
      readAttempt: async () => attempt({ process_identity: identity }),
      observeProcess: () => ({ ok: false, reason: 'inspect_failed' })
    });

    const outcome = await inquiry.onParkedAttempt(recoveryInput());

    expect(outcome?.reason).toBe('runner_liveness_unknown');
    expect(tmux.calls).toHaveLength(0);
  });

  test('launches once the runner process is gone', async () => {
    const { inquiry } = makeInquiry({
      tmux: launchingTmux(),
      readAttempt: async () => attempt({ process_identity: identity }),
      observeProcess: () => ({ ok: false, reason: 'process_gone' })
    });

    const outcome = await inquiry.onParkedAttempt(recoveryInput());

    expect(outcome?.session).toBe('launched');
  });

  test('launches when the pid was recycled by another process', async () => {
    const { inquiry } = makeInquiry({
      tmux: launchingTmux(),
      readAttempt: async () => attempt({ process_identity: identity }),
      observeProcess: () => ({
        ok: true,
        identity: { pid: 42, process_started_at: 60_000 }
      })
    });

    const outcome = await inquiry.onParkedAttempt(recoveryInput());

    expect(outcome?.session).toBe('launched');
  });
});

describe('direction-inquiry handoff reservation', () => {
  test('refuses a click while the bead holds a handoff reservation', async () => {
    const tmux = makeTmux({
      panes_seq: [[], [], [['bdui-inquiry', '%9', BEAD, '0']]]
    });
    const recordInteractiveSession = vi.fn();
    const handoffPending = vi.fn(() => true);
    const { inquiry } = makeInquiry({
      tmux,
      handoffPending,
      store: { recordInteractiveSession }
    });

    const outcome = await inquiry.launchForClick(parkedInput());

    expect(outcome).toMatchObject({
      session: 'not_launched',
      reason: 'handoff_pending'
    });
    expect(handoffPending).toHaveBeenCalledWith('/ws', BEAD);
    expect(tmux.names()).not.toContain('new-window');
    expect(recordInteractiveSession).not.toHaveBeenCalled();
  });

  test('refuses an automatic launch while the bead holds a handoff reservation', async () => {
    const tmux = launchingTmux();
    const { inquiry } = makeInquiry({ tmux, handoffPending: () => true });

    const outcome = await inquiry.onParkedAttempt(recoveryInput());

    expect(outcome).toMatchObject({
      session: 'not_launched',
      reason: 'handoff_pending'
    });
    expect(tmux.names()).not.toContain('new-window');
  });

  test('launches once no handoff reservation is pending', async () => {
    const { inquiry } = makeInquiry({
      tmux: launchingTmux(),
      handoffPending: () => false
    });

    const outcome = await inquiry.onParkedAttempt(recoveryInput());

    expect(outcome?.session).toBe('launched');
  });
});

describe('direction-inquiry confirm notification', () => {
  test('announces a launched automatic conversation', async () => {
    const { inquiry, conversationConfirm } = makeInquiry({
      tmux: launchingTmux(),
      readAttempt: async () =>
        attempt({ cause_detail: { summary: 'blocker: 범위 밖' } })
    });

    await inquiry.onParkedAttempt(recoveryInput());

    expect(conversationConfirm).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        bead_id: BEAD,
        title: '방향 질의 트리거',
        stop: 'recovery:authority',
        sentence: '범위 밖',
        session: 'launched',
        tmux_session: 'bdui-inquiry',
        tmux_window: BEAD,
        repo: '/repo'
      })
    );
  });

  test('announces a disabled launch with its reason', async () => {
    const { inquiry, tmux, conversationConfirm } = makeInquiry({
      enabled: false
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.calls).toHaveLength(0);
    expect(conversationConfirm).toHaveBeenCalledWith(
      expect.objectContaining({ session: 'not_launched', reason: 'disabled' })
    );
  });

  test('reads the stored shared switch over a disabled config', async () => {
    const tmux = launchingTmux();
    const { inquiry } = makeInquiry({
      tmux,
      enabled: false,
      autoLaunchEnabled: () => true
    });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(outcome?.session).toBe('launched');
  });

  test('stays closed when the stored shared switch is off', async () => {
    const { inquiry, tmux } = makeInquiry({
      autoLaunchEnabled: () => false
    });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(outcome?.reason).toBe('disabled');
    expect(tmux.calls).toHaveLength(0);
  });

  test('stays silent when the caller already spent the notification', async () => {
    const { inquiry, conversationConfirm } = makeInquiry({
      tmux: launchingTmux()
    });

    await inquiry.onParkedAttempt(parkedInput({ confirm: false }));

    expect(conversationConfirm).not.toHaveBeenCalled();
  });

  test('sends nothing for a click', async () => {
    const { inquiry, conversationConfirm } = makeInquiry({
      tmux: makeTmux({
        panes_seq: [[], [], [['bdui-inquiry', '%9', BEAD, '0']]]
      })
    });

    await inquiry.launchForClick(parkedInput());

    expect(conversationConfirm).not.toHaveBeenCalled();
  });
});

describe('direction-inquiry click', () => {
  test('launches from a click while automatic launch is disabled', async () => {
    const tmux = makeTmux({
      panes_seq: [
        [['bdui-inquiry', '%1', '', '0']],
        [['bdui-inquiry', '%1', '', '0']],
        [['bdui-inquiry', '%9', BEAD, '0']]
      ]
    });
    const { inquiry } = makeInquiry({ tmux, enabled: false });

    const outcome = await inquiry.launchForClick(parkedInput());

    expect(outcome.session).toBe('launched');
  });

  test('opens a clicked non-target recovery under its own reason', async () => {
    const tmux = makeTmux({
      panes_seq: [[], [], [['bdui-inquiry', '%9', BEAD, '0']]]
    });
    const { inquiry } = makeInquiry({ tmux });

    await inquiry.launchForClick(
      recoveryInput({ recovery: { reason: 'provider' } })
    );

    expect(tmux.wrapper()).toContain('- 대화 사유: 멈춤 recovery:provider\n');
  });

  test('points a click at the live conversation pane it observed', async () => {
    const tmux = makeTmux({ panes: [['bdui-inquiry', '%1', BEAD, '0']] });
    const readIssue = vi.fn(async () => issue());
    const { inquiry } = makeInquiry({ tmux, readIssue });

    const outcome = await inquiry.launchForClick(parkedInput());

    expect(outcome).toMatchObject({
      session: 'already_running',
      tmux_session: 'bdui-inquiry',
      tmux_window: BEAD
    });
    expect(readIssue).not.toHaveBeenCalled();
  });

  test('opens a clicked conversation as the user session current window', async () => {
    const tmux = makeTmux({
      sessions: ':bdui-inquiry\n300:dev\n',
      panes_seq: [[], [], [['dev', '%9', BEAD, '0']]]
    });
    const { inquiry } = makeInquiry({ tmux });

    const outcome = await inquiry.launchForClick(parkedInput());

    const args = tmux.calls.find((call) => call[0] === 'new-window') || [];
    expect(args[args.indexOf('-t') + 1]).toBe('dev');
    expect(args).not.toContain('-d');
    expect(outcome).toMatchObject({
      session: 'launched',
      placement: 'user',
      tmux_session: 'dev',
      tmux_window: BEAD
    });
  });

  test('keeps the automatic conversation in the inquiry session background', async () => {
    const tmux = makeTmux({
      sessions: '300:dev\n',
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry } = makeInquiry({ tmux });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    const args = tmux.calls.find((call) => call[0] === 'new-window') || [];
    expect(args[args.indexOf('-t') + 1]).toBe('bdui-inquiry');
    expect(args).toContain('-d');
    expect(tmux.names()).not.toContain('list-sessions');
    expect(outcome).toMatchObject({
      placement: 'inquiry',
      tmux_session: 'bdui-inquiry'
    });
  });

  test('makes the live conversation window current on a click', async () => {
    const tmux = makeTmux({ panes: [['dev', '%1', BEAD, '0']] });
    const { inquiry } = makeInquiry({ tmux });

    const outcome = await inquiry.launchForClick(parkedInput());

    expect(tmux.calls).toContainEqual(['select-window', '-t', '%1']);
    expect(outcome).toMatchObject({
      session: 'already_running',
      placement: 'user',
      tmux_session: 'dev'
    });
  });

  test('refuses a click when the pane marker cannot be read', async () => {
    const tmux = makeTmux({ list_code: 1 });
    const { inquiry } = makeInquiry({ tmux });

    const outcome = await inquiry.launchForClick(parkedInput());

    expect(outcome).toMatchObject({
      session: 'not_launched',
      reason: 'tmux_unavailable'
    });
  });

  test('refuses a click while a launch holds the bead with no pane yet', async () => {
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    const tmux = makeTmux({
      panes_seq: [
        [['bdui-inquiry', '%1', '', '0']],
        [['bdui-inquiry', '%1', '', '0']],
        [['bdui-inquiry', '%9', BEAD, '0']]
      ]
    });
    const { inquiry } = makeInquiry({
      tmux,
      readIssue: async () => {
        await gate;
        return issue();
      }
    });

    const automatic = inquiry.onParkedAttempt(parkedInput());
    const outcome = await inquiry.launchForClick(parkedInput());
    release();
    await automatic;

    expect(outcome).toMatchObject({
      session: 'not_launched',
      reason: 'inquiry_in_flight'
    });
  });

  test('refuses an input that is neither a park nor a recovery', async () => {
    const { inquiry } = makeInquiry();

    const outcome = await inquiry.launchForClick(
      parkedInput({ awaiting_user: null })
    );

    expect(outcome.reason).toBe('invalid_park');
  });
});

describe('direction-inquiry tmux lifecycle', () => {
  test('lists, creates the session, opens the window, then confirms the marker', async () => {
    const tmux = makeTmux({
      panes: [['dev', '%1', '', '0']],
      panes_after: [
        ['dev', '%1', '', '0'],
        ['bdui-inquiry', '%9', BEAD, '0']
      ]
    });
    const { inquiry } = makeInquiry({ tmux });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual([
      'list-panes',
      'new-session',
      'new-window',
      'list-panes'
    ]);
    expect(outcome?.session).toBe('launched');
  });

  test('skips new-session when the conversation session already exists', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', 'UI-other', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual(['list-panes', 'new-window', 'list-panes']);
  });

  test('reports launch_failed:new_session when the session is still absent', async () => {
    const tmux = makeTmux({
      panes: [['dev', '%1', '', '0']],
      panes_after: [['dev', '%1', '', '0']],
      new_session: { code: 1, stderr: 'no server running' }
    });
    const { inquiry } = makeInquiry({ tmux });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(outcome?.reason).toBe('launch_failed:new_session');
  });

  test('reports launch_failed:exited when the new pane is already gone', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%1', '', '0']]
    });
    const { inquiry } = makeInquiry({ tmux });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(outcome).toMatchObject({
      session: 'not_launched',
      reason: 'launch_failed:exited'
    });
  });

  test('skips recording a refused launch', async () => {
    const recordInteractiveSession = vi.fn();
    const { inquiry } = makeInquiry({
      store: { recordInteractiveSession },
      resolveRunner: () => null
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(recordInteractiveSession).not.toHaveBeenCalled();
  });

  test('keeps the launched outcome when the store rejects a record', async () => {
    const { inquiry } = makeInquiry({
      tmux: launchingTmux(),
      store: {
        recordInteractiveSession: () => {
          throw new Error('unavailable');
        }
      }
    });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(outcome?.session).toBe('launched');
  });
});

describe('direction-inquiry liveness', () => {
  test('does not relaunch while a live pane carries the same bead', async () => {
    const tmux = makeTmux({ panes: [['bdui-inquiry', '%1', BEAD, '0']] });
    const { inquiry, conversationConfirm } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual(['list-panes']);
    expect(conversationConfirm).toHaveBeenCalledWith(
      expect.objectContaining({ session: 'already_running' })
    );
  });

  test('treats a dead pane as no live session and launches', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', BEAD, '1']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toContain('new-window');
  });

  test('refuses to launch when tmux cannot be reached', async () => {
    const tmux = makeTmux({ list_code: 1 });
    const { inquiry } = makeInquiry({ tmux });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual(['list-panes']);
    expect(outcome?.reason).toBe('tmux_unavailable');
  });

  test('refuses to launch when the tmux runner throws', async () => {
    const tmux = makeTmux({ throw_on: 'list-panes' });
    const { inquiry } = makeInquiry({ tmux });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(outcome?.reason).toBe('tmux_unavailable');
  });
});

describe('direction-inquiry refusals', () => {
  test('refuses attempt_unavailable without touching tmux', async () => {
    const { inquiry, tmux } = makeInquiry({ readAttempt: async () => null });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.calls).toHaveLength(0);
    expect(outcome?.reason).toBe('attempt_unavailable');
  });

  test('refuses bd_unavailable without touching tmux', async () => {
    const { inquiry, tmux } = makeInquiry({
      readIssue: async () => {
        throw new Error('bd down');
      }
    });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.calls).toHaveLength(0);
    expect(outcome?.reason).toBe('bd_unavailable');
  });

  test('refuses launch_failed:codex_not_found when codex is off PATH', async () => {
    const tmux = makeTmux({ panes: [['bdui-inquiry', '%1', '', '0']] });
    const { inquiry } = makeInquiry({ tmux, resolveRunner: () => null });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(outcome?.reason).toBe('launch_failed:codex_not_found');
  });
});

describe('direction-inquiry bridge observation', () => {
  test('reports the bridge active on a fresh heartbeat', async () => {
    const tmux = makeTmux({ panes: [['bdui-inquiry', '%1', BEAD, '0']] });
    const { inquiry } = makeInquiry({
      tmux,
      statFile: () => ({ mtimeMs: 90_000 }),
      now: () => 100_000
    });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(outcome?.bridge_active).toBe(true);
  });

  test('reports the bridge inactive when the heartbeat cannot be read', async () => {
    const tmux = makeTmux({ panes: [['bdui-inquiry', '%1', BEAD, '0']] });
    const { inquiry } = makeInquiry({
      tmux,
      statFile: () => {
        throw new Error('ENOENT');
      }
    });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(outcome?.bridge_active).toBe(false);
  });
});

describe('direction-inquiry concurrency', () => {
  test('serializes concurrent calls for the same bead to one launch', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry, conversationConfirm } = makeInquiry({ tmux });

    await Promise.all([
      inquiry.onParkedAttempt(parkedInput()),
      inquiry.onParkedAttempt(parkedInput())
    ]);

    expect(tmux.names().filter((n) => n === 'new-window')).toHaveLength(1);
    expect(conversationConfirm).toHaveBeenCalledTimes(1);
  });
});

describe('direction-inquiry no-throw contract', () => {
  test('resolves when the config read throws', async () => {
    const inquiry = createDirectionInquiry({
      getConfig: () => {
        throw new Error('config exploded');
      },
      bd: { readIssue: async () => issue() },
      notifier: { conversationConfirm: async () => {} },
      readAttempt: async () => attempt(),
      runTmux: async () => ({ code: 0, stdout: '', stderr: '' }),
      resolveClaude: () => '/bin/claude',
      statFile: () => ({ mtimeMs: 0 }),
      now: () => 0,
      log: () => {}
    });

    const outcome = await inquiry.onParkedAttempt(parkedInput());

    expect(outcome?.reason).toBe('disabled');
  });

  test('resolves when the notifier throws', async () => {
    const inquiry = createDirectionInquiry({
      getConfig: () => ({ worker_direction_inquiry: { enabled: false } }),
      bd: { readIssue: async () => issue() },
      notifier: {
        conversationConfirm: async () => {
          throw new Error('notify exploded');
        }
      },
      readAttempt: async () => attempt(),
      runTmux: async () => ({ code: 0, stdout: '', stderr: '' }),
      resolveClaude: () => '/bin/claude',
      statFile: () => ({ mtimeMs: 0 }),
      now: () => 0,
      log: () => {}
    });

    await expect(inquiry.onParkedAttempt(parkedInput())).resolves.toMatchObject(
      { reason: 'disabled' }
    );
  });

  test('resolves on a malformed input', async () => {
    const { inquiry } = makeInquiry();

    await expect(
      inquiry.onParkedAttempt(/** @type {any} */ (null))
    ).resolves.toBeUndefined();
    await expect(
      inquiry.onParkedAttempt(/** @type {any} */ ({}))
    ).resolves.toBeUndefined();
  });
});

describe('direction-inquiry probeTmux', () => {
  test('logs the reachable pane count when enabled', async () => {
    const tmux = makeTmux({ panes: [['dev', '%1', '', '0']] });
    const printed = vi.spyOn(console, 'log').mockImplementation(() => {});
    const inquiry = createDirectionInquiry({
      getConfig: () => ({ worker_direction_inquiry: { enabled: true } }),
      bd: { readIssue: async () => issue() },
      notifier: {},
      runTmux: tmux.runTmux,
      resolveClaude: () => '/bin/claude',
      statFile: () => ({ mtimeMs: 0 }),
      now: () => 0,
      log: () => {}
    });

    await inquiry.probeTmux();

    expect(tmux.names()).toEqual(['list-panes']);
    expect(printed).toHaveBeenCalledWith(
      'direction_inquiry: tmux reachable (1 panes)'
    );
    printed.mockRestore();
  });

  test('touches nothing when the feature is off', async () => {
    const tmux = makeTmux();
    const inquiry = createDirectionInquiry({
      getConfig: () => ({ worker_direction_inquiry: { enabled: false } }),
      bd: { readIssue: async () => issue() },
      notifier: {},
      runTmux: tmux.runTmux,
      resolveClaude: () => '/bin/claude',
      statFile: () => ({ mtimeMs: 0 }),
      now: () => 0,
      log: () => {}
    });

    await inquiry.probeTmux();

    expect(tmux.calls).toHaveLength(0);
  });
});

describe('direction-inquiry shell quoting', () => {
  test('wraps a plain value in single quotes', () => {
    expect(shellQuote('UI-7uid')).toBe("'UI-7uid'");
  });

  test('escapes an embedded single quote by closing and reopening', () => {
    expect(shellQuote("it's")).toBe("'it'\\''s'");
  });
});

describe('direction-inquiry wrapper', () => {
  test('writes the pane marker before it execs the runner', () => {
    const wrapper = inquiryWrapper({
      bead_id: BEAD,
      claude: '/opt/homebrew/bin/claude',
      prompt: '프롬프트'
    });

    expect(wrapper).toBe(
      `tmux set-option -p -t "$TMUX_PANE" @bdui_inquiry_bead 'UI-7uid' && ` +
        "exec '/opt/homebrew/bin/claude' '프롬프트'"
    );
  });
});
