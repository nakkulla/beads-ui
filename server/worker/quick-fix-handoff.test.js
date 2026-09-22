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
 * @property {Record<string, any>} [related]
 * @property {{ state: string, missing: string[] }} expect
 */

/**
 * @param {Array<{ id: string, dependency_type: string }>|undefined} dependencies
 * @returns {string[]}
 */
function blocksIds(dependencies) {
  return (dependencies || [])
    .filter((edge) => edge.dependency_type === 'blocks')
    .map((edge) => edge.id);
}

/**
 * @param {HandoffCase} entry
 * @returns {import('./quick-fix-handoff.js').PredecessorResolver}
 */
function resolverFor(entry) {
  return {
    blocksOf(bead_id) {
      if (bead_id === entry.issue.id) {
        return blocksIds(entry.issue.dependencies);
      }
      const other = (entry.related || {})[bead_id];
      return other ? blocksIds(other.dependencies) : null;
    }
  };
}

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
      source_commit: 'efb5b5be85baceb95b575065e4d69cc9a793d1d5'
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

  test('rejects a predecessor_edge rule with an unsupported token', () => {
    const artifact = structuredClone(ARTIFACT);
    artifact.quick_fix_handoff.checks.predecessor_edge.absent_mention = 'error';
    const loaded = loadQuickFixHandoff({ fs: fixtureFs(artifact) });

    expect(loaded.supported).toBe(false);
  });

  test('supports a pin with no predecessor_edge key at all', () => {
    const artifact = structuredClone(ARTIFACT);
    delete artifact.quick_fix_handoff.checks.predecessor_edge;
    const loaded = loadQuickFixHandoff({ fs: fixtureFs(artifact) });

    expect(loaded.supported).toBe(true);
    const judged = judgeQuickFixHandoff(
      {
        id: 'dotfiles-slf1',
        issue_type: 'task',
        metadata: { route: 'quick_fix' },
        description:
          '## 출처/배경\n- 관측 한 줄\n\n## 기대 효과\n- 효과 한 줄\n\n## 영향 surface와 경계\n- 경계 한 줄\n\n## 검증 bundle\n- 선행 dotfiles-aaaa\n\n## scope\n- server/',
        dependencies: []
      },
      { fs: fixtureFs(artifact), predecessors: { blocksOf: () => [] } }
    );

    expect(judged?.missing).toEqual([]);
  });

  test('rejects a user_decision_reserved rule with an unsupported token', () => {
    const artifact = structuredClone(ARTIFACT);
    artifact.quick_fix_handoff.checks.user_decision_reserved.absent_match =
      'error';
    const loaded = loadQuickFixHandoff({ fs: fixtureFs(artifact) });

    expect(loaded.supported).toBe(false);
  });

  test('rejects a line_regex with an untranslatable inline flag', () => {
    const artifact = structuredClone(ARTIFACT);
    artifact.quick_fix_handoff.checks.user_decision_reserved.line_regex = [
      '(?m)abc'
    ];
    const loaded = loadQuickFixHandoff({ fs: fixtureFs(artifact) });

    expect(loaded.supported).toBe(false);
  });

  test('rejects a line_regex only invalid under the u flag', () => {
    const artifact = structuredClone(ARTIFACT);
    artifact.quick_fix_handoff.checks.user_decision_reserved.line_regex = [
      '\\q'
    ];
    const loaded = loadQuickFixHandoff({ fs: fixtureFs(artifact) });

    expect(loaded.supported).toBe(false);
  });

  test('supports a pin with no user_decision_reserved key at all', () => {
    const artifact = structuredClone(ARTIFACT);
    delete artifact.quick_fix_handoff.checks.user_decision_reserved;
    const loaded = loadQuickFixHandoff({ fs: fixtureFs(artifact) });

    expect(loaded.supported).toBe(true);
    const judged = judgeQuickFixHandoff(
      {
        issue_type: 'task',
        metadata: { route: 'quick_fix' },
        description:
          '## 출처/배경\n- 관측 한 줄\n\n## 기대 효과\n- 효과 한 줄\n사용자 결정이 필요하다\n\n## 영향 surface와 경계\n- 경계 한 줄\n\n## 검증 bundle\n- npm test\n\n## scope\n- server/'
      },
      { fs: fixtureFs(artifact) }
    );

    expect(judged?.missing).toEqual([]);
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
      /** @type {HandoffCase} */ (entry).issue,
      { predecessors: resolverFor(/** @type {HandoffCase} */ (entry)) }
    );

    expect({
      state: judged?.state,
      missing: judged?.missing
    }).toEqual(/** @type {HandoffCase} */ (entry).expect);
  });
});
