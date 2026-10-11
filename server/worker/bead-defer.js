/**
 * The `deferred` transitions a person asks for from the Worker surfaces
 * (UI-0d9i §3.3): [보류로 전환] on a shelved PR 대기 row and [되살리기] on a
 * 「보류 N」 card.
 *
 * The rules come from the dotfiles workflow contract (`lifecycle.transitions`
 * `defer` / `revive`), which beads-ui consumes and does not define (ADR
 * UI-u6ud-2): a defer starts only from `resolved` with a `pr_url` here, writes
 * `bd defer <id> --reason`, then cuts the chosen same-rig `blocks` edges, each
 * leaving a `deferred-unblocked: <dependent>` notes line; a revival goes back to
 * `resolved` while the PR is open or merged and to `open` otherwise, never
 * writing when the PR cannot be read, and restores only the edges asked for.
 *
 * Everything here talks to bd through the injected {@link BeadDeferBd} so the
 * caller decides the workspace, the effect gate and the queue checks. Every
 * write is followed by a readback; a write that landed but could not be read
 * back is `unknown`, never a no-change failure, because retrying it could apply
 * it twice.
 */
import path from 'node:path';
import { stderrTail } from '../bd.js';
import {
  foreignTargetFromMetadata,
  parsePrUrlStrict
} from './foreign-target.js';

/** The notes line prefix a cut edge leaves behind (workflow contract). */
export const DEFERRED_UNBLOCKED_PREFIX = 'deferred-unblocked:';

/**
 * The one per-Bead lock key that serializes a Bead's [보류로 전환], [되살리기],
 * [보관 해제], `update-status` and post-merge completion cleanup (UI-0d9i
 * §3.3, §3.4). The workspace is resolved here so a connection's empty key, a
 * Monitor `root_dir` and the attachment's resolved root all name the same
 * lock. It is the OUTERMOST lock: holders may take the repo/topology locks
 * inside it, never the other way around.
 *
 * @param {string} workspace
 * @param {string} bead_id
 * @returns {string}
 */
export function beadDeferLockKey(workspace, bead_id) {
  return `bead-defer:${path.resolve(String(workspace || ''))}::${bead_id}`;
}

/**
 * @typedef {{ ok: true, data: any } | { ok: false, error: { code?: string, message?: string } }} BdRead
 */

/**
 * @typedef {Object} BeadDeferBd
 * @property {(bead_id: string) => Promise<BdRead>} show - `bd show <id> --json`.
 * @property {(bead_id: string) => Promise<BdRead>} dependents - `bd dep list <id>
 * --direction up --type blocks --json`.
 * @property {(bead_id: string) => Promise<BdRead>} deps - `bd dep list <id> --json`.
 * @property {(ids: string[]) => Promise<BdRead>} listByIds - `bd list --id
 * <ids> --all --limit 0 --json`.
 * @property {(args: string[]) => Promise<{ code: number, stdout?: string, stderr?: string }>} run -
 * One bd write behind the workspace effect gate.
 */

/**
 * @typedef {Object} EdgeFailure
 * @property {string} id - The dependent Bead.
 * @property {'not_dependent'|'not_unblocked'|'remove'|'note'|'add'|'readback'|'note_readback'|'status_read'} step
 * @property {string} [message]
 */

/**
 * @typedef {Object} TransitionResult
 * @property {'applied'|'partial'|'refused'|'failed'|'unknown'} outcome -
 * `failed` changed nothing; `unknown` wrote but could not confirm it;
 * `partial` confirmed the status but some edges failed.
 * @property {string|null} reason
 * @property {string} [message]
 * @property {string|null} [status] - The Bead status the readback confirmed.
 * @property {boolean} [write_applied]
 * @property {boolean} [retry_safe]
 * @property {string[]} edges - Edges cut (defer) or restored (revive).
 * @property {EdgeFailure[]} failed_edges
 * @property {string[]} [skipped_edges] - Revive only: chosen dependents that
 * read `closed` right before the restore, so no edge was put back on them.
 * @property {'resolved'|'open'} [target]
 * @property {string|null} [pr_state]
 */

/**
 * @typedef {(slug: string, number: number) => Promise<{ ok: true, state: string } | { ok: false, reason: string }>} ReadPrState
 */

/**
 * The dependents a Bead's notes say a defer cut, in first-seen order.
 *
 * @param {unknown} notes
 * @returns {string[]}
 */
