import fs from 'node:fs/promises';
import { runBdJson } from '../bd.js';
import { resolveWithinDocs } from '../path-safety.js';

/**
 * @param {{ issue_id: string, root_dir: string }} input
 */
export async function readWorkerSpec(input) {
  const result = await runBdJson(['show', input.issue_id, '--json'], {
    cwd: input.root_dir
  });
  if (result.code !== 0 || !Array.isArray(result.stdoutJson)) {
    throw Object.assign(new Error('Issue not found'), { code: 'not_found' });
  }
  const issue = result.stdoutJson[0];
  const spec_id =
    issue && typeof issue.spec_id === 'string' ? issue.spec_id : '';
  if (!spec_id) {
    throw Object.assign(new Error('No spec linked'), { code: 'no_spec' });
  }
  const resolved_path = resolveWithinDocs(input.root_dir, spec_id);
  if (!resolved_path) {
    throw Object.assign(new Error('Forbidden path'), { code: 'forbidden' });
  }
  let content = '';
  try {
    content = await fs.readFile(resolved_path, 'utf8');
  } catch (error) {
    throw Object.assign(new Error('Spec file not found'), {
      code: 'not_found',
      cause: error
    });
  }
  return {
    issue_id: input.issue_id,
    spec_id,
    content
  };
}
