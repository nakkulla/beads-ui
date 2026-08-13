/**
 * Materialize the previous policy's exact executable outside the repository.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { workspaceStateDir } from './state-paths.js';

/**
 * @param {{ fs?: typeof import('node:fs'), stateDir?: typeof workspaceStateDir }} [deps]
 */
export function createRepoOperationTransitionLauncher(deps = {}) {
  const fs = deps.fs || nodeFs;
  const state_dir = deps.stateDir || workspaceStateDir;

  /**
   * @param {{ workspace: string, repo: string, operation_id: string, base_sha: string, script: string, mode: string, gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }> }} input
   */
  async function materialize(input) {
    const result = await input.gitRun(
      ['show', `${input.base_sha}:${input.script}`],
      { cwd: input.repo }
    );
    if (result.code !== 0)
      return { ok: false, code: 'repo_ops_transition_materialize_failed' };
    const directory = path.join(
      state_dir(input.workspace),
      'repo-ops-transition'
    );
    const file = path.join(directory, `${input.operation_id}.script`);
    fs.mkdirSync(directory, { recursive: true });
    const temporary = `${file}.tmp`;
    fs.writeFileSync(temporary, result.stdout, {
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
