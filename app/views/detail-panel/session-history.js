import { html } from 'lit-html';
import {
  formatAttemptTuple,
  formatContinuationLineage
} from '../../utils/attempt-display.js';
import {
  formatUsageTotal,
  projectAttemptUsage,
  providerUsageBadges
} from '../../utils/token-usage.js';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {import('../../utils/token-usage.js').UsageRecord} UsageRecord
 */

/**
 * The breakdown rows behind [τ 자세히] (UI-d7pw §2.2), in tally order. Cost is
 * appended separately because it is reported once per session, not per field.
 *
 * @type {ReadonlyArray<{ key: 'input_tokens'|'output_tokens'|'cache_read_input_tokens', label: string }>}
 */
const USAGE_BREAKDOWN = [
  { key: 'input_tokens', label: '입력' },
  { key: 'output_tokens', label: '출력' },
  { key: 'cache_read_input_tokens', label: '캐시 읽기' }
];

/**
 * The note a restart-recovered tally carries (UI-ediw): events lost with the
 * old server's pipe are unrecoverable, so the number is a floor.
 *
 * @type {string}
 */
const REPLAYED_NOTE = '서버 재시작 복구 — 부분 집계';

/**
 * The delegated-leg rows, in render order, each with the provider that reports
 * it (UI-2mpn §6.1). Claude subagents reuse the exact row shape Codex units
 * have: same status glyph, same short-id, time, and token columns.
 *
 * @type {ReadonlyArray<{ role: 'implementation'|'review-consult'|'subagent', provider: 'codex'|'claude' }>}
 */
const DELEGATION_ROLES = [
  { role: 'implementation', provider: 'codex' },
  { role: 'review-consult', provider: 'codex' },
  { role: 'subagent', provider: 'claude' }
];

/** @type {ReadonlyArray<'running'|'done'|'failed'|'interrupted'>} */
const DELEGATION_STATUSES = ['running', 'done', 'failed', 'interrupted'];

/** @type {Record<string, string>} */
const DELEGATION_STATUS_GLYPH = {
  running: '●',
  done: '✓',
  failed: '✗',
  interrupted: '⚠'
};

/**
 * @param {unknown} value
 * @returns {number}
 */
function usageNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * The `τ 총 …` label beside the section heading. Null when nothing was
 * reported, so the heading renders exactly as it did before.
 *
 * @param {UsageRecord|import('../../utils/token-usage.js').UsageProjection|null|undefined} total
 * @returns {TemplateResult|TemplateResult[]|''}
 */
function totalTemplate(total) {
  const provider_badges = providerUsageBadges(total);
  if (provider_badges.length > 0) {
    return provider_badges.map(
      (badge) =>
        html`<span class="detail-usage-total" title=${badge.tooltip}
          >${badge.label}</span
        >`
    );
  }
  const label = formatUsageTotal(total);
  if (!label || !total) {
    return '';
  }
  const cost =
    typeof total.total_cost_usd === 'number' &&
    Number.isFinite(total.total_cost_usd)
      ? ` · $${total.total_cost_usd.toFixed(2)}`
      : '';
  return html`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${label.replace(/^τ /, 'τ 총 ')}${cost}</span
    >${total.replayed
      ? html`<span class="detail-usage-partial" title=${REPLAYED_NOTE}
          >부분 집계</span
        >`
      : ''}`;
}

/**
 * @param {import('../../utils/token-usage.js').UsageProjection|null} projection
 * @returns {import('../../utils/token-usage.js').UsageProjection|null}
 */
function outerProjection(projection) {
  if (!projection || !projection.roles.orchestrator) {
    return null;
  }
  return { providers: projection.roles.orchestrator, roles: {} };
}

/**
 * A receipt's completion time as `HH:MM`. Codex writes an ISO string; a Claude
 * subagent receipt carries epoch ms, or null when the stream line it came from
 * had no `timestamp` of its own — which renders an empty cell, never a zero
 * o'clock (UI-2mpn §5.3).
 *
 * @param {string|number|null|undefined} completed_at
 * @returns {string}
 */
function completedTime(completed_at) {
  if (typeof completed_at === 'number') {
    return shortTime(completed_at);
  }
  if (typeof completed_at !== 'string') {
    return '';
  }
  const value = Date.parse(completed_at);
  return Number.isFinite(value) ? shortTime(value) : '';
}

