import { describe, expect, test, vi } from 'vitest';
import { issueMaterial, pairState } from './material.js';
import { ISSUE_MATERIAL_CAP, STATE_CAP } from './question.js';
import { createSpecSectionCache, specSections } from './spec-sections.js';

const WS = '/tmp/example-workspace/placement';
const BASE_1 = '1'.repeat(40);
const BASE_2 = '2'.repeat(40);
const SPEC = 'docs/specs/a.md';

/**
 * An `id_index` row as `bd list --json` carries it.
 *
 * @param {Record<string, unknown>} [overrides]
 */
function row(overrides = {}) {
  return {
    id: 'UI-1',
    title: '제목',
    issue_type: 'feature',
    description: '본문',
    metadata: { route: 'quick_fix' },
    updated_at: 1,
    closed_at: null,
    ...overrides
  };
}

describe('issue material', () => {
  test('reads title, type, route and description from the id_index row', () => {
    const material = issueMaterial(row(), '', null);

    expect(JSON.parse(/** @type {any} */ (material).text)).toEqual({
      id: 'UI-1',
      title: '제목',
      type: 'feature',
      route: 'quick_fix',
      description: '본문'
    });
  });

  test('is missing while the row has no description', () => {
    const material = issueMaterial(row({ description: undefined }), '', null);

    expect(material).toBeNull();
  });

  test('is missing while the spec has not been read', () => {
    const material = issueMaterial(row(), SPEC, { state: 'miss' });

    expect(material).toBeNull();
  });

  test('is missing while the named spec cannot be read', () => {
    const material = issueMaterial(row(), SPEC, { state: 'failed' });

    expect(material).toBeNull();
  });

  test('changes its digest when the description changes', () => {
    const before = issueMaterial(row(), '', null);

    const after = issueMaterial(row({ description: '바뀐 본문' }), '', null);

    expect(after?.digest).not.toBe(before?.digest);
  });

  test('cuts one issue at the per-issue cap', () => {
    const long = 'x'.repeat(ISSUE_MATERIAL_CAP * 2);

    const material = issueMaterial(row({ description: long }), '', null);

    expect(material?.text.length).toBe(ISSUE_MATERIAL_CAP);
  });

  test('cuts the pair state at the whole-state cap', () => {
    const text = 'y'.repeat(ISSUE_MATERIAL_CAP);

    const state = pairState('UI-1', text, 'UI-2', text);

    expect(state.length).toBe(STATE_CAP);
  });
});

describe('spec sections', () => {
  test('keeps the numbered goal, decision and boundary sections', () => {
    const doc = [
      '---',
      'scope:',
      '  - server/',
      '---',
      '# 제목',
      '## 1. 목표',
      '목표 본문',
      '## 2. 검증된 전제',
      '전제 본문',
      '## 7. 경계·후속',
      '경계 본문',
      '## 8. 결정 (ADR 후보)',
      '결정 본문'
    ].join('\n');

    const sections = specSections(doc);

    expect(sections).toEqual({
      '1. 목표': '목표 본문',
      '7. 경계·후속': '경계 본문',
      '8. 결정 (ADR 후보)': '결정 본문'
    });
  });

  test('reads the spec again once the pinned base moves', async () => {
    let base = BASE_1;
    let clock = 0;
    const gitRun = vi.fn(async (/** @type {string[]} */ args) => ({
      code: 0,
      stdout: `---\nscope:\n  - app/\n---\n## 1. 목표\n${args[2]}`
    }));
    const cache = createSpecSectionCache({
      now: () => clock,
      contextFor: () => ({
        repo: WS,
        gitRun,
        resolveBase: async () =>
          /** @type {any} */ ({ ok: true, base_oid: base })
      })
    });
    await cache.fill(WS, SPEC);
    clock += 10 * 60_000;
    base = BASE_2;

    await cache.fill(WS, SPEC);

    const peeked = /** @type {any} */ (cache.peek(WS, SPEC));
    expect(gitRun).toHaveBeenCalledTimes(2);
    expect(peeked.value.sections['1. 목표']).toBe(`${BASE_2}:${SPEC}`);
    expect(peeked.value.scope).toEqual(['app/']);
  });

  test('keeps the read while the base stays put', async () => {
    const gitRun = vi.fn(async () => ({ code: 0, stdout: '## 1. 목표\n본문' }));
    const cache = createSpecSectionCache({
      contextFor: () => ({
        repo: WS,
        gitRun,
        resolveBase: async () =>
          /** @type {any} */ ({ ok: true, base_oid: BASE_1 })
      })
    });
    await cache.fill(WS, SPEC);

    await cache.fill(WS, SPEC);

    expect(gitRun).toHaveBeenCalledTimes(1);
  });
});
