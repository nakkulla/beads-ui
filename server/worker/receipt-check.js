/**
 * Receipt-check — the unattended observation of whether a Bead's recorded
 * execution receipt can STAND UP against the state that is supposed to back it.
 *
 * Same shape as `admission.js` / `merge-gate.js`: a pure evaluator over values
 * the caller already observed, with the one impure judgement (SHA ancestry)
 * arriving as an injected probe. It NEVER reads bd, git, or the monitor itself.
 *
 * The vocabulary it enforces is dotfiles-owned
 * (`docs/contracts/workflow-contract.md` main-token predicates, `workflow-state.yaml`
 * `metadata.parent_keys`). beads-ui consumes it: this module moves the contract's
 * same-write predicates into an observation an unattended Worker can make, and
 * says nothing about keys the contract does not define.
 *
 * Two postures live here on purpose:
 *   - Receipt violations are FAIL-CLOSED at the merge gate only (spec §4). They
 *     never fail an attempt, and only the contract's `hold` grade
 *     ({@link EXEC_RECEIPT_MERGE_GATE}) holds a merge at all.
 *   - `verify_receipt` findings are DISPLAY-ONLY: {@link RECEIPT_DISPLAY_ONLY_CODES}
 *     names them, and they belong to neither grade.
 *
 * @import { DelegationSession } from './queue-store.js'
 */
import {
  DELEGATED_EFFORT_TOKENS,
  parseExecReceipt
} from '../workflow-enrich.js';

/**
 * The fixed `main:` reason tokens (contract L52–L54). The series is CLOSED —
 * free prose like the `main:user_choice` that provoked this spec is retired and
 * readable only as history, never as backing.
 *
 * @type {ReadonlySet<string>}
 */
const MAIN_TOKENS = new Set([
  'bead',
  'quick_fix_default',
  'phase_line',
  'takeover'
]);

/** `<bundle>@<40hex>:<exit>` — the optional, display-only verify receipt. */
const VERIFY_RECEIPT_RE = /^([^@\s]+)@([0-9a-fA-F]{40}):(-?\d+)$/;

/**
 * One `<unit>:<kind>@<40hex>` item of a multi-unit receipt
 * (`workflow-state.yaml metadata.parent_keys.exec_receipt` format, items joined
 * by `;`). Requiring the remainder to OPEN with a `delegated:`/`main:` series
 * is what keeps the two readings apart: no single-unit receipt can match this,
 * so the shape alone decides which form a value is in.
 */
const UNIT_ITEM_RE =
  /^([^:@;\s]+):((?:delegated|main):[^@\s]+@[0-9a-fA-F]{40})$/;

/**
 * The two codes the merge gate must NOT hold on (spec §4): `verify_receipt` is
 * an optional key, so its shape can never be the reason a PR is refused.
 *
 * @type {ReadonlySet<string>}
 */
export const RECEIPT_DISPLAY_ONLY_CODES = new Set([
  'verify_receipt_malformed',
  'verify_receipt_unbound'
]);

/**
 * The contract's two grades for an `exec_receipt` finding, copied here as a
 * code-level field registry (ADR 0012). dotfiles
 * `workflow-state.yaml metadata.parent_keys.exec_receipt.merge_gate` OWNS the
 * split; beads-ui only consumes it, so a code that is in neither list is in
 * neither grade and this module never invents a third meaning for it.
 *
 * @type {Readonly<{ hold: ReadonlyArray<string>, badge: ReadonlyArray<string> }>}
 */
export const EXEC_RECEIPT_MERGE_GATE = Object.freeze({
  hold: Object.freeze([
    'unit_plan_mismatch',
    'approval_forged',
    'dispatch_forged',
    'mode_authority_forged',
    'non_ancestor',
    'ancestry_probe_error'
  ]),
  badge: Object.freeze([
    'absent',
    'unparsable',
    'effort_unknown',
    'main_reason_retired',
    'main_receipt_unbacked',
    'takeover_lineage_missing',
    'takeover_lineage_unobservable'
  ])
});

/** @type {ReadonlySet<string>} */
const HOLD_CODES = new Set(EXEC_RECEIPT_MERGE_GATE.hold);

/** @type {ReadonlySet<string>} */
const BADGE_CODES = new Set(EXEC_RECEIPT_MERGE_GATE.badge);

