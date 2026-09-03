import { createHash } from 'node:crypto';
import { describe, expect, test, vi } from 'vitest';
import {
  GENERIC_INQUIRY_PROMPT,
  IMPL_CONFLICT_INQUIRY_PROMPT,
  STALE_INQUIRY_PROMPT,
  createDirectionInquiry,
  fillGenericPrompt,
  fillImplConflictPrompt,
  fillStalePrompt,
  inquiryWrapper,
  parseParkNotes,
  parseStaleNotes,
  receiptKeyFor,
  shellQuote
} from './direction-inquiry.js';

/**
 * The digest of the fenced `text` block under "Direction inquiry session" in
 * dotfiles `src/shared/skills/flow/workflow/references/execution.md` at commit
 * `b8e6decf`, taken over the block's inner content with a single trailing
 * newline. The two repositories are deliberately NOT compared at runtime (spec
 * §3.4): the Worker `[verify]` checkout has no dotfiles path, so a direct
 * cross-repo read would be an env-gated test that never actually runs.
 */
const STALE_PROMPT_DIGEST =
  '1f92114cece82e63940cac512e363bb79a5cfffea5e250b7a691eac3d1231fc3';
const IMPL_PROMPT_DIGEST =
  'aeaa79c6c037cfedee96a81ad0f0911afafe1e487882a0c57fc2756211539660';
const GENERIC_PROMPT_DIGEST =
  'bebd5f2a6a08d960a7ffeae7e15ab23783445a7249e8dd63c5f44b9596409511';

const BEAD = 'UI-7uid';
const AWAITING = 'spec_review_stale:revise';

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
    rows.map((row) => row.join('\t')).join('\n') +
    (rows.length > 0 ? '\n' : '');
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
    return { code: 1, stdout: '', stderr: 'unknown command' };
  };
  return { calls, runTmux, names: () => calls.map((c) => c[0]) };
}

const NOTES = [
  '2026-08-28 재리뷰 시작.',
  'rereview: direction_conflict — ADR 0012와 정면 충돌 stale_kind=adr_conflict'
].join('\n');

/**
 * Fake transcript filesystem for session fork selection.
 *
 * @param {string[]} session_ids
 */
function sessionFs(session_ids) {
  return {
    /** @param {string} file_path */
    readdirSync(file_path) {
      if (file_path === '/home/.claude/projects') {
        return ['project'];
      }
      throw new Error('ENOENT');
    },
    /** @param {string} file_path */
    statSync(file_path) {
      if (
        session_ids.some((session_id) =>
          file_path.endsWith(`/${session_id}.jsonl`)
        )
      ) {
        return { mtimeMs: 1 };
      }
      throw new Error('ENOENT');
    }
  };
}

/**
 * @param {Record<string, any>} [over]
 * @returns {Record<string, any>}
 */
function issue(over = {}) {
  return {
    id: BEAD,
    title: '방향 질의 트리거',
    notes: NOTES,
    metadata: {
      awaiting_user: AWAITING,
      spec_review: `self@${'a'.repeat(40)}`
    },
    ...over
  };
}

/**
 * Build an inquiry with fake tmux/bd runners and an enabled config.
 *
 * @param {{
 *   tmux?: ReturnType<typeof makeTmux>,
 *   enabled?: boolean,
 *   readIssue?: any,
 *   statFile?: any,
 *   resolveClaude?: any,
 *   readAttempt?: any,
 *   sessionRefOptions?: any,
 *   now?: () => number
 * }} [over]
 */
