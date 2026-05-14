import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/**
 * @param {{ env?: NodeJS.ProcessEnv | Record<string, string | undefined>, home_dir?: string, exists_impl?: (file_path: string) => boolean }} [options]
 */
export function checkPrFinishSkill(options = {}) {
  const env = options.env || process.env;
  const home_dir = options.home_dir || os.homedir();
  const exists_impl = options.exists_impl || fs.existsSync;
  const checked = buildCandidatePaths(env, home_dir);
  const found = checked.find((file_path) => exists_impl(file_path)) || null;
  return {
    available: Boolean(found),
    path: found,
    checked
  };
}

/**
 * @param {NodeJS.ProcessEnv | Record<string, string | undefined>} env
 * @param {string} home_dir
 */
function buildCandidatePaths(env, home_dir) {
  /** @type {string[]} */
  const roots = [];
  if (typeof env.CODEX_HOME === 'string' && env.CODEX_HOME.length > 0) {
    roots.push(env.CODEX_HOME);
  }
  if (home_dir.length > 0) {
    roots.push(path.join(home_dir, '.codex'));
  }
  if (
    typeof env.BDUI_PR_FINISH_SKILL_ROOT === 'string' &&
    env.BDUI_PR_FINISH_SKILL_ROOT.length > 0
  ) {
    roots.push(env.BDUI_PR_FINISH_SKILL_ROOT);
  }

  return Array.from(new Set(roots)).map((root) =>
    path.join(root, 'skills', 'pr-finish', 'SKILL.md')
  );
}