/**
 * The five keys an attempt snapshots before its first metadata write (spec §2).
 * "Appeared or changed" is only sayable against this exact snapshot.
 *
 * @type {ReadonlyArray<string>}
 */
export const RECEIPT_BASELINE_KEYS = [
  'exec_receipt',
  'impl_entry',
  'plan_approval',
  'workflow_mode_source',
  'impl_dispatch'
];

/**
 * Every Bead metadata key the check reads. Callers without a whole-issue read
 * (the scheduler holds only a key-at-a-time bd surface) collect exactly these.
 *
 * @type {ReadonlyArray<string>}
 */
export const RECEIPT_METADATA_KEYS = [
  'exec_receipt',
  'impl_dispatch',
  'route',
  'planned_execution',
  'unit_plan',
  'impl_entry',
  'plan_approval',
  'workflow_mode_source',
  'verify_receipt'
];

/**
 * @typedef {Object} ReceiptViolation
 * @property {string} code
 * @property {string} detail
 */

/**
 * @typedef {Object} ReceiptCheckResult
 * @property {boolean} ok - True when no violation of ANY kind was observed.
 * @property {ReceiptViolation[]} violations
 * @property {Record<string, unknown>} checks - What was judged, for display.
 * @property {boolean} probe_error - The observation itself could not be made —
 * the bead was unreadable, or the checker threw. The verdict is unproven, which
 * the merge gate holds on and the board renders as nothing.
 */

/**
 * @typedef {Object} ReceiptLineageInput
 * @property {boolean} supported - False when this attempt's delegation legs are
 * outside the monitor's reach. That leaves `main:takeover` UNPROVEN, which the
 * contract grades `takeover_lineage_unobservable` — accounting residue, not a
 * pass and not a forgery finding.
 * @property {DelegationSession[]} sessions
 * @property {string|null} resolved_impl_model
 */

/**
 * @typedef {Object} ReceiptDefaultsInput
 * @property {boolean} supported
 * @property {string|null} quick_fix_dispatch
 */

/**
 * @typedef {Object} ReceiptCheckInput
 * @property {Record<string, unknown>|null} metadata
 * @property {Record<string, string|null>|null} baseline
 * @property {ReceiptLineageInput|null} [lineage]
 * @property {ReceiptDefaultsInput|null} [defaults]
 * @property {string[]|string|null} [head]
 * @property {((receipt_sha: string, head_sha: string) => Promise<string>)|undefined} [probeAncestry]
 */

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function str(value) {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : null;
}

/**
 * A receipt observation that could not be made at all. Distinct from a clean
 * pass so the gate can fail closed on it while the board stays quiet.
 *
 * @param {string} detail
 * @returns {ReceiptCheckResult}
 */
export function receiptProbeError(detail) {
  return {
    ok: false,
    violations: [],
    checks: { probe_error_detail: detail },
    probe_error: true
  };
}

/**
 * The distinct codes in a result that fall in one grade.
 *
 * @param {ReceiptCheckResult|null|undefined} result
 * @param {ReadonlySet<string>} grade
 * @returns {string[]}
 */
function receiptCodesIn(result, grade) {
  if (!result || !Array.isArray(result.violations)) {
    return [];
  }
  /** @type {string[]} */
  const codes = [];
  for (const violation of result.violations) {
    const code = str(violation?.code);
    if (code && grade.has(code) && !codes.includes(code)) {
      codes.push(code);
    }
  }
  return codes;
}

/**
 * The violation codes that may hold a merge — the contract's `hold` grade and
 * nothing else. A `badge` finding is accounting residue the contract says must
 * not change behaviour, and `verify_receipt_*` is in neither grade.
 *
 * @param {ReceiptCheckResult|null|undefined} result
 * @returns {string[]}
 */
export function blockingReceiptCodes(result) {
  return receiptCodesIn(result, HOLD_CODES);
}

/**
 * The violation codes that are DISPLAY-ONLY accounting residue — the contract's
 * `badge` grade. The gate passes them; the PR 대기 행 draws them.
 *
 * @param {ReceiptCheckResult|null|undefined} result
 * @returns {string[]}
 */
export function badgeReceiptCodes(result) {
  return receiptCodesIn(result, BADGE_CODES);
}