export function deferredUnblockedIds(notes) {
  if (typeof notes !== 'string' || notes.length === 0) {
    return [];
  }
  /** @type {string[]} */
  const out = [];
  for (const line of notes.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith(DEFERRED_UNBLOCKED_PREFIX)) {
      continue;
    }
    const id = trimmed.slice(DEFERRED_UNBLOCKED_PREFIX.length).trim();
    if (/^\S+$/.test(id) && !out.includes(id)) {
      out.push(id);
    }
  }
  return out;
}

/**
 * The `metadata.pr_url` of one `bd show` record, or null.
 *
 * @param {any} issue
 * @returns {string|null}
 */
export function prUrlOf(issue) {
  const value = issue && issue.metadata ? issue.metadata.pr_url : null;
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : null;
}

/**
 * Why a Bead is not where [보류로 전환] may start — the button stands only on
 * a shelved PR 대기 row, so `resolved` with a `pr_url` is its one origin.
 *
 * @param {any} issue
 * @returns {'already_deferred'|'not_resolved_with_pr'|null}
 */
export function deferOriginRefusal(issue) {
  const status = issue && typeof issue.status === 'string' ? issue.status : '';
  if (status === 'deferred') {
    return 'already_deferred';
  }
  if (status !== 'resolved' || prUrlOf(issue) === null) {
    return 'not_resolved_with_pr';
  }
  return null;
}

/**
 * Whether one `bd dep list <dependent>` answer still holds a `blocks` edge on
 * `bead_id`. Both row shapes bd prints are read: issue rows with a
 * `dependency_type`, and bare edge rows.
 *
 * @param {unknown} rows
 * @param {string} bead_id
 * @returns {boolean}
 */
export function hasBlocksEdge(rows, bead_id) {
  if (!Array.isArray(rows)) {
    return false;
  }
  return rows.some((row) => {
    if (!row || typeof row !== 'object') {
      return false;
    }
    if (row.id === bead_id) {
      return (row.dependency_type ?? 'blocks') === 'blocks';
    }
    return row.depends_on_id === bead_id && (row.type ?? 'blocks') === 'blocks';
  });
}

/**
 * The bd error text a refusal carries to the screen.
 *
 * @param {BdRead} read
 * @returns {string}
 */
function readMessage(read) {
  return read.ok
    ? ''
    : String(read.error?.message || read.error?.code || 'bd read failed');
}

/**
 * The open dependents of one `bd dep list --direction up` answer.
 *
 * @param {unknown} rows
 * @returns {Array<{ id: string, title: string, status: string }>}
 */
function openDependentsOf(rows) {
  /** @type {Array<{ id: string, title: string, status: string }>} */
  const out = [];
  for (const row of Array.isArray(rows) ? rows : []) {
    const id = row && typeof row.id === 'string' ? row.id : '';
    const status = row && typeof row.status === 'string' ? row.status : '';
    if (!id || status === 'closed' || out.some((entry) => entry.id === id)) {
      continue;
    }
    out.push({
      id,
      title: typeof row.title === 'string' ? row.title : '',
      status
    });
  }
  return out;
}

/**
 * Distinct non-empty string ids, in request order.
 *
 * @param {unknown} raw
 * @returns {string[]}
 */
function idsOf(raw) {
  /** @type {string[]} */
  const out = [];
  for (const id of Array.isArray(raw) ? raw : []) {
    if (typeof id === 'string' && id.length > 0 && !out.includes(id)) {
      out.push(id);
    }
  }
  return out;
}

/**
 * The material the defer dialog opens with: the Bead's origin and its open
 * same-rig `blocks` dependents.
 *
 * @param {BeadDeferBd} bd
 * @param {string} bead_id
 * @returns {Promise<{ ok: true, status: string, pr_url: string|null, dependents: Array<{ id: string, title: string, status: string }> } | { ok: false, reason: string, message?: string, status?: string|null }>}
 */
export async function previewDefer(bd, bead_id) {
  const shown = await bd.show(bead_id);
  if (!shown.ok) {
    return { ok: false, reason: 'bd_read_failed', message: readMessage(shown) };
  }
  const refusal = deferOriginRefusal(shown.data);
  if (refusal !== null) {
    return {
      ok: false,
      reason: refusal,
      status: typeof shown.data?.status === 'string' ? shown.data.status : null
    };
  }
  const listed = await bd.dependents(bead_id);
  if (!listed.ok) {
    return {
      ok: false,
      reason: 'bd_read_failed',
      message: readMessage(listed)
    };
  }
  return {
    ok: true,
    status: shown.data.status,
    pr_url: prUrlOf(shown.data),
    dependents: openDependentsOf(listed.data)
  };
}