/**
 * A model string without the dated build suffix Claude appends
 * (`claude-opus-4-5-20251101` → `claude-opus-4-5`). Nothing is mapped to an
 * alias: shortening is dropping a segment the row has no space for, not
 * renaming a model the stream reported.
 *
 * @param {string|null|undefined} model
 * @returns {string}
 */
function shortModel(model) {
  return typeof model === 'string' ? model.replace(/-\d{8}$/, '') : '';
}

/**
 * The short id a delegated row shows. A Claude subagent's `agentId` only exists
 * once it finished, so a running row falls back to the tail of its launch id —
 * the head is the constant `toolu_01` prefix and would identify nothing.
 *
 * @param {DelegationSession} session
 * @param {Record<string, any>|null} leg
 * @returns {{ text: string, title: string }}
 */
function shortIdOf(session, leg) {
  if (session.provider !== 'claude') {
    return {
      text: session.session_id.slice(0, 8),
      title: session.session_id
    };
  }
  const agent_id = leg && typeof leg.agent_id === 'string' ? leg.agent_id : '';
  return agent_id.length > 0
    ? { text: agent_id.slice(0, 8), title: agent_id }
    : { text: session.launch_id.slice(-8), title: session.launch_id };
}

/**
 * @typedef {Object} DelegationSession
 * @property {string} launch_id
 * @property {'codex'|'claude'} provider
 * @property {'implementation'|'review-consult'|'subagent'} role
 * @property {string|null} [agent_type]
 * @property {string|null} model
 * @property {string|null} [effort]
 * @property {string} session_id
 * @property {string|null} turn_id
 * @property {'running'|'done'|'failed'|'interrupted'} status
 * @property {number|null} started_at
 * @property {string|number|null} completed_at
 * @property {number|null} last_event_at
 */

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function optionalName(value) {
  return (
    value === null || (typeof value === 'string' && value.trim().length > 0)
  );
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function epochOrNull(value) {
  return (
    value === null || (typeof value === 'number' && Number.isFinite(value))
  );
}

/**
 * Whether a wire record is a delegated-session row this view can render.
 *
 * A Claude subagent row is admitted under its own half of the contract
 * (UI-2mpn §5.3): its times are epoch ms or null, because they come from the
 * parent stream lines' own `timestamp` and a line that carries none leaves the
 * field empty rather than inventing one.
 *
 * @param {unknown} candidate
 * @returns {DelegationSession|null}
 */
function validDelegation(candidate) {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
    return null;
  }
  const session = /** @type {Record<string, any>} */ (candidate);
  const claude = session.provider === 'claude';
  if (
    typeof session.launch_id !== 'string' ||
    session.launch_id.length === 0 ||
    !DELEGATION_ROLES.some(
      (entry) =>
        entry.role === session.role && entry.provider === session.provider
    ) ||
    !(claude
      ? optionalName(session.model)
      : typeof session.model === 'string' && session.model.length > 0) ||
    !(!('effort' in session) || optionalName(session.effort)) ||
    !(!('agent_type' in session) || optionalName(session.agent_type)) ||
    typeof session.session_id !== 'string' ||
    session.session_id.length === 0 ||
    !DELEGATION_STATUSES.includes(session.status) ||
    !(session.turn_id === null || typeof session.turn_id === 'string')
  ) {
    return null;
  }
  if (claude) {
    if (
      !epochOrNull(session.started_at) ||
      !epochOrNull(session.last_event_at) ||
      !epochOrNull(session.completed_at)
    ) {
      return null;
    }
    return /** @type {DelegationSession} */ (session);
  }
  if (
    typeof session.started_at !== 'number' ||
    !Number.isFinite(session.started_at) ||
    typeof session.last_event_at !== 'number' ||
    !Number.isFinite(session.last_event_at) ||
    !(
      session.completed_at === null ||
      (typeof session.completed_at === 'string' &&
        Number.isFinite(Date.parse(session.completed_at)))
    )
  ) {
    return null;
  }
  return /** @type {DelegationSession} */ (session);
}

/**
 * Existing static receipt markup. Legacy usage-only rows and identity conflicts
 * keep this exact non-interactive projection.
 *
 * @param {'implementation'|'review-consult'|'subagent'} role
 * @param {'codex'|'claude'} provider
 * @param {Record<string, any>} leg
 * @returns {TemplateResult}
 */