/**
 * The delegation evidence a `main:takeover` receipt must be able to point at,
 * read off a durable attempt record.
 *
 * `supported` is false outside Codex because the delegation monitor records only
 * Codex legs: a leg it never watched leaves no stream to find, and that absence
 * is ignorance rather than forgery. Ignorance still REFUSES — the caller turns
 * it into a probe error — so no runtime silently exempts `main:takeover` from
 * the approved predicate. `auto` is not a model, so it constrains nothing.
 *
 * @param {any} attempt
 * @returns {ReceiptLineageInput}
 */
export function receiptLineageForAttempt(attempt) {
  const model = attempt?.exec_values?.impl_model;
  return {
    supported: attempt?.exec_values?.impl_runtime === 'codex',
    sessions: Array.isArray(attempt?.delegation_sessions)
      ? attempt.delegation_sessions
      : [],
    resolved_impl_model:
      typeof model === 'string' && model !== 'auto' ? model : null
  };
}

/**
 * The pinned projection's dispatch default for the `quick_fix` route — the only
 * external fact `main:quick_fix_default` rests on. An unusable projection makes
 * that element undecidable rather than unbacked.
 *
 * @param {{ supported: boolean, session: Record<string, any>|null }} loaded - An
 * `execution-defaults.js` load.
 * @returns {ReceiptDefaultsInput}
 */
export function receiptDefaultsFrom(loaded) {
  const implementation = loaded?.session?.implementation;
  const dispatch =
    implementation?.route_defaults?.quick_fix?.dispatch ||
    implementation?.default?.dispatch;
  return {
    supported: loaded?.supported === true,
    quick_fix_dispatch: typeof dispatch === 'string' ? dispatch : null
  };
}

/**
 * Project a receipt observation onto the merge gate's input (spec §4).
 *
 * `undecidable` is what a caller that CANNOT observe passes — the cached,
 * synchronous board projections. It is deliberately distinct from `ok`: a
 * surface with no authority must neither hold a merge nor clear one.
 *
 * @param {ReceiptCheckResult|null|undefined} result
 * @returns {{ state: 'ok'|'unbacked'|'probe_error'|'undecidable', codes: string[] }}
 */
export function receiptGateState(result) {
  if (!result || typeof result !== 'object') {
    return { state: 'undecidable', codes: [] };
  }
  if (result.probe_error === true) {
    return { state: 'probe_error', codes: [] };
  }
  const codes = blockingReceiptCodes(result);
  return codes.length > 0
    ? { state: 'unbacked', codes }
    : { state: 'ok', codes: [] };
}

/**
 * Compact a full result down to what the worker snapshot carries (spec §7).
 * Display is fail-quiet, so an absent result summarizes to null rather than to
 * an empty "clean" summary that would read as evidence.
 *
 * @param {ReceiptCheckResult|null|undefined} result
 * @returns {{ ok: boolean, probe_error: boolean, codes: string[], blocking_codes: string[], badge_codes: string[] }|null}
 */
export function summarizeReceiptCheck(result) {
  if (!result || typeof result !== 'object') {
    return null;
  }
  /** @type {string[]} */
  const codes = [];
  for (const violation of Array.isArray(result.violations)
    ? result.violations
    : []) {
    const code = str(violation?.code);
    if (code && !codes.includes(code)) {
      codes.push(code);
    }
  }
  return {
    ok: result.ok === true,
    probe_error: result.probe_error === true,
    codes,
    blocking_codes: blockingReceiptCodes(result),
    badge_codes: badgeReceiptCodes(result)
  };
}

/**
 * Split a multi-unit receipt into its `<unit>:<kind>@<sha>` items. Returns null
 * when the value is not in that shape at all, which leaves the single-receipt
 * reading in play rather than asserting a malformed multi-unit one.
 *
 * @param {string} value
 * @returns {{ unit: string, receipt: string }[]|null}
 */
function parseUnitReceipts(value) {
  const parts = value.split(';');
  /** @type {{ unit: string, receipt: string }[]} */
  const items = [];
  for (const part of parts) {
    const match = UNIT_ITEM_RE.exec(part.trim());
    if (!match) {
      return null;
    }
    items.push({ unit: match[1], receipt: match[2] });
  }
  return items.length > 0 ? items : null;
}

