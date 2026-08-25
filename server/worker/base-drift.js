/**
 * Post-hoc base invariant — the DETECTION layer (UI-8mvc §3, rebuilt UI-1xcd §4).
 *
 * The prevention layer (`guard-hook.js`) refuses a push whose destination ref is
 * the attempt's base, and `--no-verify` measurably walks through it. This module
 * is what sits behind that hole: after the session process is gone, it asks one
 * question the hook cannot be asked afterwards — did the remote base move off
 * the `base_oid` this attempt pinned, and did THIS attempt put it there?
 *
 * The second half used to be INFERRED from the commit graph, and that is what
 * made it wrong. `rev-list <start>..<tip>` answers "what became reachable in
 * this range", not "what this attempt created": an attempt that commits `A` and
 * then absorbs the base's `B` has both in its range, so a remote base carrying
 * only `B` — someone else's perfectly ordinary push — intersects and reads as a
 * landing. Since UI-1xcd §1 lets an attempt merge its base in, that mixed state
 * is the NORMAL path, not a corner case. Four measured false positives came
 * from exactly this.
 *
 * So the judgment moved off inference and onto a FACT. The attempt's own
 * pre-push hook records every destination git computed for it
 * (`pushes.jsonl`), refused pushes included. The question is then answerable
 * without a guess:
 *
 *   1. no push at the base in the record  → not this attempt's hand. Most
 *      observations end here, including the whole mixed-state case.
 *   2. a push at the base                 → is that pushed oid reachable from
 *      the remote base now? Reachable ⇒ it landed, and the oid is the evidence.
 *
 * The record's ABSENCE is a third answer, not the first one: an attempt
 * dispatched before the log existed is unobservable, and calling that "no push"
 * would silently retire the invariant for every legacy attempt.
 *
 * It stays EVIDENCE, not enforcement: every observation failure is recorded as
 * a failure step and is never a violation, because killing a session over a
 * failed observation would recreate the false-positive kill this module exists
 * to remove.
 *
 * Known miss, now explicit rather than traded for false positives: a push that
 * never reached the hook leaves no record — `--no-verify` (still a `hook_bypass`
 * kill in the text guard) and a merge performed through `gh` or the web UI (a
 * human act, outside this invariant's subject).
 *
 * Everything it touches is injected (`resolveBase`, `git`, `readPushLog`), so a
 * test drives the whole judgment without a repo or a filesystem.
 */
import { debug } from '../logging.js';

const log = debug('worker:base-drift');

/**
 * An all-zero oid: git's way of saying "no commit" — a deletion's local side.
 *
 * @type {RegExp}
 */
const ZERO_OID_RE = /^0{40,64}$/;

/** @type {RegExp} */
const OID_RE = /^[0-9a-f]{40,64}$/i;

/**
 * The one `exempt` value the prevention layer writes (UI-7ufi §2.3). Compared
 * with strict equality, so a non-string or any other value is simply not an
 * exemption.
 *
 * @type {string}
 */
const DOCS_ONLY_EXEMPT = 'docs_only';

/**
 * What one attempt's post-hoc base observation recorded. Only the fields the
 * observation actually produced are present, so an absent key means "this
 * observation never got that far" rather than a default value.
 *
 * @typedef {Object} BaseDriftRecord
 * @property {string} [pinned] - The `base_oid` the attempt was dispatched
 * against, i.e. the point the comparison is anchored to.
 * @property {string} [observed] - The remote base tip re-resolved after the
 * session ended. Absent when the re-resolution itself failed.
 * @property {boolean} [landed] - Whether a push this attempt made at its base
 * is reachable from the observed tip.
 * @property {'direct_push'} [via] - How the landing happened. One value now:
 * the record proves this attempt pushed at its own base, and a merge performed
 * by a human through a PR never appears in it.
 * @property {string[]} [pushed] - The base-destined oids the hook recorded,
 * whether or not they turned out to be reachable. Written as `[]` when the log
 * was readable and held none, because an ABSENT key means the observation never
 * got that far.
 * @property {string[]} [shas] - The evidence set: the recorded oids that ARE
 * reachable from the observed tip, i.e. the landing itself.
 * @property {string[]} [artifact_pushed] - The base-destined oids the hook let
 * through under its docs-only exemption (UI-7ufi §2.4). They are NOT landing
 * candidates — the prevention layer decided they belong on the base — but the
 * publication stays visible here, which is what makes the exemption auditable.
 * Written only when the base moved and the record was readable, and omitted
 * entirely when the record held none.
 * @property {'disposition'|'quickfix_lane'|'no_base_oid'} [skipped] - Why the attempt was
 * outside the invariant's scope. Recorded so the exclusion is visible.
 * @property {string} [error] - Which observation step could not be completed
 * (`base_resolve:<step>` / `push_log_absent` / `reachability:merge_base` /
 * `no_repo` / `no_observer_deps`).
 */

