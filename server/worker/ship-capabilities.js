/**
 * The post-close capability ship (ship-close choreography, dotfiles
 * `docs/superpowers/specs/2026-07-28-ship-close-choreography-design.md`).
 *
 * fork bd resolves an `external:<project>:<capability>` dependency ONLY against
 * a closed issue carrying `provides:<capability>`, and that label is published
 * by `bd ship` alone — a close never publishes it. So a bead closed with an
 * `export:` label and no ship leaves every dependant permanently blocked, which
 * has already happened twice (dotfiles-v1hr → UI-hs11, dotfiles-0gpe → UI-4ii4).
 * This module is the worker merge click's leg of that choreography.
 *
 * Ship comes AFTER the close because `bd ship` without `--force` refuses an
 * open issue. Putting it before the close with `--force` was rejected: a close
 * that then failed would leave a `provides:` label on an OPEN issue — a
 * capability that claims to be delivered and is not, which is worse than the
 * accident this prevents.
 */
import { debug } from '../logging.js';

const log = debug('worker:ship-capabilities');

const EXPORT_PREFIX = 'export:';
const PROVIDES_PREFIX = 'provides:';

/**
 * Child dispositions that CLOSE a bead without the work having been delivered
 * (canonical enum: dotfiles `docs/contracts/workflow.yaml` `child_disposition`).
 * Shipping one of these would publish a capability nobody built.
 *
 * @type {string[]}
 */
const CANCELING_DISPOSITIONS = ['out_of_scope', 'canceled'];

/**
 * @typedef {Object} ShipTask
 * @property {string} bead_id - The bead whose `export:` label was read.
 * @property {string} capability - The label's capability name (prefix stripped).
 */

/**
 * Read one bead's labels as strings, tolerating a payload that carries none.
 *
 * @param {Record<string, any>} issue
 * @returns {string[]}
 */
function labelsOf(issue) {
  const raw = issue && issue.labels;
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.filter((l) => typeof l === 'string' && l.length > 0);
}

/**
 * Render the remaining work for a failure's `detail`.
 *
 * The two halves are deliberately NOT merged into one list: `pending` is work we
 * KNOW is left, `unread` is beads whose labels we never got to read. A single
 * flat string would tell a human "here is what remains" while silently hiding
 * that the list itself is incomplete.
 *
 * @param {ShipTask[]} pending
 * @param {string[]} unread
 * @returns {string}
 */
function remainingDetail(pending, unread) {
  const caps = pending.map((t) => t.capability).join(',');
  const head = `pending=${caps}`;
  return unread.length > 0 ? `${head} unread=${unread.join(',')}` : head;
}

/**
 * Publish every `export:<capability>` label carried by a set of just-closed
 * beads, with a `provides:` readback on each.
 *
 * Runs in TWO passes on purpose. A single pass that reads one bead and ships it
 * immediately cannot report the full remainder when it stops: the beads behind
 * the failure have not been read yet, so their capabilities are invisible. The
 * choreography contract requires the remainder to be reported, so collection
 * completes before anything is written.
 *
 * @param {{
 *   bd: {
 *     readIssue?: (bead_id: string) => Promise<Record<string, any>>,
 *     ship?: (capability: string) => Promise<{ status: string, issue_id: string|null }>,
 *     removeLabel?: (bead_id: string, label: string) => Promise<void>
 *   },
 *   bead_ids: string[]
 * }} input
 * @returns {Promise<{ ok: true, removed: string[] }|{ ok: false, reason: string, detail?: string }>}
 */
