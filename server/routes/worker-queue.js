/**
 * @import { Router } from 'express'
 */
import express from 'express';
import { getWorkerJobManager } from '../worker/jobs.js';
import { resolveWorkspace } from './worker-jobs.js';

/**
 * @param {{ root_dir: string }} options
 * @returns {Router}
 */
export function createWorkerQueueRouter(options) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const manager = getWorkerJobManager({ root_dir: options.root_dir });
    const workspace = resolveWorkspace(req, options.root_dir);
    if (!workspace) {
      res
        .status(400)
        .json({ error: 'Invalid worker queue request: workspace' });
      return;
    }
    try {
      const snapshot = await manager.getQueueSnapshot({ workspace });
      res.status(200).json(snapshot);
    } catch (error) {
      sendError(res, error);
    }
  });

  router.get('/events', async (req, res) => {
    const manager = getWorkerJobManager({ root_dir: options.root_dir });
    const workspace = resolveWorkspace(req, options.root_dir);
    if (!workspace) {
      res
        .status(400)
        .json({ error: 'Invalid worker queue request: workspace' });
      return;
    }
    const since =
      typeof req.query.since === 'string'
        ? Number.parseInt(req.query.since, 10)
        : 0;
    try {
      const items = await manager.listWorkerEvents({
        workspace,
        since: Number.isFinite(since) ? since : 0
      });
      res.status(200).json({ items });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.post('/move', async (req, res) => {
    await forwardQueuePost(req, res, options.root_dir, 'moveCard', {
      issueId: req.body?.issueId,
      fromLane: req.body?.fromLane,
      toLane: req.body?.toLane,
      beforeId: req.body?.beforeId ?? null,
      afterId: req.body?.afterId ?? null
    });
  });

  router.post('/overrides', async (req, res) => {
    await forwardQueuePost(req, res, options.root_dir, 'setWorkerOverrides', {
      issueId: req.body?.issueId,
      values: req.body?.values || {}
    });
  });

  router.post('/pause', async (req, res) => {
    await forwardQueuePost(req, res, options.root_dir, 'setPaused', {
      paused: req.body?.paused === true
    });
  });

  router.post('/start', async (req, res) => {
    await forwardQueuePost(req, res, options.root_dir, 'startGoal', {
      issueId: req.body?.issueId
    });
  });

  router.post('/finish-now', async (req, res) => {
    await forwardQueuePost(req, res, options.root_dir, 'finishNow', {
      issueId: req.body?.issueId
    });
  });

  router.post('/cancel-auto-pr-finish', async (req, res) => {
    await forwardQueuePost(req, res, options.root_dir, 'cancelAutoPrFinish', {
      issueId: req.body?.issueId
    });
  });

  router.post('/run-pr-finish', async (req, res) => {
    await forwardQueuePost(req, res, options.root_dir, 'runPrFinish', {
      issueId: req.body?.issueId
    });
  });

  router.post('/skip-advance', async (req, res) => {
    await forwardQueuePost(req, res, options.root_dir, 'skipAdvance', {});
  });

  router.post('/cancel-auto-start', async (req, res) => {
    await forwardQueuePost(req, res, options.root_dir, 'cancelAutoStart', {});
  });

  return router;
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {string} root_dir
 * @param {string} method_name
 * @param {Record<string, unknown>} payload
 */
async function forwardQueuePost(req, res, root_dir, method_name, payload) {
  const manager = getWorkerJobManager({ root_dir });
  const workspace = resolveWorkspace(req, root_dir);
  if (!workspace) {
    res.status(400).json({ error: 'Invalid worker queue request: workspace' });
    return;
  }
  try {
    const method = /** @type {any} */ (manager)[method_name];
    const result = await method({ ...payload, workspace });
    res.status(200).json(result ?? { ok: true });
  } catch (error) {
    sendError(res, error);
  }
}

/**
 * @param {import('express').Response} res
 * @param {unknown} error
 */
function sendError(res, error) {
  const code =
    error && typeof error === 'object' && 'code' in error
      ? /** @type {{ code?: unknown }} */ (error).code
      : '';
  const status =
    code === 'not_found'
      ? 404
      : code === 'conflict'
        ? 409
        : code === 'unprocessable'
          ? 422
          : code === 'unavailable'
            ? 503
            : 500;
  res.status(status).json({
    error:
      error instanceof Error ? error.message : 'Failed to handle worker queue'
  });
}