function staticLegTemplate(role, provider, leg) {
  const badges = providerUsageBadges({
    providers: {
      [provider]: {
        subtotal: leg.subtotal,
        breakdown: leg.usage,
        ...(leg.replayed ? { replayed: true } : {})
      }
    },
    roles: {}
  });
  const badge = badges[0];
  return html`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[leg.provider, leg.model, leg.effort]
        .filter(Boolean)
        .join(' · ')}</span
    >
    ${leg.session_id
      ? html`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${leg.session_id}
          >${leg.session_id.slice(0, 8)}</span
        >`
      : ''}
    ${completedTime(leg.completed_at)
      ? html`<span class="detail-session__leg-time detail-session__time"
          >${completedTime(leg.completed_at)}</span
        >`
      : ''}
    ${badge
      ? html`<span class="detail-session__usage" title=${badge.tooltip}
          >${badge.label}</span
        >`
      : ''}
  </div>`;
}

/**
 * @param {DelegationSession} session
 * @param {Record<string, any>|null} leg
 * @param {string} attempt_id
 * @param {{ onOpenDelegation?: (attempt_id: string, launch_id: string) => void }} handlers
 * @returns {TemplateResult}
 */
function monitoredLegTemplate(session, leg, attempt_id, handlers) {
  const terminal_leg = session.status === 'running' ? null : leg;
  const badges = terminal_leg
    ? providerUsageBadges({
        providers: {
          [session.provider]: {
            subtotal: terminal_leg.subtotal,
            breakdown: terminal_leg.usage,
            ...(terminal_leg.replayed ? { replayed: true } : {})
          }
        },
        roles: {}
      })
    : [];
  const badge = badges[0];
  const time =
    session.status === 'running'
      ? shortTime(session.last_event_at)
      : terminal_leg
        ? completedTime(terminal_leg.completed_at)
        : '';
  // `Claude · <agent_type> · <model> · <effort>` for a subagent; the Codex row
  // keeps its lowercase provider + effort tuple. A missing piece drops out
  // rather than rendering a gap (UI-2mpn §6.1). A subagent's effort is read off
  // its own JSONL once its receipt names the agent, so it lands last.
  const meta = (
    session.provider === 'claude'
      ? [
          'Claude',
          session.agent_type,
          shortModel(session.model),
          session.effort
        ]
      : ['codex', session.model, session.effort]
  )
    .filter(Boolean)
    .join(' · ');
  const short_id = shortIdOf(session, terminal_leg);
  return html`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${session.status}"
    data-launch-id=${session.launch_id}
    @click=${() =>
      handlers.onOpenDelegation &&
      handlers.onOpenDelegation(attempt_id, session.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${DELEGATION_STATUS_GLYPH[session.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${session.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${meta}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${short_id.title}
      >${short_id.text}</span
    >
    ${time
      ? html`<span class="detail-session__leg-time detail-session__time"
          >${time}</span
        >`
      : ''}
    ${badge
      ? html`<span class="detail-session__usage" title=${badge.tooltip}
          >${badge.label}</span
        >`
      : ''}
  </button>`;
}

/**
 * @param {DelegationSession} session
 * @param {Record<string, any>} leg
 * @returns {boolean}
 */
function sameDelegationIdentity(session, leg) {
  return (
    session.role === leg.role &&
    // A subagent's model is only known once its result reported one, so a
    // running row with a null model must still join the receipt that named it.
    (session.model === null ||
      leg.model === undefined ||
      session.model === leg.model) &&
    session.session_id === leg.session_id
  );
}

/**
 * Merge live monitor rows with optional terminal usage receipts, then retain
 * usage-only and identity-conflict rows as static legacy rows.
 *
 * @param {SessionAttempt} attempt
 * @param {import('../../utils/token-usage.js').UsageProjection|null} projection
 * @param {{ onOpenDelegation?: (attempt_id: string, launch_id: string) => void }} handlers
 * @returns {TemplateResult[]}
 */
