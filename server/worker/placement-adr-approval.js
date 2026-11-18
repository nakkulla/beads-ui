/**
 * The ADR candidate section approval a person's on-screen placement records
 * (UI-yylj; dotfiles spec 2026-11-17 adr-approval-human-placement §3.1).
 *
 * Only the WebSocket `worker-queue-place` and `worker-queue-place-bundle`
 * handlers reach this, and only for beads the placement newly put into a
 * waiting area: the REST routes, moves, `[지금 시작]`, resume/retry and server
 * placements never do. For a `route=quick_fix` bead whose body has exactly one
 * `## …결정 (ADR 후보)` section and no valid approval, the server writes
 * `adr_approval=user@<current section digest>` and reads it back.
 *
 * Order: the caller pre-reads the section digest the person saw
 * ({@link readPlacementApproval}) before the queue change, holds the bead
 * synchronously right before it applies, records after it applied, and
 * releases when the record attempt settles (readback done or failure certain).
 * The scheduler does not dispatch a held bead, so a fresh row never reaches a
 * Worker ahead of its key. A section that changed since the pre-read, or a
 * failed pre-read, writes nothing. A failed record leaves no key it wrote and
 * never undoes the placement — the existing Worker session conversation path
 * then asks for approval as before.
 */
import path from 'node:path';
import { debug } from '../logging.js';
import { createBdMetadata } from './bd-metadata.js';
import { judgeAdrApproval } from './quick-fix-handoff.js';
import { getWorkerRuntime } from './runtime.js';

const log = debug('worker:placement-adr-approval');

/**
 * @typedef {Object} PlacementApprovalBd
 * @property {(bead_id: string) => Promise<Record<string, any>>} readIssue
 * @property {(bead_id: string, key: string, value: string) => Promise<void>} setMetadata
 * @property {(bead_id: string, key: string) => Promise<void>} unsetMetadata
 * @property {(bead_id: string, key: string) => Promise<string|null>} readMetadata
 */

/**
 * The section digest a placement saw before the queue changed: `digest` is
 * null when the body has no single ADR candidate section.
 *
 * @typedef {{ digest: string|null }} PlacementApprovalSeen
 */

/**
 * @typedef {Object} PlacementApprovalEntry
 * @property {string} bead_id
 * @property {PlacementApprovalSeen|null} seen - Null when the pre-read failed.
 */

/** @type {Map<string, Map<string, number>>} */
const held = new Map();

/** @type {((workspace: string) => PlacementApprovalBd)|null} */
let bdForTest = null;

/**
 * @param {string} workspace
 * @returns {string}
 */
function keyOf(workspace) {
  return path.resolve(String(workspace || ''));
}

/**
 * Whether a placement's approval record for this bead is still in flight; the
 * scheduler skips such a bead (UI-yylj).
 *
 * @param {string} workspace
 * @param {string} bead_id
 * @returns {boolean}
 */
export function placementApprovalPending(workspace, bead_id) {
  return (held.get(keyOf(workspace))?.get(bead_id) ?? 0) > 0;
}

/**
 * Hold dispatch of each bead until {@link releasePlacementApproval}. Call it
 * synchronously right before the queue write, so no tick can see the row
 * without the hold.
 *
 * @param {string} workspace
 * @param {string[]} bead_ids
 */
export function holdPlacementApproval(workspace, bead_ids) {
  const key = keyOf(workspace);
  const beads = held.get(key) ?? new Map();
  for (const bead_id of bead_ids) {
    beads.set(bead_id, (beads.get(bead_id) ?? 0) + 1);
  }
  held.set(key, beads);
}

/**
 * @param {string} workspace
 * @param {string[]} bead_ids
 */
export function releasePlacementApproval(workspace, bead_ids) {
  const key = keyOf(workspace);
  const beads = held.get(key);
  if (!beads) {
    return;
  }
  for (const bead_id of bead_ids) {
    const count = (beads.get(bead_id) ?? 0) - 1;
    if (count > 0) {
      beads.set(bead_id, count);
    } else {
      beads.delete(bead_id);
    }
  }
  if (beads.size === 0) {
    held.delete(key);
  }
}

/**
 * @param {string} workspace
 * @returns {PlacementApprovalBd}
 */
function bdFor(workspace) {
  if (bdForTest) {
    return bdForTest(workspace);
  }
  return createBdMetadata({
    cwd: workspace,
    // Both tabs draw the ADR chip off the title cache; feed it the readback so
    // the recorded approval shows without waiting out the cache TTL.
    onReadback: (issue) =>
      getWorkerRuntime().titleCache.refreshFromIssue(workspace, issue)
  });
}

