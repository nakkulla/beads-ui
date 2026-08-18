/**
 * @import { Request, Response } from 'express'
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { workerAnalysisContext } from '../worker/attach.js';
import { repoOpsDisplayFor } from '../worker/repo-ops-display.js';
import { resolveRepoOps } from '../worker/repo-ops-resolver.js';

const MAX_SCRIPT_BYTES = 200_000;

/**
 * @param {unknown} value
 */
function isSha(value) {
  return typeof value === 'string' && /^[0-9a-f]{40}$/i.test(value);
}

/**
 * @param {Response} response
 * @param {400|403|404|409|413|415} status
 * @param {'bad_request'|'forbidden'|'lane_not_declared'|'stale_declaration'|'too_large'|'unsupported_content'|'unreadable'} error
 */
function sendError(response, status, error) {
  response.status(status).json({ ok: false, error });
}

/**
 * Read one resolver-verified Git blob as raw bytes. No request value reaches
 * these argv positions.
 *
 * @param {string} repo
 * @param {string} blob_sha
 * @returns {Promise<{ ok: true, content: Buffer }|{ ok: false }>}
 */
function readGitBlob(repo, blob_sha) {
  return new Promise((resolve) => {
    const child = spawn('git', ['cat-file', 'blob', blob_sha], {
      cwd: repo,
      stdio: ['ignore', 'pipe', 'ignore']
    });
    /** @type {Buffer[]} */
    const chunks = [];
    let byte_length = 0;
    let settled = false;

    /** @param {{ ok: true, content: Buffer }|{ ok: false }} result */
    function finish(result) {
      if (settled) {
        return;
      }
      settled = true;
      resolve(result);
    }

    child.stdout.on('data', (/** @type {Buffer} */ chunk) => {
      byte_length += chunk.length;
      if (byte_length > MAX_SCRIPT_BYTES) {
        child.kill();
        finish({ ok: false });
        return;
      }
      chunks.push(chunk);
    });
    child.on('error', () => finish({ ok: false }));
    child.on('close', (code) => {
      if (code !== 0 || byte_length > MAX_SCRIPT_BYTES) {
        finish({ ok: false });
        return;
      }
      finish({ ok: true, content: Buffer.concat(chunks, byte_length) });
    });
  });
}

/**
 * Handle GET /api/repo-ops-script for one pinned repository-operation script.
 *
 * @param {Request} request
 * @param {Response} response
 */
export async function repoOpsScriptHandler(request, response) {
  response.set('Cache-Control', 'no-store');
  const workspace =
    typeof request.query.workspace === 'string' ? request.query.workspace : '';
  if (!workspace || !path.isAbsolute(workspace)) {
    sendError(response, 400, 'bad_request');
    return;
  }

  const resolved_workspace = path.resolve(workspace);
  const allowed_workspaces = new Set(
    getAvailableWorkspaces().map((entry) => path.resolve(entry.path))
  );
  if (!allowed_workspaces.has(resolved_workspace)) {
    sendError(response, 403, 'forbidden');
    return;
  }

  const lane = request.query.lane;
  const base_sha = request.query.base_sha;
  if (
    (lane !== 'verify' && lane !== 'deploy') ||
    typeof base_sha !== 'string' ||
    !isSha(base_sha)
  ) {
    sendError(response, 400, 'bad_request');
    return;
  }

  const display = repoOpsDisplayFor(resolved_workspace);
  if (
    display.status !== 'resolved' ||
    typeof display.base_sha !== 'string' ||
    display.base_sha.toLowerCase() !== base_sha.toLowerCase()
  ) {
    sendError(response, 409, 'stale_declaration');
    return;
  }

  const context = workerAnalysisContext(resolved_workspace);
  if (!context) {
    sendError(response, 404, 'unreadable');
    return;
  }

  const resolution = await resolveRepoOps({
    repo: context.repo,
    sha: base_sha,
    gitRun: context.gitRun
  });
  if (resolution.ok === false) {
    sendError(response, 404, 'unreadable');
    return;
  }
  const declaration = resolution[lane];
  if (!declaration) {
    sendError(response, 404, 'lane_not_declared');
    return;
  }
  if (typeof declaration.blob_sha !== 'string') {
    sendError(response, 404, 'unreadable');
    return;
  }
  const blob_sha = declaration.blob_sha;

  const size_result = await context.gitRun(['cat-file', '-s', blob_sha], {
    cwd: context.repo
  });
  if (size_result.code !== 0 || !/^\d+$/.test(size_result.stdout.trim())) {
    sendError(response, 404, 'unreadable');
    return;
  }
  const byte_length = Number(size_result.stdout.trim());
  if (byte_length > MAX_SCRIPT_BYTES) {
    sendError(response, 413, 'too_large');
    return;
  }

  const blob = await readGitBlob(context.repo, blob_sha);
  if (!blob.ok || blob.content.length !== byte_length) {
    sendError(response, 404, 'unreadable');
    return;
  }
  if (blob.content.includes(0)) {
    sendError(response, 415, 'unsupported_content');
    return;
  }

  let content;
  try {
    // `ignoreBOM` keeps a leading U+FEFF in the decoded string: the popup and its
    // copy must be the blob verbatim, and the default decoder would eat it.
    content = new TextDecoder('utf-8', {
      fatal: true,
      ignoreBOM: true
    }).decode(blob.content);
  } catch {
    sendError(response, 415, 'unsupported_content');
    return;
  }

  response.status(200).json({
    ok: true,
    lane,
    path: declaration.script,
    base_ref: resolution.base,
    base_sha,
    blob_sha,
    mode: declaration.mode,
    timeout_ms: declaration.timeout_ms,
    content
  });
}
