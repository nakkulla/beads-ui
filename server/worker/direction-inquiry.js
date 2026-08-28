/**
 * Direction-inquiry session trigger (UI-7uid).
 *
 * The Worker's unattended stale re-review lane parks a Bead it cannot decide by
 * itself. When the reason is a DIRECTION conflict — the artifact's premise is
 * broken, not merely out of date — the contract's disposition is to ask the
 * user, and until now nothing asked: the park sat in the queue until a human
 * happened to open the Worker tab.
 *
 * This module is the trigger. Right after the scheduler writes the `parked`
 * record it starts an INTERACTIVE `claude` session in tmux, seeded with the
 * prompt dotfiles owns, so the session's `AskUserQuestion` reaches the user
 * through the existing `claude-discord-bridge`. At most one live session per
 * Bead, and the park is notified either way.
 *
 * Three properties are load-bearing:
 *
 *   - NO-THROW. `onParkedAttempt` is called fire-and-forget from a queue
 *     transition, so every path is wrapped and the returned promise ALWAYS
 *     resolves. Nothing here may fail an attempt settlement.
 *   - FAIL-CLOSED ON TMUX. A tmux that cannot be reached means liveness cannot
 *     be judged, and a duplicate nobody could rule out is worse than no
 *     session: the launch is skipped and the notification says why.
 *   - THE MARKER PRECEDES `claude`. The pane's `@bdui_inquiry_bead` option is
 *     written by the wrapper BEFORE it execs `claude`, so a marker-less live
 *     inquiry session cannot exist and pane liveness stays a sound duplicate
 *     guard across a server restart (spec §3.3).
 *
 * The prompt is a byte-for-byte COPY of the dotfiles block (ADR 0012: a
 * contract file is never read at runtime); the unit test asserts its digest,
 * and a change on the dotfiles side makes updating this constant a sibling task
 * of that change.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runShell } from '../bd.js';
import { DEFAULT_INQUIRY_TMUX_SESSION } from '../config.js';
import { debug } from '../logging.js';

const default_log = debug('worker:direction-inquiry');

/**
 * The two `awaiting_user` values this lane covers (spec §2). Every other park
 * reason — `impl_review_conflict:design` above all — is out of scope and gets
 * neither a session nor a notification.
 *
 * @type {Set<string>}
 */
const DIRECTION_PARK_REASONS = new Set([
  'spec_review_stale:revise',
  'plan_approval_stale:revise'
]);

/** The pane option that names the Bead an inquiry session belongs to. */
const PANE_MARKER = '@bdui_inquiry_bead';

/**
 * The pane listing format. Its three trailing fields are the liveness triple
 * (spec §3.3); `session_name` leads so the SAME read also answers whether the
 * inquiry session exists, rather than spending another tmux round trip on it.
 *
 * The separator is a real TAB in the argv: tmux is spawned without a shell and
 * does not expand a backslash escape inside a format.
 */
const PANE_FORMAT = `#{session_name}\t#{pane_id}\t#{${PANE_MARKER}}\t#{pane_dead}`;

/**
 * How fresh the bridge heartbeat must be to read as active. Read-only
 * observation: a stale beat is reported, never a reason to skip a launch — the
 * session then waits for the user in tmux (spec §3.5).
 *
 * @type {number}
 */
const BRIDGE_MAX_AGE_MS = 15_000;

/** The last `stale_kind=` in the notes. A notes LINE, never a metadata key. */
const STALE_KIND_RE = /stale_kind=(adr_conflict|intent_conflict)/;

/** The last direction-conflict re-review line, whose tail is the reason. */
const REREVIEW_RE = /^\s*rereview:\s*direction_conflict\s*—\s*(.+)$/;

/** The five slots this module fills; every other `<…>` belongs to the session. */
const SLOT_BEAD = '<bead-id>';
const SLOT_RECEIPT = '<spec_review=… | plan_approval=…>';
const SLOT_STALE_KIND = '<adr_conflict | intent_conflict>';
const SLOT_SUMMARY = '<ADR 번호, 또는 겹치는 Bead ID·spec 경로>';
const SLOT_CHECKOUT = '<path>';

/** What a field with nothing behind it prints, rather than an empty slot. */
const ABSENT = '(없음)';

