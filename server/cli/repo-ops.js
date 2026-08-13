/**
 * Approved bootstrap request handoff. This command deliberately never opens or
 * writes the Worker queue file; it communicates only through the spool.
 */
import crypto from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync
} from 'node:fs';
import path from 'node:path';
import {
  repoOpsSpoolPendingDir,
  repoOpsSpoolProcessedDir
} from '../worker/state-paths.js';

/**
 * @param {string[]} args
 */
function optionMap(args) {
  /** @type {Record<string, string>} */
  const options = {};
  for (let index = 0; index < args.length; index += 1) {
    if (args[index].startsWith('--') && typeof args[index + 1] === 'string') {
      options[args[index].slice(2)] = args[index + 1];
      index += 1;
    }
  }
  return options;
}

/**
 * @param {string[]} args
 * @param {{ write: (text: string) => unknown }} out_stream
 */
export async function runRepoOpsBootstrap(args, out_stream = process.stdout) {
  const options = optionMap(args);
  const repo = options.repo;
  const target_base = options['target-base'];
  const approved_source_path = options['approved-source-path'];
  const approved_source_sha = options['approved-source-sha'];
  const requested_by = options['requested-by'];
  if (
    !repo ||
    !target_base ||
    !approved_source_path ||
    !/^[0-9a-f]{40}$/i.test(approved_source_sha || '') ||
    !requested_by
  ) {
    out_stream.write('bootstrap approval basis is required\n');
    return 2;
  }
  const workspace = path.resolve(repo);
  const request_id = crypto.randomUUID();
  const request = {
    request_id,
    repo: workspace,
    target_base,
    approved_source_path,
    approved_source_sha: approved_source_sha.toLowerCase(),
    requested_by,
    requested_at: Date.now()
  };
  const pending = repoOpsSpoolPendingDir(workspace);
  mkdirSync(pending, { recursive: true });
  const destination = path.join(pending, `${request_id}.json`);
  const temporary = `${destination}.tmp`;
  writeFileSync(temporary, JSON.stringify(request));
  renameSync(temporary, destination);
  const receipt = path.join(
    repoOpsSpoolProcessedDir(workspace),
    `${request_id}.receipt.json`
  );
  const deadline = Date.now() + 5_000;
  while (Date.now() < deadline) {
    if (existsSync(receipt)) {
      out_stream.write(`${readFileSync(receipt, 'utf8')}\n`);
      return 0;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  out_stream.write(
    JSON.stringify({ ok: true, pending: true, request_id }) + '\n'
  );
  return 0;
}