function makeInquiry(over = {}) {
  const tmux = over.tmux || makeTmux();
  const awaitingUser = vi.fn(async () => {});
  const inquiry = createDirectionInquiry({
    getConfig: () => ({
      worker_direction_inquiry: {
        enabled: over.enabled !== false,
        tmux_session: 'bdui-inquiry'
      }
    }),
    bd: { readIssue: over.readIssue || (async () => issue()) },
    notifier: { awaitingUser },
    runTmux: tmux.runTmux,
    resolveClaude: over.resolveClaude || (() => '/opt/homebrew/bin/claude'),
    statFile: over.statFile || (() => ({ mtimeMs: 1000 })),
    now: over.now || (() => 2000),
    readAttempt:
      over.readAttempt ||
      (async () => ({ attempt_id: 'a1', repo: '/repo', runner: 'codex' })),
    sessionRefOptions: over.sessionRefOptions,
    log: () => {}
  });
  return { inquiry, tmux, awaitingUser };
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

describe('direction-inquiry prompt constant', () => {
  test('pins all dotfiles fenced blocks byte for byte', () => {
    const digests = [
      STALE_INQUIRY_PROMPT,
      IMPL_CONFLICT_INQUIRY_PROMPT,
      GENERIC_INQUIRY_PROMPT
    ].map((prompt) =>
      createHash('sha256').update(prompt, 'utf8').digest('hex')
    );

    expect(digests).toEqual([
      STALE_PROMPT_DIGEST,
      IMPL_PROMPT_DIGEST,
      GENERIC_PROMPT_DIGEST
    ]);
  });

  test('ends with exactly one trailing newline', () => {
    for (const prompt of [
      STALE_INQUIRY_PROMPT,
      IMPL_CONFLICT_INQUIRY_PROMPT,
      GENERIC_INQUIRY_PROMPT
    ]) {
      expect(prompt.endsWith('\n')).toBe(true);
      expect(prompt.endsWith('\n\n')).toBe(false);
    }
  });
});

describe('direction-inquiry receipt selection', () => {
  test('names the receipt key the park value belongs to', () => {
    expect(receiptKeyFor('spec_review_stale:revise')).toBe('spec_review');
    expect(receiptKeyFor('plan_approval_stale:revise')).toBe('plan_approval');
  });
});

describe('direction-inquiry notes parsing', () => {
  test('reads the stale kind and the conflict reason off one line', () => {
    const parsed = parseStaleNotes(NOTES);

    expect(parsed).toEqual({
      stale_kind: 'adr_conflict',
      summary: 'ADR 0012와 정면 충돌 stale_kind=adr_conflict'
    });
  });

  test('keeps the LAST occurrence when notes carry several', () => {
    const parsed = parseStaleNotes(
      [
        'rereview: direction_conflict — 첫 근거 stale_kind=adr_conflict',
        'rereview: direction_conflict — 나중 근거 stale_kind=intent_conflict'
      ].join('\n')
    );

    expect(parsed).toEqual({
      stale_kind: 'intent_conflict',
      summary: '나중 근거 stale_kind=intent_conflict'
    });
  });

  test('answers nulls for notes that carry neither line', () => {
    expect(parseStaleNotes('그냥 메모')).toEqual({
      stale_kind: null,
      summary: null
    });
    expect(parseStaleNotes(null)).toEqual({ stale_kind: null, summary: null });
  });

  test('keeps the last implementation-conflict park line', () => {
    const parsed = parseParkNotes(
      [
        'park: impl_review_conflict:design — 대상: ADR 1 — finding: first',
        'park: impl_review_conflict:design — 대상: 결정: 새 방향 — finding: last'
      ].join('\n')
    );

    expect(parsed).toEqual({
      target: '결정: 새 방향',
      finding: 'last'
    });
  });
});

describe('direction-inquiry shell quoting', () => {
  test('wraps a plain value in single quotes', () => {
    expect(shellQuote('UI-7uid')).toBe("'UI-7uid'");
  });

  test('escapes an embedded single quote by closing and reopening', () => {
    expect(shellQuote("it's")).toBe("'it'\\''s'");
  });

  test('leaves the shell nothing to expand in a hostile value', () => {
    expect(shellQuote('$(rm -rf /) `id` "x"')).toBe('\'$(rm -rf /) `id` "x"\'');
  });
});

describe('direction-inquiry wrapper', () => {
  test('writes the pane marker before it execs claude', () => {
    const wrapper = inquiryWrapper({
      bead_id: BEAD,
      claude: '/opt/homebrew/bin/claude',
      prompt: '프롬프트'
    });

    expect(wrapper).toBe(
      "tmux set-option -p @bdui_inquiry_bead 'UI-7uid' && " +
        "exec '/opt/homebrew/bin/claude' '프롬프트'"
    );
  });

  test('quotes a prompt that carries a single quote', () => {
    const wrapper = inquiryWrapper({
      bead_id: BEAD,
      claude: '/bin/claude',
      prompt: "don't"
    });

    expect(wrapper.endsWith("'don'\\''t'")).toBe(true);
  });
});

describe('direction-inquiry prompt filling', () => {
  test('fills every placeholder field the template declares', () => {
    const filled = fillStalePrompt({
      bead_id: BEAD,
      receipt_key: 'spec_review',
      receipt: 'self@abc',
      stale_kind: 'adr_conflict',
      summary: 'ADR 0012와 충돌',
      checkout: '/repo'
    });

    expect(filled).toContain('Bead UI-7uid의 stale 재리뷰가');
    expect(filled).toContain('- 원 영수증: spec_review=self@abc');
    expect(filled).toContain('- stale_kind: adr_conflict');
    expect(filled).toContain('- 충돌 요약: ADR 0012와 충돌');
    expect(filled).toContain('- target_base 체크아웃: /repo');
    expect(filled).toContain('`stale-rereview-inputs.py UI-7uid --json`');
    expect(filled).not.toContain('<bead-id>');
    expect(filled).not.toContain('<path>');
  });

  test('marks an absent receipt and summary rather than leaving the slot', () => {
    const filled = fillStalePrompt({
      bead_id: BEAD,
      receipt_key: 'plan_approval',
      receipt: null,
      stale_kind: 'intent_conflict',
      summary: null,
      checkout: '/repo'
    });

    expect(filled).toContain('- 원 영수증: plan_approval=(없음)');
    expect(filled).toContain('- 충돌 요약: (없음)');
  });

  test('leaves the session-owned placeholders untouched', () => {
    const filled = fillStalePrompt({
      bead_id: BEAD,
      receipt_key: 'spec_review',
      receipt: 'self@abc',
      stale_kind: 'adr_conflict',
      summary: '요약',
      checkout: '/repo'
    });

    expect(filled).toContain('ADR <번호>에 맞춰');
    expect(filled).toContain('상대 spec(<Bead ID>)이 권위');
  });

  test('keeps a summary that quotes a slot from eating the checkout', () => {
    const filled = fillStalePrompt({
      bead_id: BEAD,
      receipt_key: 'spec_review',
      receipt: 'self@abc',
      stale_kind: 'adr_conflict',
      summary: '상대 spec이 <path>를 다르게 정한다',
      checkout: '/repo'
    });

    expect(filled).toContain('- 충돌 요약: 상대 spec이 <path>를 다르게 정한다');
    expect(filled).toContain('- target_base 체크아웃: /repo');
  });

  test('fills implementation-conflict slots in one pass', () => {
    const filled = fillImplConflictPrompt({
      bead_id: BEAD,
      receipt: 'self@abc',
      target: 'ADR 12',
      finding: 'major | file | mismatch | fix',
      checkout: '/repo',
      session_id: 'sid'
    });

    expect(filled).toContain('- 원 영수증: spec_review=self@abc');
    expect(filled).toContain('- 충돌 대상: ADR 12');
    expect(filled).toContain('- finding: major | file | mismatch | fix');
    expect(filled).toContain('- 기록 세션: sid');
  });

  test('fills generic slots from the original receipt', () => {
    const filled = fillGenericPrompt({
      bead_id: BEAD,
      awaiting_user: 'unknown:value',
      receipt: 'plan_approval=user@abc',
      checkout: '/repo',
      session_id: null
    });

    expect(filled).toContain('awaiting_user=unknown:value');
    expect(filled).toContain('- 원 영수증: plan_approval=user@abc');
    expect(filled).toContain('- 기록 세션: 없음');
  });
});

describe('direction-inquiry launch', () => {
  test('launches the implementation-conflict branch', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry, awaitingUser } = makeInquiry({
      tmux,
      readIssue: async () =>
        issue({
          notes:
            'park: impl_review_conflict:design — 대상: ADR 12 — finding: major | file | mismatch | fix'
        })
    });

    await inquiry.onParkedAttempt(
      parkedInput({ awaiting_user: 'impl_review_conflict:design' })
    );

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({
        branch: 'impl_conflict',
        session: 'launched'
      })
    );
  });

  test('launches an implementation conflict from its existing worktree', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry } = makeInquiry({
      tmux,
      readIssue: async () =>
        issue({
          notes:
            'park: impl_review_conflict:design — 대상: ADR 12 — finding: major | file | mismatch | fix'
        })
    });

    await inquiry.onParkedAttempt(
      parkedInput({ awaiting_user: 'impl_review_conflict:design' })
    );

    const launch = tmux.calls.find((call) => call[0] === 'new-window');
    expect(launch?.[launch.indexOf('-c') + 1]).toBe('/repo/.worktrees/UI-7uid');
    expect(launch?.at(-1)).toContain(
      '- 구현 워크트리: /repo/.worktrees/UI-7uid'
    );
  });

  test('keeps a stale inquiry in the target-base checkout', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    const launch = tmux.calls.find((call) => call[0] === 'new-window');
    expect(launch?.[launch.indexOf('-c') + 1]).toBe('/repo');
    expect(launch?.at(-1)).toContain('- target_base 체크아웃: /repo');
  });

  test('launches a stale inquiry without an attempt record', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry, awaitingUser } = makeInquiry({
      tmux,
      readAttempt: async () => null
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ branch: 'stale', session: 'launched' })
    );
  });

  test('launches a generic inquiry without an attempt record', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry, awaitingUser } = makeInquiry({
      tmux,
      readAttempt: async () => null
    });

    await inquiry.onParkedAttempt(
      parkedInput({ awaiting_user: 'unknown:value' })
    );

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ branch: 'generic', session: 'launched' })
    );
  });

  test('launches the generic branch for an unknown value', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(
      parkedInput({ awaiting_user: 'unknown:value' })
    );

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ branch: 'generic', session: 'launched' })
    );
  });

  test('prefers the parked attempt transcript for a fork', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry } = makeInquiry({
      tmux,
      readAttempt: async () => ({
        attempt_id: 'a1',
        repo: '/repo',
        runner: 'claude',
        session_id: 'attempt-sid'
      }),
      sessionRefOptions: {
        home_dir: '/home',
        hostname: 'host',
        fs: sessionFs(['attempt-sid'])
      }
    });

    await inquiry.onParkedAttempt(parkedInput());

    const wrapper = tmux.calls.find((call) => call[0] === 'new-window')?.[12];
    expect(wrapper).toContain("'--resume' 'attempt-sid' '--fork-session'");
  });

  test('falls back to session_ref when the attempt cannot fork', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry } = makeInquiry({
      tmux,
      readIssue: async () =>
        issue({
          metadata: {
            spec_review: 'self@abc',
            session_ref: 'claude:metadata-sid@host'
          }
        }),
      sessionRefOptions: {
        home_dir: '/home',
        hostname: 'host',
        fs: sessionFs(['metadata-sid'])
      }
    });

    await inquiry.onParkedAttempt(parkedInput());

    const wrapper = tmux.calls.find((call) => call[0] === 'new-window')?.[12];
    expect(wrapper).toContain("'--resume' 'metadata-sid' '--fork-session'");
  });

  test('reports attempt_transcript_missing when no fork target remains', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry, awaitingUser } = makeInquiry({
      tmux,
      readAttempt: async () => ({
        attempt_id: 'a1',
        repo: '/repo',
        runner: 'claude',
        session_id: 'missing-sid'
      }),
      sessionRefOptions: {
        home_dir: '/home',
        hostname: 'host',
        fs: sessionFs([])
      }
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'fresh',
        fallback_reason: 'attempt_transcript_missing'
      })
    );
  });

  test('launches from a click while automatic inquiry is disabled', async () => {
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

  test('points a click at the live inquiry pane it observed', async () => {
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

  test('refuses a click when the pane marker cannot be read', async () => {
    const tmux = makeTmux({ list_code: 1 });
    const { inquiry } = makeInquiry({ tmux });

    const outcome = await inquiry.launchForClick(parkedInput());

    expect(outcome).toMatchObject({
      session: 'not_launched',
      reason: 'tmux_unavailable'
    });
  });

  test('refuses a click while a disposal holds the bead with no pane yet', async () => {
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

  test('lists, creates the session, opens the window, then confirms the marker', async () => {
    const tmux = makeTmux({
      panes: [['dev', '%1', '', '0']],
      panes_after: [
        ['dev', '%1', '', '0'],
        ['bdui-inquiry', '%9', BEAD, '0']
      ]
    });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual([
      'list-panes',
      'new-session',
      'new-window',
      'list-panes'
    ]);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({
        bead_id: BEAD,
        branch: 'stale',
        session: 'launched',
        tmux_session: 'bdui-inquiry',
        tmux_window: BEAD
      })
    );
  });

  test('skips new-session when the inquiry session already exists', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', 'UI-other', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual(['list-panes', 'new-window', 'list-panes']);
  });

  test('continues when another park won the race to create the session', async () => {
    const tmux = makeTmux({
      panes: [['dev', '%1', '', '0']],
      panes_after: [
        ['bdui-inquiry', '%1', 'UI-other', '0'],
        ['bdui-inquiry', '%9', BEAD, '0']
      ],
      new_session: { code: 1, stderr: 'duplicate session: bdui-inquiry' }
    });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual([
      'list-panes',
      'new-session',
      'list-panes',
      'new-window',
      'list-panes'
    ]);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ session: 'launched' })
    );
  });

  test('notifies launch_failed:new_session when the session is still absent', async () => {
    const tmux = makeTmux({
      panes: [['dev', '%1', '', '0']],
      panes_after: [['dev', '%1', '', '0']],
      new_session: { code: 1, stderr: 'no server running' }
    });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual(['list-panes', 'new-session', 'list-panes']);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'launch_failed:new_session' })
    );
  });

  test('passes the resolved checkout, window name and wrapper to new-window', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    const args = tmux.calls.find((c) => c[0] === 'new-window') || [];
    expect(args.slice(0, 10)).toEqual([
      'new-window',
      '-d',
      '-P',
      '-F',
      '#{pane_id}',
      '-t',
      'bdui-inquiry',
      '-n',
      BEAD,
      '-c'
    ]);
    expect(args[10]).toBe('/repo');
    expect(args[11]).toBe('--');
    expect(args[12]).toContain('tmux set-option -p @bdui_inquiry_bead');
    expect(args[12]).toContain('- target_base 체크아웃: /repo');
  });

  test('reports launch_failed:exited when the new pane is already gone', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%1', '', '0']]
    });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({
        session: 'not_launched',
        reason: 'launch_failed:exited'
      })
    );
  });

  test('reports launch_failed:exited when the confirmed pane is dead', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '1']]
    });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'launch_failed:exited' })
    );
  });
});

