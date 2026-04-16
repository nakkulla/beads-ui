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

  router.get('/', (req, res) => {
    const manager = getWorkerJobManager();
    res.status(200).json({
      items: manager.listJobs({
        workspace: resolveWorkspace(req, options.root_dir) || undefined
      })
    });
  });

  router.post('/', async (req, res) => {
    const manager = getWorkerJobManager();
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
