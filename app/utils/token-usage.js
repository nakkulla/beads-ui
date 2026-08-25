/**
 * Token-usage projection shared by the Worker console and the issue detail
 * panel (UI-raqh §1, UI-d7pw §1).
 *
 * A Claude headline is input + output + cache read + cache creation. Codex
 * cached input, cache write, and reasoning output are subsets of its input or
 * output, so those fields stay breakdown-only and a Codex headline is input +
 * output. The aggregate below therefore exposes provider subtotals instead of
 * one cross-provider grand total.
 *
 * This module lives in `app/utils` rather than `app/views/worker` because it
 * has two consumers: the worker lanes/tiles and the detail panel's session
 * history (UI-d7pw §1.3).
 */

/**
 * `total_tokens` is the total-only alternative a Claude background subagent
 * receipt carries (UI-1663 §5.3): that leg has a total and no breakdown at all,
 * and the two shapes never occur together in one record.
 *
 * @typedef {{ input_tokens?: number, output_tokens?: number, cache_read_input_tokens?: number, cache_creation_input_tokens?: number, reasoning_output_tokens?: number, total_tokens?: number, total_cost_usd?: number, replayed?: boolean }} UsageRecord
 */

/**
 * @typedef {'claude'|'codex'} UsageProvider
 */

/**
 * @typedef {'orchestrator'|'implementation'|'review-consult'|'subagent'} UsageRole
 */

/**
 * @typedef {{ provider: UsageProvider, role: UsageRole, attempt_id: string, receipt_id?: string, agent_type?: string, agent_id?: string, model?: string, effort?: string, session_id?: string, turn_id?: string, completed_at?: string|number, usage: UsageRecord, subtotal: number, replayed?: boolean }} UsageLeg
 */

/**
 * @typedef {{ subtotal: number, breakdown: UsageRecord, total_only_subtotal?: number, replayed?: boolean, total_cost_usd?: number }} ProviderUsageSummary
 */

/**
 * @typedef {{ subtotal: number, breakdown: UsageRecord, total_only_subtotal?: number, legs: UsageLeg[], replayed?: boolean }} RoleUsageSummary
 */

/**
 * @typedef {UsageRecord & { providers: Partial<Record<UsageProvider, ProviderUsageSummary>>, roles: Partial<Record<UsageRole, Partial<Record<UsageProvider, RoleUsageSummary>>>> }} UsageProjection
 */

/**
 * The tooltip line a restart-recovered tally carries (UI-ediw): the events lost
 * with the old server's pipe can never be recovered, so the number below is a
 * floor, not the session's total.
 *
 * @type {string}
 */
const REPLAYED_NOTE = '서버 재시작 복구 — 부분 집계';

/**
 * The tooltip line a total-only receipt carries (UI-1663 §6.1): the runner
 * reported one number for that leg and no breakdown exists to show.
 *
 * @type {string}
 */
const TOTAL_ONLY_NOTE = '분해 없음 — 총량만 보고됨';

/**
 * The name the total-only contribution carries inside an AGGREGATE tooltip. A
 * summed record cannot use the branch above — its breakdown holds the other
 * legs' four fields and no `total_tokens` — so the part that has no breakdown
 * is named as its own term and the formula stays true (UI-1vpv).
 *
 * @type {string}
 */
const TOTAL_ONLY_TERM = '분해 없는 leg';

/**
 * @param {unknown} value
 * @returns {number}
 */