describe('direction-inquiry liveness', () => {
  test('does not relaunch while a live pane carries the same bead', async () => {
    const tmux = makeTmux({ panes: [['bdui-inquiry', '%1', BEAD, '0']] });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual(['list-panes']);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ session: 'already_running' })
    );
  });

  test('treats a dead pane as no live session and launches', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', BEAD, '1']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toContain('new-window');
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ session: 'launched' })
    );
  });

  test('ignores a live pane marked for another bead', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', 'UI-other', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ session: 'launched' })
    );
  });

  test('refuses to launch when tmux cannot be reached', async () => {
    const tmux = makeTmux({ list_code: 1 });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual(['list-panes']);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'tmux_unavailable' })
    );
  });

  test('refuses to launch when the tmux runner throws', async () => {
    const tmux = makeTmux({ throw_on: 'list-panes' });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'tmux_unavailable' })
    );
  });
});

describe('direction-inquiry refusals', () => {
  test('notifies attempt_unavailable for an implementation conflict without its worktree record', async () => {
    const { inquiry, tmux, awaitingUser } = makeInquiry({
      readAttempt: async () => null,
      readIssue: async () =>
        issue({
          notes:
            'park: impl_review_conflict:design — 대상: ADR 12 — finding: major | file | mismatch | fix'
        })
    });

    await inquiry.onParkedAttempt(
      parkedInput({ awaiting_user: 'impl_review_conflict:design' })
    );

    expect(tmux.calls).toHaveLength(0);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({
        branch: 'impl_conflict',
        session: 'not_launched',
        reason: 'attempt_unavailable'
      })
    );
  });

  test('notifies park_facts_missing for an incomplete implementation conflict', async () => {
    const { inquiry, tmux, awaitingUser } = makeInquiry();

    await inquiry.onParkedAttempt(
      parkedInput({ awaiting_user: 'impl_review_conflict:design' })
    );

    expect(tmux.calls).toHaveLength(0);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({
        branch: 'impl_conflict',
        reason: 'park_facts_missing'
      })
    );
  });

  test('notifies bd_unavailable without touching tmux', async () => {
    const { inquiry, tmux, awaitingUser } = makeInquiry({
      readIssue: async () => {
        throw new Error('bd down');
      }
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.calls).toHaveLength(0);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'bd_unavailable' })
    );
  });

  test('notifies stale_kind_missing when notes carry no kind', async () => {
    const { inquiry, tmux, awaitingUser } = makeInquiry({
      readIssue: async () => issue({ notes: '재리뷰 메모만 있다' })
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.calls).toHaveLength(0);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'stale_kind_missing' })
    );
  });

  test('notifies disabled without touching tmux when the config is off', async () => {
    const { inquiry, tmux, awaitingUser } = makeInquiry({ enabled: false });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.calls).toHaveLength(0);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({
        session: 'not_launched',
        reason: 'disabled',
        stale_kind: 'adr_conflict'
      })
    );
  });

  test('notifies launch_failed:claude_not_found when claude is off PATH', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']]
    });
    const { inquiry, awaitingUser } = makeInquiry({
      tmux,
      resolveClaude: () => null
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(tmux.names()).toEqual(['list-panes']);
    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'launch_failed:claude_not_found' })
    );
  });
});