/**
 * Defer one Bead and cut the chosen edges (§3.3 defer). `queueRefusal` is
 * asked right before the `bd defer` write, after every bd read, so the queue
 * facts it judges are the ones the write follows.
 *
 * @param {BeadDeferBd} bd
 * @param {{ bead_id: string, reason: string, remove_edges: string[], queueRefusal: () => (string|null) }} input
 * @returns {Promise<TransitionResult>}
 */
export async function applyDefer(bd, input) {
  const { bead_id } = input;
  /** @type {EdgeFailure[]} */
  const failed_edges = [];
  /** @type {string[]} */
  const edges = [];
  const shown = await bd.show(bead_id);
  if (!shown.ok) {
    return {
      outcome: 'failed',
      reason: 'bd_read_failed',
      message: readMessage(shown),
      write_applied: false,
      edges,
      failed_edges
    };
  }
  const refusal = deferOriginRefusal(shown.data);
  if (refusal !== null) {
    return {
      outcome: 'refused',
      reason: refusal,
      status: shown.data?.status ?? null,
      edges,
      failed_edges
    };
  }
  const listed = await bd.dependents(bead_id);
  if (!listed.ok) {
    return {
      outcome: 'failed',
      reason: 'bd_read_failed',
      message: readMessage(listed),
      write_applied: false,
      edges,
      failed_edges
    };
  }
  const open_dependents = new Set(
    openDependentsOf(listed.data).map((entry) => entry.id)
  );
  const queue_refusal = input.queueRefusal();
  if (queue_refusal !== null) {
    return { outcome: 'refused', reason: queue_refusal, edges, failed_edges };
  }
  const wrote = await bd.run(['defer', bead_id, `--reason=${input.reason}`]);
  if (wrote.code !== 0) {
    return {
      outcome: 'failed',
      reason: 'bd_write_failed',
      message: stderrTail(wrote.stderr) || 'bd defer failed',
      write_applied: false,
      edges,
      failed_edges
    };
  }
  const back = await bd.show(bead_id);
  if (!back.ok || back.data?.status !== 'deferred') {
    return {
      outcome: 'unknown',
      reason: back.ok ? 'readback_mismatch' : 'readback_failed',
      message: back.ok
        ? `readback status ${String(back.data?.status)}`
        : readMessage(back),
      write_applied: true,
      retry_safe: false,
      edges,
      failed_edges
    };
  }
  for (const dependent of idsOf(input.remove_edges)) {
    if (!open_dependents.has(dependent)) {
      failed_edges.push({ id: dependent, step: 'not_dependent' });
      continue;
    }
    const removed = await bd.run(['dep', 'remove', dependent, bead_id]);
    if (removed.code !== 0) {
      failed_edges.push({
        id: dependent,
        step: 'remove',
        message: stderrTail(removed.stderr)
      });
      continue;
    }
    const noted = await bd.run([
      'update',
      bead_id,
      '--append-notes',
      `${DEFERRED_UNBLOCKED_PREFIX} ${dependent}`
    ]);
    if (noted.code !== 0) {
      failed_edges.push({
        id: dependent,
        step: 'note',
        message: stderrTail(noted.stderr)
      });
      continue;
    }
    const edge_back = await bd.deps(dependent);
    if (!edge_back.ok || hasBlocksEdge(edge_back.data, bead_id)) {
      failed_edges.push({
        id: dependent,
        step: 'readback',
        message: edge_back.ok ? 'edge still present' : readMessage(edge_back)
      });
      continue;
    }
    edges.push(dependent);
  }
  if (edges.length > 0) {
    const notes_back = await bd.show(bead_id);
    const noted_ids = notes_back.ok
      ? deferredUnblockedIds(notes_back.data?.notes)
      : [];
    for (const dependent of [...edges]) {
      if (noted_ids.includes(dependent)) {
        continue;
      }
      edges.splice(edges.indexOf(dependent), 1);
      failed_edges.push({
        id: dependent,
        step: 'note_readback',
        message: notes_back.ok ? 'notes line missing' : readMessage(notes_back)
      });
    }
  }
  return {
    outcome: failed_edges.length > 0 ? 'partial' : 'applied',
    reason: null,
    status: 'deferred',
    write_applied: true,
    edges,
    failed_edges
  };
}