/**
 * The first input of a direction inquiry session, quoted verbatim from dotfiles
 * `src/shared/skills/flow/workflow/references/execution.md` ("Direction inquiry
 * session", commit `b8e6decf`). This is the TEMPLATE: the five slots above are
 * filled per Bead and the rest belong to the session. beads-ui adds no
 * procedure and no prohibition of its own.
 *
 * @type {string}
 */
export const DIRECTION_INQUIRY_PROMPT =
  [
    'Bead <bead-id>의 stale 재리뷰가 방향성 충돌로 파킹됐습니다. 사용자에게 방향을 물어 처분하세요.',
    '- 원 영수증: <spec_review=… | plan_approval=…>',
    '- stale_kind: <adr_conflict | intent_conflict>',
    '- 충돌 요약: <ADR 번호, 또는 겹치는 Bead ID·spec 경로>',
    '- target_base 체크아웃: <path>',
    '',
    '절차',
    '1. `stale-rereview-inputs.py <bead-id> --json` 출력과 notes의 `rereview:` 줄을 읽고 충돌을 한 문단으로 요약한다.',
    '2. `AskUserQuestion`을 1회 부른다. 선택지는 `stale_kind`별 고정 2개 + 자유 입력이다.',
    '   - adr_conflict: "ADR <번호>에 맞춰 이 아티팩트 수정" / "이 아티팩트 방향 유지 — `결정 (ADR 후보)` 절에 ADR <번호> supersede 후보 추가"',
    '   - intent_conflict: "상대 spec(<Bead ID>)이 권위 — 이 아티팩트를 맞춰 수정" / "이 아티팩트가 권위 — `bd dep add <상대> <this> --json` 엣지를 쓰고 상대 notes에 `rereview: intent_conflict — 사용자 결정: <요약>` 줄을 남긴다". 상대가 Bead 없는 착지 spec이면 뒤 선택지는 "이 아티팩트가 권위 — supersede·정정 대상 spec 경로를 `경계·후속`에 관찰 줄로 기록"이다.',
    '   - 답이 중단·폐기류이면 아무것도 쓰지 않고 답 원문만 notes에 남긴 채 끝낸다. `awaiting_user`는 유지하고 close는 사람이 한다.',
    '3. 답에 따라 target_base 체크아웃에서 아티팩트를 고치고, full-artifact self-review(리뷰 스킬 `spec-gate-probes.md`의 scope overlap 프로브 포함)를 거쳐 `land-reviewed-artifact.py`로 발행한다.',
    '   - spec: 한 `bd update`로 영수증 + notes 계보(질문 요약·사용자 답 원문·수정 SHA) + `awaiting_user` 해제를 쓰고 readback한다. 원 영수증이 리뷰된 것이면 `spec_review=self@<contained_sha>`, `skipped@`였으면 `skipped@<contained_sha>`다.',
    '   - plan: 방향성 충돌은 bounded correction이 아니므로 `plan_review`+`last_checked_sha`로 해제하지 않는다. 발행 뒤 plan-authoring authorize 흐름대로 승인 질문을 하고(2번째 `AskUserQuestion`), 그 답 턴에서 `plan_approval=user@<contained_sha>` + `awaiting_user` 해제를 같은 쓰기로 기록한다. 승인이 아니면 `awaiting_user`를 남기고 종료한다.',
    '4. 구현은 착수하지 않는다. Worker 일반 레인이 재디스패치한다.',
    '',
    '금지: 재리뷰 디스패치(외부 리뷰어) · 구현 착수 · PR 생성 · `awaiting_user` 단독 해제 · Bead 상태 변경.'
  ].join('\n') + '\n';

/**
 * @typedef {Object} InquiryPaneRow
 * @property {string} session
 * @property {string} pane
 * @property {string} bead
 * @property {string} dead
 */

/**
 * @typedef {{ session: 'launched', tmux_session: string, tmux_window: string }
 *   | { session: 'already_running' }
 *   | { session: 'not_launched', reason: string }} InquiryOutcome
 */

/**
 * Whether a park reason is one this trigger acts on.
 *
 * @param {unknown} awaiting_user
 * @returns {boolean}
 */
export function isDirectionParkReason(awaiting_user) {
  return (
    typeof awaiting_user === 'string' &&
    DIRECTION_PARK_REASONS.has(awaiting_user)
  );
}

