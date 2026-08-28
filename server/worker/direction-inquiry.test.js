import { createHash } from 'node:crypto';
import { describe, expect, test, vi } from 'vitest';
import {
  DIRECTION_INQUIRY_PROMPT,
  createDirectionInquiry,
  fillInquiryPrompt,
  inquiryWrapper,
  isDirectionParkReason,
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
const PROMPT_DIGEST =
  '1f92114cece82e63940cac512e363bb79a5cfffea5e250b7a691eac3d1231fc3';

const BEAD = 'UI-7uid';
const AWAITING = 'spec_review_stale:revise';

/**
 * A fake tmux runner. Records every argv and answers from a scripted table
 * keyed by the tmux command; the two `list-panes` reads (liveness, then marker
 * confirmation) can be scripted independently.
 *
 * @param {{
 *   panes?: string[][],
 *   panes_after?: string[][],
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
      const rows =
        listed === 1 ? (script.panes ?? []) : (script.panes_after ?? []);
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
  test('carries the dotfiles fenced block byte for byte', () => {
    const digest = createHash('sha256')
      .update(DIRECTION_INQUIRY_PROMPT, 'utf8')
      .digest('hex');

    expect(digest).toBe(PROMPT_DIGEST);
  });

  test('ends with exactly one trailing newline', () => {
    expect(DIRECTION_INQUIRY_PROMPT.endsWith('\n')).toBe(true);
    expect(DIRECTION_INQUIRY_PROMPT.endsWith('\n\n')).toBe(false);
  });
});

describe('direction-inquiry lane judgment', () => {
  test('admits the spec and plan stale direction values', () => {
    expect(isDirectionParkReason('spec_review_stale:revise')).toBe(true);
    expect(isDirectionParkReason('plan_approval_stale:revise')).toBe(true);
  });

  test('rejects any other awaiting_user value', () => {
    expect(isDirectionParkReason('impl_review_conflict:design')).toBe(false);
    expect(isDirectionParkReason('')).toBe(false);
    expect(isDirectionParkReason(null)).toBe(false);
  });

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
    const filled = fillInquiryPrompt({
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
    const filled = fillInquiryPrompt({
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
    const filled = fillInquiryPrompt({
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
});

describe('direction-inquiry launch', () => {
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
  test('does nothing at all for an unrelated awaiting_user value', async () => {
    const { inquiry, tmux, awaitingUser } = makeInquiry();

    await inquiry.onParkedAttempt(
      parkedInput({ awaiting_user: 'impl_review_conflict:design' })
    );

    expect(tmux.calls).toHaveLength(0);
    expect(awaitingUser).not.toHaveBeenCalled();
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
