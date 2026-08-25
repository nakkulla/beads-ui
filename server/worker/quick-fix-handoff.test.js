import nodeCrypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import {
  QUICK_FIX_HANDOFF_PATH,
  QUICK_FIX_HANDOFF_PROVENANCE_PATH,
  judgeQuickFixHandoff,
  loadQuickFixHandoff
} from './quick-fix-handoff.js';

const FIXTURES = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '__fixtures__'
);

/**
 * @typedef {Object} HandoffCase
 * @property {string} name
 * @property {Record<string, any>} issue
 * @property {{ state: string, missing: string[] }} expect
 */

/** @type {HandoffCase[]} */
const CASES = JSON.parse(
  fs.readFileSync(path.join(FIXTURES, 'quick-fix-handoff-cases.json'), 'utf8')
);

/** @type {Record<string, any>} */
const ARTIFACT = JSON.parse(fs.readFileSync(QUICK_FIX_HANDOFF_PATH, 'utf8'));

const THROWING_FS = {
  readFileSync() {
    throw new Error('ENOENT');
  }
};

/**
 * @param {unknown} artifact
 * @param {Record<string, unknown>} [provenance_patch]
 */
function fixtureFs(artifact, provenance_patch = {}) {
  const bytes = Buffer.from(
    typeof artifact === 'string' ? artifact : JSON.stringify(artifact)
  );
  const digest = nodeCrypto.createHash('sha256').update(bytes).digest('hex');
  const blob_sha = nodeCrypto
    .createHash('sha1')
    .update(Buffer.from(`blob ${bytes.length}\0`, 'utf8'))
    .update(bytes)
    .digest('hex');
  const provenance = Buffer.from(
    JSON.stringify({
      source_repo: 'dotfiles',
      source_path: 'generated/contracts/quick-fix-handoff.json',
      source_commit: 'abc123',
      source_blob_sha: blob_sha,
      bytes: bytes.length,
      sha256: digest,
      ...provenance_patch
    })
  );
  return {
    /** @param {string} file_path */
    readFileSync(file_path) {
      if (file_path === QUICK_FIX_HANDOFF_PATH) {
        return bytes;
      }
      if (file_path === QUICK_FIX_HANDOFF_PROVENANCE_PATH) {
        return provenance;
      }
      throw new Error(`unexpected path: ${String(file_path)}`);
    }
  };
}

describe('loadQuickFixHandoff', () => {
  test('loads the pinned projection and caches the process value', () => {
    const first = loadQuickFixHandoff();
    const second = loadQuickFixHandoff();

    expect(first).toMatchObject({
      supported: true,
      schema_version: 1,
      source_commit: '0220a0b58a488581e06edf1530aba154695f82e9'
    });
    expect(first.rules?.quick_fix_handoff.receipt.key).toBe('quick_fix_review');
    expect(second).toBe(first);
  });

  test.each([
    ['byte count', ARTIFACT, { bytes: 1 }],
    ['digest', ARTIFACT, { sha256: '0'.repeat(64) }],
    ['blob sha', ARTIFACT, { source_blob_sha: '0'.repeat(40) }],
    ['source repo', ARTIFACT, { source_repo: '' }],
    ['source path', ARTIFACT, { source_path: '' }],
    ['schema', { ...ARTIFACT, schema_version: 2 }, {}],
    ['predicate shape', { ...ARTIFACT, quick_fix_handoff: {} }, {}],
    ['scope rules', { ...ARTIFACT, description_scope: null }, {}],
    ['parse', '{broken', {}]
  ])('returns unsupported on %s failure', (_name, artifact, patch) => {
    const loaded = loadQuickFixHandoff({
      fs: fixtureFs(artifact, /** @type {Record<string, unknown>} */ (patch))
    });

    expect(loaded.supported).toBe(false);
    expect(loaded.rules).toBe(null);
  });

  test('returns unsupported when the projection files are missing', () => {
    const loaded = loadQuickFixHandoff({ fs: THROWING_FS });

    expect(loaded).toMatchObject({ supported: false, rules: null });
  });
});

describe('judgeQuickFixHandoff', () => {
  test('returns null for a route that is not quick_fix', () => {
    const judged = judgeQuickFixHandoff({
      metadata: { route: 'full_plan' },
      description: '## scope\n- server/'
    });

    expect(judged).toBe(null);
  });

  test('returns null when the issue declares no route', () => {
    const judged = judgeQuickFixHandoff({ description: '## scope\n- server/' });

    expect(judged).toBe(null);
  });

  test('returns unknown when the projection cannot be read', () => {
    const judged = judgeQuickFixHandoff(
      { metadata: { route: 'quick_fix' }, description: '본문' },
      { fs: THROWING_FS }
    );

    expect(judged).toEqual({ state: 'unknown', missing: [], digest: null });
  });

  test('digests the description bytes into twelve hex characters', () => {
    const judged = judgeQuickFixHandoff({
      metadata: { route: 'quick_fix' },
      description: 'a'
    });

    expect(judged?.digest).toBe(
      nodeCrypto.createHash('sha256').update('a').digest('hex').slice(0, 12)
    );
  });

  test('reports no digest for a description that is not a string', () => {
    const judged = judgeQuickFixHandoff({
      metadata: { route: 'quick_fix' },
      description: 42
    });

    expect(judged?.digest).toBe(null);
  });
});

describe('quick_fix handoff boundary fixtures', () => {
  test.each(CASES.map((entry) => [entry.name, entry]))('%s', (_name, entry) => {
    const judged = judgeQuickFixHandoff(
      /** @type {HandoffCase} */ (entry).issue
    );

    expect({
      state: judged?.state,
      missing: judged?.missing
    }).toEqual(/** @type {HandoffCase} */ (entry).expect);
  });
});