/**
 * The receipt key a park value belongs to — the prompt names the ORIGINAL
 * receipt, and a plan park was never carried by `spec_review`.
 *
 * @param {string} awaiting_user
 * @returns {'spec_review'|'plan_approval'}
 */
export function receiptKeyFor(awaiting_user) {
  return awaiting_user === 'plan_approval_stale:revise'
    ? 'plan_approval'
    : 'spec_review';
}

/**
 * The direction-conflict facts the parking session left in the Bead notes: the
 * kind, and the reason it recorded. Each is scanned INDEPENDENTLY and the LAST
 * match wins — a Bead can be re-reviewed more than once, and the newest line is
 * the one describing the park being disposed of.
 *
 * @param {unknown} notes
 * @returns {{ stale_kind: string|null, summary: string|null }}
 */
export function parseStaleNotes(notes) {
  /** @type {{ stale_kind: string|null, summary: string|null }} */
  const out = { stale_kind: null, summary: null };
  if (typeof notes !== 'string' || notes.length === 0) {
    return out;
  }
  for (const line of notes.split('\n')) {
    const kind = STALE_KIND_RE.exec(line);
    if (kind) {
      out.stale_kind = kind[1];
    }
    const reason = REREVIEW_RE.exec(line);
    if (reason) {
      out.summary = reason[1].trim();
    }
  }
  return out;
}

/**
 * Quote one value for the `sh -c` tmux runs the wrapper under. Everything
 * inside `'…'` is literal to the shell, and an embedded quote is closed,
 * escaped and reopened — the only sequence a single-quoted string cannot carry
 * directly.
 *
 * @param {string} value
 * @returns {string}
 */
export function shellQuote(value) {
  return `'${String(value).split("'").join("'\\''")}'`;
}

/**
 * The one-line shell command the inquiry pane runs.
 *
 * `set-option` comes FIRST and the two commands are joined by `&&`: a marker
 * that cannot be written never reaches the `exec`, so `claude` does not start
 * and the pane closes. That ordering is what makes "a live pane carrying this
 * Bead" an exact test for "an inquiry session is running" (spec §3.4).
 *
 * @param {{ bead_id: string, claude: string, prompt: string }} input
 * @returns {string}
 */
export function inquiryWrapper(input) {
  return [
    `tmux set-option -p ${PANE_MARKER} ${shellQuote(input.bead_id)}`,
    `&& exec ${shellQuote(input.claude)} ${shellQuote(input.prompt)}`
  ].join(' ');
}

/**
 * Every slot in one alternation, so filling is a SINGLE pass over the template.
 * A chain of `replace` calls would let an already-inserted value be scanned
 * again by a later slot — a conflict summary quoting `<path>` would swallow the
 * checkout substitution and leave the real slot empty.
 *
 * @type {RegExp}
 */
