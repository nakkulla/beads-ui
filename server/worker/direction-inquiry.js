/**
 * Parked-attempt inquiry session trigger (UI-gjp2).
 *
 * Every string-valued `awaiting_user` park reaches this module and selects one
 * of three dispositions: stale artifact review, implementation/design
 * conflict, or a generic unknown value. `onParkedAttempt` is the automatic
 * trigger and obeys `worker_direction_inquiry.enabled`; `launchForClick` is the
 * user's explicit `[세션에서 해결]` action and deliberately ignores that
 * automatic-launch gate. Both start an INTERACTIVE `claude` session in tmux so
 * `AskUserQuestion` reaches the user through `claude-discord-bridge`, with at
 * most one live inquiry pane per Bead.
 *
 * `STALE_INQUIRY_PROMPT`, `IMPL_CONFLICT_INQUIRY_PROMPT`, and
 * `GENERIC_INQUIRY_PROMPT` are byte-for-byte copies of the three canonical
 * dotfiles prompt blocks. Unit tests pin all three SHA-256 digests because this
 * runtime must not read the sibling repository's contract file.
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
 */
import os from 'node:os';
import path from 'node:path';
import { DEFAULT_INQUIRY_TMUX_SESSION } from '../config.js';
import { debug } from '../logging.js';
import { qualifySessionFork, resolveSessionFile } from './session-ref.js';
// The tmux launch primitives moved out to be shared with the `[세션에서 해결]`
// click (UI-jw27 §4). Nothing about this lane's behaviour moved with them: the
// marker option, the prompt, and the launch reason all stay this module's.
import {
  INQUIRY_PANE_MARKER,
  createTmuxLauncher,
  markerWrapper,
  shellQuote
} from './tmux-launcher.js';

const default_log = debug('worker:direction-inquiry');

/** Stale inquiries publish an artifact and leave implementation to Worker. */
const STALE_REASONS = new Set([
  'spec_review_stale:revise',
  'plan_approval_stale:revise'
]);
const IMPL_CONFLICT_REASON = 'impl_review_conflict:design';
const FORK_RUNNER = 'claude';

/** The pane option that names the Bead an inquiry session belongs to. */
const PANE_MARKER = INQUIRY_PANE_MARKER;

/** The last `stale_kind=` in the notes. A notes LINE, never a metadata key. */
const STALE_KIND_RE = /stale_kind=(adr_conflict|intent_conflict)/;

/** The last direction-conflict re-review line, whose tail is the reason. */
const REREVIEW_RE = /^\s*rereview:\s*direction_conflict\s*—\s*(.+)$/;

/** The last implementation-conflict park line and its two required facts. */
const PARK_RE =
  /^park: impl_review_conflict:design — 대상: (.+?) — finding: (.+)$/;

/** The five slots this module fills; every other `<…>` belongs to the session. */
const SLOT_BEAD = '<bead-id>';
const SLOT_STALE_RECEIPT = '<spec_review=… | plan_approval=…>';
const SLOT_STALE_KIND = '<adr_conflict | intent_conflict>';
const SLOT_STALE_SUMMARY = '<ADR 번호, 또는 겹치는 Bead ID·spec 경로>';
const SLOT_CHECKOUT = '<path>';
const SLOT_IMPL_RECEIPT = 'spec_review=<…>';
const SLOT_IMPL_TARGET = '<ADR <번호> | 스펙 `결정:` 줄 원문>';
const SLOT_IMPL_FINDING =
  '<리뷰어 출력 한 줄 — severity | location | what is wrong | fix>';
const SLOT_SESSION = '<fork 대상 세션 id 또는 없음>';
const SLOT_GENERIC_VALUE = '<값>';
const SLOT_GENERIC_RECEIPT = '<spec_review=… | plan_approval=… | 없음>';

/** What a field with nothing behind it prints, rather than an empty slot. */
const ABSENT = '(없음)';
const PLAIN_ABSENT = '없음';

/**
 * The first input of a direction inquiry session, quoted verbatim from dotfiles
 * `src/shared/skills/flow/workflow/references/execution.md` ("Direction inquiry
 * session", commit `b8e6decf`). This is the TEMPLATE: the five slots above are
 * filled per Bead and the rest belong to the session. beads-ui adds no
 * procedure and no prohibition of its own.
 *
 * @type {string}
 */
export const STALE_INQUIRY_PROMPT =
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
 * Implementation-conflict prompt copied byte-for-byte from dotfiles §3.2.
 *
 * @type {string}
 */
