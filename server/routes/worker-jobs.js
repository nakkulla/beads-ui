/**
 * @import { Request, Router } from 'express'
 */
import express from 'express';
import { getWorkerJobManager } from '../worker/jobs.js';

/**
 * @param {Request} req
 */
function resolveWorkspace(req) {
  const workspace =
    typeof req.query.workspace === 'string'
      ? req.query.workspace
      : req.body?.workspace;
  return typeof workspace === 'string' ? workspace : '';
}

/**
 * @returns {Router}
 */
export function createWorkerJobsRouter() {
  const router = express.Router();

  router.get('/', (req, res) => {
    const manager = getWorkerJobManager();
    res.status(200).json({
      items: manager.listJobs({ workspace: resolveWorkspace(req) || undefined })
    });
  });

  router.post('/', async (req, res) => {
    const manager = getWorkerJobManager();
    const workspace = resolveWorkspace(req);
    const { command, issueId, prNumber } = req.body || {};
    if (
      typeof command !== 'string' ||
      (command !== 'bd-ralph-v2' && command !== 'pr-review') ||
      !workspace
    ) {
      res.status(400).json({ error: 'Invalid worker job request' });
      return;
    }
    try {
      const result = await manager.enqueueJob({
        command,
        issueId: typeof issueId === 'string' ? issueId : undefined,
        workspace,
        prNumber: typeof prNumber === 'number' ? prNumber : undefined
      });
      res.status(202).json(result);
    } catch (error) {
      const code =
        error && typeof error === 'object' && 'code' in error
          ? /** @type {{ code?: unknown }} */ (error).code
          : '';
      res.status(code === 'conflict' ? 409 : 500).json({
        error: error instanceof Error ? error.message : 'Failed to enqueue job'
      });
    }
  });

  return router;
}
