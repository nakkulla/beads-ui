import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

/**
 * @param {string[]} args
 * @param {{ cwd: string }} options
 */
async function runGhJson(args, options) {
  try {
    const { stdout } = await execFileAsync('gh', args, {
      cwd: options.cwd
    });
    return JSON.parse(stdout || '[]');
  } catch {
    return [];
  }
}

/**
 * @param {{ issue_id: string, root_dir: string }} input
 */
export async function readIssuePullRequests(input) {
  const items = await runGhJson(
    [
      'pr',
      'list',
      '--state',
      'open',
      '--search',
      input.issue_id,
      '--json',
      'number,title,state,baseRefName,headRefName,url'
    ],
    { cwd: input.root_dir }
  );
  return { items: Array.isArray(items) ? items : [] };
}

/**
 * @param {{ root_dir: string }} input
 */
export async function readWorkspacePullRequests(input) {
  const items = await runGhJson(
    [
      'pr',
      'list',
      '--state',
      'open',
      '--json',
      'number,title,state,baseRefName,headRefName,url'
    ],
    { cwd: input.root_dir }
  );
  return { items: Array.isArray(items) ? items : [] };
}