function numeric(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * The summable token fields, in tally order — and the definition of the
 * headline total, which every surface that shows a τ number has to share. Cost
 * is deliberately outside: it is summed separately because a missing cost must
 * not become a reported zero.
 *
 * @type {Array<'input_tokens'|'output_tokens'|'cache_read_input_tokens'|'cache_creation_input_tokens'>}
 */
export const SUM_FIELDS = [
  'input_tokens',
  'output_tokens',
  'cache_read_input_tokens',
  'cache_creation_input_tokens'
];

/**
 * The fields that establish whether a runner actually reported usage. Reasoning
 * can be the only observed Codex breakdown, so it must not disappear merely
 * because it does not increase the Codex headline.
 *
 * @type {Array<'input_tokens'|'output_tokens'|'cache_read_input_tokens'|'cache_creation_input_tokens'|'reasoning_output_tokens'>}
 */
const USAGE_FIELDS = [...SUM_FIELDS, 'reasoning_output_tokens'];

/**
 * The nested (delegated) roles each provider is allowed to report, keyed by the
 * provider that reports them (UI-2mpn §5.5). A leg whose provider/role pair is
 * not in this table is not a receipt this projection knows, so it is skipped —
 * which is the same fail-quiet rule the single-provider filter applied before.
 *
 * @type {Readonly<Record<UsageProvider, readonly UsageRole[]>>}
 */
const NESTED_ROLES = {
  codex: ['implementation', 'review-consult'],
  claude: ['subagent']
};

/**
 * Whether a record reports ONLY a total (UI-1663 §6.1). Such a record cannot be
 * added up field by field and must not be shown as four zeros either, so both
 * the subtotal and the tooltip branch on it.
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {boolean}
 */
function isTotalOnly(usage) {
  if (!usage || typeof usage !== 'object') {
    return false;
  }
  return (
    Number.isFinite(usage.total_tokens) &&
    !SUM_FIELDS.some((field) => Number.isFinite(usage[field]))
  );
}

/**
 * Whether a breakdown reports any field at all. An accumulated breakdown never
 * carries `total_tokens`, so `isTotalOnly` cannot recognise an aggregate built
 * from total-only legs alone; this predicate is what tells that aggregate from
 * one that also summed a real four-field record (UI-1vpv).
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {boolean}
 */
function hasBreakdownFields(usage) {
  if (!usage || typeof usage !== 'object') {
    return false;
  }
  return USAGE_FIELDS.some((field) => Number.isFinite(usage[field]));
}

/**
 * @param {UsageRecord|null|undefined} usage
 * @returns {number}
 */
function sumTokens(usage) {
  let total = 0;
  for (const field of SUM_FIELDS) {
    total += numeric(usage?.[field]);
  }
  return total;
}

/**
 * Whether a record carries at least one token count. A record with only a cost
 * says nothing about consumption, so it renders no badge. The test spans every
 * field the headline sums, so a record reporting only cache counts is usage —
 * anything the total can see, this predicate can see (UI-tq13 §2).
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {boolean}
 */
function hasTokens(usage) {
  if (!usage || typeof usage !== 'object') {
    return false;
  }
  return SUM_FIELDS.some((field) => Number.isFinite(usage[field]));
}

/**
 * @param {UsageRecord|null|undefined} usage
 * @returns {boolean}
 */
function hasReportedUsage(usage) {
  if (!usage || typeof usage !== 'object') {
    return false;
  }
  return (
    USAGE_FIELDS.some((field) => Number.isFinite(usage[field])) ||
    Number.isFinite(usage.total_tokens)
  );
}

/**
 * @param {UsageRecord|null|undefined} usage
 * @returns {UsageRecord}
 */
function usageBreakdown(usage) {
  /** @type {UsageRecord} */
  const breakdown = {};
  for (const field of USAGE_FIELDS) {
    if (usage && Number.isFinite(usage[field])) {
      breakdown[field] = usage[field];
    }
  }
  return breakdown;
}

/**
 * Preserve only the reported fields for a leg. This retains explicit zero while
 * keeping an absent field distinguishable in the per-leg record.
 *
 * @param {UsageRecord} usage
 * @returns {UsageRecord}
 */
function reportedUsage(usage) {
  /** @type {UsageRecord} */
  const reported = {};
  for (const field of USAGE_FIELDS) {
    if (Number.isFinite(usage[field])) {
      reported[field] = usage[field];
    }
  }
  if (Number.isFinite(usage.total_tokens)) {
    reported.total_tokens = usage.total_tokens;
  }
  if (usage.replayed === true) {
    reported.replayed = true;
  }
  if (
    typeof usage.total_cost_usd === 'number' &&
    Number.isFinite(usage.total_cost_usd)
  ) {
    reported.total_cost_usd = usage.total_cost_usd;
  }
  return reported;
}

/**
 * @param {UsageProvider} provider
 * @param {UsageRecord} usage
 * @returns {number}
 */
function providerSubtotal(provider, usage) {
  // §6.1: summing the four fields of a total-only record yields 0, which would
  // silently drop a whole subagent out of the Claude headline.
  if (isTotalOnly(usage)) {
    return numeric(usage.total_tokens);
  }
  if (provider === 'codex') {
    return numeric(usage.input_tokens) + numeric(usage.output_tokens);
  }
  return sumTokens(usage);
}

/**
 * @param {UsageProvider} provider
 * @returns {string}
 */
function providerName(provider) {
  return provider === 'claude' ? 'Claude' : 'Codex';
}

/**
 * @param {number} subtotal
 * @returns {string}
 */
function formatSubtotal(subtotal) {
  return `τ ${abbreviate(subtotal)}`;
}

/**
 * The provider-aware hover breakdown used by every aggregate surface. Codex
 * cache and reasoning figures stay visible, but their subset relationship is
 * made explicit so a reader cannot re-add them to the headline.
 *
 * @param {UsageProvider} provider
 * @param {ProviderUsageSummary} summary
 * @returns {string}
 */
export function providerUsageTooltip(provider, summary) {
  const usage = summary.breakdown || {};
  const total_only = numeric(summary.total_only_subtotal);
  if (isTotalOnly(usage) || (total_only > 0 && !hasBreakdownFields(usage))) {
    // §6.1: printing `입력 0 · 출력 0 …` beside a non-zero total would state
    // two contradictory things at once. The reader is told the breakdown does
    // not exist instead of being shown an invented one.
    const total_only_lines = [
      `총 ${summary.subtotal.toLocaleString('en-US')}`,
      TOTAL_ONLY_NOTE
    ];
    if (summary.replayed) {
      total_only_lines.push(REPLAYED_NOTE);
    }
    return total_only_lines.join('\n');
  }
  const details = [
    `입력 ${numeric(usage.input_tokens).toLocaleString('en-US')}`,
    `출력 ${numeric(usage.output_tokens).toLocaleString('en-US')}`
  ];
  if (provider === 'claude') {
    details.push(
      `캐시읽기 ${numeric(usage.cache_read_input_tokens).toLocaleString('en-US')}`,
      `캐시생성 ${numeric(usage.cache_creation_input_tokens).toLocaleString('en-US')}`
    );
  } else {
    details.push(
      `캐시읽기 ${numeric(usage.cache_read_input_tokens).toLocaleString('en-US')}`,
      `캐시쓰기 ${numeric(usage.cache_creation_input_tokens).toLocaleString('en-US')}`
    );
    if (Number.isFinite(usage.reasoning_output_tokens)) {
      details.push(
        `추론출력 ${numeric(usage.reasoning_output_tokens).toLocaleString('en-US')}`
      );
    }
  }
  // The summed part of the subtotal that no field above can explain. Naming it
  // is what keeps the formula line true once a total-only leg is in the tally.
  if (total_only > 0) {
    details.push(`${TOTAL_ONLY_TERM} ${total_only.toLocaleString('en-US')}`);
  }
  const summed_terms =
    provider === 'claude' ? '입력 + 출력 + 캐시읽기 + 캐시생성' : '입력 + 출력';
  const formula_terms =
    total_only > 0 ? `${summed_terms} + ${TOTAL_ONLY_TERM}` : summed_terms;
  const formula =
    provider === 'claude'
      ? `Claude subtotal = ${formula_terms}`
      : `Codex subtotal = ${formula_terms}; 캐시읽기·캐시쓰기·추론출력은 subtotal에 포함되지 않는 subset`;
  const lines = [
    formula,
    `총 ${summary.subtotal.toLocaleString('en-US')}`,
    details.join(' · ')
  ];
  if (
    typeof summary.total_cost_usd === 'number' &&
    Number.isFinite(summary.total_cost_usd)
  ) {
    lines.push(`$${summary.total_cost_usd.toFixed(2)}`);
  }
  if (summary.replayed) {
    lines.push(REPLAYED_NOTE);
  }
  return lines.join('\n');
}

/**
 * A display-ready badge for every provider that actually reported usage. The
 * returned entries deliberately omit a cross-provider total.
 *
 * @param {UsageProjection|UsageRecord|null|undefined} projection
 * @returns {Array<{ provider: UsageProvider, label: string, tooltip: string }>}
 */
export function providerUsageBadges(projection) {
  /** @type {Array<{ provider: UsageProvider, label: string, tooltip: string }>} */
  const badges = [];
  if (
    !projection ||
    typeof projection !== 'object' ||
    !('providers' in projection) ||
    !projection.providers
  ) {
    return badges;
  }
  for (const provider of /** @type {UsageProvider[]} */ (['claude', 'codex'])) {
    const summary = projection.providers[provider];
    if (!summary) {
      continue;
    }
    badges.push({
      provider,
      label: `${providerName(provider)} ${formatSubtotal(summary.subtotal)}${
        typeof summary.total_cost_usd === 'number' &&
        Number.isFinite(summary.total_cost_usd)
          ? ` · $${summary.total_cost_usd.toFixed(2)}`
          : ''
      }`,
      tooltip: providerUsageTooltip(provider, summary)
    });
  }
  return badges;
}

/**
 * Merge bead-level projections for a KPI while preserving provider separation.
 *
 * @param {Array<UsageProjection|null|undefined>} projections
 * @returns {UsageProjection|null}
 */
export function mergeUsageProjections(projections) {
  /** @type {Partial<Record<UsageProvider, ProviderUsageSummary>>} */
  const providers = {};
  /** @type {Record<UsageProvider, boolean>} */
  const cost_complete = { claude: true, codex: false };
  /** @type {Record<UsageProvider, number>} */
  const costs = { claude: 0, codex: 0 };
  for (const projection of projections) {
    if (!projection || !projection.providers) {
      continue;
    }
    for (const provider of /** @type {UsageProvider[]} */ ([
      'claude',
      'codex'
    ])) {
      const summary = projection.providers[provider];
      if (!summary) {
        continue;
      }
      let merged = providers[provider];
      if (!merged) {
        merged = { subtotal: 0, breakdown: {} };
        providers[provider] = merged;
      }
      merged.subtotal += summary.subtotal;
      if (Number.isFinite(summary.total_only_subtotal)) {
        merged.total_only_subtotal =
          numeric(merged.total_only_subtotal) +
          numeric(summary.total_only_subtotal);
      }
      for (const field of USAGE_FIELDS) {
        if (Number.isFinite(summary.breakdown[field])) {
          merged.breakdown[field] =
            numeric(merged.breakdown[field]) +
            numeric(summary.breakdown[field]);
        }
      }
      if (summary.replayed) {
        merged.replayed = true;
      }
      if (provider === 'claude') {
        if (
          typeof summary.total_cost_usd === 'number' &&
          Number.isFinite(summary.total_cost_usd)
        ) {
          costs.claude += summary.total_cost_usd;
        } else {
          cost_complete.claude = false;
        }
      }
    }
  }
  if (providers.claude && cost_complete.claude) {
    providers.claude.total_cost_usd = costs.claude;
  }
  if (Object.keys(providers).length === 0) {
    return null;
  }
  return { providers, roles: {} };
}

/**
 * Project one outer attempt with its durable nested legs for the detail view.
 *
 * @param {Record<string, any>|null|undefined} attempt
 * @returns {UsageProjection|null}
 */
export function projectAttemptUsage(attempt) {
  if (!attempt || typeof attempt !== 'object') {
    return null;
  }
  return sumAttemptUsage(
    { attempt: { ...attempt, bead_id: '__attempt__' } },
    '__attempt__'
  );
}

/**
 * @param {unknown} runner
 * @returns {UsageProvider}
 */
function providerForRunner(runner) {
  return runner === 'codex' ? 'codex' : 'claude';
}

/**
 * @returns {{ subtotal: number, breakdown: UsageRecord, total_only: number, legs: UsageLeg[], replayed: boolean, outer_count: number, outer_cost: number, outer_cost_count: number }}
 */
function createAccumulator() {
  return {
    subtotal: 0,
    breakdown: usageBreakdown(null),
    total_only: 0,
    legs: [],
    replayed: false,
    outer_count: 0,
    outer_cost: 0,
    outer_cost_count: 0
  };
}

/**
 * @param {{ subtotal: number, breakdown: UsageRecord, total_only: number, legs: UsageLeg[], replayed: boolean, outer_count: number, outer_cost: number, outer_cost_count: number }} accumulator
 * @param {UsageLeg} leg
 * @param {boolean} is_outer
 */
function addLeg(accumulator, leg, is_outer) {
  accumulator.subtotal += leg.subtotal;
  if (isTotalOnly(leg.usage)) {
    // The leg raised the subtotal but contributes no field below, so remember
    // how much of the subtotal the breakdown cannot account for (UI-1vpv).
    accumulator.total_only += leg.subtotal;
  }
  for (const field of USAGE_FIELDS) {
    if (Number.isFinite(leg.usage[field])) {
      accumulator.breakdown[field] =
        numeric(accumulator.breakdown[field]) + numeric(leg.usage[field]);
    }
  }
  accumulator.legs.push(leg);
  if (leg.replayed === true) {
    accumulator.replayed = true;
  }
  if (is_outer) {
    accumulator.outer_count += 1;
    if (
      typeof leg.usage.total_cost_usd === 'number' &&
      Number.isFinite(leg.usage.total_cost_usd)
    ) {
      accumulator.outer_cost += leg.usage.total_cost_usd;
      accumulator.outer_cost_count += 1;
    }
  }
}

/**
 * @param {{ subtotal: number, breakdown: UsageRecord, total_only: number, legs: UsageLeg[], replayed: boolean, outer_count: number, outer_cost: number, outer_cost_count: number }} accumulator
 * @param {boolean} include_legs
 */
function accumulatorSummary(accumulator, include_legs) {
  /** @type {{ subtotal: number, breakdown: UsageRecord, total_only_subtotal?: number, legs?: UsageLeg[], replayed?: boolean, total_cost_usd?: number }} */
  const summary = {
    subtotal: accumulator.subtotal,
    breakdown: accumulator.breakdown
  };
  if (accumulator.total_only > 0) {
    summary.total_only_subtotal = accumulator.total_only;
  }
  if (include_legs) {
    summary.legs = accumulator.legs;
  }
  if (accumulator.replayed) {
    summary.replayed = true;
  }
  return summary;
}

/**
 * Abbreviate a token count: plain under 1k, one decimal in k, then in M.
 *
 * @param {number} n
 * @returns {string}
 */
function abbreviate(n) {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}k`;
  }
  return String(n);
}

/**
 * The badge label for one usage record, or null when there is nothing to show.
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {string|null}
 */
export function formatUsageTotal(usage) {
  if (!hasTokens(usage)) {
    return null;
  }
  return `τ ${abbreviate(sumTokens(usage))}`;
}

/**
 * The lane/tile badge: the headline total, with the cost appended when one is
 * known. Cost never REPLACES the token count (UI-tq13 §6) — a column whose
 * number changes scale with the row's state cannot be compared down the column.
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {string|null}
 */
export function formatUsageTotalWithCost(usage) {
  const label = formatUsageTotal(usage);
  if (!label) {
    return null;
  }
  const cost = usage?.total_cost_usd;
  return typeof cost === 'number' && Number.isFinite(cost)
    ? `${label} · $${cost.toFixed(2)}`
    : label;
}

/**
 * The hover breakdown behind the badge.
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {string}
 */
export function usageTooltip(usage) {
  if (!usage || typeof usage !== 'object') {
    return '';
  }
  const parts = [
    `입력 ${numeric(usage.input_tokens).toLocaleString('en-US')}`,
    `출력 ${numeric(usage.output_tokens).toLocaleString('en-US')}`,
    `캐시읽기 ${numeric(usage.cache_read_input_tokens).toLocaleString('en-US')}`,
    `캐시생성 ${numeric(usage.cache_creation_input_tokens).toLocaleString('en-US')}`
  ];
  if (
    typeof usage.total_cost_usd === 'number' &&
    Number.isFinite(usage.total_cost_usd)
  ) {
    parts.push(`$${usage.total_cost_usd.toFixed(2)}`);
  }
  // The headline first, then the breakdown that explains it (UI-tq13 §3): the
  // badge shows an abbreviated `14.1M`, and the reader who hovers is the one who
  // wants the exact number the abbreviation came from.
  const lines = [
    `총 ${sumTokens(usage).toLocaleString('en-US')}`,
    parts.join(' · ')
  ];
  if (usage.replayed) {
    lines.push(REPLAYED_NOTE);
  }
  return lines.join('\n');
}

/**
 * @param {Record<string, any>} attempts
 * @param {string} bead_id
 * @returns {UsageProjection|null}
 */
export function sumAttemptUsage(attempts, bead_id) {
  /** @type {Record<UsageProvider, ReturnType<typeof createAccumulator>>} */
  const providers = {
    claude: createAccumulator(),
    codex: createAccumulator()
  };
  /** @type {Record<UsageRole, Record<UsageProvider, ReturnType<typeof createAccumulator>>>} */
  const roles = {
    orchestrator: {
      claude: createAccumulator(),
      codex: createAccumulator()
    },
    implementation: {
      claude: createAccumulator(),
      codex: createAccumulator()
    },
    'review-consult': {
      claude: createAccumulator(),
      codex: createAccumulator()
    },
    subagent: {
      claude: createAccumulator(),
      codex: createAccumulator()
    }
  };
  /** @type {Set<string>} */
  const receipt_ids = new Set();
  for (const attempt of Object.values(attempts || {})) {
    if (!attempt || attempt.bead_id !== bead_id) {
      continue;
    }
    const outer_usage = attempt.usage;
    if (hasReportedUsage(outer_usage)) {
      const provider = providerForRunner(attempt.runner);
      const usage = reportedUsage(outer_usage);
      /** @type {UsageLeg} */
      const leg = {
        provider,
        role: 'orchestrator',
        attempt_id: String(attempt.attempt_id || ''),
        usage,
        subtotal: providerSubtotal(provider, usage)
      };
      if (usage.replayed === true) {
        leg.replayed = true;
      }
      if (typeof attempt.model === 'string') {
        leg.model = attempt.model;
      }
      if (typeof attempt.session_id === 'string') {
        leg.session_id = attempt.session_id;
      }
      addLeg(providers[provider], leg, true);
      addLeg(roles.orchestrator[provider], leg, true);
    }
    const usage_legs = Array.isArray(attempt.usage_legs)
      ? attempt.usage_legs
      : [];
    for (const candidate of usage_legs) {
      // Provider-keyed, not codex-only (UI-2mpn §5.5): a Claude subagent
      // receipt lands in the CLAUDE headline under the Claude formula, and the
      // Codex subtotal is untouched by it. Everything else about the loop —
      // receipt-id dedupe, first record wins — is unchanged.
      const leg_provider =
        candidate && candidate.provider === 'claude' ? 'claude' : 'codex';
      if (
        !candidate ||
        (candidate.provider !== 'codex' && candidate.provider !== 'claude') ||
        !NESTED_ROLES[leg_provider].includes(candidate.role) ||
        !hasReportedUsage(candidate.usage)
      ) {
        continue;
      }
      const receipt_id =
        typeof candidate.receipt_id === 'string' &&
        candidate.receipt_id.length > 0
          ? candidate.receipt_id
          : null;
      if (!receipt_id || receipt_ids.has(receipt_id)) {
        continue;
      }
      receipt_ids.add(receipt_id);
      const usage = reportedUsage(candidate.usage);
      /** @type {UsageLeg} */
      const leg = {
        provider: leg_provider,
        role: candidate.role,
        attempt_id: String(attempt.attempt_id || ''),
        usage,
        subtotal: providerSubtotal(leg_provider, usage)
      };
      leg.receipt_id = receipt_id;
      if (typeof candidate.agent_type === 'string') {
        leg.agent_type = candidate.agent_type;
      }
      if (typeof candidate.agent_id === 'string') {
        leg.agent_id = candidate.agent_id;
      }
      if (typeof candidate.model === 'string') {
        leg.model = candidate.model;
      }
      if (
        typeof candidate.effort === 'string' &&
        candidate.effort.trim().length > 0
      ) {
        leg.effort = candidate.effort;
      }
      if (typeof candidate.session_id === 'string') {
        leg.session_id = candidate.session_id;
      } else if (typeof candidate.thread_id === 'string') {
        leg.session_id = candidate.thread_id;
      }
      if (typeof candidate.turn_id === 'string') {
        leg.turn_id = candidate.turn_id;
      }
      if (
        typeof candidate.completed_at === 'string' ||
        (typeof candidate.completed_at === 'number' &&
          Number.isFinite(candidate.completed_at))
      ) {
        leg.completed_at = candidate.completed_at;
      }
      if (usage.replayed === true) {
        leg.replayed = true;
      }
      addLeg(providers[leg_provider], leg, false);
      addLeg(roles[leg.role][leg_provider], leg, false);
    }
  }
  /** @type {Partial<Record<UsageProvider, ProviderUsageSummary>>} */
  const projected_providers = {};
  for (const provider of /** @type {UsageProvider[]} */ (['claude', 'codex'])) {
    const accumulator = providers[provider];
    if (accumulator.legs.length === 0) {
      continue;
    }
    const summary = accumulatorSummary(accumulator, false);
    if (
      provider === 'claude' &&
      accumulator.outer_count > 0 &&
      accumulator.outer_cost_count === accumulator.outer_count
    ) {
      summary.total_cost_usd = accumulator.outer_cost;
    }
    projected_providers[provider] = summary;
  }
  if (Object.keys(projected_providers).length === 0) {
    return null;
  }
  /** @type {Partial<Record<UsageRole, Partial<Record<UsageProvider, RoleUsageSummary>>>>} */
  const projected_roles = {};
  for (const role of /** @type {UsageRole[]} */ ([
    'orchestrator',
    'implementation',
    'review-consult',
    'subagent'
  ])) {
    /** @type {Partial<Record<UsageProvider, RoleUsageSummary>>} */
    const projected_role = {};
    for (const provider of /** @type {UsageProvider[]} */ ([
      'claude',
      'codex'
    ])) {
      const accumulator = roles[role][provider];
      if (accumulator.legs.length > 0) {
        projected_role[provider] = {
          ...accumulatorSummary(accumulator, true),
          legs: accumulator.legs
        };
      }
    }
    if (Object.keys(projected_role).length > 0) {
      projected_roles[role] = projected_role;
    }
  }
  return { providers: projected_providers, roles: projected_roles };
}
