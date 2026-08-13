/**
 * Materialize the previous policy's exact executable outside the repository.
 */
import { execFile } from 'node:child_process';
import crypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { workspaceStateDir } from './state-paths.js';

/**
 * Byte-exact blob read by content address: `git cat-file blob <sha>` with a
 * Buffer pipe, so non-UTF-8 executable bytes survive untouched.
 *
 * @param {string} repo
 * @param {string} blob_sha
 * @returns {Promise<Buffer|null>}
 */
function readBlobBuffer(repo, blob_sha) {
  return new Promise((resolve) => {
    execFile(
      'git',
      ['cat-file', 'blob', blob_sha],
      { cwd: repo, encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 },
      (error, stdout) => {
        resolve(error ? null : stdout);
      }
    );
  });
}

/**
 * @param {Buffer} bytes
 */
function gitBlobSha(bytes) {
  return crypto
    .createHash('sha1')
    .update(`blob ${bytes.length}\0`)
    .update(bytes)
    .digest('hex');
}

/**
 * @param {{ fs?: typeof import('node:fs'), stateDir?: typeof workspaceStateDir, readBlob?: typeof readBlobBuffer }} [deps]
 */
export function createRepoOperationTransitionLauncher(deps = {}) {
  const fs = deps.fs || nodeFs;
  const state_dir = deps.stateDir || workspaceStateDir;
  const readBlob = deps.readBlob || readBlobBuffer;

  /**
   * @param {{ workspace: string, repo: string, operation_id: string, blob_sha: string, mode: string }} input
   */
  async function materialize(input) {
    const bytes = await readBlob(input.repo, input.blob_sha);
    if (!bytes || gitBlobSha(bytes) !== input.blob_sha.toLowerCase()) {
      return { ok: false, code: 'repo_ops_transition_materialize_failed' };
    }
    const directory = path.join(
      state_dir(input.workspace),
      'repo-ops-transition'
    );
    const file = path.join(directory, `${input.operation_id}.script`);
    fs.mkdirSync(directory, { recursive: true });
    const temporary = `${file}.tmp`;
    fs.writeFileSync(temporary, bytes, {
      mode: input.mode === '100755' ? 0o755 : 0o644
    });
    fs.renameSync(temporary, file);
    fs.chmodSync(file, input.mode === '100755' ? 0o755 : 0o644);
    return { ok: true, path: file };
  }

  /**
   * @param {string} workspace
   * @param {string} operation_id
   */
  function reclaim(workspace, operation_id) {
    const file = path.join(
      state_dir(workspace),
      'repo-ops-transition',
      `${operation_id}.script`
    );
    try {
      fs.unlinkSync(file);
    } catch {
      // Terminal cleanup is best-effort; it never touches the repository.
    }
  }

  return { materialize, reclaim };
}