function delegationLegs(attempt, projection, handlers) {
  /** @type {DelegationSession[]} */
  const sessions = [];
  /** @type {Set<string>} */
  const launch_ids = new Set();
  const candidates = Array.isArray(attempt.delegation_sessions)
    ? attempt.delegation_sessions
    : [];
  for (const candidate of candidates) {
    const session = validDelegation(candidate);
    if (!session || launch_ids.has(session.launch_id)) {
      continue;
    }
    launch_ids.add(session.launch_id);
    sessions.push(session);
  }
  // A subagent that started on a line with no `timestamp` has no start time to
  // sort by; those rows keep their arrival order at the front.
  sessions.sort(
    (left, right) => (left.started_at || 0) - (right.started_at || 0)
  );

  /** @type {Record<string, Record<string, any>[]>} */
  const usage_by_role = {};
  for (const { role, provider } of DELEGATION_ROLES) {
    const summary = projection ? projection.roles[role]?.[provider] : null;
    usage_by_role[role] = summary ? [...summary.legs] : [];
  }
  const all_usage = DELEGATION_ROLES.flatMap(({ role }) => usage_by_role[role]);
  /** @type {Set<string>} */
  const joined_receipts = new Set();
  /** @type {TemplateResult[]} */
  const rows = [];

  for (const { role, provider } of DELEGATION_ROLES) {
    for (const session of sessions.filter(
      (entry) => entry.role === role && entry.provider === provider
    )) {
      const leg =
        all_usage.find((entry) => entry.receipt_id === session.launch_id) ||
        null;
      if (leg && !sameDelegationIdentity(session, leg)) {
        continue;
      }
      if (leg) {
        joined_receipts.add(leg.receipt_id);
      }
      rows.push(
        monitoredLegTemplate(session, leg, attempt.attempt_id, handlers)
      );
    }
    for (const leg of usage_by_role[role]) {
      if (!joined_receipts.has(leg.receipt_id)) {
        rows.push(staticLegTemplate(role, provider, leg));
      }
    }
  }
  return rows;
}

/**
 * The expanded breakdown under one session row. Rendered only while that row is
 * toggled open — a sibling block, exactly like {@link causeLine}, so the
 * row-click=open-transcript convention stays intact.
 *
 * @param {UsageRecord} usage
 * @param {'claude'|'codex'} provider
 * @returns {TemplateResult}
 */
function usageDetail(usage, provider) {
  const cost =
    typeof usage.total_cost_usd === 'number' &&
    Number.isFinite(usage.total_cost_usd)
      ? usage.total_cost_usd
      : null;
  const provider_rows = [
    ...USAGE_BREAKDOWN,
    {
      key: /** @type {'cache_creation_input_tokens'} */ (
        'cache_creation_input_tokens'
      ),
      label: provider === 'codex' ? '캐시 쓰기' : '캐시 생성'
    },
    ...(provider === 'codex' &&
    typeof usage.reasoning_output_tokens === 'number' &&
    Number.isFinite(usage.reasoning_output_tokens)
      ? [
          {
            key: /** @type {'reasoning_output_tokens'} */ (
              'reasoning_output_tokens'
            ),
            label: '추론 출력'
          }
        ]
      : [])
  ];
  return html`<div class="detail-session__usage-detail">
    ${provider_rows.map(
      (row) =>
        html`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${row.label}</span
          ><span class="detail-session__usage-value"
            >${usageNumber(usage[row.key]).toLocaleString('en-US')}</span
          ></span
        >`
    )}
    ${cost === null
      ? ''
      : html`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${cost.toFixed(2)}</span
          ></span
        >`}
    ${usage.replayed
      ? html`<span class="detail-session__usage-note">${REPLAYED_NOTE}</span>`
      : ''}
  </div>`;
}

/**
 * @typedef {Object} SessionAttempt
 * @property {string} attempt_id
 * @property {string} [bead_id]
 * @property {string} [status] - running/done/failed/orphaned.
 * @property {number|null} [started_at]
 * @property {string|null} [runner]
 * @property {string|null} [model]
 * @property {string|null} [effort]
 * @property {string|null} [speed]
 * @property {string|null} [session_id] - Runner session id (short display).
 * @property {string|null} [resumed_from] - Prior attempt this one resumes (§1).
 * @property {'session'|'fresh'|null} [continuation_mode]
 * @property {number|null} [dismissed_at] - Epoch ms the attempt was dismissed (closed as handled), if any.
 * @property {string|null} [cause] - Why a failed/orphaned attempt ended
 * (UI-qult §4); absent on records written before the field existed.
 * @property {{ reason: string, command: string|null }|null} [cause_detail] -
 * What the fail-closed path caught behind that cause. `command` is nullable —
 * a guard can trip without one.
 * @property {UsageRecord|null} [usage] - This attempt's token usage (UI-d7pw
 * §2.2); absent/null renders no badge and no [τ 자세히] button.
 * @property {Array<Record<string, any>>} [usage_legs] - Durable completed
 * nested receipts, Codex units and Claude subagents alike. Missing/invalid rows
 * stay absent.
 * @property {Array<Record<string, any>>} [delegation_sessions] - Durable/live
 * normalized delegation summaries, same two providers.
 * @property {string|null} [exec_default_preset_id] - Outer launch preset id.
 * @property {number|null} [exec_default_preset_revision] - Pinned preset revision.
 * @property {Record<string, string|null>|null} [exec_values] - Outer resolved values.
 */

