/**
 * @import { Request, Router } from 'express'
 */
import express from 'express';
import path from 'node:path';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { getWorkerJobManager } from '../worker/jobs.js';

/**
 * @param {Request} req
 * @param {string} root_dir
 */
function resolveWorkspace(req, root_dir) {
  const workspace =
    typeof req.query.workspace === 'string'
      ? req.query.workspace
      : req.body?.workspace;
  if (typeof workspace !== 'string' || workspace.length === 0) {
    return '';
  }

  const resolved = path.resolve(workspace);
  const root = path.resolve(root_dir);
  const worktrees_root = path.join(root, '.worktrees');
  const registered = getAvailableWorkspaces().some(
    (entry) => path.resolve(entry.path) === resolved
  );

  if (
    resolved === root ||
    resolved.startsWith(`${worktrees_root}${path.sep}`) ||
    registered
  ) {
    return resolved;
  }

  return '';
}

/**
 * @param {{ root_dir: string }} options
 * @returns {Router}
 */
export function createWorkerJobsRouter(options) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const manager = getWorkerJobManager({ root_dir: options.root_dir });
    const workspace = resolveWorkspace(req, options.root_dir);
    try {
      const items = await manager.listJobs({
        workspace: workspace || undefined
      });
      res.status(200).json({ items });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.get('/:jobId', async (req, res) => {
    const manager = getWorkerJobManager({ root_dir: options.root_dir });
    const workspace = resolveWorkspace(req, options.root_dir);
    if (!workspace) {
      res.status(400).json({ error: 'Invalid worker job request: workspace' });
      return;
    }
    try {
      const item = await manager.getJob({ jobId: req.params.jobId });
      if (!item || path.resolve(item.workspace) !== workspace) {
        res.status(404).json({ error: 'Worker job not found' });
        return;
      }
      res.status(200).json({ item });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.post('/', async (req, res) => {
    const manager = getWorkerJobManager({ root_dir: options.root_dir });
    const workspace = resolveWorkspace(req, options.root_dir);
    const { command, issueId, prNumber } = req.body || {};
    if (
      typeof command !== 'string' ||
      (command !== 'bd-ralph-v2' && command !== 'pr-review') ||
      !workspace
    ) {
      res.status(400).json({ error: 'Invalid worker job request: workspace' });
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
      sendError(res, error);
    }
  });

  router.post('/:jobId/cancel', async (req, res) => {
    const manager = getWorkerJobManager({ root_dir: options.root_dir });
    const workspace = resolveWorkspace(req, options.root_dir);
    if (!workspace) {
      res.status(400).json({ error: 'Invalid worker job request: workspace' });
      return;
    }
    try {
      const item = await manager.getJob({ jobId: req.params.jobId });
      if (!item || path.resolve(item.workspace) !== workspace) {
        res.status(404).json({ error: 'Worker job not found' });
        return;
      }
      const cancelled = await manager.cancelJob({ jobId: req.params.jobId });
      res.status(200).json({ item: cancelled });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.get('/:jobId/log', async (req, res) => {
    const manager = getWorkerJobManager({ root_dir: options.root_dir });
    const workspace = resolveWorkspace(req, options.root_dir);
    if (!workspace) {
      res.status(400).json({ error: 'Invalid worker job request: workspace' });
      return;
    }
    const tail =
      typeof req.query.tail === 'string'
        ? Number.parseInt(req.query.tail, 10)
        : 200;
    if (!Number.isInteger(tail) || tail < 1 || tail > 1000) {
      res.status(400).json({ error: 'Invalid worker job request: tail' });
      return;
    }
    try {
      const item = await manager.getJob({ jobId: req.params.jobId });
      if (!item || path.resolve(item.workspace) !== workspace) {
        res.status(404).json({ error: 'Worker job not found' });
        return;
      }
      const payload = await manager.getJobLog({ jobId: req.params.jobId, tail });
      res.status(200).json(payload);
    } catch (error) {
      sendError(res, error);
    }
  });

  return router;
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
    error: error instanceof Error ? error.message : 'Failed to handle worker job'
  });
}
