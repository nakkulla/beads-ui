import { build } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, expect, test } from 'vitest';
import { createBuildOptions } from './build-frontend.js';

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
    path.join(process.cwd(), 'node_modules'),
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