/**
 * The observation's outcome: what to persist, and whether the fail-closed
 * disposition applies.
 *
 * @typedef {Object} BaseDriftVerdict
 * @property {boolean} violation - True ONLY for a proven landing.
 * @property {BaseDriftRecord|null} record - The record to persist on the
 * attempt; null when the base never moved (there is nothing to say).
 */

/**
 * The base-destined oids one push record holds, in the order they were pushed,
 * split by whether the prevention layer exempted them.
 *
 * A deletion (all-zero local oid) is dropped rather than counted: the base
 * still resolves, so the deletion did not take, and there is no commit whose
 * reachability could be asked about. The refusal itself is what the record
 * exists to preserve, and it stays in the log.
 *
 * The `exempt` split keeps the two layers from contradicting each other: a
 * docs-only publication the hook deliberately passed (UI-7ufi §2.1) lands on
 * the base BY DESIGN, so counting it as a landing candidate would kill the
 * attempt for doing exactly what it was let through to do. Only the exact
 * string the hook writes counts — an unknown `exempt` value stays a candidate,
 * because a record-format extension is only meaningful when both layers know
 * the same value.
 *
 * @param {Record<string, unknown>[]} entries
 * @param {string} base_ref
 * @returns {{ pushed: string[], exempt: string[] }}
 */
function basePushedOids(entries, base_ref) {
  /** @type {string[]} */
  const pushed = [];
  /** @type {string[]} */
  const exempt = [];
  for (const entry of entries) {
    if (entry.remote_ref !== base_ref) {
      continue;
    }
    const oid = typeof entry.local_oid === 'string' ? entry.local_oid : '';
    if (!OID_RE.test(oid) || ZERO_OID_RE.test(oid)) {
      continue;
    }
    const oids = entry.exempt === DOCS_ONLY_EXEMPT ? exempt : pushed;
    if (!oids.includes(oid)) {
      oids.push(oid);
    }
  }
  return { pushed, exempt };
}

/**
 * Observe one finished attempt against the base it was dispatched from.
 *
 * Runs REGARDLESS of the session's own verdict: a session killed by SIGTERM may
 * well have pushed before it died, and in that case `base_landing_detected` is
 * the more honest failure cause than whatever the runner reported.
 *
 * @param {{
 *   attempt: { bead_id?: string, repo?: string|null, base_oid?: string|null, disposition?: string|null, quickfix_lane?: boolean },
 *   resolveBase?: (options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>,
 *   git?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   readPushLog?: () => { ok: true, entries: Record<string, unknown>[] } | { ok: false, reason: string }
 * }} input
 * @returns {Promise<BaseDriftVerdict>}
 */
