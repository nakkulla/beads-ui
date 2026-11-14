import nodeFs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';
import { retainedSets } from '../ws/snapshot-retention.js';
import { repoOperationArchivePath } from './state-paths.js';

/** @import { Queue, RepoOperation } from './queue-store.js' */

const ARCHIVE_AGE_MS = 30 * 86_400_000;
const log = debug('worker:repo-operation-archive');

/**
 * Values can name operations; bead references can also be dictionary keys.
 * `done` contributes operation values but never retains a bead by itself.
 *
 * @param {unknown} value
 * @param {Set<string>} operation_values
 * @param {Set<string>|null} bead_references
 */
function collectReferences(value, operation_values, bead_references) {
  if (typeof value === 'string') {
    operation_values.add(value);
    bead_references?.add(value);
  } else if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      bead_references?.add(key);
      collectReferences(child, operation_values, bead_references);
    }
  }
}

/**
 * @param {RepoOperation} operation
 * @param {number} cutoff
 */
function isCandidate(operation, cutoff) {
  return (
    operation.state === 'succeeded' &&
    typeof operation.finished_at === 'number' &&
    Number.isFinite(operation.finished_at) &&
    operation.finished_at < cutoff
  );
}

/**
 * Keep every live judgment input, then close both directions of retry and
 * supersede links. Non-candidates remain in the queue and seed that closure too.
 *
 * @param {Queue} queue
 * @param {number} at
 * @returns {string[]}
 */
function archiveOperationIds(queue, at) {
  const entries = Object.entries(queue.repo_operations);
  const retained = retainedSets(queue, at).operations;
  /** @type {Set<string>} */
  const operation_values = new Set();
  /** @type {Set<string>} */
  const bead_references = new Set();
  for (const [collection, value] of Object.entries(queue)) {
    if (
      collection !== 'repo_operations' &&
      value &&
      typeof value === 'object'
    ) {
      collectReferences(
        value,
        operation_values,
        collection === 'done' ? null : bead_references
      );
    }
  }
  /** @type {Set<string>} */
  const uncovered = new Set();
  /** @type {Map<string, [string, RepoOperation]>} */
  const latest = new Map();
  /** @type {Map<string, string>} */
  const last_inserted = new Map();
  for (const [operation_id, operation] of entries) {
    const group = JSON.stringify([operation.repo_id, operation.kind]);
    // The coordinator's coverage sweeps exclude only superseded failures,
    // including dismissed failures and ones with recovery/handoff evidence.
    if (operation.state === 'failed' && !operation.superseded_by) {
      uncovered.add(group);
    }
    const source_group = JSON.stringify([
      operation.repo_id,
      operation.kind,
      operation.source
    ]);
    const previous = latest.get(source_group);
    if (!previous || operation.requested_at >= previous[1].requested_at) {
      latest.set(source_group, [operation_id, operation]);
    }
    // Manual deploy readers use .at(-1), so clock rollback must not change
    // their lookup even if timestamp order and insertion order disagree.
    last_inserted.set(source_group, operation_id);
  }
  for (const [operation_id] of latest.values()) {
    retained.add(operation_id);
  }
  for (const operation_id of last_inserted.values()) {
    retained.add(operation_id);
  }
  const cutoff = at - ARCHIVE_AGE_MS;
  for (const [operation_id, operation] of entries) {
    if (
      !isCandidate(operation, cutoff) ||
      operation_values.has(operation_id) ||
      operation.subjects.some((subject) =>
        bead_references.has(subject.bead_id)
      ) ||
      operation.recovery ||
      uncovered.has(JSON.stringify([operation.repo_id, operation.kind]))
    ) {
      retained.add(operation_id);
    }
  }
  let grew = true;
  while (grew) {
    grew = false;
    for (const [operation_id, operation] of entries) {
      for (const linked_id of [operation.retry_of, operation.superseded_by]) {
        if (!linked_id || !Object.hasOwn(queue.repo_operations, linked_id)) {
          continue;
        }
        if (retained.has(operation_id) || retained.has(linked_id)) {
          const size = retained.size;
          retained.add(operation_id);
          retained.add(linked_id);
          grew = grew || retained.size > size;
        }
      }
    }
  }
  return entries
    .filter(([operation_id]) => !retained.has(operation_id))
    .map(([operation_id]) => operation_id);
}

/**
 * Append before removal without yielding between snapshot, append and mutation.
 * A failed append or queue persist keeps the queue for the next daily retry;
 * duplicate archive lines after an interrupted pass are identified by operation_id.
 *
 * @param {{ workspace_root: string, store: Pick<ReturnType<typeof import('./queue-store.js').createQueueStore>, 'snapshot'|'removeArchivedRepoOperations'>, fs?: Pick<typeof nodeFs, 'mkdirSync'|'appendFileSync'>, now?: () => number }} deps
 */
export function createRepoOperationArchive(deps) {
  const { workspace_root, store } = deps;
  const fs = deps.fs || nodeFs;
  const now = deps.now || Date.now;
  return {
    sweep() {
      try {
        const queue = store.snapshot(workspace_root);
        const operation_ids = archiveOperationIds(queue, now());
        if (operation_ids.length === 0) {
          return { archived: 0 };
        }
        const file = repoOperationArchivePath(workspace_root);
        const lines = operation_ids.map((operation_id) =>
          JSON.stringify({
            operation_id,
            ...queue.repo_operations[operation_id]
          })
        );
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.appendFileSync(file, `${lines.join('\n')}\n`, 'utf8');
        const result = store.removeArchivedRepoOperations(workspace_root, {
          operation_ids
        });
        return { archived: result.ok ? operation_ids.length : 0 };
      } catch (err) {
        log(
          'repo-operation archive pass failed for %s: %o',
          workspace_root,
          err
        );
        return { archived: 0 };
      }
    }
  };
}