/**
 * The unit names an approved `unit_plan` declares. Its contract format is
 * `<reason> | <unit>:<scope-anchor>[; <unit>:<scope-anchor>...]`, so the reason
 * is dropped at the first `|` and each `;` item yields the name before its
 * first `:`. Only the names matter here — the plan's own shape is
 * contract-owned and this module never re-judges it.
 *
 * @param {unknown} value
 * @returns {string[]|null}
 */
function parseUnitPlanNames(value) {
  const raw = str(value);
  if (!raw) {
    return null;
  }
  const bar = raw.indexOf('|');
  const names = (bar === -1 ? raw : raw.slice(bar + 1))
    .split(';')
    .map((part) => {
      const item = part.trim();
      const colon = item.indexOf(':');
      return (colon === -1 ? item : item.slice(0, colon)).trim();
    })
    .filter((name) => name.length > 0);
  return names.length > 0 ? names : null;
}

/**
 * Judge ONE receipt string's form. Parsing is delegated to
 * {@link parseExecReceipt} so the effort vocabulary has exactly one owner: a
 * `delegated:<model>:<effort>@<sha>` receipt and its historical
 * `delegated:<model>@<sha>` form are both well-formed.
 *
 * The two failure codes are the contract's, not a severity judgement made here:
 * a value nobody can read at all is `unparsable`, while a value whose model,
 * SHA and shape are all fine and whose only defect is a trailing segment
 * outside the effort vocabulary is `effort_unknown`.
 *
 * @param {string} value
 * @returns {{ ok: true, parsed: { kind: string, actor: string, effort: string|null, sha: string } }|{ ok: false, code: 'unparsable'|'effort_unknown', detail: string }}
 */
function parseReceiptForm(value) {
  const parsed = parseExecReceipt(value);
  if (!parsed) {
    return { ok: false, code: 'unparsable', detail: value };
  }
  if (parsed.kind === 'delegated' && parsed.effort === null) {
    const cut = parsed.actor.lastIndexOf(':');
    if (cut >= 0 && !DELEGATED_EFFORT_TOKENS.has(parsed.actor.slice(cut + 1))) {
      return { ok: false, code: 'effort_unknown', detail: value };
    }
  }
  if (parsed.actor.length === 0) {
    return { ok: false, code: 'unparsable', detail: value };
  }
  return { ok: true, parsed };
}

/**
 * Is there a terminal-`done` implementation delegation on this attempt whose
 * model is the one the attempt actually resolved? That is the observable
 * residue of a real takeover: something was delegated, it delivered, and the
 * controller finished the unit itself.
 *
 * @param {ReceiptLineageInput|null|undefined} lineage
 * @returns {'matched'|'missing'|'undecidable'}
 */
function takeoverLineage(lineage) {
  if (!lineage || lineage.supported !== true) {
    return 'undecidable';
  }
  const sessions = Array.isArray(lineage.sessions) ? lineage.sessions : [];
  const expected = str(lineage.resolved_impl_model);
  for (const session of sessions) {
    if (session?.role !== 'implementation' || session?.status !== 'done') {
      continue;
    }
    if (expected !== null && str(session.model) !== expected) {
      continue;
    }
    return 'matched';
  }
  return 'missing';
}

/**
 * Judge one well-formed receipt against the state that must back it.
 *
 * An unobservable lineage is NOT a pass either — it is its own finding, and the
 * contract grades that finding `badge`, so it is recorded and displayed while
 * the merge proceeds.
 *
 * @param {{ kind: string, actor: string, effort: string|null, sha: string }} parsed
 * @param {{ metadata: Record<string, unknown>, defaults: ReceiptDefaultsInput|null|undefined, lineage: ReceiptLineageInput|null|undefined }} ctx
 * @returns {{ violations: ReceiptViolation[], notes: Record<string, unknown> }}
 */
