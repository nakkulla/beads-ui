import os from 'node:os';
import path from 'node:path';
import { workspaceSlug, workspaceStateDir } from './state-paths.js';

/**
 * @returns {string}
 */
function dataHome() {
  const xdg = process.env.XDG_DATA_HOME;
  if (typeof xdg === 'string' && xdg.trim().length > 0) {
    return path.resolve(xdg);
  }
  return path.join(os.homedir(), '.local', 'share');
}

/**
 * @param {string} value
 * @param {string} fallback
 */
function safeComponent(value, fallback) {
  const safe = String(value || fallback).replace(/[^A-Za-z0-9._-]/g, '_');
  return safe.length > 0 ? safe : fallback;
}

/**
 * @param {string} repo
 */
export function deploymentRoot(repo) {
  return path.join(dataHome(), 'bdui', 'deploy', workspaceSlug(repo));
}

/**
 * @param {string} repo
 */
export function releaseRoot(repo) {
  return path.join(deploymentRoot(repo), 'releases');
}

/**
 * @param {string} repo
 * @param {string} candidate_sha
 */
export function releasePath(repo, candidate_sha) {
  if (!/^[0-9a-f]{40}$/i.test(String(candidate_sha || ''))) {
    throw new Error('candidate_sha_invalid');
  }
  return path.join(releaseRoot(repo), candidate_sha.toLowerCase());
}

/**
 * @param {string} repo
 * @param {string} candidate_path
 */
export function isReleasePath(repo, candidate_path) {
  const root = releaseRoot(repo);
  const candidate = path.resolve(String(candidate_path || ''));
  const relative = path.relative(root, candidate);
  return (
    relative.length > 0 &&
    !relative.startsWith('..') &&
    !path.isAbsolute(relative) &&
    path.dirname(relative) === '.' &&
    /^[0-9a-f]{40}$/i.test(path.basename(relative))
  );
}

/**
 * @param {string} repo
 * @param {string} attempt_id
 */
export function deploymentReceiptPath(repo, attempt_id) {
  const safe_attempt = safeComponent(attempt_id, 'attempt');
  return path.join(
    workspaceStateDir(repo),
    'deploy-receipts',
    `${safe_attempt}.json`
  );
}
