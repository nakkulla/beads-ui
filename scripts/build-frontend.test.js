import { build } from 'esbuild';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { afterEach, expect, test } from 'vitest';
import {
  createBuildOptions,
  normalizeSourceMapFile,
  normalizeSourceMapText
} from './build-frontend.js';

/**
 * The installed `node_modules` this test run actually resolves through, which
 * is not always `<cwd>/node_modules`: the Worker runs verification inside a
 * detached worktree that has no dependencies of its own and resolves upward.
 * Linking a directory that does not exist there would fail the bundle instead
 * of exercising the symlink behaviour under test.
 */
function installedNodeModules() {
  const entry = createRequire(import.meta.url).resolve('ms');
  const marker = `${path.sep}node_modules${path.sep}`;
  const at = entry.lastIndexOf(marker);

  return entry.slice(0, at + marker.length - 1);
}

/** @type {string[]} */
const temporary_roots = [];

afterEach(() => {
  for (const root of temporary_roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('keeps symlinked dependencies relative to the checkout in source maps', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-build-'));
  temporary_roots.push(root);
  const app_dir = path.join(root, 'app');
  fs.mkdirSync(app_dir);
  fs.writeFileSync(
    path.join(app_dir, 'main.js'),
    "import ms from 'ms'; console.log(ms(1000));\n"
  );
  fs.symlinkSync(
    installedNodeModules(),
    path.join(root, 'node_modules'),
    'dir'
  );
  const outfile = path.join(app_dir, 'main.bundle.js');

  await build(createBuildOptions(path.join(app_dir, 'main.js'), outfile));

  /** @type {{ sources: string[] }} */
  const source_map = JSON.parse(fs.readFileSync(`${outfile}.map`, 'utf8'));
  expect(source_map.sources).toContain('../node_modules/ms/index.js');
  expect(source_map.sources.some((source) => source.startsWith('../..'))).toBe(
    false
  );
});

test('collapses upward node_modules prefixes so the map does not depend on build depth', () => {
  const text =
    '{"sources": ["data/a.js", "../../../../node_modules/ms/index.js", "../node_modules/debug/src/common.js"]}';

  expect(normalizeSourceMapText(text)).toBe(
    '{"sources": ["data/a.js", "../node_modules/ms/index.js", "../node_modules/debug/src/common.js"]}'
  );
});

test('a worktree resolving node_modules upward emits the same map as a local install', async () => {
  // root/node_modules is the only install; the checkout lives two levels down,
  // which is the detached-worktree shape (`<repo>/.worktrees/<name>/app`).
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-build-'));
  temporary_roots.push(root);
  fs.symlinkSync(
    installedNodeModules(),
    path.join(root, 'node_modules'),
    'dir'
  );
  const checkout = path.join(root, '.worktrees', 'wt');
  const app_dir = path.join(checkout, 'app');
  fs.mkdirSync(app_dir, { recursive: true });
  fs.writeFileSync(
    path.join(app_dir, 'main.js'),
    "import ms from 'ms'; console.log(ms(1000));\n"
  );
  const outfile = path.join(app_dir, 'main.bundle.js');

  await build(createBuildOptions(path.join(app_dir, 'main.js'), outfile));
  normalizeSourceMapFile(`${outfile}.map`);

  /** @type {{ sources: string[] }} */
  const source_map = JSON.parse(fs.readFileSync(`${outfile}.map`, 'utf8'));
  expect(source_map.sources).toContain('../node_modules/ms/index.js');
  expect(source_map.sources.some((source) => source.startsWith('../..'))).toBe(
    false
  );
});