const SLOT_PATTERN = new RegExp(
  [SLOT_BEAD, SLOT_RECEIPT, SLOT_STALE_KIND, SLOT_SUMMARY, SLOT_CHECKOUT]
    .map((slot) => slot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|'),
  'g'
);

/**
 * Fill the five per-Bead slots of the quoted prompt. The Bead id is replaced
 * everywhere (the procedure names it a second time); the other four occur once.
 * One pass, and the replacement goes through a function, so neither an inserted
 * value nor a `$` inside one can be read as a pattern.
 *
 * @param {{ bead_id: string, receipt_key: string, receipt: string|null, stale_kind: string, summary: string|null, checkout: string }} input
 * @returns {string}
 */
export function fillInquiryPrompt(input) {
  /** @type {Map<string, string>} */
  const values = new Map([
    [SLOT_BEAD, input.bead_id],
    [SLOT_RECEIPT, `${input.receipt_key}=${input.receipt ?? ABSENT}`],
    [SLOT_STALE_KIND, input.stale_kind],
    [SLOT_SUMMARY, input.summary ?? ABSENT],
    [SLOT_CHECKOUT, input.checkout]
  ]);
  return DIRECTION_INQUIRY_PROMPT.replace(
    SLOT_PATTERN,
    (slot) => values.get(slot) ?? slot
  );
}

/**
 * `claude`'s absolute path off the Worker's own PATH. Absolute on purpose: the
 * wrapper runs under `sh -c` inside a tmux pane whose PATH is the tmux server's
 * environment, not this process's.
 *
 * @returns {string|null}
 */
function defaultResolveClaude() {
  const raw = process.env.PATH;
  if (typeof raw !== 'string' || raw.length === 0) {
    return null;
  }
  for (const dir of raw.split(path.delimiter)) {
    if (dir.length === 0) {
      continue;
    }
    const candidate = path.join(dir, 'claude');
    try {
      fs.accessSync(candidate, fs.constants.X_OK);
      return candidate;
    } catch {
      // Not here; keep walking the PATH.
    }
  }
  return null;
}

/**
 * @typedef {Object} DirectionInquiryDeps
 * @property {() => any} getConfig - Runtime config accessor (server/config.js).
 * @property {{ readIssue: (workspace: string, bead_id: string) => Promise<any> }} bd
 * @property {{ awaitingUser: (input: any) => Promise<void>|void }} notifier
 * @property {(args: string[]) => Promise<{ code: number, stdout: string, stderr: string }>} [runTmux]
 * @property {() => string|null} [resolveClaude]
 * @property {(file_path: string) => { mtimeMs: number }} [statFile]
 * @property {() => number} [now]
 * @property {(...args: any[]) => void} [log]
 * @property {string} [heartbeatPath]
 */

/**
 * Build the direction-inquiry trigger.
 *
 * @param {DirectionInquiryDeps} deps
 * @returns {{
 *   onParkedAttempt: (input: { workspace: string, bead_id: string, attempt_id: string, repo: string|null, target_base: string|null, awaiting_user: string|null }) => Promise<void>,
 *   probeTmux: () => Promise<void>
 * }}
 */
export function createDirectionInquiry(deps) {
  const log = deps.log || default_log;
  const now = deps.now || (() => Date.now());
  const resolveClaude = deps.resolveClaude || defaultResolveClaude;
  const statFile =
    deps.statFile || ((/** @type {string} */ p) => fs.statSync(p));
  const runTmux =
    deps.runTmux || ((/** @type {string[]} */ args) => runShell('tmux', args));
  const heartbeat_path =
    deps.heartbeatPath ||
    path.join(
      os.homedir(),
      'tmp',
      'claude-discord-bridge',
      'state',
      'heartbeat'
    );

  /**
   * Beads whose trigger is mid-flight. Reserved before the first `await` so two
   * calls landing in the same tick cannot both pass a check neither had
   * recorded itself in — the same shape `revise-disposition.js` uses.
   *
   * @type {Set<string>}
   */
  const in_flight = new Set();

  /**
   * The `[worker.direction_inquiry]` view. A config read that throws counts as
   * off: a broken config must not launch anything, and must not throw into the
   * queue transition either.
   *
   * @returns {{ enabled: boolean, tmux_session: string }}
   */
  function readInquiryConfig() {
    /** @type {any} */
    let section;
    try {
      section = deps.getConfig()?.worker_direction_inquiry;
    } catch (err) {
      log('config read failed: %o', err);
      return { enabled: false, tmux_session: DEFAULT_INQUIRY_TMUX_SESSION };
    }
    if (!section || section.enabled !== true) {
      return { enabled: false, tmux_session: DEFAULT_INQUIRY_TMUX_SESSION };
    }
    const name = section.tmux_session;
    return {
      enabled: true,
      tmux_session:
        typeof name === 'string' && name.length > 0
          ? name
          : DEFAULT_INQUIRY_TMUX_SESSION
    };
  }

  /**
   * Every pane the tmux server knows about. `ok: false` covers an absent
   * server, a non-zero tmux, and a runner that threw — all one fact: liveness
   * could not be judged.
   *
   * @returns {Promise<{ ok: true, rows: InquiryPaneRow[] }|{ ok: false, error: string }>}
   */
  async function listPanes() {
    /** @type {{ code: number, stdout: string, stderr: string }} */
    let result;
    try {
      result = await runTmux(['list-panes', '-a', '-F', PANE_FORMAT]);
    } catch (err) {
      return { ok: false, error: String(err) };
    }
    if (!result || result.code !== 0) {
      return {
        ok: false,
        error: (result?.stderr || '').trim() || `exit ${result?.code}`
      };
    }
    /** @type {InquiryPaneRow[]} */
    const rows = [];
    for (const line of (result.stdout || '').split('\n')) {
      if (line.length === 0) {
        continue;
      }
      const [session, pane, bead, dead] = line.split('\t');
      rows.push({
        session: session ?? '',
        pane: pane ?? '',
        bead: bead ?? '',
        dead: dead ?? ''
      });
    }
    return { ok: true, rows };
  }

  /**
   * Start the inquiry session, unless one is already alive for this Bead.
   *
   * The window is confirmed by re-reading the pane list: a pane that is already
   * gone means the marker write failed or `claude` exited at once, and both are
   * the same fact — there is no session (spec §3.4). A pane that is alive but
   * not yet marked is a LAUNCH: the wrapper writes the marker before it execs,
   * so the mark is in flight, and the pane could not be running `claude`
   * without it.
   *
   * @param {{ bead_id: string, tmux_session: string, prompt: string, cwd: string }} input
   * @returns {Promise<InquiryOutcome>}
   */
  async function launch(input) {
    const listed = await listPanes();
    if (!listed.ok) {
      log('tmux list failed for %s: %s', input.bead_id, listed.error);
      return { session: 'not_launched', reason: 'tmux_unavailable' };
    }
    if (
      listed.rows.some((row) => row.bead === input.bead_id && row.dead === '0')
    ) {
      return { session: 'already_running' };
    }
    const claude = resolveClaude();
    if (typeof claude !== 'string' || claude.length === 0) {
      return {
        session: 'not_launched',
        reason: 'launch_failed:claude_not_found'
      };
    }
    if (!listed.rows.some((row) => row.session === input.tmux_session)) {
      /** @type {{ code: number }} */
      let created;
      try {
        created = await runTmux([
          'new-session',
          '-d',
          '-s',
          input.tmux_session
        ]);
      } catch (err) {
        log('tmux new-session threw for %s: %o', input.bead_id, err);
        return { session: 'not_launched', reason: 'tmux_unavailable' };
      }
      if (!created || created.code !== 0) {
        // Another Bead's trigger may have created the session between our read
        // and this call: two parks landing together both see it missing and
        // only one `new-session` can win. The session existing is the whole
        // requirement, whoever made it, so re-read before calling this a
        // failure.
        const recheck = await listPanes();
        if (
          !recheck.ok ||
          !recheck.rows.some((row) => row.session === input.tmux_session)
        ) {
          return {
            session: 'not_launched',
            reason: 'launch_failed:new_session'
          };
        }
      }
    }
    const wrapper = inquiryWrapper({
      bead_id: input.bead_id,
      claude,
      prompt: input.prompt
    });
    /** @type {{ code: number, stdout: string }} */
    let opened;
    try {
      opened = await runTmux([
        'new-window',
        '-d',
        '-P',
        '-F',
        '#{pane_id}',
        '-t',
        input.tmux_session,
        '-n',
        input.bead_id,
        '-c',
        input.cwd,
        '--',
        wrapper
      ]);
    } catch (err) {
      log('tmux new-window threw for %s: %o', input.bead_id, err);
      return { session: 'not_launched', reason: 'tmux_unavailable' };
    }
    const pane_id = (opened?.stdout || '').trim();
    if (!opened || opened.code !== 0 || pane_id.length === 0) {
      return { session: 'not_launched', reason: 'launch_failed:new_window' };
    }
    const confirmed = await listPanes();
    if (!confirmed.ok) {
      return { session: 'not_launched', reason: 'tmux_unavailable' };
    }
    const row = confirmed.rows.find((r) => r.pane === pane_id);
    if (!row || row.dead !== '0') {
      return { session: 'not_launched', reason: 'launch_failed:exited' };
    }
    return {
      session: 'launched',
      tmux_session: input.tmux_session,
      tmux_window: input.bead_id
    };
  }

  /**
   * Whether the Discord bridge beat recently enough to relay the session's
   * question. A stat that fails reads as inactive — the notification then tells
   * the user to answer in tmux directly.
   *
   * @returns {boolean}
   */
  function bridgeActive() {
    try {
      const stat = statFile(heartbeat_path);
      const mtime =
        stat && typeof stat.mtimeMs === 'number' ? stat.mtimeMs : null;
      return mtime !== null && now() - mtime <= BRIDGE_MAX_AGE_MS;
    } catch {
      return false;
    }
  }

  /**
   * Push the park outward. Guarded even though the notifier is no-throw by
   * contract: an injected fake is not bound by it.
   *
   * @param {Record<string, unknown>} input
   */
  async function announce(input) {
    try {
      await deps.notifier.awaitingUser({
        ...input,
        bridge_active: bridgeActive()
      });
    } catch (err) {
      log('awaiting_user notify failed: %o', err);
    }
  }

  /**
   * Steps 2–6 of the trigger (spec §3.2), inside the per-Bead reservation.
   *
   * @param {any} input
   * @param {string} bead_id
   * @param {string} awaiting_user
   */
  async function dispose(input, bead_id, awaiting_user) {
    const workspace = String(input.workspace ?? '');
    const repo =
      typeof input.repo === 'string' && input.repo.length > 0
        ? input.repo
        : workspace;
    /** @type {any} */
    let issue = null;
    try {
      issue = await deps.bd.readIssue(workspace, bead_id);
    } catch (err) {
      log('bd read failed for %s: %o', bead_id, err);
    }
    if (!issue || typeof issue !== 'object') {
      await announce({
        bead_id,
        title: null,
        awaiting_user,
        stale_kind: null,
        session: 'not_launched',
        reason: 'bd_unavailable',
        repo
      });
      return;
    }
    const title = typeof issue.title === 'string' ? issue.title : null;
    const metadata =
      issue.metadata && typeof issue.metadata === 'object'
        ? issue.metadata
        : {};
    const { stale_kind, summary } = parseStaleNotes(issue.notes);
    if (!stale_kind) {
      // Without the kind the prompt's own fields cannot be filled, and a session
      // that cannot state the conflict is worse than the click disposition.
      await announce({
        bead_id,
        title,
        awaiting_user,
        stale_kind: null,
        session: 'not_launched',
        reason: 'stale_kind_missing',
        repo
      });
      return;
    }
    const config = readInquiryConfig();
    /** @type {InquiryOutcome} */
    let outcome;
    if (!config.enabled) {
      outcome = { session: 'not_launched', reason: 'disabled' };
    } else {
      const receipt_key = receiptKeyFor(awaiting_user);
      const receipt = metadata[receipt_key];
      outcome = await launch({
        bead_id,
        tmux_session: config.tmux_session,
        cwd: repo,
        prompt: fillInquiryPrompt({
          bead_id,
          receipt_key,
          receipt: typeof receipt === 'string' ? receipt : null,
          stale_kind,
          summary,
          checkout: repo
        })
      });
    }
    await announce({
      bead_id,
      title,
      awaiting_user,
      stale_kind,
      repo,
      ...outcome
    });
  }

  return {
    async onParkedAttempt(input) {
      const bead_id =
        input && typeof input.bead_id === 'string' ? input.bead_id : '';
      const awaiting_user =
        input && typeof input.awaiting_user === 'string'
          ? input.awaiting_user
          : '';
      // The lane judgment is the ONE decision taken before the reservation: an
      // out-of-scope park must leave no trace at all, not even a held slot.
      if (bead_id.length === 0 || !isDirectionParkReason(awaiting_user)) {
        return;
      }
      if (in_flight.has(bead_id)) {
        return;
      }
      in_flight.add(bead_id);
      try {
        await dispose(input, bead_id, awaiting_user);
      } catch (err) {
        log('direction inquiry failed for %s: %o', bead_id, err);
      } finally {
        in_flight.delete(bead_id);
      }
    },

    /**
     * Startup reachability probe (spec §3.7). The server runs under launchd and
     * this design assumes it can reach the user's tmux socket; this is the only
     * place that premise is checked before a park depends on it.
     *
     * Written to the CONSOLE, not the debug channel: the daemon runs without
     * `--debug`, so a namespaced logger would put this line nowhere an operator
     * reading `bdui-shared logs` can see it.
     */
    async probeTmux() {
      if (!readInquiryConfig().enabled) {
        return;
      }
      const listed = await listPanes();
      if (!listed.ok) {
        console.warn(`direction_inquiry: tmux unreachable: ${listed.error}`);
        return;
      }
      console.log(
        `direction_inquiry: tmux reachable (${listed.rows.length} panes)`
      );
    }
  };
}
