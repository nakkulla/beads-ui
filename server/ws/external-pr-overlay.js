/**
 * Overlay registry and merge-queue rows without changing the durable snapshot.
 * Durable PR-wait, done and queued beads take precedence; registry rows take
 * precedence over merge-queue rows. Worktree presence is decorated by the
 * screen caller and does not affect retention.
 *
 * @param {Record<string, unknown>} queue
 * @param {import('../worker/external-pr.js').ExternalPrRow[]} rows
 * @returns {Record<string, unknown>}
 */
export function overlayExternalPrWait(queue, rows) {
  const merge_queue = Array.isArray(queue.merge_queue)
    ? /** @type {any[]} */ (queue.merge_queue)
    : [];
  // Keep the shared snapshot when neither source contributes a row.
  if (rows.length === 0 && merge_queue.length === 0) {
    return queue;
  }
  const lane = Array.isArray(queue.pr_wait)
    ? /** @type {any[]} */ (queue.pr_wait)
    : [];
  const done_lane = Array.isArray(queue.done)
    ? /** @type {any[]} */ (queue.done)
    : [];
  const queue_lane = Array.isArray(queue.queue)
    ? /** @type {any[]} */ (queue.queue)
    : [];
  const durable = new Set(
    [...lane, ...done_lane, ...queue_lane].map((e) => e && e.bead_id)
  );
  /** @type {Set<string>} */
  const emitted = new Set();
  /** @type {Array<{ bead_id: string, added_at: number|null, external: true, wt_present: boolean, foreign?: boolean, repo_slug?: string, pr_url?: string, pr_number?: number, foreign_target?: { slug: string, repo_name: string } }>} */
  const overlay = [];
  for (const row of rows) {
    if (durable.has(row.bead_id) || emitted.has(row.bead_id)) {
      continue;
    }
    emitted.add(row.bead_id);
    overlay.push({
      bead_id: row.bead_id,
      added_at: row.added_at,
      external: true,
      wt_present: false,
      // Absent PR facts remain absent rather than being invented for display.
      ...(row.foreign === true ? { foreign: true } : {}),
      ...(typeof row.repo_slug === 'string' && row.repo_slug.length > 0
        ? { repo_slug: row.repo_slug }
        : {}),
      ...(typeof row.pr_url === 'string' && row.pr_url.length > 0
        ? { pr_url: row.pr_url }
        : {}),
      ...(typeof row.pr_number === 'number' && Number.isFinite(row.pr_number)
        ? { pr_number: row.pr_number }
        : {}),
      ...(row.foreign_target
        ? {
            foreign_target: {
              slug: row.foreign_target.slug,
              repo_name: row.foreign_target.repo_name
            }
          }
        : {})
    });
  }
  for (const entry of merge_queue) {
    const bead_id = entry && entry.bead_id;
    if (
      typeof bead_id !== 'string' ||
      bead_id.length === 0 ||
      durable.has(bead_id) ||
      emitted.has(bead_id)
    ) {
      continue;
    }
    emitted.add(bead_id);
    const granted_at = entry.authority && entry.authority.granted_at;
    // A merge-queue-only row carries no registry PR facts (UI-kyky §6.1).
    overlay.push({
      bead_id,
      added_at:
        typeof granted_at === 'number' && Number.isFinite(granted_at)
          ? granted_at
          : null,
      external: true,
      wt_present: false
    });
  }
  if (overlay.length === 0) {
    return queue;
  }
  return { ...queue, pr_wait: [...lane, ...overlay] };
}
