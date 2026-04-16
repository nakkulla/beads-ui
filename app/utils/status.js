/**
 * Known status values in canonical order.
 *
 * @type {Array<'open'|'in_progress'|'resolved'|'closed'>}
 */
export const STATUSES = ['open', 'in_progress', 'resolved', 'closed'];

/**
 * Map canonical status to display label.
 *
 * @param {string | null | undefined} status
 * @returns {string}
 */
export function statusLabel(status) {
  switch ((status || '').toString()) {
    case 'open':
      return 'Open';
    case 'in_progress':
      return 'In progress';
    case 'resolved':
      return 'Resolved';
    case 'closed':
      return 'Closed';
    case 'queued':
      return 'Queued';
    case 'starting':
      return 'Starting';
    case 'running':
      return 'Running';
    case 'cancelling':
      return 'Cancelling';
    case 'succeeded':
      return 'Succeeded';
    case 'failed':
      return 'Failed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return (status || '').toString() || 'Open';
  }
}