/**
 * Where a revival goes (§3.3 revive-preview): `resolved` while the PR the
 * Bead's `pr_url` names is open or merged, `open` when it is closed or there is
 * none. The PR is read from the repository `pr_url` names — a pinned foreign PR
 * through the same pin judgment the PR observation uses (UI-k467) — and an
 * unreadable PR or an unprovable target is a failure with no target.
 *
 * @param {any} issue
 * @param {ReadPrState} readPrState
 * @returns {Promise<{ ok: true, target: 'resolved'|'open', pr_state: string|null, pr_url: string|null } | { ok: false, reason: 'pr_lookup_failed', message: string, pr_url: string|null }>}
 */
export async function revivalTargetOf(issue, readPrState) {
  const pr_url = prUrlOf(issue);
  if (pr_url === null) {
    return { ok: true, target: 'open', pr_state: null, pr_url };
  }
  /**
   * @param {string} message
   * @returns {{ ok: false, reason: 'pr_lookup_failed', message: string, pr_url: string|null }}
   */
  const failure = (message) => ({
    ok: false,
    reason: 'pr_lookup_failed',
    message,
    pr_url
  });
  const judged = foreignTargetFromMetadata(issue?.metadata || null, pr_url);
  if (judged.state === 'invalid') {
    return failure(judged.reason);
  }
  /** @type {string} */
  let slug;
  /** @type {number|null} */
  let number;
  if (judged.state === 'ok') {
    slug = judged.target.slug;
    number = judged.target.pr_number ?? null;
  } else {
    const parsed = parsePrUrlStrict(pr_url);
    if (parsed === null) {
      return failure('pr_url_unparseable');
    }
    slug = parsed.slug;
    number = parsed.number;
  }
  if (typeof number !== 'number') {
    return failure('pr_ref_unknown');
  }
  /** @type {{ ok: true, state: string } | { ok: false, reason: string }} */
  let read;
  try {
    read = await readPrState(slug, number);
  } catch (err) {
    return failure(String(/** @type {any} */ (err)?.message || err));
  }
  if (!read.ok) {
    return failure(read.reason);
  }
  if (read.state === 'OPEN' || read.state === 'MERGED') {
    return { ok: true, target: 'resolved', pr_state: read.state, pr_url };
  }
  if (read.state === 'CLOSED') {
    return { ok: true, target: 'open', pr_state: read.state, pr_url };
  }
  return failure(`pr_state_unknown:${read.state}`);
}

/**
 * The material the revive dialog opens with: the target and the open
 * dependents the defer cut.
 *
 * @param {BeadDeferBd} bd
 * @param {string} bead_id
 * @param {ReadPrState} readPrState
 * @returns {Promise<{ ok: true, target: 'resolved'|'open', pr_state: string|null, pr_url: string|null, restorable: Array<{ id: string, title: string, status: string }> } | { ok: false, reason: string, message?: string, status?: string|null }>}
 */
export async function previewRevive(bd, bead_id, readPrState) {
  const shown = await bd.show(bead_id);
  if (!shown.ok) {
    return { ok: false, reason: 'bd_read_failed', message: readMessage(shown) };
  }
  if (shown.data?.status !== 'deferred') {
    return {
      ok: false,
      reason: 'not_deferred',
      status: typeof shown.data?.status === 'string' ? shown.data.status : null
    };
  }
  const cut = deferredUnblockedIds(shown.data.notes);
  /** @type {Array<{ id: string, title: string, status: string }>} */
  let restorable = [];
  if (cut.length > 0) {
    const listed = await bd.listByIds(cut);
    if (!listed.ok) {
      return {
        ok: false,
        reason: 'bd_read_failed',
        message: readMessage(listed)
      };
    }
    const open = openDependentsOf(listed.data);
    restorable = cut
      .map((id) => open.find((entry) => entry.id === id))
      .filter((entry) => entry !== undefined);
  }
  const target = await revivalTargetOf(shown.data, readPrState);
  if (!target.ok) {
    return { ok: false, reason: target.reason, message: target.message };
  }
  return {
    ok: true,
    target: target.target,
    pr_state: target.pr_state,
    pr_url: target.pr_url,
    restorable
  };
}

