import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';

/**
 * Active sources under a root. `main.bundle.js` is an untracked build output
 * (UI-47y7) — it may be absent, and when present it is not a source, so the
 * name is skipped either way.
 *
 * @param {string} root
 * @returns {string[]}
 */
function activeJavaScript(root) {
  /** @type {string[]} */
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const target = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...activeJavaScript(target));
    } else if (
      entry.name.endsWith('.js') &&
      !entry.name.endsWith('.test.js') &&
      entry.name !== 'main.bundle.js'
    ) {
      files.push(target);
    }
  }
  return files;
}

test('keeps retired home verify authority out of active source', () => {
  const files = [
    ...activeJavaScript(path.resolve('server')),
    ...activeJavaScript(path.resolve('app/views'))
  ];
  const source = files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');

  expect(source).not.toMatch(/getConfig\(\)\.worker_verify/);
  expect(source).not.toContain('resolveConfiguredVerify');
  expect(source).not.toContain('[worker.verify');
});
