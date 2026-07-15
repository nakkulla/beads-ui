/**
 * @import { Request, Response } from 'express'
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  isSafeRelativeMarkdownPath,
  resolveRealpathWithinDocs
} from '../path-safety.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';

/** Maximum served document size (1 MiB). */
const MAX_DOC_BYTES = 1024 * 1024;

/**
 * @param {400 | 403 | 404 | 413} status
 * @returns {string}
 */
function errorCode(status) {
  switch (status) {
    case 400:
      return 'bad_request';
    case 403:
      return 'forbidden';
    case 413:
      return 'too_large';
    default:
      return 'not_found';
  }
}

/**
 * GET /api/doc?workspace=<abs>&path=<rel>
 *
 * Serves a markdown document that lives under `<workspace>/docs/`. The workspace
 * must be registered, the path must resolve (symlink-aware) inside that docs
 * directory, only `.md` files are allowed, and the file must be at most 1 MiB.
 *
 * @param {Request} req
 * @param {Response} res
 */
export function docHandler(req, res) {
  const workspace =
    typeof req.query.workspace === 'string' ? req.query.workspace : '';
  const rel = typeof req.query.path === 'string' ? req.query.path : '';

  if (
    !workspace ||
    !path.isAbsolute(workspace) ||
    !isSafeRelativeMarkdownPath(rel)
  ) {
    res.status(400).json({ ok: false, error: errorCode(400) });
    return;
  }

  const ws_resolved = path.resolve(workspace);
  const allowed = new Set(
    getAvailableWorkspaces().map((workspace_entry) =>
      path.resolve(workspace_entry.path)
    )
  );
  if (!allowed.has(ws_resolved)) {
    res.status(403).json({ ok: false, error: errorCode(403) });
    return;
  }

  const resolved = resolveRealpathWithinDocs(ws_resolved, rel);
  if (!resolved.ok) {
    res
      .status(resolved.status)
      .json({ ok: false, error: errorCode(resolved.status) });
    return;
  }

  /** @type {import('node:fs').Stats} */
  let stat;
  try {
    stat = fs.statSync(resolved.path);
  } catch {
    res.status(404).json({ ok: false, error: errorCode(404) });
    return;
  }
  if (!stat.isFile()) {
    res.status(404).json({ ok: false, error: errorCode(404) });
    return;
  }
  if (stat.size > MAX_DOC_BYTES) {
    res.status(413).json({ ok: false, error: errorCode(413) });
    return;
  }

  let content;
  try {
    content = fs.readFileSync(resolved.path, 'utf8');
  } catch {
    res.status(404).json({ ok: false, error: errorCode(404) });
    return;
  }

  res.status(200).json({ ok: true, path: rel, content });
}
