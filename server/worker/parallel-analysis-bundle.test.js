import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import {
  BUNDLE_MAX_FILES,
  collectAnalysisBundle
} from './parallel-analysis-bundle.js';

const SHA = 'b'.repeat(40);

/**
 * Fake pinned-object git runner over a content fixture map keyed by
 * `<sha>:<path>`.
 *
 * @param {Record<string, string>} blobs
 */
function gitRunOf(blobs) {
  return async (/** @type {string[]} */ args) => {
    if (args[0] === 'cat-file' && args[1] === 'blob') {
      const hit = blobs[args[2]];
      return typeof hit === 'string'
        ? { code: 0, stdout: hit }
        : { code: 128, stdout: '' };
    }
    if (args[0] === 'cat-file' && args[1] === '-s') {
      const hit = blobs[args[2]];
      return typeof hit === 'string'
        ? { code: 0, stdout: `${Buffer.byteLength(hit)}\n` }
        : { code: 128, stdout: '' };
    }
    return { code: 1, stdout: '' };
  };
}

/**
 * @param {any} over
 */
function snapshotOf(over = {}) {
  return {
    base_sha: SHA,
    target_ids: ['UI-a'],
    targets: {
      'UI-a': {
        id: 'UI-a',
        route: 'full_plan',
        spec_id: 'docs/spec.md',
        plan_path: 'docs/plan.md',
        artifacts: []
      }
    },
    ...over
  };
}

describe('parallel-analysis bundle collector (UI-04vo seam F)', () => {
  test('materializes pinned spec and plan blobs into a private temp dir', async () => {
    const bundle = await collectAnalysisBundle({
      snapshot: snapshotOf(),
      gitRun: gitRunOf({
        [`${SHA}:docs/spec.md`]: '# spec\n',
        [`${SHA}:docs/plan.md`]: '# plan\n'
      })
    });

    expect(bundle.ok).toBe(true);
    const spec_file = bundle.manifest.files.find(
      (f) => f.path === 'docs/spec.md'
    );
    expect(spec_file?.kind).toBe('spec');
    expect(fs.readFileSync(path.join(bundle.dir, 'docs/spec.md'), 'utf8')).toBe(
      '# spec\n'
    );
    expect(fs.readFileSync(path.join(bundle.dir, 'docs/plan.md'), 'utf8')).toBe(
      '# plan\n'
    );

    bundle.cleanup();
    expect(fs.existsSync(bundle.dir)).toBe(false);
  });

  test('records an omission for an unreadable plan and keeps the target', async () => {
    const bundle = await collectAnalysisBundle({
      snapshot: snapshotOf(),
      gitRun: gitRunOf({ [`${SHA}:docs/spec.md`]: '# spec\n' })
    });

    expect(bundle.ok).toBe(true);
    expect(bundle.manifest.omissions).toContainEqual({
      path: 'docs/plan.md',
      target_id: 'UI-a',
      reason: 'unreadable'
    });
    bundle.cleanup();
  });

  test('marks a target whose required spec is unreadable', async () => {
    const bundle = await collectAnalysisBundle({
      snapshot: snapshotOf(),
      gitRun: gitRunOf({})
    });

    expect(bundle.ok).toBe(true);
    expect(bundle.manifest.omissions).toContainEqual({
      path: 'docs/spec.md',
      target_id: 'UI-a',
      reason: 'spec_unreadable'
    });
    bundle.cleanup();
  });

  test('collects doc-referenced tracked source refs and omits unsafe ones', async () => {
    const spec = [
      '# spec',
      'touches `server/worker/a.js` and `../escape.js` and `/abs/path.js`',
      'also `.git/hooks/x.sh` and `config/secret-token.js` and `server/untracked.js`'
    ].join('\n');
    const bundle = await collectAnalysisBundle({
      snapshot: snapshotOf({
        targets: {
          'UI-a': {
            id: 'UI-a',
            route: 'spec_backed',
            spec_id: 'docs/spec.md',
            plan_path: null,
            artifacts: []
          }
        }
      }),
      gitRun: gitRunOf({
        [`${SHA}:docs/spec.md`]: spec,
        [`${SHA}:server/worker/a.js`]: 'export {};\n'
      })
    });

    expect(bundle.ok).toBe(true);
    expect(
      bundle.manifest.files.some((f) => f.path === 'server/worker/a.js')
    ).toBe(true);
    const omitted = Object.fromEntries(
      bundle.manifest.omissions.map((o) => [o.path, o.reason])
    );
    expect(omitted['../escape.js']).toBe('unsafe_path');
    expect(omitted['/abs/path.js']).toBe('unsafe_path');
    expect(omitted['.git/hooks/x.sh']).toBe('unsafe_path');
    expect(omitted['config/secret-token.js']).toBe('credential_pattern');
    expect(omitted['server/untracked.js']).toBe('unreadable');
    bundle.cleanup();
  });

  test('enforces the file-count cap with omission reasons', async () => {
    const refs = Array.from(
      { length: BUNDLE_MAX_FILES + 5 },
      (_, i) => `src/file-${String(i).padStart(3, '0')}.js`
    );
    const spec = refs.map((r) => `- \`${r}\``).join('\n');
    /** @type {Record<string, string>} */
    const blobs = { [`${SHA}:docs/spec.md`]: spec };
    for (const ref of refs) {
      blobs[`${SHA}:${ref}`] = '// x\n';
    }
    const bundle = await collectAnalysisBundle({
      snapshot: snapshotOf({
        targets: {
          'UI-a': {
            id: 'UI-a',
            route: 'spec_backed',
            spec_id: 'docs/spec.md',
            plan_path: null,
            artifacts: []
          }
        }
      }),
      gitRun: gitRunOf(blobs)
    });

    expect(bundle.ok).toBe(true);
    expect(bundle.manifest.files.length).toBeLessThanOrEqual(BUNDLE_MAX_FILES);
    expect(bundle.manifest.omissions.some((o) => o.reason === 'file_cap')).toBe(
      true
    );
    bundle.cleanup();
  });

  test('cleanup is idempotent', async () => {
    const bundle = await collectAnalysisBundle({
      snapshot: snapshotOf({
        targets: {
          'UI-a': {
            id: 'UI-a',
            route: 'spec_backed',
            spec_id: 'docs/spec.md',
            plan_path: null,
            artifacts: []
          }
        }
      }),
      gitRun: gitRunOf({ [`${SHA}:docs/spec.md`]: '# spec\n' })
    });

    bundle.cleanup();
    bundle.cleanup();

    expect(fs.existsSync(bundle.dir)).toBe(false);
  });
});
