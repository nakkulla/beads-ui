import { parseSortKey } from '../../app/utils/queue-sort.js';
import { runBd, runBdJson } from '../bd.js';

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObjectTable(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 */
function resultJson(value) {
  if (isObjectTable(value) && typeof value.code === 'number') {
    if (value.code !== 0) {
      throw Object.assign(new Error(String(value.stderr || 'bd json failed')), {
        code: 'bd_failed'
      });
    }
    return value.stdoutJson;
  }
  return value;
}

/**
 * @typedef {(args: string[], options?: { cwd?: string }) => Promise<unknown>} RunBdJsonLike
 */

/**
 * @typedef {(args: string[], options?: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} RunBdLike
 */

/**
 * @param {{ cwd: string, run_bd_impl?: RunBdLike, run_bd_json_impl?: RunBdJsonLike }} options
 */
export function createQueueState(options) {
  const run_bd_impl = options.run_bd_impl || runBd;
  const run_bd_json_impl = options.run_bd_json_impl || runBdJson;
  const cwd = options.cwd;

  /**
   * @param {string[]} args
   */
  async function runUpdate(args) {
    const result = await run_bd_impl(args, { cwd });
    if (result.code !== 0) {
      throw Object.assign(
        new Error(result.stderr || result.stdout || 'bd update failed'),
        {
          code: 'bd_failed'
        }
      );
    }
    return result;
  }

  /**
   * @param {unknown} value
   * @returns {Array<Record<string, any>>}
   */
  function normalizeIssues(value) {
    if (Array.isArray(value)) {
      return value.filter((item) => item && typeof item === 'object');
    }
    return value && typeof value === 'object'
      ? [/** @type {Record<string, any>} */ (value)]
      : [];
  }

  async function listIssues() {
    const value = await run_bd_json_impl(['list', '--json'], { cwd });
    return normalizeIssues(resultJson(value));
  }

  /**
   * @returns {Promise<Array<Record<string, any> & { sort_key: number, parallel: boolean }>>}
   */
  async function listWaitingCards() {
    const issues = await listIssues();
    return issues
      .filter((issue) => issue?.metadata?.worker_lane === 'waiting')
      .map((issue) => ({
        ...issue,
        sort_key: parseSortKey(issue?.metadata?.worker_queue_sort_key),
        parallel:
          String(issue?.metadata?.worker_parallel || '').toLowerCase() ===
          'true'
      }))
      .sort(
        (a, b) =>
          a.sort_key - b.sort_key ||
          String(/** @type {any} */ (a).id).localeCompare(
            String(/** @type {any} */ (b).id)
          )
      );
  }

  return {
    listIssues,
    listWaitingCards,

    /**
     * @param {string} issue_id
     * @param {number} sort_key
     */
    async moveToWaiting(issue_id, sort_key) {
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        'worker_lane=waiting',
        '--set-metadata',
        `worker_queue_sort_key=${String(sort_key)}`
      ]);
    },

    /**
     * @param {string} issue_id
     */
    async moveToInbox(issue_id) {
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        'worker_lane=inbox',
        '--unset-metadata',
        'worker_queue_sort_key'
      ]);
    },

    /**
     * @param {string} issue_id
     */
    async moveToProgress(issue_id) {
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        'worker_lane=progress',
        '--unset-metadata',
        'worker_queue_sort_key'
      ]);
    },

    /**
     * @param {string} issue_id
     */
    async clearProgress(issue_id) {
      return runUpdate([
        'update',
        issue_id,
        '--unset-metadata',
        'worker_lane',
        '--unset-metadata',
        'worker_queue_sort_key',
        '--unset-metadata',
        'worker_pr_review_wait_started_at',
        '--unset-metadata',
        'worker_pr_review_wait_cancelled'
      ]);
    },

    /**
     * @param {string} issue_id
     * @param {string} phase
     * @param {string} job_id
     */
    async setLastJob(issue_id, phase, job_id) {
      const key =
        phase === 'pr_finish'
          ? 'worker_last_pr_finish_job_id'
          : 'worker_last_goal_job_id';
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        `${key}=${job_id}`
      ]);
    },

    /**
     * @param {string} issue_id
     * @param {string} phase
     * @param {string} session_id
     */
    async setLastSession(issue_id, phase, session_id) {
      const key =
        phase === 'pr_finish'
          ? 'worker_last_pr_finish_session_id'
          : 'worker_last_goal_session_id';
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        `${key}=${session_id}`
      ]);
    },

    /**
     * @param {string} issue_id
     * @param {string} started_at
     */
    async startReviewWait(issue_id, started_at) {
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        `worker_pr_review_wait_started_at=${started_at}`,
        '--unset-metadata',
        'worker_pr_review_wait_cancelled'
      ]);
    },

    /**
     * @param {string} issue_id
     */
    async cancelReviewWait(issue_id) {
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        'worker_pr_review_wait_cancelled=true'
      ]);
    },

    /**
     * @param {string} issue_id
     */
    async clearReviewWait(issue_id) {
      return runUpdate([
        'update',
        issue_id,
        '--unset-metadata',
        'worker_pr_review_wait_started_at',
        '--unset-metadata',
        'worker_pr_review_wait_cancelled'
      ]);
    },

    /**
     * @param {string} issue_id
     * @param {Record<string, string | undefined | null>} values
     */
    async setWorkerOverrides(issue_id, values) {
      const args = ['update', issue_id];
      for (const key of ['worker_parallel', 'worker_model', 'worker_effort']) {
        const value = values[key];
        if (typeof value === 'string' && value.length > 0) {
          args.push('--set-metadata', `${key}=${value}`);
        } else {
          args.push('--unset-metadata', key);
        }
      }
      return runUpdate(args);
    },

    /**
     * @param {string} issue_id
     */
    async getIssue(issue_id) {
      const value = await run_bd_json_impl(['show', issue_id, '--json'], {
        cwd
      });
      return normalizeIssues(resultJson(value))[0] || null;
    },

    /**
     * @param {Array<{ id: string, sort_key: number }>} cards
     */
    async rebalanceWaiting(cards) {
      for (const { id, sort_key } of cards) {
        await runUpdate([
          'update',
          id,
          '--set-metadata',
          `worker_queue_sort_key=${String(sort_key)}`
        ]);
      }
    },

    /**
     * @param {string} issue_id
     * @param {{ number: number | string, url: string } | null} pr
     */
    async cachePrLink(issue_id, pr) {
      if (!pr) {
        return runUpdate([
          'update',
          issue_id,
          '--unset-metadata',
          'pr_number',
          '--unset-metadata',
          'pr_url'
        ]);
      }
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        `pr_number=${String(pr.number)}`,
        '--set-metadata',
        `pr_url=${pr.url}`
      ]);
    }
  };
}