function backingFor(parsed, ctx) {
  /** @type {ReceiptViolation[]} */
  const violations = [];
  /** @type {Record<string, unknown>} */
  const notes = {};
  if (parsed.kind !== 'main') {
    return { violations, notes };
  }
  const token = parsed.actor;
  notes.main_token = token;
  if (!MAIN_TOKENS.has(token)) {
    violations.push({
      code: 'main_reason_retired',
      detail: `main:${token}`
    });
    return { violations, notes };
  }
  if (token === 'bead') {
    if (str(ctx.metadata.impl_dispatch) !== 'main') {
      violations.push({
        code: 'main_receipt_unbacked',
        detail: 'main:bead without impl_dispatch=main'
      });
    }
    return { violations, notes };
  }
  if (token === 'quick_fix_default') {
    if (str(ctx.metadata.route) !== 'quick_fix') {
      violations.push({
        code: 'main_receipt_unbacked',
        detail: 'main:quick_fix_default without route=quick_fix'
      });
      return { violations, notes };
    }
    if (str(ctx.metadata.impl_dispatch) !== null) {
      violations.push({
        code: 'main_receipt_unbacked',
        detail: 'main:quick_fix_default with impl_dispatch present'
      });
      return { violations, notes };
    }
    const supported = ctx.defaults?.supported === true;
    notes.quick_fix_default_dispatch = supported
      ? (ctx.defaults?.quick_fix_dispatch ?? null)
      : 'unsupported';
    if (supported && ctx.defaults?.quick_fix_dispatch !== 'main') {
      violations.push({
        code: 'main_receipt_unbacked',
        detail: 'quick_fix route default dispatch is not main'
      });
    }
    return { violations, notes };
  }
  if (token === 'phase_line') {
    if (str(ctx.metadata.planned_execution) !== 'main') {
      violations.push({
        code: 'main_receipt_unbacked',
        detail: 'main:phase_line without planned_execution=main'
      });
    }
    return { violations, notes };
  }
  const lineage_state = takeoverLineage(ctx.lineage);
  notes.takeover_lineage = lineage_state;
  if (lineage_state === 'missing') {
    violations.push({
      code: 'takeover_lineage_missing',
      detail: 'no terminal implementation delegation matches the resolved model'
    });
  }
  // A lineage nobody can read leaves `main:takeover` UNPROVEN, and the contract
  // gives that ignorance its own code rather than the probe-error channel: the
  // observation is recorded and shown, and only a failure to observe the BEAD
  // ITSELF still fails closed.
  if (lineage_state === 'undecidable') {
    violations.push({
      code: 'takeover_lineage_unobservable',
      detail: 'delegation lineage is outside the monitor reach'
    });
  }
  return { violations, notes };
}

/**
 * Compare one baseline-owned key against what is on the bead now.
 *
 * @param {Record<string, unknown>} metadata
 * @param {Record<string, string|null>} baseline
 * @param {string} key
 * @returns {{ changed: boolean, from: string|null, to: string|null }}
 */
function baselineDelta(metadata, baseline, key) {
  const from = typeof baseline[key] === 'string' ? baseline[key] : null;
  const to =
    typeof metadata[key] === 'string'
      ? /** @type {string} */ (metadata[key])
      : null;
  return { changed: from !== to, from, to };
}

/**
 * Bind ONE parsed receipt SHA to the observed PR head, by the same ancestry
 * rule `impl_review` uses (contract `ancestry_rule: same_as_impl_review`): a
 * receipt issued on a commit the head descends from still reads current, so a
 * base-sync merge does not invalidate it.
 *
 * A caller with no head and no probe is a DISPLAY caller, and a surface with no
 * authority judges nothing — `unproven` is that abstention. The gate, which
 * always passes both, fails closed on a probe it could not take.
 *
 * @param {string} sha
 * @param {string[]} heads
 * @param {((receipt_sha: string, head_sha: string) => Promise<string>)|undefined} probeAncestry
 * @param {string} label - `<unit>:` prefix for a multi-unit receipt, else empty.
 * @returns {Promise<{ ancestry: string, violation: ReceiptViolation|null }>}
 */
async function receiptAncestry(sha, heads, probeAncestry, label) {
  if (heads.length === 0 || typeof probeAncestry !== 'function') {
    return { ancestry: 'unproven', violation: null };
  }
  if (heads.includes(sha)) {
    return { ancestry: 'equal', violation: null };
  }
  let probe_failed = false;
  for (const head of heads) {
    /** @type {string} */
    let ancestry;
    try {
      ancestry = await probeAncestry(sha, head);
    } catch {
      probe_failed = true;
      continue;
    }
    if (ancestry === 'probe_error') {
      probe_failed = true;
      continue;
    }
    if (ancestry === 'equal' || ancestry === 'ancestor') {
      return { ancestry: 'ancestor', violation: null };
    }
  }
  if (probe_failed) {
    return {
      ancestry: 'probe_error',
      violation: {
        code: 'ancestry_probe_error',
        detail: `${label}${sha} ancestry against ${heads[0]} is unobservable`
      }
    };
  }
  return {
    ancestry: 'non_ancestor',
    violation: {
      code: 'non_ancestor',
      detail: `${label}${sha} not in ${heads[0]}`
    }
  };
}