export async function observeBaseDrift(input) {
  const attempt = input.attempt || {};

  // A REVISE disposition publishes the base as its job (§3 대상). Judged before
  // the record is consulted: no hook was installed for it, so asking the log
  // would only ever answer `push_log_absent` and bury the real reason.
  if (
    typeof attempt.disposition === 'string' &&
    attempt.disposition.length > 0
  ) {
    return { violation: false, record: { skipped: 'disposition' } };
  }
  // Like disposition, this lane publishes the base as its job; reviewed direct
  // base landing is its expected terminal, not a violation.
  if (attempt.quickfix_lane === true) {
    return { violation: false, record: { skipped: 'quickfix_lane' } };
  }
  // An external-conflict dispatch pins no base_oid, so there is no anchor to
  // compare against. The exclusion follows from unobservability, not policy.
  const pinned =
    typeof attempt.base_oid === 'string' && attempt.base_oid.length > 0
      ? attempt.base_oid
      : null;
  if (pinned === null) {
    return { violation: false, record: { skipped: 'no_base_oid' } };
  }

  const repo = typeof attempt.repo === 'string' ? attempt.repo : '';
  if (repo.length === 0) {
    return { violation: false, record: { pinned, error: 'no_repo' } };
  }
  const resolveBase = input.resolveBase;
  const git = input.git;
  const readPushLog = input.readPushLog;
  if (
    typeof resolveBase !== 'function' ||
    typeof git !== 'function' ||
    typeof readPushLog !== 'function'
  ) {
    return { violation: false, record: { pinned, error: 'no_observer_deps' } };
  }

  // The SAME forced re-resolution the merge gate takes before an irreversible
  // merge (`pr-actions.js`): the scan path's memo could otherwise hand back a
  // tip taken before this very session ran, which is exactly the movement being
  // looked for.
  /** @type {import('./target-base.js').TargetBaseResult} */
  let resolved;
  try {
    resolved = await resolveBase({ force: true });
  } catch (err) {
    log('base re-resolution threw for %s: %o', repo, err);
    return {
      violation: false,
      record: { pinned, error: 'base_resolve:threw' }
    };
  }
  if (!resolved.ok) {
    return {
      violation: false,
      record: { pinned, error: `base_resolve:${resolved.step}` }
    };
  }

  const observed = resolved.base_oid;
  if (observed === pinned) {
    return { violation: false, record: null };
  }

  // The base moved. Whose hand? The record answers; its absence means the
  // question cannot be asked for this attempt at all (pre-deployment dispatch
  // or an unreadable state dir), which is neither innocence nor guilt.
  /** @type {{ ok: true, entries: Record<string, unknown>[] } | { ok: false, reason: string }} */
  let push_log;
  try {
    push_log = readPushLog();
  } catch (err) {
    log('push log read threw for %s: %o', repo, err);
    return {
      violation: false,
      record: { pinned, observed, error: 'push_log_absent' }
    };
  }
  if (!push_log.ok) {
    return {
      violation: false,
      record: { pinned, observed, error: 'push_log_absent' }
    };
  }

  const base_ref = `refs/heads/${resolved.base}`;
  const { pushed, exempt } = basePushedOids(push_log.entries, base_ref);
  // Spread into every record built from here on, and omitted when the record
  // held no exemption — the module's idiom, where an absent key means the
  // observation never got that far or the case does not apply.
  /** @type {{ artifact_pushed?: string[] }} */
  const artifact = exempt.length > 0 ? { artifact_pushed: exempt } : {};
  if (pushed.length === 0) {
    // The ordinary case, and the one four measured false positives belong to:
    // a human merge click, another worker's merge, a user push — or this
    // attempt absorbing the base into its branch, which touches no remote. An
    // exemption-only record lands here too: nothing left to ask git about.
    return {
      violation: false,
      record: { pinned, observed, landed: false, pushed: [], ...artifact }
    };
  }

  // A recorded push is an ATTEMPT to land; reachability is whether it took.
  /** @type {string[]} */
  const landed = [];
  for (const oid of pushed) {
    /** @type {{ code: number, stdout: string, stderr: string }} */
    let r;
    try {
      r = await git(['merge-base', '--is-ancestor', oid, observed], {
        cwd: repo
      });
    } catch (err) {
      log('is-ancestor %s..%s threw in %s: %o', oid, observed, repo, err);
      return {
        violation: false,
        record: {
          pinned,
          observed,
          pushed,
          error: 'reachability:merge_base',
          ...artifact
        }
      };
    }
    if (r.code === 0) {
      landed.push(oid);
      continue;
    }
    // Exit 1 is `--is-ancestor`'s NEGATIVE ANSWER, not a failed observation;
    // only a higher code means the question could not be asked.
    if (r.code !== 1) {
      return {
        violation: false,
        record: {
          pinned,
          observed,
          pushed,
          error: 'reachability:merge_base',
          ...artifact
        }
      };
    }
  }
  if (landed.length === 0) {
    // The hook refused it and the base moved for another reason: the attempt
    // tried, and the prevention layer held.
    return {
      violation: false,
      record: { pinned, observed, landed: false, pushed, ...artifact }
    };
  }

  return {
    violation: true,
    record: {
      pinned,
      observed,
      landed: true,
      via: 'direct_push',
      pushed,
      shas: landed,
      ...artifact
    }
  };
}