describe('direction-inquiry bridge observation', () => {
  test('reports the bridge active on a fresh heartbeat', async () => {
    const tmux = makeTmux({ panes: [['bdui-inquiry', '%1', BEAD, '0']] });
    const { inquiry, awaitingUser } = makeInquiry({
      tmux,
      statFile: () => ({ mtimeMs: 90_000 }),
      now: () => 100_000
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ bridge_active: true })
    );
  });

  test('reports the bridge inactive on a stale heartbeat', async () => {
    const tmux = makeTmux({ panes: [['bdui-inquiry', '%1', BEAD, '0']] });
    const { inquiry, awaitingUser } = makeInquiry({
      tmux,
      statFile: () => ({ mtimeMs: 10_000 }),
      now: () => 100_000
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ bridge_active: false })
    );
  });

  test('reports the bridge inactive when the heartbeat cannot be read', async () => {
    const tmux = makeTmux({ panes: [['bdui-inquiry', '%1', BEAD, '0']] });
    const { inquiry, awaitingUser } = makeInquiry({
      tmux,
      statFile: () => {
        throw new Error('ENOENT');
      }
    });

    await inquiry.onParkedAttempt(parkedInput());

    expect(awaitingUser).toHaveBeenCalledWith(
      expect.objectContaining({ bridge_active: false })
    );
  });
});