/**
 * Read the ADR section digest of a bead BEFORE its placement applies, so the
 * record never approves a section the person did not see. Never throws.
 *
 * @param {string} workspace
 * @param {string} bead_id
 * @returns {Promise<PlacementApprovalSeen|null>} Null when the read failed.
 */
export async function readPlacementApproval(workspace, bead_id) {
  try {
    const adr = judgeAdrApproval(await bdFor(workspace).readIssue(bead_id));
    return { digest: adr && adr.count === 1 ? adr.digest : null };
  } catch (err) {
    log('adr_approval pre-read failed for %s/%s: %o', workspace, bead_id, err);
    return null;
  }
}

/**
 * Put the key back to what it was before this record wrote it, but only while
 * it still holds the value this record wrote: another writer's value is left.
 *
 * @param {PlacementApprovalBd} bd
 * @param {string} bead_id
 * @param {string} key
 * @param {string} value - The value this record wrote.
 * @param {unknown} prior - The value before the write; non-string = absent.
 */
async function restorePrior(bd, bead_id, key, value, prior) {
  try {
    /** @type {string|null|undefined} */
    let current;
    try {
      current = await bd.readMetadata(bead_id, key);
    } catch {
      // Unknown current value: restoring is the only way back to no key.
      current = value;
    }
    if (current !== value) {
      return;
    }
    if (typeof prior === 'string') {
      await bd.setMetadata(bead_id, key, prior);
    } else {
      await bd.unsetMetadata(bead_id, key);
    }
  } catch (err) {
    log('adr_approval restore failed for %s/%s: %o', bead_id, key, err);
  }
}

/**
 * Record one newly placed bead's approval when it needs one. Never throws.
 *
 * @param {string} workspace
 * @param {string} bead_id
 * @param {PlacementApprovalSeen|null} seen - The pre-placement read.
 * @returns {Promise<'recorded'|'not_needed'|'failed'>}
 */
export async function recordPlacementApproval(workspace, bead_id, seen) {
  try {
    const bd = bdFor(workspace);
    const issue = await bd.readIssue(bead_id);
    const adr = judgeAdrApproval(issue);
    if (!adr || adr.state === 'approved') {
      return 'not_needed';
    }
    if (adr.count !== 1 || adr.digest === null) {
      log('no single ADR section for %s/%s', workspace, bead_id);
      return 'failed';
    }
    if (!seen || seen.digest !== adr.digest) {
      log('ADR section changed since placement for %s/%s', workspace, bead_id);
      return 'failed';
    }
    const prior = issue?.metadata?.[adr.key];
    const value = `user@${adr.digest}`;
    /** @type {string|null} */
    let readback;
    try {
      await bd.setMetadata(bead_id, adr.key, value);
      readback = await bd.readMetadata(bead_id, adr.key);
    } catch (err) {
      // A failed write may still have landed; without a confirming readback
      // the key must not outlive this attempt (placement_proceeds_without_key).
      log('adr_approval write failed for %s/%s: %o', workspace, bead_id, err);
      await restorePrior(bd, bead_id, adr.key, value, prior);
      return 'failed';
    }
    if (readback !== value) {
      // Someone else's value now stands; it is theirs to keep.
      log('adr_approval readback mismatch for %s/%s', workspace, bead_id);
      return 'failed';
    }
    return 'recorded';
  } catch (err) {
    log('adr_approval record failed for %s/%s: %o', workspace, bead_id, err);
    return 'failed';
  }
}

/**
 * Record each held bead in turn, release each as its attempt settles, then
 * kick the Worker once so the released rows can start.
 *
 * @param {string} workspace
 * @param {PlacementApprovalEntry[]} entries - Beads already held by
 * {@link holdPlacementApproval} and now applied to the queue.
 * @param {(workspace: string) => unknown} tick
 * @returns {Promise<void>}
 */
export async function settlePlacementApprovals(workspace, entries, tick) {
  for (const entry of entries) {
    try {
      await recordPlacementApproval(workspace, entry.bead_id, entry.seen);
    } finally {
      releasePlacementApproval(workspace, [entry.bead_id]);
    }
  }
  try {
    await tick(workspace);
  } catch (err) {
    log(
      'worker tick after adr_approval record failed for %s: %o',
      workspace,
      err
    );
  }
}

/**
 * @param {((workspace: string) => PlacementApprovalBd)|null} factory
 */
export function __setPlacementApprovalBdForTest(factory) {
  bdForTest = factory;
}

/** Drop the test bd factory and every hold. */
export function __resetPlacementApprovalForTest() {
  bdForTest = null;
  held.clear();
}