export async function shipExportedCapabilities(input) {
  const bd = input.bd || {};
  const bead_ids = Array.isArray(input.bead_ids) ? input.bead_ids : [];
  // Absence of the capability is NOT "nothing to do" — same rule as the child
  // sweep's `child_sweep_unavailable`. An adapter without these functions cannot
  // tell us whether an `export:` label is out there.
  if (
    typeof bd.readIssue !== 'function' ||
    typeof bd.ship !== 'function' ||
    typeof bd.removeLabel !== 'function'
  ) {
    return { ok: false, reason: 'ship_unavailable' };
  }
  const readIssue = bd.readIssue;
  const ship = bd.ship;
  const removeLabel = bd.removeLabel;

  // ---- Pass 1: collect. -----------------------------------------------------
  /** @type {ShipTask[]} */
  const to_ship = [];
  /** @type {ShipTask[]} */
  const to_remove = [];
  /** @type {string[]} */
  const deferred = [];

  for (let i = 0; i < bead_ids.length; i += 1) {
    const bead_id = bead_ids[i];
    /** @type {Record<string, any>} */
    let issue;
    try {
      issue = await readIssue(bead_id);
    } catch (err) {
      log('ship collection read failed for %s: %o', bead_id, err);
      return {
        ok: false,
        reason: `ship_read_failed:${bead_id}`,
        detail: remainingDetail([...to_remove, ...to_ship], bead_ids.slice(i))
      };
    }
    const labels = labelsOf(issue);
    const metadata = issue && issue.metadata;
    const disposition =
      metadata && typeof metadata === 'object'
        ? /** @type {Record<string, unknown>} */ (metadata).child_disposition
        : undefined;
    for (const label of labels) {
      if (!label.startsWith(EXPORT_PREFIX)) {
        continue;
      }
      const capability = label.slice(EXPORT_PREFIX.length);
      if (capability.length === 0) {
        continue;
      }
      if (labels.includes(PROVIDES_PREFIX + capability)) {
        // Already published — `bd ship` would be idempotent anyway, but the
        // retry path re-enumerates every closed bead, so skipping here keeps a
        // re-click from re-writing what is already true.
        continue;
      }
      if (
        typeof disposition === 'string' &&
        CANCELING_DISPOSITIONS.includes(disposition)
      ) {
        to_remove.push({ bead_id, capability });
        continue;
      }
      if (disposition === 'deferred') {
        // Not shipped (the work was never done) and the label is KEPT: a
        // deferred child needs its `export:` when it resumes.
        deferred.push(`${bead_id}:${capability}`);
        continue;
      }
      to_ship.push({ bead_id, capability });
    }
  }

  if (deferred.length > 0) {
    log('ship skipped for deferred children: %s', deferred.join(','));
  }

  // ---- Pass 2: execute. -----------------------------------------------------
  /** @type {string[]} */
  const removed = [];

  for (let i = 0; i < to_remove.length; i += 1) {
    const task = to_remove[i];
    const label = EXPORT_PREFIX + task.capability;
    const rest = [...to_remove.slice(i), ...to_ship];
    try {
      await removeLabel(task.bead_id, label);
    } catch (err) {
      log('export label removal failed for %s: %o', task.bead_id, err);
      return {
        ok: false,
        reason: `export_removal_failed:${task.bead_id}:${task.capability}`,
        detail: remainingDetail(rest, [])
      };
    }
    /** @type {Record<string, any>} */
    let after;
    try {
      after = await readIssue(task.bead_id);
    } catch (err) {
      log('export removal readback failed for %s: %o', task.bead_id, err);
      return {
        ok: false,
        reason: `export_removal_failed:${task.bead_id}:${task.capability}`,
        detail: remainingDetail(rest, [])
      };
    }
    if (labelsOf(after).includes(label)) {
      return {
        ok: false,
        reason: `export_removal_failed:${task.bead_id}:${task.capability}`,
        detail: remainingDetail(rest, [])
      };
    }
    removed.push(`${task.bead_id}:${task.capability}`);
  }

  for (let i = 0; i < to_ship.length; i += 1) {
    const task = to_ship[i];
    const rest = to_ship.slice(i);
    /** @type {{ status: string, issue_id: string|null }} */
    let result;
    try {
      result = await ship(task.capability);
    } catch (err) {
      log('bd ship failed for %s: %o', task.capability, err);
      return {
        ok: false,
        reason: `ship_failed:${task.capability}`,
        detail: remainingDetail(rest, [])
      };
    }
    // `bd ship` selects its target by scanning the WORKSPACE for the capability,
    // not by the bead we read the label from. The contract says a capability is
    // unique; this is where a broken assumption stops being silent.
    if (!result || result.issue_id !== task.bead_id) {
      return {
        ok: false,
        reason: `ship_target_mismatch:${task.capability}`,
        detail: remainingDetail(rest, [])
      };
    }
    /** @type {Record<string, any>} */
    let after;
    try {
      after = await readIssue(task.bead_id);
    } catch (err) {
      log('ship readback failed for %s: %o', task.bead_id, err);
      return {
        ok: false,
        reason: `ship_readback_failed:${task.capability}`,
        detail: remainingDetail(rest, [])
      };
    }
    if (!labelsOf(after).includes(PROVIDES_PREFIX + task.capability)) {
      return {
        ok: false,
        reason: `ship_readback_failed:${task.capability}`,
        detail: remainingDetail(rest, [])
      };
    }
  }

  return { ok: true, removed };
}
