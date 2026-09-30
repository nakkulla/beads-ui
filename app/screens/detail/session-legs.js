/**
 * The session-history row parts (UI-d7pw §2.2, UI-2mpn §6, UI-mn5u §6.4): the
 * price and token breakdown of one leg, the delegation and native-child legs
 * under an attempt, and the section total. Split verbatim out of
 * `session-history.js` (UI-dbn6 Phase 2, 1,000-line rule); the row grammar is
 * unchanged.
 */
import { html } from 'lit-html';
import { priceUsage } from '../../../server/worker/usage-pricing.js';
import {
  PRICE_BASIS_LABELS,
  costTooltipLines,
  formatUsageTotal,
  projectAttemptUsage,
  providerUsageBadges
} from '../../utils/token-usage.js';

/**
 * @import { SessionRefView } from '../../../server/worker/session-ref.js'
 */

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {import('../../utils/token-usage.js').UsageRecord} UsageRecord
 */

/**
 * The price of ONE leg beside its token badge (preset-compare §1.3). Absent
 * when the projection could price nothing at all, so an install that declares
 * no unit price renders exactly the row it rendered before. `reported` carries
 * no marker; `계산`·`추정`·`단가 없음` name where the other figures came from.
 *
 * @param {Record<string, any>|null|undefined} leg
 * @returns {TemplateResult|''}
 */
function legPriceTemplate(leg) {
  if (!leg || typeof leg.price_basis !== 'string') {
    return '';
  }
  const basis = /** @type {keyof typeof PRICE_BASIS_LABELS} */ (
    leg.price_basis
  );
  if (!(basis in PRICE_BASIS_LABELS)) {
    return '';
  }
  const marker = PRICE_BASIS_LABELS[basis];
  if (basis === 'none') {
    return html`<span class="detail-session__price detail-session__price--none"
      >${marker}</span
    >`;
  }
  const lines = costTooltipLines({
    total_cost_usd: leg.price_usd,
    cost_estimated: basis === 'estimated'
  });
  if (lines.length === 0) {
    return '';
  }
  return html`<span class="detail-session__price" title=${lines.join('\n')}
    >${lines[0]}${marker ? ` ${marker}` : ''}</span
  >`;
}

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

/**
 * Claude 서브에이전트 중 구현 위임이 아닌 도구성 leg의 `agent_type`: 읽기 전용
 * 탐색/리뷰 leg와, Codex 세션을 띄우기만 하는 전달자(dotfiles `codex-runner` —
 * 실제 작업은 별도 `codex` leg로 잡힘). 세션 이력은 Codex 위임처럼 구현 위임만
 * 보여주므로 이 타입들은 행을 그리지 않는다. 타입 미상(null)이나 새 이름은
 * 구현 위임을 놓치지 않도록 그대로 표시한다 (fail-quiet).
 */
const TOOL_AGENT_TYPES = new Set([
  'codex-runner',
  'Explore',
  'Plan',
  'advisor',
  'advisor-xhigh',
  'claude-code-guide',
  'statusline-setup'
]);

/**
 * @param {string|null|undefined} agent_type
 * @returns {boolean}
 */
