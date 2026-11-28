import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

const repo_root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
);

/** The only non-test source that may run the tmux binary. */
const ALLOWED = 'server/routes/account-login.js';

/**
 * Every non-test `.js` under a directory, bundles and fixtures left out.
 *
 * @param {string} dir
 * @returns {string[]}
 */
function sources_under(dir) {
  /** @type {string[]} */
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === 'node_modules' ||
        entry.name === '__fixtures__' ||
        entry.name === 'fixtures'
      ) {
        continue;
      }
      found.push(...sources_under(full));
    } else if (
      entry.name.endsWith('.js') &&
      !entry.name.endsWith('.test.js') &&
      !entry.name.includes('fixture') &&
      entry.name !== 'main.bundle.js'
    ) {
      found.push(full);
    }
  }
  return found;
}

/**
 * Whether source text runs the tmux binary: a call or argv array whose first
 * element is the string `tmux`, or a shell string that starts with it.
 *
 * @param {string} text
 * @returns {boolean}
 */
function runs_tmux(text) {
  return (
    /[([]\s*['"`]tmux['"`]\s*[,)\]]/.test(text) ||
    /['"`]tmux\s+[a-z-]+/.test(text)
  );
}

describe('conversation windows never run tmux directly', () => {
  test('keeps tmux execution in the account login window alone', () => {
    const offenders = ['server', 'app']
      .flatMap((dir) => sources_under(path.join(repo_root, dir)))
      .map((file) => path.relative(repo_root, file))
      .filter((file) => file !== ALLOWED)
      .filter((file) =>
        runs_tmux(fs.readFileSync(path.join(repo_root, file), 'utf8'))
      );

    expect(offenders).toEqual([]);
  });

  test('still finds the account login window running tmux', () => {
    const text = fs.readFileSync(path.join(repo_root, ALLOWED), 'utf8');

    expect(runs_tmux(text)).toBe(true);
  });
});
