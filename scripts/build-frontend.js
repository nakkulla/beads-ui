#!/usr/bin/env node
/**
 * Build the browser bundle for the UI using esbuild.
 *
 * - Produces `app/main.bundle.js` with an external source map.
 * - Minifies in production builds.
 * - Keeps ESM output targeting modern browsers.
 * - Writes a gzip `<file>.gz` next to every `.js`/`.css` under `app/`.
 *
 * @import { BuildOptions } from 'esbuild'
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
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
 * Pre-compress every `.js`/`.css` file under `dir` (recursively, test files
 * excluded) into a `<file>.gz` sibling, so the server can answer gzip requests
 * without compressing per request (UI-j2h3 §4.5). The file set is discovered at
 * build time rather than listed, so renamed or split stylesheets stay covered.
 *
 * @param {string} dir
 * @returns {string[]} absolute paths of the written `.gz` files
 */
export function writeGzipAssets(dir) {
  /** @type {string[]} */
  const written = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const entry_path = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') {
        continue;
      }
      written.push(...writeGzipAssets(entry_path));
      continue;
    }
    if (!entry.isFile() || !/\.(?:js|css)$/.test(entry.name)) {
      continue;
    }
    if (entry.name.endsWith('.test.js')) {
      continue;
    }
    const gz_path = `${entry_path}.gz`;
    writeFileSync(
      gz_path,
      zlib.gzipSync(readFileSync(entry_path), { level: 9 })
    );
    written.push(gz_path);
  }
  return written;
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
    const gz_files = writeGzipAssets(app_dir);
    log('wrote %d gzip assets', gz_files.length);
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
