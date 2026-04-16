/**
 * @import { Request, Response, Router } from 'express'
 */
import express from 'express';
import { readWorkerSpec } from '../worker/spec-reader.js';
import { writeWorkerSpec } from '../worker/spec-writer.js';

/**
 * @param {{ root_dir: string }} options
 * @returns {Router}
 */
export function createWorkerSpecRouter(options) {
  const router = express.Router();

  /**
   * @param {unknown} error
   * @returns {number}
   */
  function statusForError(error) {
    const code =
      error && typeof error === 'object' && 'code' in error
        ? /** @type {{ code?: unknown }} */ (error).code
        : '';
    if (code === 'forbidden') {
      return 403;
    }
    if (code === 'no_spec' || code === 'not_found') {
      return 404;
    }
    return 500;
  }

  /**
   * @param {Request} req
   */
  function resolveRootDir(req) {
    const workspace = req.query.workspace;
    return typeof workspace === 'string' && workspace.length > 0
      ? workspace
      : options.root_dir;
  }

  router.get('/:issueId', async (req, res) => {
    try {
      const result = await readWorkerSpec({
        issue_id: req.params.issueId,
        root_dir: resolveRootDir(req)
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(statusForError(error)).json({
        error:
          error instanceof Error ? error.message : 'Failed to read worker spec'
      });
    }
  });

  router.put('/:issueId', async (req, res) => {
    const content = req.body?.content;
    if (typeof content !== 'string') {
      res.status(400).json({ error: 'Missing content' });
      return;
    }
    try {
      const result = await writeWorkerSpec({
        issue_id: req.params.issueId,
        root_dir: resolveRootDir(req),
        content
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(statusForError(error)).json({
        error:
          error instanceof Error ? error.message : 'Failed to write worker spec'
      });
    }
  });

  return router;
}