/** @type {Record<string, string>} */
const STATUS_GLYPH = {
  running: '●',
  done: '✓',
  failed: '✗',
  orphaned: '⚠'
};

/**
 * Format an epoch-ms timestamp as a short `HH:MM` label (empty when absent).
 *
 * @param {number|null|undefined} ms
 * @returns {string}
 */
function shortTime(ms) {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) {
    return '';
  }
  const d = new Date(ms);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/**
 * The outer Worker launch snapshot. It is intentionally not an execution
 * receipt: `impl_model` describes the requested outer target and cannot prove
 * which child provider/model the workflow actually dispatched.
 *
 * @param {SessionAttempt} attempt
 * @returns {TemplateResult|''}
 */
function presetAudit(attempt) {
  if (
    typeof attempt.exec_default_preset_id !== 'string' ||
    attempt.exec_default_preset_id.length === 0
  ) {
    return '';
  }
  const values =
    attempt.exec_values && typeof attempt.exec_values === 'object'
      ? Object.entries(attempt.exec_values)
          .filter(([, value]) => typeof value === 'string' && value.length > 0)
          .map(([key, value]) => `${key}=${value}`)
          .join(' · ')
      : '';
  const revision =
    typeof attempt.exec_default_preset_revision === 'number'
      ? ` r${attempt.exec_default_preset_revision}`
      : '';
  return html`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${attempt.exec_default_preset_id}${revision}</span>
    ${values ? html`<small>${values}</small>` : ''}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`;
}

/**
 * Session-history section (spec §5.6): lists a bead's past/live Worker attempts;
 * clicking a row opens the transcript drawer against the persisted (or live)
 * log. A failed/orphaned attempt with a captured session id carries a separate
 * "↻ 이어하기" button (spec §1) — the row-click=open convention stays intact
 * because the button is a sibling, not a nested control. The button is ACTIVE
 * only on the newest eligible leaf of a resume lineage; an ancestor already
 * resumed (a child carries its `resumed_from`) or a pre-session-id attempt is
 * disabled with the reason in its title. A resume attempt shows a `↻` badge
 * titled with its `resumed_from`.
 *
 * Token usage rides along per row (UI-d7pw §2.2): a `τ …` badge, a [τ 자세히]
 * sibling button that expands the breakdown under the row, and the issue's
 * total beside the section heading.
 *
 * @param {SessionAttempt[]} [attempts]
 * @param {{ onOpen?: (attempt_id: string) => void, onOpenDelegation?: (attempt_id: string, launch_id: string) => void, onResume?: (attempt_id: string) => void, onToggleUsage?: (attempt_id: string) => void }} [handlers]
 * @param {{ total?: UsageRecord|import('../../utils/token-usage.js').UsageProjection|null, expanded?: Set<string> }} [usage_view]
 * @returns {TemplateResult}
 */
