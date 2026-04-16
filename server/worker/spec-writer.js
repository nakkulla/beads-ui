import fs from 'node:fs/promises';
import { runBdJson } from '../bd.js';
import { resolveWithinDocs } from '../path-safety.js';

/**
 * @param {{ issue_id: string, root_dir: string, content: string }} input
 */
export async function writeWorkerSpec(input) {
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
  await fs.writeFile(resolved_path, input.content, 'utf8');
  return {
    issue_id: input.issue_id,
    spec_id,
    content: input.content
  };
}