export const IMPL_CONFLICT_INQUIRY_PROMPT =
  [
    'Bead <bead-id>의 구현 게이트가 설계 갈래로 파킹됐습니다. 사용자에게 방향을 물어 처분하고 구현을 마무리하세요.',
    '- 원 영수증: spec_review=<…>',
    '- 충돌 대상: <ADR <번호> | 스펙 `결정:` 줄 원문>',
    '- finding: <리뷰어 출력 한 줄 — severity | location | what is wrong | fix>',
    '- 구현 워크트리: <path>',
    '- 기록 세션: <fork 대상 세션 id 또는 없음>',
    '',
    '절차',
    '1. `bd show <bead-id> --json`과 notes의 `park:` 줄, 구현 게이트 라운드 댓글(`## 🔎 리뷰 결과 · impl · r<n>`)을 읽고 충돌을 한 문단으로 요약한다. 구현 워크트리의 후보 커밋은 그대로 이어받는다.',
    '2. `AskUserQuestion`을 1회 부른다. 선택지는 고정 2개 + 자유 입력이다.',
    '   - "충돌 대상에 맞춰 finding 처분(구현 수정)": 처분·일괄 수정·controller exact-delta self-review 뒤, 한 `bd update`로 `impl_review=self@<head>` + notes 계보(질문 요약·사용자 답 원문·수정 SHA) + `awaiting_user` 해제를 쓰고 readback한다. 이 self-review가 구현 게이트 lineage의 종결이다.',
    '   - "구현 방향 유지 — 스펙 수정(ADR이면 `결정 (ADR 후보)` 절에 supersede 후보 추가, `결정:` 줄이면 그 줄 정정)": target_base 체크아웃에서 스펙을 고치고 full-artifact self-review를 거쳐 `land-reviewed-artifact.py`로 발행한 뒤, 한 `bd update`로 `spec_review=self@<contained_sha>` + notes 계보 + `awaiting_user` 해제를 쓰고 readback한다. 이어서 새 스펙에 대한 controller full-artifact 구현 self-review로 `impl_review=self@<head>`를 쓴다. ADR supersede 자체는 Finish의 `adr` 스킬이 처리한다.',
    '   - 답이 중단·폐기류이면 아무것도 쓰지 않고 답 원문만 notes에 남긴 채 끝낸다. `awaiting_user`는 유지하고 close는 사람이 한다.',
    '3. 해제 뒤 같은 세션이 finish까지 간다: 검증 bundle, PR, 완료 보고서(`스펙 이탈:` 줄 포함), `resolved`. 외부 리뷰어는 다시 dispatch하지 않는다 — 파킹을 만든 외부 리뷰 1회가 lineage의 cap이다.',
    '',
    '금지: 외부 리뷰어 재디스패치 · `awaiting_user` 단독 해제 · Bead 상태 직접 변경 · 새 워크트리 생성(기존 워크트리를 잇는다).'
  ].join('\n') + '\n';

/**
 * Generic unknown-value prompt copied byte-for-byte from dotfiles §3.2.
 *
 * @type {string}
 */
export const GENERIC_INQUIRY_PROMPT =
  [
    'Bead <bead-id>가 awaiting_user=<값>으로 파킹됐습니다. 이 값은 계약 어휘에 없습니다. 사용자에게 처분을 물어 기록하세요.',
    '- 원 영수증: <spec_review=… | plan_approval=… | 없음>',
    '- 기록 세션: <fork 대상 세션 id 또는 없음>',
    '- target_base 체크아웃: <path>',
    '',
    '절차',
    '1. `bd show <bead-id> --json`의 metadata·notes·최근 댓글을 읽고 무엇이 파킹을 썼는지 한 문단으로 요약한다.',
    '2. `AskUserQuestion`을 1회 부른다. 선택지는 "이 세션에서 계속 처리 — 처분 지시를 자유 입력으로" / "파킹 유지 — 사람이 직접 본다" + 자유 입력이다.',
    '3. 답 원문을 notes에 `park-inquiry: <값> — 사용자 답: <원문>` 줄로 남긴다. 계속 처리 지시가 있으면 그 지시대로 진행하되 `awaiting_user`는 지시가 명시한 write에서만 함께 해제한다.',
    '',
    '금지: `awaiting_user` 단독 해제 · Bead 상태 직접 변경 · 외부 리뷰어 dispatch.'
  ].join('\n') + '\n';