function isToolAgentType(agent_type) {
  return typeof agent_type === 'string' && TOOL_AGENT_TYPES.has(agent_type);
}

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
export function totalTemplate(total) {
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
 * The id a delegated row shows. Codex rows lead with the launch id and carry the
 * thread id as a second chip, because a tooltip is unreachable on a touch
 * screen (UI-2g59). A Claude subagent's `agentId` only exists once it finished,
 * so a running row falls back to the tail of its launch id — the head is the
 * constant `toolu_01` prefix and would identify nothing.
 *
 * @param {{ provider: 'codex'|'claude', launch_id: string, session_id?: string|null }} session
 * @param {Record<string, any>|null} leg
 * @param {boolean} continued
 * @returns {{ text: string, title: string, thread: { text: string, title: string }|null }}
 */
function shortIdOf(session, leg, continued) {
  if (session.provider !== 'claude') {
    const thread_title = session.session_id
      ? ` · thread ${session.session_id}`
      : '';
    const continuation_title = continued ? ' · 이전 라운드 스레드 이어감' : '';
    return {
      text: `${continued ? '↩ ' : ''}${session.launch_id}`,
      title: `${session.launch_id}${thread_title}${continuation_title}`,
      thread: session.session_id
        ? {
            text: session.session_id.slice(0, 8),
            title: session.session_id
          }
        : null
    };
  }
  const agent_id = leg && typeof leg.agent_id === 'string' ? leg.agent_id : '';
  return agent_id.length > 0
    ? { text: agent_id.slice(0, 8), title: agent_id, thread: null }
    : {
        text: session.launch_id.slice(-8),
        title: session.launch_id,
        thread: null
      };
}

/**
 * The thread chip that sits next to a Codex row's launch id. Missing thread id
 * draws nothing rather than an empty chip (fail-quiet).
 *
 * @param {{ text: string, title: string }|null} thread
 * @returns {TemplateResult|string}
 */
function threadChipTemplate(thread) {
  return thread
    ? html`<span
        class="detail-session__leg-thread detail-session__sid"
        title=${thread.title}
        >${thread.text}</span
      >`
    : '';
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
 * @param {boolean} continued
 * @returns {TemplateResult}
 */
function staticLegTemplate(role, provider, leg, continued) {
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
  const short_id = shortIdOf(
    {
      provider,
      launch_id: leg.receipt_id,
      session_id:
        typeof leg.session_id === 'string' ? leg.session_id : undefined
    },
    leg,
    continued
  );
  return html`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[leg.provider, leg.model, leg.effort]
        .filter(Boolean)
        .join(' · ')}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${short_id.title}
      >${short_id.text}</span
    >
    ${threadChipTemplate(short_id.thread)}
    ${completedTime(leg.completed_at)
      ? html`<span class="detail-session__leg-time detail-session__time"
          >${completedTime(leg.completed_at)}</span
        >`
      : ''}
    ${badge
      ? html`<span class="detail-session__usage" title=${badge.tooltip}
          >${badge.label}</span
        >`
      : ''}${legPriceTemplate(leg)}
  </div>`;
}

/**
 * @param {DelegationSession} session
 * @param {Record<string, any>|null} leg
 * @param {string} attempt_id
 * @param {{ onOpenDelegation?: (attempt_id: string, launch_id: string) => void }} handlers
 * @param {boolean} continued
 * @returns {TemplateResult}
 */
function monitoredLegTemplate(session, leg, attempt_id, handlers, continued) {
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
  const short_id = shortIdOf(session, terminal_leg, continued);
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
    ${threadChipTemplate(short_id.thread)}
    ${time
      ? html`<span class="detail-session__leg-time detail-session__time"
          >${time}</span
        >`
      : ''}
    ${badge
      ? html`<span class="detail-session__usage" title=${badge.tooltip}
          >${badge.label}</span
        >`
      : ''}${legPriceTemplate(terminal_leg)}
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
 * What a native child's usage figure means (UI-mn5u §6.4). The parent's own
 * total was measured to EXCLUDE it (fixture notes §3: root 57,181 vs child
 * 114,343), and no evidence yet proves that holds for every version, so the
 * figure is shown where it was observed and added nowhere.
 *
 * @type {string}
 */
/**
 * @param {Record<string, any>} child - Native child row.
 * @param {Array<Record<string, any>>} legs - Shared projection legs.
 */
function nativeChildUsageNote(child, legs) {
  const admitted = legs.some((leg) => leg.included === true);
  if (admitted) {
    return legs.length > 1 || child.usage_partial === true
      ? '검증된 범위만 부모·자식 합계에 포함'
      : '부모·자식 합계에 포함';
  }
  const reasons = [
    ...(Array.isArray(child.usage_partial_reasons)
      ? child.usage_partial_reasons
      : []),
    ...legs.flatMap((leg) =>
      Array.isArray(leg?.partial_reasons) ? leg.partial_reasons : []
    )
  ];
  return `부모·자식 합계 제외${reasons.length > 0 ? ` · ${[...new Set(reasons)].join(' · ')}` : ' · 직접 범위 미확정'}`;
}

/**
 * One Codex native child's usage in the display vocabulary. Only the keys the
 * rollout actually reported survive: `cached_input_tokens` and
 * `reasoning_output_tokens` are SUBSETS of the input/output figures, so they
 * are carried for the breakdown and never counted a second time.
 *
 * A usage with a total and no breakdown, and one with a breakdown and no
 * total, are DIFFERENT observations and are reported as such — an unobserved
 * field is never printed as 0 (§6.4).
 *
 * @param {Record<string, any>|null|undefined} usage
 * @returns {{ subtotal: number, breakdown: UsageRecord, lines: string[] }|null}
 */
function nativeChildUsage(usage) {
  if (!usage || typeof usage !== 'object') {
    return null;
  }
  /** @type {Record<string, number>} */
  const breakdown = {};
  /** @type {Array<[string, string, string]>} */
  const mapping = [
    ['input_tokens', 'input_tokens', '입력'],
    ['output_tokens', 'output_tokens', '출력'],
    ['cached_input_tokens', 'cache_read_input_tokens', '캐시읽기'],
    ['cache_write_input_tokens', 'cache_creation_input_tokens', '캐시쓰기'],
    ['reasoning_output_tokens', 'reasoning_output_tokens', '추론출력']
  ];
  /** @type {string[]} */
  const details = [];
  let summed = 0;
  let observed = 0;
  for (const [source_key, target_key, label] of mapping) {
    const value = usage[source_key];
    // §6.4: an unobserved field is ABSENT, never zero. Only what the rollout
    // reported reaches the breakdown, the tooltip or the subtotal.
    if (typeof value === 'number' && Number.isFinite(value)) {
      breakdown[target_key] = value;
      details.push(`${label} ${value.toLocaleString('en-US')}`);
      observed += 1;
      if (target_key === 'input_tokens' || target_key === 'output_tokens') {
        summed += value;
      }
    }
  }
  const raw_total = usage.total_tokens;
  const total =
    typeof raw_total === 'number' && Number.isFinite(raw_total)
      ? raw_total
      : null;
  if (observed === 0) {
    if (total === null) {
      return null;
    }
    // TOTAL-ONLY: the figure exists but no breakdown does. Printing
    // `입력 0 · 출력 0` beside it would state two contradictory things.
    return {
      subtotal: total,
      breakdown: /** @type {UsageRecord} */ ({ total_tokens: total }),
      lines: [`총 ${total.toLocaleString('en-US')}`, '세부 내역 미관측']
    };
  }
  const lines = [...details];
  if (total !== null) {
    lines.unshift(`총 ${total.toLocaleString('en-US')}`);
  }
  return {
    subtotal: total ?? summed,
    breakdown: /** @type {UsageRecord} */ (breakdown),
    lines
  };
}

/**
 * One native child row, rendered through the SAME leg grammar the external
 * delegation rows use (§6.4: no new card line, no new chip slot). A static row
 * rather than a button: a native child has no drawer of its own to open, and
 * the external receipt validators stay untouched — this row is an internal
 * observation, not a receipt.
 *
 * @param {Record<string, any>} child
 * @param {import('../../../server/worker/runner-catalog.js').ResolvedCatalog|null} catalog
 * @returns {TemplateResult}
 */
function nativeChildTemplate(child, catalog) {
  const usage = nativeChildUsage(child.usage);
  const direct_summary = projectAttemptUsage(
    {
      attempt_id: '__native-child__',
      bead_id: '__native-child__',
      runner: 'codex',
      codex_children: [child]
    },
    catalog
  )?.roles.subagent?.codex;
  const price =
    usage && !direct_summary
      ? priceUsage(usage.breakdown, child.model, catalog)
      : null;
  const badges = direct_summary
    ? providerUsageBadges({
        providers: { codex: direct_summary },
        roles: {}
      })
    : usage
      ? providerUsageBadges({
          providers: {
            codex: {
              subtotal: usage.subtotal,
              breakdown: usage.breakdown,
              ...(price && price.usd !== null
                ? { total_cost_usd: price.usd }
                : {}),
              ...(price?.basis === 'estimated' ? { cost_estimated: true } : {}),
              ...(price?.basis === 'none' ? { unpriced_leg_count: 1 } : {})
            }
          },
          roles: {}
        })
      : [];
  const badge = badges[0];
  const price_lines = price
    ? costTooltipLines({
        total_cost_usd: price.usd ?? undefined,
        cost_estimated: price.basis === 'estimated'
      })
    : [];
  const status =
    typeof child.status === 'string' && child.status in DELEGATION_STATUS_GLYPH
      ? child.status
      : 'running';
  const thread_id = typeof child.thread_id === 'string' ? child.thread_id : '';
  const time =
    status === 'running'
      ? shortTime(child.last_event_at)
      : completedTime(child.completed_at);
  const meta = [
    'codex',
    child.agent_path,
    shortModel(child.model),
    child.effort
  ]
    .filter(Boolean)
    .join(' · ');
  return html`<div
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${status}"
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${DELEGATION_STATUS_GLYPH[status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >native child</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${meta}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${child.launch_id || thread_id}
      >${thread_id.slice(0, 8)}</span
    >
    ${time
      ? html`<span class="detail-session__leg-time detail-session__time"
          >${time}</span
        >`
      : ''}
    ${badge && usage
      ? html`<span
          class="detail-session__usage"
          title=${[
            ...usage.lines,
            ...price_lines.slice(1),
            nativeChildUsageNote(child, direct_summary?.legs || [])
          ].join('\n')}
          >${badge.label}${price?.basis === 'estimated' ? ' 추정' : ''}</span
        >`
      : ''}
  </div>`;
}

/**
 * The attempt's native child rows, in observation order. Nothing is invented:
 * an attempt with no observation renders none.
 *
 * @param {import('./session-history.js').SessionAttempt} attempt
 * @param {import('../../../server/worker/runner-catalog.js').ResolvedCatalog|null} [catalog]
 * @returns {TemplateResult[]}
 */
export function nativeChildLegs(attempt, catalog = null) {
  const children = Array.isArray(attempt.codex_children)
    ? attempt.codex_children
    : [];
  /** @type {Set<string>} */
  const seen = new Set();
  /** @type {TemplateResult[]} */
  const rows = [];
  for (const child of children) {
    if (
      !child ||
      typeof child !== 'object' ||
      typeof child.thread_id !== 'string' ||
      child.thread_id.length === 0 ||
      seen.has(child.thread_id)
    ) {
      continue;
    }
    seen.add(child.thread_id);
    rows.push(nativeChildTemplate(child, catalog));
  }
  return rows;
}

/**
 * Merge live monitor rows with optional terminal usage receipts, then retain
 * usage-only and identity-conflict rows as static legacy rows.
 *
 * @param {import('./session-history.js').SessionAttempt} attempt
 * @param {import('../../utils/token-usage.js').UsageProjection|null} projection
 * @param {{ onOpenDelegation?: (attempt_id: string, launch_id: string) => void }} handlers
 * @returns {TemplateResult[]}
 */
export function delegationLegs(attempt, projection, handlers) {
  /** @type {DelegationSession[]} */
  const sessions = [];
  /** @type {Set<string>} */
  const launch_ids = new Set();
  const candidates = Array.isArray(attempt.delegation_sessions)
    ? attempt.delegation_sessions
    : [];
  for (const candidate of candidates) {
    const session = validDelegation(candidate);
    if (
      !session ||
      launch_ids.has(session.launch_id) ||
      isToolAgentType(session.agent_type)
    ) {
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
  /** @type {Set<string>} */
  const codex_session_ids = new Set();
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
      const continued =
        provider === 'codex' && codex_session_ids.has(session.session_id);
      rows.push(
        monitoredLegTemplate(
          session,
          leg,
          attempt.attempt_id,
          handlers,
          continued
        )
      );
      if (provider === 'codex') {
        codex_session_ids.add(session.session_id);
      }
    }
    for (const leg of usage_by_role[role]) {
      if (
        !joined_receipts.has(leg.receipt_id) &&
        !isToolAgentType(leg.agent_type)
      ) {
        const session_id =
          typeof leg.session_id === 'string' && leg.session_id.length > 0
            ? leg.session_id
            : null;
        const continued =
          provider === 'codex' &&
          session_id !== null &&
          codex_session_ids.has(session_id);
        rows.push(staticLegTemplate(role, provider, leg, continued));
        if (provider === 'codex' && session_id !== null) {
          codex_session_ids.add(session_id);
        }
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
export function usageDetail(usage, provider) {
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
 * Format an epoch-ms timestamp as a short `HH:MM` label (empty when absent).
 *
 * @param {number|null|undefined} ms
 * @returns {string}
 */
export function shortTime(ms) {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) {
    return '';
  }
  const d = new Date(ms);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}