/**
 * Revive one deferred Bead and restore the chosen edges (§3.3 revive). The
 * target is judged again here; nothing is written when the PR cannot be read.
 *
 * @param {BeadDeferBd} bd
 * @param {{ bead_id: string, restore_edges: string[], readPrState: ReadPrState }} input
 * @returns {Promise<TransitionResult>}
 */
export async function applyRevive(bd, input) {
  const { bead_id } = input;
  /** @type {EdgeFailure[]} */
  const failed_edges = [];
  /** @type {string[]} */
  const edges = [];
  const shown = await bd.show(bead_id);
  if (!shown.ok) {
    return {
      outcome: 'failed',
      reason: 'bd_read_failed',
      message: readMessage(shown),
      write_applied: false,
      edges,
      failed_edges
    };
  }
  if (shown.data?.status !== 'deferred') {
    return {
      outcome: 'refused',
      reason: 'not_deferred',
      status: shown.data?.status ?? null,
      edges,
      failed_edges
    };
  }
  const judged = await revivalTargetOf(shown.data, input.readPrState);
  if (!judged.ok) {
    return {
      outcome: 'failed',
      reason: judged.reason,
      message: judged.message,
      write_applied: false,
      edges,
      failed_edges
    };
  }
  const target = judged.target;
  const wrote = await bd.run(
    target === 'resolved'
      ? ['update', bead_id, '--status', 'resolved']
      : ['undefer', bead_id]
  );
  if (wrote.code !== 0) {
    return {
      outcome: 'failed',
      reason: 'bd_write_failed',
      message: stderrTail(wrote.stderr) || 'bd write failed',
      write_applied: false,
      target,
      pr_state: judged.pr_state,
      edges,
      failed_edges
    };
  }
  const back = await bd.show(bead_id);
  if (!back.ok || back.data?.status !== target) {
    return {
      outcome: 'unknown',
      reason: back.ok ? 'readback_mismatch' : 'readback_failed',
      message: back.ok
        ? `readback status ${String(back.data?.status)}`
        : readMessage(back),
      write_applied: true,
      retry_safe: false,
      target,
      pr_state: judged.pr_state,
      edges,
      failed_edges
    };
  }
  const cut = new Set(deferredUnblockedIds(shown.data.notes));
  const chosen = idsOf(input.restore_edges);
  /** @type {string[]} */
  const skipped_edges = [];
  // A dependent closed since the preview gets no edge back (the contract skips
  // closed dependents). Its status is read right before the restore; when it
  // cannot be read no edge is restored at all — a blocks edge on a closed
  // Bead is the one outcome this check exists to prevent.
  /** @type {Map<string, string>|null} */
  let statuses = null;
  const to_check = chosen.filter((id) => cut.has(id));
  if (to_check.length > 0) {
    const listed = await bd.listByIds(to_check);
    if (listed.ok && Array.isArray(listed.data)) {
      statuses = new Map();
      for (const row of listed.data) {
        if (row && typeof row.id === 'string') {
          statuses.set(
            row.id,
            typeof row.status === 'string' ? row.status : ''
          );
        }
      }
    } else {
      const message = listed.ok ? 'non-array payload' : readMessage(listed);
      for (const dependent of to_check) {
        failed_edges.push({ id: dependent, step: 'status_read', message });
      }
    }
  }
  for (const dependent of chosen) {
    if (!cut.has(dependent)) {
      failed_edges.push({ id: dependent, step: 'not_unblocked' });
      continue;
    }
    if (statuses === null) {
      continue;
    }
    if (statuses.get(dependent) === 'closed') {
      skipped_edges.push(dependent);
      continue;
    }
    const added = await bd.run([
      'dep',
      'add',
      dependent,
      bead_id,
      '--type',
      'blocks'
    ]);
    if (added.code !== 0) {
      failed_edges.push({
        id: dependent,
        step: 'add',
        message: stderrTail(added.stderr)
      });
      continue;
    }
    const edge_back = await bd.deps(dependent);
    if (!edge_back.ok || !hasBlocksEdge(edge_back.data, bead_id)) {
      failed_edges.push({
        id: dependent,
        step: 'readback',
        message: edge_back.ok ? 'edge missing' : readMessage(edge_back)
      });
      continue;
    }
    edges.push(dependent);
  }
  return {
    outcome: failed_edges.length > 0 ? 'partial' : 'applied',
    reason: null,
    status: target,
    write_applied: true,
    target,
    pr_state: judged.pr_state,
    edges,
    failed_edges,
    skipped_edges
  };
}