/**
 * @typedef {Object} InquiryOutcome
 * @property {boolean} launched
 * @property {'launched'|'already_running'|'not_launched'} session
 * @property {string|null} reason
 * @property {'fork'|'fresh'} mode
 * @property {string|null} fallback_reason
 * @property {string|null} session_id
 * @property {string|null} command
 * @property {boolean} bridge_active
 * @property {string|null} tmux_session
 * @property {string|null} tmux_window
 */

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
 * Parse the last implementation-conflict park facts from notes.
 *
 * @param {unknown} notes
 * @returns {{ target: string|null, finding: string|null }}
 */
export function parseParkNotes(notes) {
  /** @type {{ target: string|null, finding: string|null }} */
  const out = { target: null, finding: null };
  if (typeof notes !== 'string' || notes.length === 0) {
    return out;
  }
  for (const line of notes.split('\n')) {
    const match = PARK_RE.exec(line);
    if (match) {
      out.target = match[1].trim();
      out.finding = match[2].trim();
    }
  }
  return out;
}

// Re-exported rather than re-implemented: the wrapper's quoting is now the
// shared launcher's, and this module's own tests still assert it here because
// this is the surface UI-7uid pinned.
export { shellQuote };

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
  return markerWrapper({
    marker: PANE_MARKER,
    key: input.bead_id,
    argv: [input.claude, input.prompt]
  });
}

/**
 * Replace prompt slots in one pass so inserted values are not rescanned.
 *
 * @param {string} prompt
 * @param {Map<string, string>} values
 */
