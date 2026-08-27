#!/usr/bin/env node
/**
 * Build the browser bundle for the UI using esbuild.
 *
 * - Produces `app/main.bundle.js` with an external source map.
 * - Minifies in production builds.
 * - Keeps ESM output targeting modern browsers.
 *
 * @import { BuildOptions } from 'esbuild'
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { debug } from '../server/logging.js';

/**
 * @param {string} entry
 * @param {string} outfile
 * @returns {BuildOptions}
 */
export function createBuildOptions(entry, outfile) {
  return {
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2020',
    outfile,
    sourcemap: true,
    // Keep source paths independent of a worktree's node_modules symlink target.
    preserveSymlinks: true,
    minify: true,
    legalComments: 'none'
  };
}

/**
 * Make the source map independent of WHERE the bundle was built.
 *
 * A detached worktree with no `node_modules` of its own resolves dependencies
 * upward to the repository root, so esbuild records them as
 * `../../../../node_modules/<pkg>/…`, while the deploy script's fresh
 * `npm ci` inside the same tree records `../node_modules/<pkg>/…`. The two
 * maps carry identical content and differ only in that prefix, and the
 * tracked-clean check after deploy fails on the byte difference. Collapse
 * every `(../)+node_modules/` run to the checkout-local `../node_modules/`
 * shape so both builds emit the same bytes.
 *
 * @param {string} text - raw source map text as esbuild wrote it
 * @returns {string}
 */
export function normalizeSourceMapText(text) {
  return text.replace(/"(?:\.\.\/)+node_modules\//g, '"../node_modules/');
}

/**
 * @param {string} map_path
 */
export function normalizeSourceMapFile(map_path) {
  const before = readFileSync(map_path, 'utf8');
  const after = normalizeSourceMapText(before);
  if (after !== before) {
    writeFileSync(map_path, after);
  }
}

/**
 * Build frontend bundle to `app/main.bundle.js` using esbuild.
 */
async function run() {
  const log = debug('build');
  // Resolve repo root regardless of where this script is launched from
  const this_file = fileURLToPath(new URL(import.meta.url));
  const repo_root = path.resolve(path.dirname(this_file), '..');
  const app_dir = path.join(repo_root, 'app');
  const entry = path.join(app_dir, 'main.js');
  const outfile = path.join(app_dir, 'main.bundle.js');

  // Ensure output directory exists when running from a fresh checkout
  mkdirSync(app_dir, { recursive: true });

  const options = createBuildOptions(entry, outfile);

  try {
    const esbuild = await import('esbuild');
    await esbuild.build(options);
    normalizeSourceMapFile(`${outfile}.map`);
    log('built %s', path.relative(repo_root, outfile));
  } catch (err) {
    log('bundle error %o', err);
    process.exitCode = 1;
  }
}

const script_path = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === script_path) {
  run();
}