export function sessionHistoryTemplate(
  attempts,
  handlers = {},
  usage_view = {}
) {
  const list = Array.isArray(attempts) ? attempts : [];
  const expanded = usage_view.expanded || new Set();
  if (list.length === 0) {
    return html`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;
  }
  // A resumed_from that another attempt carries marks its ancestor as spent.
  /** @type {Set<string>} */
  const resumed_from_ids = new Set();
  for (const a of list) {
    if (a && typeof a.resumed_from === 'string' && a.resumed_from.length > 0) {
      resumed_from_ids.add(a.resumed_from);
    }
  }

  /**
   * @param {SessionAttempt} a
   * @returns {TemplateResult|''}
   */
  const resumeButton = (a) => {
    const is_terminal_fail = a.status === 'failed' || a.status === 'orphaned';
    if (!is_terminal_fail) {
      return '';
    }
    const has_sid = typeof a.session_id === 'string' && a.session_id.length > 0;
    const already = resumed_from_ids.has(a.attempt_id);
    // `dismissed_at` is deliberately NOT part of the eligibility: the server's
    // `scheduler.resume()` never reads it, so excluding dismissed attempts here
    // made the UI stricter than the API it drives (UI-qult §4).
    const eligible = has_sid && !already;
    const title = !has_sid
      ? 'session_id 없는 구 attempt — 이어하기 불가'
      : already
        ? '이미 이어받은 attempt (child attempt 존재) — 이어하기 불가'
        : '이 세션을 같은 워크트리에서 이어서 진행';
    return html`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${a.attempt_id}
      ?disabled=${!eligible}
      title=${title}
      @click=${(/** @type {Event} */ ev) => {
        ev.stopPropagation();
        if (eligible && handlers.onResume) {
          handlers.onResume(a.attempt_id);
        }
      }}
    >
      ↻ 이어하기
    </button>`;
  };

  /**
   * The one-line failure cause under a failed/orphaned row (UI-qult §4). A
   * record written before the field existed renders nothing rather than an
   * empty line.
   *
   * @param {SessionAttempt} a
   * @returns {TemplateResult|''}
   */
  const causeLine = (a) => {
    const is_terminal_fail = a.status === 'failed' || a.status === 'orphaned';
    if (!is_terminal_fail || typeof a.cause !== 'string' || a.cause === '') {
      return '';
    }
    const detail = a.cause_detail;
    // `command` is nullable, so it is appended only when it really is one —
    // a tooltip reading "… · null" says less than no tooltip at all.
    const title =
      detail && typeof detail.reason === 'string' && detail.reason.length > 0
        ? typeof detail.command === 'string' && detail.command.length > 0
          ? `${detail.reason} · ${detail.command}`
          : detail.reason
        : a.cause;
    return html`<div class="detail-session__cause" title=${title}>
      ${a.cause}
    </div>`;
  };

  /**
   * The [τ 자세히] toggle. Absent on an attempt that reported no usage — there
   * would be nothing behind it.
   *
   * @param {SessionAttempt} a
   * @returns {TemplateResult|''}
   */
  const usageButton = (a) => {
    const projection = outerProjection(projectAttemptUsage(a));
    if (
      providerUsageBadges(projection).length === 0 &&
      !formatUsageTotal(a.usage)
    ) {
      return '';
    }
    const open = expanded.has(a.attempt_id);
    return html`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${a.attempt_id}
      aria-expanded=${open ? 'true' : 'false'}
      title=${open ? '토큰 내역 접기' : '토큰 내역 펼치기'}
      @click=${(/** @type {Event} */ ev) => {
        ev.stopPropagation();
        if (handlers.onToggleUsage) {
          handlers.onToggleUsage(a.attempt_id);
        }
      }}
    >
      τ 자세히
    </button>`;
  };

  return html`
    <div class="detail-section-label">
      세션 이력${totalTemplate(usage_view.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${list.map((a) => {
        const projection = projectAttemptUsage(a);
        const outer = outerProjection(projection);
        const outer_badges = providerUsageBadges(outer);
        return html`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${a.status || 'unknown'}"
            data-attempt-id=${a.attempt_id}
            @click=${() => handlers.onOpen && handlers.onOpen(a.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${STATUS_GLYPH[a.status || ''] || '·'}</span
            >
            <span class="detail-session__id">${a.attempt_id}</span>
            ${formatContinuationLineage(a)
              ? html`<span
                  class="detail-session__resumed"
                  title=${formatContinuationLineage(a)}
                  >↻</span
                >`
              : ''}
            <span class="detail-session__meta">${formatAttemptTuple(a)}</span>
            ${outer_badges.length > 0
              ? html`<span class="detail-session__role">orchestrator</span>`
              : ''}
            ${a.session_id
              ? html`<span class="detail-session__sid" title=${a.session_id}
                  >${String(a.session_id).slice(0, 8)}</span
                >`
              : ''}
            ${outer_badges.length > 0
              ? outer_badges.map(
                  (badge) =>
                    html`<span
                      class="detail-session__usage"
                      title=${badge.tooltip}
                      >${badge.label}</span
                    >`
                )
              : formatUsageTotal(a.usage)
                ? html`<span class="detail-session__usage"
                    >${formatUsageTotal(a.usage)}</span
                  >`
                : ''}
            <span class="detail-session__time">${shortTime(a.started_at)}</span>
          </button>
          ${usageButton(a)} ${resumeButton(a)} ${causeLine(a)} ${presetAudit(a)}
          ${expanded.has(a.attempt_id) && a.usage
            ? usageDetail(a.usage, a.runner === 'codex' ? 'codex' : 'claude')
            : ''}
          ${delegationLegs(a, projection, handlers)}
        </div>`;
      })}
    </div>
  `;
}