function fillPrompt(prompt, values) {
  const pattern = new RegExp(
    [...values.keys()]
      .map((slot) => slot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|'),
    'g'
  );
  return prompt.replace(pattern, (slot) => values.get(slot) ?? slot);
}

/**
 * Fill the stale prompt's server-owned slots.
 *
 * @param {{ bead_id: string, receipt_key: string, receipt: string|null, stale_kind: string, summary: string|null, checkout: string }} input
 */
export function fillStalePrompt(input) {
  return fillPrompt(
    STALE_INQUIRY_PROMPT,
    new Map([
      [SLOT_BEAD, input.bead_id],
      [SLOT_STALE_RECEIPT, `${input.receipt_key}=${input.receipt ?? ABSENT}`],
      [SLOT_STALE_KIND, input.stale_kind],
      [SLOT_STALE_SUMMARY, input.summary ?? ABSENT],
      [SLOT_CHECKOUT, input.checkout]
    ])
  );
}

/**
 * Fill the implementation-conflict prompt's server-owned slots.
 *
 * @param {{ bead_id: string, receipt: string|null, target: string, finding: string, checkout: string, session_id: string|null }} input
 */
export function fillImplConflictPrompt(input) {
  return fillPrompt(
    IMPL_CONFLICT_INQUIRY_PROMPT,
    new Map([
      [SLOT_BEAD, input.bead_id],
      [SLOT_IMPL_RECEIPT, `spec_review=${input.receipt ?? PLAIN_ABSENT}`],
      [SLOT_IMPL_TARGET, input.target],
      [SLOT_IMPL_FINDING, input.finding],
      [SLOT_CHECKOUT, input.checkout],
      [SLOT_SESSION, input.session_id ?? PLAIN_ABSENT]
    ])
  );
}

/**
 * Fill the generic prompt's server-owned slots.
 *
 * @param {{ bead_id: string, awaiting_user: string, receipt: string, checkout: string, session_id: string|null }} input
 */
export function fillGenericPrompt(input) {
  return fillPrompt(
    GENERIC_INQUIRY_PROMPT,
    new Map([
      [SLOT_BEAD, input.bead_id],
      [SLOT_GENERIC_VALUE, input.awaiting_user],
      [SLOT_GENERIC_RECEIPT, input.receipt],
      [SLOT_SESSION, input.session_id ?? PLAIN_ABSENT],
      [SLOT_CHECKOUT, input.checkout]
    ])
  );
}

/**
 * Add a fork fallback fact after the copied prompt's first line.
 *
 * @param {string} prompt
 * @param {string|null} fallback_reason
 */
function withFallbackReason(prompt, fallback_reason) {
  if (fallback_reason === null) {
    return prompt;
  }
  const newline = prompt.indexOf('\n');
  return `${prompt.slice(0, newline + 1)}- 기록 세션 fork 실패: ${fallback_reason}\n${prompt.slice(newline + 1)}`;
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
 * @property {{ home_dir?: string, hostname?: string, fs?: any, now?: () => number }} [sessionRefOptions]
 * @property {(workspace: string, attempt_id: string) => any|Promise<any>} [readAttempt] - Injected queue-store lookup; omission reads as unavailable rather than importing the runtime back through a cycle.
 */

/**
 * Build the parked-attempt inquiry launcher.
 *
 * @param {DirectionInquiryDeps} deps
 */
export function createDirectionInquiry(deps) {
  const log = deps.log || default_log;
  const launcher = createTmuxLauncher({
    ...(deps.runTmux ? { runTmux: deps.runTmux } : {}),
    ...(deps.resolveClaude ? { resolveClaude: deps.resolveClaude } : {}),
    ...(deps.statFile ? { statFile: deps.statFile } : {}),
    ...(deps.now ? { now: deps.now } : {}),
    ...(deps.heartbeatPath ? { heartbeatPath: deps.heartbeatPath } : {}),
    log
  });
  // Reserve a bead synchronously before either public entry reaches its first
  // `await`. Otherwise two calls in one tick both observe no owner and launch
  // duplicate panes before either can publish its marker.
  /** @type {Set<string>} */
  const in_flight = new Set();

  /** Read automatic enablement and the shared tmux session name. */
  function readInquiryConfig() {
    /** @type {any} */
    let section;
    try {
      section = deps.getConfig()?.worker_direction_inquiry;
    } catch (err) {
      // Broken config cannot prove automatic launch was authorized. Read it as
      // disabled while retaining the default socket name for click responses.
      log('config read failed: %o', err);
      return { enabled: false, tmux_session: DEFAULT_INQUIRY_TMUX_SESSION };
    }
    const name = section?.tmux_session;
    return {
      enabled: section?.enabled === true,
      tmux_session:
        typeof name === 'string' && name.length > 0
          ? name
          : DEFAULT_INQUIRY_TMUX_SESSION
    };
  }

  /**
   * Read an attempt through the injected queue-store seam.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   */
  async function readAttempt(workspace, attempt_id) {
    try {
      if (!deps.readAttempt) {
        return null;
      }
      return await deps.readAttempt(workspace, attempt_id);
    } catch (err) {
      log('attempt read failed for %s: %o', attempt_id, err);
      return null;
    }
  }

  /**
   * Choose the attempt transcript, then session_ref, then fresh mode.
   *
   * @param {any} issue
   * @param {any} attempt
   */
  function forkTarget(issue, attempt) {
    /** @type {string|null} */
    let attempt_reason = null;
    const options = deps.sessionRefOptions || {};
    const hostname = options.hostname || os.hostname();
    if (
      attempt?.runner === FORK_RUNNER &&
      typeof attempt.session_id === 'string' &&
      attempt.session_id.length > 0
    ) {
      const located = resolveSessionFile(
        {
          index: 0,
          provider: FORK_RUNNER,
          session_id: attempt.session_id,
          host: hostname
        },
        options
      );
      if (located.locality === 'local') {
        return { session_id: attempt.session_id, fallback_reason: null };
      }
      attempt_reason = 'attempt_transcript_missing';
    }
    const metadata =
      issue?.metadata && typeof issue.metadata === 'object'
        ? issue.metadata
        : {};
    const qualified = qualifySessionFork(metadata, FORK_RUNNER, options);
    if (qualified.ok) {
      return { session_id: qualified.session_id, fallback_reason: null };
    }
    return {
      session_id: null,
      fallback_reason: attempt_reason ?? qualified.reason
    };
  }

  /**
   * Create a uniform not-launched response.
   *
   * @param {string} reason
   * @returns {InquiryOutcome}
   */
  function refusal(reason) {
    return {
      launched: false,
      session: 'not_launched',
      reason,
      mode: 'fresh',
      fallback_reason: null,
      session_id: null,
      command: null,
      bridge_active: launcher.bridgeActive(),
      tmux_session: null,
      tmux_window: null
    };
  }

  /**
   * Map the shared launcher result to the click response contract.
   *
   * @param {any} outcome
   * @param {{ session_id: string|null, fallback_reason: string|null }} fork
   * @param {{ tmux_session: string, bead_id: string }} place
   * @returns {InquiryOutcome}
   */
  function inquiryOutcome(outcome, fork, place) {
    return {
      launched: outcome.session === 'launched',
      session: outcome.session,
      reason: outcome.session === 'not_launched' ? outcome.reason : null,
      mode: fork.session_id === null ? 'fresh' : 'fork',
      fallback_reason: fork.fallback_reason,
      session_id: fork.session_id,
      command:
        fork.session_id === null
          ? 'claude'
          : `claude --resume ${shellQuote(fork.session_id)} --fork-session`,
      bridge_active: launcher.bridgeActive(),
      tmux_session:
        outcome.session === 'not_launched' ? null : place.tmux_session,
      tmux_window: outcome.session === 'not_launched' ? null : place.bead_id
    };
  }

  /**
   * Build and launch one parked-attempt inquiry.
   *
   * @param {any} input
   * @param {boolean} automatic
   * @returns {Promise<{ outcome: InquiryOutcome, branch: 'stale'|'impl_conflict'|'generic', stale_kind: string|null, title: string|null, repo: string }>}
   */
  async function dispose(input, automatic) {
    const workspace = String(input.workspace ?? '');
    const bead_id = String(input.bead_id ?? '');
    const attempt_id = String(input.attempt_id ?? '');
    const awaiting_user = String(input.awaiting_user ?? '');
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
    const branch = STALE_REASONS.has(awaiting_user)
      ? 'stale'
      : awaiting_user === IMPL_CONFLICT_REASON
        ? 'impl_conflict'
        : 'generic';
    if (!issue || typeof issue !== 'object') {
      return {
        outcome: refusal('bd_unavailable'),
        branch,
        stale_kind: null,
        title: null,
        repo
      };
    }
    const title = typeof issue.title === 'string' ? issue.title : null;
    const metadata =
      issue.metadata && typeof issue.metadata === 'object'
        ? issue.metadata
        : {};
    const attempt = await readAttempt(workspace, attempt_id);
    const attempt_repo =
      typeof attempt?.repo === 'string' && attempt.repo.length > 0
        ? attempt.repo
        : null;
    if (branch === 'impl_conflict' && (!attempt || attempt_repo === null)) {
      return {
        outcome: refusal('attempt_unavailable'),
        branch,
        stale_kind: null,
        title,
        repo
      };
    }
    // Stale/generic dispositions edit the target-base checkout. An
    // implementation conflict must inherit the existing Bead worktree where
    // the reviewed candidate commit and uncommitted state live.
    const checkout =
      branch === 'impl_conflict'
        ? path.join(/** @type {string} */ (attempt_repo), '.worktrees', bead_id)
        : (attempt_repo ?? repo);
    const config = readInquiryConfig();
    /** @type {string|null} */
    let stale_kind = null;
    /** @type {string} */
    let prompt;
    const fork = forkTarget(issue, attempt);
    if (branch === 'stale') {
      const stale = parseStaleNotes(issue.notes);
      stale_kind = stale.stale_kind;
      if (stale_kind === null) {
        return {
          outcome: refusal('stale_kind_missing'),
          branch,
          stale_kind,
          title,
          repo
        };
      }
      const receipt_key = receiptKeyFor(awaiting_user);
      const receipt = metadata[receipt_key];
      prompt = fillStalePrompt({
        bead_id,
        receipt_key,
        receipt: typeof receipt === 'string' ? receipt : null,
        stale_kind,
        summary: stale.summary,
        checkout
      });
    } else if (branch === 'impl_conflict') {
      const parked = parseParkNotes(issue.notes);
      if (parked.target === null || parked.finding === null) {
        return {
          outcome: refusal('park_facts_missing'),
          branch,
          stale_kind,
          title,
          repo
        };
      }
      prompt = fillImplConflictPrompt({
        bead_id,
        receipt:
          typeof metadata.spec_review === 'string'
            ? metadata.spec_review
            : null,
        target: parked.target,
        finding: parked.finding,
        checkout,
        session_id: fork.session_id
      });
    } else {
      const receipt =
        typeof metadata.spec_review === 'string'
          ? `spec_review=${metadata.spec_review}`
          : typeof metadata.plan_approval === 'string'
            ? `plan_approval=${metadata.plan_approval}`
            : PLAIN_ABSENT;
      prompt = fillGenericPrompt({
        bead_id,
        awaiting_user,
        receipt,
        checkout,
        session_id: fork.session_id
      });
    }
    if (automatic && !config.enabled) {
      return {
        outcome: refusal('disabled'),
        branch,
        stale_kind,
        title,
        repo
      };
    }
    const seeded = withFallbackReason(prompt, fork.fallback_reason);
    const command_args =
      fork.session_id === null
        ? [seeded]
        : ['--resume', fork.session_id, '--fork-session', seeded];
    const launched = await launcher.launch({
      marker: PANE_MARKER,
      key: bead_id,
      tmux_session: config.tmux_session,
      window_name: bead_id,
      cwd: checkout,
      commandArgs: command_args
    });
    return {
      outcome: inquiryOutcome(launched, fork, {
        tmux_session: config.tmux_session,
        bead_id
      }),
      branch,
      stale_kind,
      title,
      repo
    };
  }

  /**
   * Send one no-throw parking notification.
   *
   * @param {Record<string, unknown>} input
   */
  async function announce(input) {
    try {
      await deps.notifier.awaitingUser(input);
    } catch (err) {
      // Production notifier is no-throw; injected test/embedding fakes are not
      // bound by that contract and still must not fail attempt settlement.
      log('awaiting_user notify failed: %o', err);
    }
  }

  return {
    /**
     * Launch automatically after the parked record is durable.
     *
     * @param {{ workspace: string, bead_id: string, attempt_id: string, repo: string|null, target_base: string|null, awaiting_user: string|null }} input
     */
    async onParkedAttempt(input) {
      const bead_id =
        input && typeof input.bead_id === 'string' ? input.bead_id : '';
      const awaiting_user =
        input && typeof input.awaiting_user === 'string'
          ? input.awaiting_user
          : '';
      if (bead_id.length === 0 || awaiting_user.length === 0) {
        return;
      }
      if (in_flight.has(bead_id)) {
        return;
      }
      in_flight.add(bead_id);
      try {
        const result = await dispose(input, true);
        await announce({
          bead_id,
          title: result.title,
          awaiting_user,
          stale_kind: result.stale_kind,
          branch: result.branch,
          repo: result.repo,
          ...result.outcome
        });
      } catch (err) {
        log('direction inquiry failed for %s: %o', bead_id, err);
      } finally {
        in_flight.delete(bead_id);
      }
    },

    /**
     * Launch from the parked tile without consulting `enabled`.
     *
     * The liveness question is answered by the pane marker BEFORE any Bead or
     * attempt read (spec §3.3: 중복 판정은 `INQUIRY_PANE_MARKER`만 본다). A `bd`
     * that cannot be reached must not hide a session that is already up, and
     * the module reservation is not that evidence — it is held while the
     * prompt is still being built, and that disposal can still end in a
     * refusal, so answering `already_running` from it would name a window
     * nobody opened.
     *
     * @param {{ workspace: string, bead_id: string, attempt_id: string, repo: string|null, awaiting_user: string|null }} input
     * @returns {Promise<InquiryOutcome>}
     */
    async launchForClick(input) {
      const bead_id =
        input && typeof input.bead_id === 'string' ? input.bead_id : '';
      const awaiting_user =
        input && typeof input.awaiting_user === 'string'
          ? input.awaiting_user
          : '';
      if (bead_id.length === 0 || awaiting_user.length === 0) {
        return refusal('invalid_park');
      }
      const listed = await launcher.listPanes(PANE_MARKER);
      if (!listed.ok) {
        return refusal('tmux_unavailable');
      }
      const live = listed.rows.find(
        (row) => row.key === bead_id && row.dead === '0'
      );
      if (live) {
        return {
          ...refusal('already_running'),
          session: 'already_running',
          reason: null,
          tmux_session: live.session,
          tmux_window: bead_id
        };
      }
      if (in_flight.has(bead_id)) {
        // A disposal is mid-flight and its pane has not appeared yet. Saying
        // `already_running` would point at nothing; the honest answer lets the
        // next click read the settled state.
        return refusal('inquiry_in_flight');
      }
      in_flight.add(bead_id);
      try {
        return (await dispose(input, false)).outcome;
      } catch (err) {
        log('direction inquiry click failed for %s: %o', bead_id, err);
        return refusal('error');
      } finally {
        in_flight.delete(bead_id);
      }
    },

    /** Probe the configured tmux socket at startup. */
    async probeTmux() {
      if (!readInquiryConfig().enabled) {
        return;
      }
      const listed = await launcher.listPanes(PANE_MARKER);
      // Daemons normally run without `--debug`; startup reachability must use
      // console output or this operational failure disappears entirely.
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
