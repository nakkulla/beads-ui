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
import { mkdirSync } from 'node:fs';
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
