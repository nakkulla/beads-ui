/**
 * Approved bootstrap request handoff. This command deliberately never writes
 * the Worker queue file; it hands the request over through the spool and then
 * only READS durable state to report the receipt and operation outcome.
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
  queueFilePath,
  repoOpsSpoolPendingDir,
  repoOpsSpoolProcessedDir
} from '../worker/state-paths.js';

const DEFAULT_WAIT_MS = 30_000;

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
 * @param {string} value
 */
function isWorkspaceRelativePath(value) {
  if (typeof value !== 'string' || value === '') return false;
  if (value.startsWith('/') || value.includes('\0')) return false;
  return !value
    .split('/')
    .some((segment) => segment === '..' || segment === '');
}

/**
 * @param {number} ms
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Read-only look at the Worker-owned queue file; the CLI never writes it.
 *
 * @param {string} workspace
 * @param {string} operation_id
 */
function readOperation(workspace, operation_id) {
  try {
    const queue = JSON.parse(readFileSync(queueFilePath(workspace), 'utf8'));
    const operation = queue?.repo_operations?.[operation_id];
    return operation && typeof operation === 'object' ? operation : null;
  } catch {
    return null;
  }
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
  const wait_ms_raw = Number.parseInt(options['wait-ms'] ?? '', 10);
  const wait_ms =
    Number.isFinite(wait_ms_raw) && wait_ms_raw >= 0
      ? wait_ms_raw
      : DEFAULT_WAIT_MS;
  if (
    !repo ||
    !target_base ||
    /\s|^-/.test(target_base) ||
    !isWorkspaceRelativePath(approved_source_path || '') ||
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
  const receipt_path = path.join(
    repoOpsSpoolProcessedDir(workspace),
    `${request_id}.receipt.json`
  );
  const deadline = Date.now() + wait_ms;
  /** @type {any} */
  let receipt = null;
  while (Date.now() < deadline) {
    if (existsSync(receipt_path)) {
      receipt = JSON.parse(readFileSync(receipt_path, 'utf8'));
      break;
    }
    await sleep(100);
  }
  if (!receipt) {
    out_stream.write(
      JSON.stringify({ ok: true, pending: true, request_id }) + '\n'
    );
    return 0;
  }
  out_stream.write(JSON.stringify(receipt) + '\n');
  if (!receipt.ok || typeof receipt.operation_id !== 'string') {
    return receipt.ok ? 0 : 1;
  }
  // Bounded read-only polling until the operation reaches a terminal state,
  // so one CLI run surfaces the durable exit/log evidence (spec §3.5).
  /** @type {any} */
  let operation = null;
  while (Date.now() < deadline) {
    operation = readOperation(workspace, receipt.operation_id);
    if (
      operation &&
      (operation.state === 'succeeded' || operation.state === 'failed')
    ) {
      break;
    }
    await sleep(200);
  }
  out_stream.write(
    JSON.stringify({
      operation_id: receipt.operation_id,
      state: operation ? operation.state : 'unknown',
      exit_code: operation ? operation.exit_code : null,
      failure: operation ? operation.failure : null,
      log_path: operation ? operation.log_path : null
    }) + '\n'
  );
  return 0;
}
