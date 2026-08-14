/**
 * CI retirement (master spec §12/§17.9). Merge eligibility no longer consults
 * GitHub checks, so a reintroduced workflow would create a signal nothing reads
 * — and would quietly resurrect the "empty checks is a vacuous pass" special
 * case this repo removed. Absence is the contract, so absence is pinned.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

const REPO_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const WORKFLOWS_DIR = path.join(REPO_ROOT, '.github', 'workflows');

describe('GitHub Actions retirement', () => {
  test('keeps no workflow in the active tree', () => {
    const entries = fs.existsSync(WORKFLOWS_DIR)
      ? fs
          .readdirSync(WORKFLOWS_DIR)
          .filter((name) => name.endsWith('.yml') || name.endsWith('.yaml'))
      : [];

    expect(entries).toEqual([]);
  });

  test('states no vacuous-pass special case in AGENTS', () => {
    const agents = fs.readFileSync(path.join(REPO_ROOT, 'AGENTS.md'), 'utf8');

    expect(agents).not.toContain('vacuous pass');
  });
});
