#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FORBIDDEN = [
  'deployment-reconciler',
  'managed-state',
  'managed-failure',
  'managed-self-deploy',
  'deployment_reconcile',
  'managed_failure',
  'BDUI_DEPLOY_PROTOCOL_VERSION',
  'BDUI_DEPLOY_RECEIPT_PATH',
  'writeRuntimeMarker',
  'readRuntimeMarker',
  'managed-deploy',
  'deploy-receipts',
  '.bdui/managed-install.json',
  'bdui/runtime/beads-ui'
];

const DELETED = [
  'server/worker/deployment-reconciler.js',
  'server/worker/managed-state.js',
  'server/worker/managed-failure.js',
  'server/worker/deployment-paths.js',
  'scripts/managed-self-deploy.js'
];

/**
 * @param {string[]} args
 */
function parseArgs(args) {
  if (args.length === 0) {
    return null;
  }
  if (
    args.length === 4 &&
    args[0] === '--repo' &&
    path.isAbsolute(args[1]) &&
    args[2] === '--ref' &&
    args[3].length > 0
  ) {
    return { repo: args[1], ref: args[3] };
  }
  throw new Error(
    'usage: check-managed-deploy-retired.js [--repo <abs> --ref <git-ref>]'
  );
}

/**
 * @param {string} root
 */
function currentFiles(root) {
  const files = [];
  for (const prefix of [
    'server',
    'app',
    'scripts',
    'docs/agents/repo-ops.toml'
  ]) {
    const absolute = path.join(root, prefix);
    if (!fs.existsSync(absolute)) {
      continue;
    }
    if (fs.statSync(absolute).isFile()) {
      files.push(prefix);
      continue;
    }
    for (const name of fs.readdirSync(absolute, { recursive: true })) {
      const candidate = path.join(absolute, String(name));
      if (fs.statSync(candidate).isFile()) {
        files.push(path.relative(root, candidate));
      }
    }
  }
  return files;
}

/**
 * @param {string} repo
 * @param {string} ref
 */
function treeFiles(repo, ref) {
  const output = execFileSync('git', ['ls-tree', '-r', '--name-only', ref], {
    cwd: repo,
    encoding: 'utf8'
  });
  return String(output)
    .split('\n')
    .filter(
      (file) =>
        file === 'docs/agents/repo-ops.toml' ||
        ['server/', 'app/', 'scripts/'].some((prefix) =>
          file.startsWith(prefix)
        )
    );
}

/**
 * @param {string} repo
 * @param {string} ref
 * @param {string} file
 */
function readTreeFile(repo, ref, file) {
  const output = execFileSync('git', ['show', `${ref}:${file}`], {
    cwd: repo,
    encoding: 'buffer',
    maxBuffer: 16 * 1024 * 1024
  });
  return Buffer.from(output).toString('utf8');
}

/**
 * @param {string} file
 */
function scannedFile(file) {
  return (
    file !== 'scripts/check-managed-deploy-retired.js' &&
    !file.startsWith('docs/superpowers/specs/') &&
    !file.startsWith('docs/superpowers/plans/') &&
    !file.startsWith('docs/superpowers/reviews/') &&
    !file.startsWith('docs/superpowers/handoffs/')
  );
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = parseArgs(process.argv.slice(2));
const files = input ? treeFiles(input.repo, input.ref) : currentFiles(root);
const tree_file_set = input ? new Set(files) : null;
const failures = [];
for (const file of files.filter(scannedFile)) {
  const text = input
    ? readTreeFile(input.repo, input.ref, file)
    : fs.readFileSync(path.join(root, file), 'utf8');
  for (const token of FORBIDDEN) {
    if (text.includes(token)) {
      failures.push(`${file}: ${token}`);
    }
  }
}
for (const file of DELETED) {
  const present = input
    ? tree_file_set?.has(file) === true
    : fs.existsSync(path.join(root, file));
  if (present) {
    failures.push(`deleted file remains: ${file}`);
  }
}
for (const file of [
  'scripts/deploy-self.js',
  'scripts/check-managed-deploy-retired.js'
]) {
  const mode = input
    ? String(
        execFileSync('git', ['ls-tree', input.ref, file], {
          cwd: input.repo,
          encoding: 'utf8'
        })
      ).slice(0, 6)
    : (fs.statSync(path.join(root, file)).mode & 0o777).toString(8);
  if (mode !== '100755' && mode !== '755') {
    failures.push(`not executable: ${file}`);
  }
}
if (failures.length > 0) {
  process.stderr.write(`${failures.join('\n')}\n`);
  process.exitCode = 1;
}
