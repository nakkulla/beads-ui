import { afterEach, describe, expect, test } from 'vitest';
import { NOW, mountPipeline } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
});

const REPO_A = '/fixture/repo-a';
const SPEC = 'docs/superpowers/specs/2026-09-23-frontend-rewrite.md';

/**
 * Mount with repo-a's first candidate (A-10) carrying a spec document, a
 * plan without one and an open PR.
 *
 * @param {{ coarse?: boolean }} [options]
 */
function mountBand(options = {}) {
  const handle = mountPipeline({
    now: NOW,
    coarse: options.coarse,
    edit: (fixture) => {
      const candidate = fixture.workspaces[0].runnable[0];
      candidate.workflow = {
        route: 'full_plan',
        stages: {
          spec: {
            fill: 'full',
            glyph: 'review',
            doc: { path: SPEC, missing_state: null }
          },
          plan: { fill: 'dim' },
          impl: { fill: 'none' },
          pr: { fill: 'none' },
          merge: { fill: 'none' }
        },
        chips: { pr: { number: 337, url: 'https://github.com/o/r/pull/337' } }
      };
    }
  });
  mounted.push(handle);
  return handle;
}

/**
 * @param {ParentNode} root
 * @returns {HTMLElement}
 */
function band(root) {
  const found = root.querySelector(
    `.pl-card[data-bead-id="A-10"][data-root-dir="${REPO_A}"] .pl-band`
  );
  if (!(found instanceof HTMLElement)) {
    throw new Error('missing band');
  }
  return found;
}

describe('진행 띠의 문서 구슬 (UI-dbn6 P1-r2 item 13)', () => {
  test('draws a spec bead with a document as a labelled button', () => {
    const { mount: root } = mountBand();

    const bead = band(root).querySelector('button[data-stage="spec"]');

    expect(bead?.getAttribute('aria-label')).toBe('spec 문서 열기');
    expect(bead?.getAttribute('title')).toBe(`spec 문서 열기 · ${SPEC}`);
  });

  test('keeps a bead without a document non-interactive', () => {
    const { mount: root } = mountBand();

    const plan = band(root).querySelector('[data-stage="plan"]');

    expect(plan?.tagName).toBe('SPAN');
  });

  test('opens the spec in the card repo without opening the card', () => {
    const { mount: root, openDoc, openIssue } = mountBand();

    /** @type {HTMLElement} */ (
      band(root).querySelector('button[data-stage="spec"]')
    ).click();

    expect(openDoc).toHaveBeenCalledWith(SPEC, '', REPO_A);
    expect(openIssue).not.toHaveBeenCalled();
  });

  test('links the PR bead to the pull request', () => {
    const { mount: root } = mountBand();

    const pr = band(root).querySelector('a[data-stage="pr"]');

    expect(pr?.getAttribute('href')).toBe('https://github.com/o/r/pull/337');
    expect(pr?.getAttribute('aria-label')).toBe('PR 열기');
  });

  test('names every stage under its bead on a coarse pointer', () => {
    const { mount: root } = mountBand({ coarse: true });

    const names = Array.from(band(root).querySelectorAll('.pl-band__name')).map(
      (node) => node.textContent?.trim()
    );

    expect(names).toEqual(['spec', 'plan', '구현', 'PR', '머지']);
  });
});
