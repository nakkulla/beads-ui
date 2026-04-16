/**
 * @import { Request, Router } from 'express'
 */
import express from 'express';
import {
  readIssuePullRequests,
  readWorkspacePullRequests
} from '../worker/pr-reader.js';

/**
 * @param {{ root_dir: string }} options
 * @returns {Router}
 */
export function createWorkerPrsRouter(options) {
  const router = express.Router();

  /**
   * @param {Request} req
   */
  function resolveRootDir(req) {
    const workspace = req.query.workspace;
    return typeof workspace === 'string' && workspace.length > 0
      ? workspace
      : options.root_dir;
  }

  router.get('/', async (req, res) => {
    const result = await readWorkspacePullRequests({
      root_dir: resolveRootDir(req)
    });
    res.status(200).json(result);
  });

  router.get('/:issueId', async (req, res) => {
    const result = await readIssuePullRequests({
      issue_id: req.params.issueId,
      root_dir: resolveRootDir(req)
    });
    res.status(200).json(result);
  });

  return router;
}