/**
 * Judge the optional `verify_receipt`. Display-only by contract: the bundle
 * name has no canonical source here, so only the shape, the head binding, and
 * the exit's integer parse are observed.
 *
 * @param {unknown} value
 * @param {string[]} heads
 * @param {((receipt_sha: string, head_sha: string) => Promise<string>)|undefined} probeAncestry
 * @returns {Promise<{ violations: ReceiptViolation[], notes: Record<string, unknown>|null }>}
 */
async function checkVerifyReceipt(value, heads, probeAncestry) {
  if (value === undefined || value === null) {
    return { violations: [], notes: null };
  }
  const raw = str(value);
  const match = raw === null ? null : VERIFY_RECEIPT_RE.exec(raw);
  if (!match) {
    return {
      violations: [
        {
          code: 'verify_receipt_malformed',
          detail: raw ?? String(value)
        }
      ],
      notes: { binding: 'malformed' }
    };
  }
  const sha = match[2].toLowerCase();
  const exit = Number.parseInt(match[3], 10);
  /** @type {Record<string, unknown>} */
  const notes = {
    bundle: match[1],
    sha,
    exit,
    exit_ok: exit === 0,
    binding: 'unproven'
  };
  if (heads.length === 0) {
    return { violations: [], notes };
  }
  if (heads.includes(sha)) {
    notes.binding = 'equal';
    return { violations: [], notes };
  }
  if (typeof probeAncestry !== 'function') {
    return { violations: [], notes };
  }
  for (const head of heads) {
    /** @type {string} */
    let ancestry;
    try {
      ancestry = await probeAncestry(sha, head);
    } catch {
      return { violations: [], notes };
    }
    if (ancestry === 'probe_error') {
      return { violations: [], notes };
    }
    if (ancestry === 'equal' || ancestry === 'ancestor') {
      notes.binding = 'ancestor';
      return { violations: [], notes };
    }
  }
  notes.binding = 'unbound';
  return {
    violations: [
      { code: 'verify_receipt_unbound', detail: `${sha} not in ${heads[0]}` }
    ],
    notes
  };
}

/**
 * Observe whether a Bead's execution receipt is backed by the state around it.
 *
 * @param {ReceiptCheckInput} input
 * @returns {Promise<ReceiptCheckResult>}
 */
