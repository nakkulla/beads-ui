/**
 * `package.json#files` against the checkout (UI-dbn6 Phase 1): every declared
 * entry exists, and every stylesheet and script `app/index.html` loads is
 * declared — a moved or new screen stylesheet cannot silently drop out of the
 * published package.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

const REPO_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/** Build outputs `prepack` creates; untracked, so absent in a fresh checkout. */
const PREPACK_OUTPUTS = ['app/main.bundle.js', 'app/main.bundle.js.map'];

/** @returns {string[]} */
function declaredEntries() {
  const pkg = JSON.parse(
    readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')
  );
  return /** @type {string[]} */ (pkg.files).filter(
    (entry) => !entry.startsWith('!')
  );
}

/**
 * The repo-relative paths of the local stylesheets and scripts a page loads.
 *
 * @param {string} html
 * @returns {string[]}
 */
function pageAssets(html) {
  /** @type {string[]} */
  const refs = [];
  for (const match of html.matchAll(
    /<(?:link[^>]*\bhref|script[^>]*\bsrc)="([^"]+)"/g
  )) {
    const ref = match[1];
    if (/^[a-z]+:/i.test(ref) || ref.startsWith('//')) {
      continue;
    }
    refs.push(
      ref.startsWith('/')
        ? path.posix.join('app', ref.slice(1))
        : path.posix.join('app', ref)
    );
  }
  return refs;
}

/**
 * @param {string} target
 * @param {string[]} entries
 * @returns {boolean}
 */
function isDeclared(target, entries) {
  return entries.some(
    (entry) => entry === target || target.startsWith(`${entry}/`)
  );
}

describe('package.json#files', () => {
  test('lists only entries that exist in the checkout', () => {
    const entries = declaredEntries();

    const absent = entries.filter(
      (entry) =>
        !PREPACK_OUTPUTS.includes(entry) &&
        !existsSync(path.join(REPO_ROOT, entry))
    );

    expect(absent).toEqual([]);
  });

  test('declares every stylesheet and script app/index.html loads', () => {
    const html = readFileSync(path.join(REPO_ROOT, 'app/index.html'), 'utf8');
    const entries = declaredEntries();

    const assets = pageAssets(html);
    const missing = assets.filter((target) => !isDeclared(target, entries));

    expect(assets).toContain('app/screens/pipeline/pipeline.css');
    expect(missing).toEqual([]);
  });
});