describe('direction-inquiry concurrency', () => {
  test('serializes concurrent calls for the same bead to one launch', async () => {
    const tmux = makeTmux({
      panes: [['bdui-inquiry', '%1', '', '0']],
      panes_after: [['bdui-inquiry', '%9', BEAD, '0']]
    });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await Promise.all([
      inquiry.onParkedAttempt(parkedInput()),
      inquiry.onParkedAttempt(parkedInput())
    ]);

    expect(tmux.names().filter((n) => n === 'new-window')).toHaveLength(1);
    expect(awaitingUser).toHaveBeenCalledTimes(1);
  });

  test('lets a later call for the same bead run once the first finished', async () => {
    const tmux = makeTmux({ panes: [['bdui-inquiry', '%1', BEAD, '0']] });
    const { inquiry, awaitingUser } = makeInquiry({ tmux });

    await inquiry.onParkedAttempt(parkedInput());
    await inquiry.onParkedAttempt(parkedInput());

    expect(awaitingUser).toHaveBeenCalledTimes(2);
  });
});

describe('direction-inquiry no-throw contract', () => {
  test('resolves when the config read throws', async () => {
    const inquiry = createDirectionInquiry({
      getConfig: () => {
        throw new Error('config exploded');
      },
      bd: { readIssue: async () => issue() },
      notifier: { awaitingUser: async () => {} },
      runTmux: async () => ({ code: 0, stdout: '', stderr: '' }),
      resolveClaude: () => '/bin/claude',
      statFile: () => ({ mtimeMs: 0 }),
      now: () => 0,
      log: () => {}
    });

    await expect(
      inquiry.onParkedAttempt(parkedInput())
    ).resolves.toBeUndefined();
  });

  test('resolves when the notifier throws', async () => {
    const inquiry = createDirectionInquiry({
      getConfig: () => ({ worker_direction_inquiry: { enabled: false } }),
      bd: { readIssue: async () => issue() },
      notifier: {
        awaitingUser: async () => {
          throw new Error('notify exploded');
        }
      },
      runTmux: async () => ({ code: 0, stdout: '', stderr: '' }),
      resolveClaude: () => '/bin/claude',
      statFile: () => ({ mtimeMs: 0 }),
      now: () => 0,
      log: () => {}
    });

    await expect(
      inquiry.onParkedAttempt(parkedInput())
    ).resolves.toBeUndefined();
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
      notifier: { awaitingUser: async () => {} },
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

  test('logs unreachable instead of throwing when tmux is down', async () => {
    const tmux = makeTmux({ list_code: 1 });
    const warned = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const inquiry = createDirectionInquiry({
      getConfig: () => ({ worker_direction_inquiry: { enabled: true } }),
      bd: { readIssue: async () => issue() },
      notifier: { awaitingUser: async () => {} },
      runTmux: tmux.runTmux,
      resolveClaude: () => '/bin/claude',
      statFile: () => ({ mtimeMs: 0 }),
      now: () => 0,
      log: () => {}
    });

    await expect(inquiry.probeTmux()).resolves.toBeUndefined();
    expect(warned).toHaveBeenCalledWith(
      expect.stringContaining('direction_inquiry: tmux unreachable:')
    );
    warned.mockRestore();
  });

  test('touches nothing when the feature is off', async () => {
    const tmux = makeTmux();
    const inquiry = createDirectionInquiry({
      getConfig: () => ({ worker_direction_inquiry: { enabled: false } }),
      bd: { readIssue: async () => issue() },
      notifier: { awaitingUser: async () => {} },
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