export async function checkReceipts(input) {
  const metadata =
    input.metadata &&
    typeof input.metadata === 'object' &&
    !Array.isArray(input.metadata)
      ? input.metadata
      : null;
  if (!metadata) {
    return receiptProbeError('metadata_unavailable');
  }
  /** @type {ReceiptViolation[]} */
  const violations = [];
  /** @type {Record<string, unknown>} */
  const checks = {};

  const heads = (
    Array.isArray(input.head)
      ? input.head
      : typeof input.head === 'string'
        ? [input.head]
        : []
  )
    .map((sha) => str(sha)?.toLowerCase() ?? '')
    .filter((sha) => sha.length === 40);

  const ctx = {
    metadata,
    defaults: input.defaults ?? null,
    lineage: input.lineage ?? null
  };

  const receipt_raw = str(metadata.exec_receipt);
  const unit_names = parseUnitPlanNames(metadata.unit_plan);
  checks.unit_plan = unit_names;
  if (receipt_raw === null) {
    // Absence is a finding, not silence: the contract grades it `badge` so the
    // discipline stays observable on rows that never recorded one (historical
    // beads, external-session PRs) without holding their merge.
    violations.push({ code: 'absent', detail: 'exec_receipt' });
    checks.exec_receipt = null;
  } else {
    const items = parseUnitReceipts(receipt_raw);
    if (items) {
      // Multi-unit form: every item is judged by the SAME single predicate, and
      // the unit NAMES must be exactly the approved plan's set.
      /** @type {Record<string, unknown>[]} */
      const unit_checks = [];
      for (const item of items) {
        const form = parseReceiptForm(item.receipt);
        if (!form.ok) {
          violations.push({
            code: form.code,
            detail: `${item.unit}:${form.detail}`
          });
          unit_checks.push({ unit: item.unit, malformed: true });
          continue;
        }
        const backing = backingFor(form.parsed, ctx);
        violations.push(...backing.violations);
        const ancestry = await receiptAncestry(
          form.parsed.sha,
          heads,
          input.probeAncestry,
          `${item.unit}:`
        );
        if (ancestry.violation) {
          violations.push(ancestry.violation);
        }
        unit_checks.push({
          unit: item.unit,
          kind: form.parsed.kind,
          actor: form.parsed.actor,
          effort: form.parsed.effort,
          sha: form.parsed.sha,
          ancestry: ancestry.ancestry,
          ...backing.notes
        });
      }
      checks.units = unit_checks;
      if (unit_names !== null) {
        const seen = items.map((item) => item.unit);
        const missing = unit_names.filter((name) => !seen.includes(name));
        const extra = seen.filter((name) => !unit_names.includes(name));
        const duplicated = seen.length !== new Set(seen).size;
        if (missing.length > 0 || extra.length > 0 || duplicated) {
          violations.push({
            code: 'unit_plan_mismatch',
            detail: `missing=[${missing.join('|')}] extra=[${extra.join('|')}] duplicated=${duplicated}`
          });
        }
      }
    } else {
      const form = parseReceiptForm(receipt_raw);
      if (!form.ok) {
        violations.push({
          code: form.code,
          detail: form.detail
        });
        checks.exec_receipt = { malformed: true };
      } else {
        const backing = backingFor(form.parsed, ctx);
        violations.push(...backing.violations);
        const ancestry = await receiptAncestry(
          form.parsed.sha,
          heads,
          input.probeAncestry,
          ''
        );
        if (ancestry.violation) {
          violations.push(ancestry.violation);
        }
        checks.exec_receipt = {
          kind: form.parsed.kind,
          actor: form.parsed.actor,
          effort: form.parsed.effort,
          sha: form.parsed.sha,
          ancestry: ancestry.ancestry,
          ...backing.notes
        };
        if (unit_names !== null) {
          // A plan exists, so the contract's multi-unit form is the only one
          // that can prove the unit set — including for a one-unit plan, where
          // an unprefixed receipt still names no unit at all.
          violations.push({
            code: 'unit_plan_mismatch',
            detail: `single receipt for ${unit_names.length} planned units`
          });
        }
      }
    }
  }

  const baseline =
    input.baseline &&
    typeof input.baseline === 'object' &&
    !Array.isArray(input.baseline)
      ? input.baseline
      : null;
  checks.baseline_present = baseline !== null;
  if (baseline) {
    // ANY movement is forgery, deletion included: an unattended attempt may
    // write none of these keys, so removing a user's `impl_dispatch` to make a
    // `main:quick_fix_default` receipt look backed is the same offence as
    // inventing one.
    for (const key of ['impl_entry', 'plan_approval']) {
      const delta = baselineDelta(metadata, baseline, key);
      if (delta.changed) {
        violations.push({
          code: 'approval_forged',
          detail: `${key} ${delta.from ?? '(absent)'} -> ${delta.to ?? '(absent)'}`
        });
      }
    }
    const dispatch = baselineDelta(metadata, baseline, 'impl_dispatch');
    if (dispatch.changed) {
      violations.push({
        code: 'dispatch_forged',
        detail: `impl_dispatch ${dispatch.from ?? '(absent)'} -> ${dispatch.to ?? '(absent)'}`
      });
    }
    // Only `user` is forgery: the Worker's own `workflow_mode_source=worker`
    // stamp (spec §5) lands after this baseline by design.
    const authority = baselineDelta(metadata, baseline, 'workflow_mode_source');
    if (authority.changed && authority.to === 'user') {
      violations.push({
        code: 'mode_authority_forged',
        detail: `workflow_mode_source ${authority.from ?? '(absent)'} -> user`
      });
    }
  }

  const verify = await checkVerifyReceipt(
    metadata.verify_receipt,
    heads,
    input.probeAncestry
  );
  violations.push(...verify.violations);
  checks.verify_receipt = verify.notes;

  return {
    ok: violations.length === 0,
    violations,
    checks,
    // Only a failure to observe the BEAD reaches here as a probe error, and
    // that leaves through {@link receiptProbeError} above.
    probe_error: false
  };
}
