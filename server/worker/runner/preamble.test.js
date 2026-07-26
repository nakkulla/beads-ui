import { describe, expect, test } from 'vitest';
import * as preamble from './preamble.js';
import {
  FAST_TRACK_DIRECTIVE,
  GUARD_CONTRACT_DIRECTIVE,
  PR_SUBMIT_DIRECTIVE,
  UNATTENDED_PREAMBLE,
  applyPreamble
} from './preamble.js';

describe('runner/preamble', () => {
  test('prepends the unattended preamble to the base prompt', () => {
    const out = applyPreamble('작업하라');

    expect(out.startsWith(UNATTENDED_PREAMBLE)).toBe(true);
    expect(out.endsWith('작업하라')).toBe(true);
    expect(out).not.toContain(FAST_TRACK_DIRECTIVE);
  });

  test('injects the fast_track directive between preamble and prompt', () => {
    const out = applyPreamble('작업하라', { fast_track: true });

    expect(out.indexOf(UNATTENDED_PREAMBLE)).toBeLessThan(
      out.indexOf(FAST_TRACK_DIRECTIVE)
    );
    expect(out.indexOf(FAST_TRACK_DIRECTIVE)).toBeLessThan(
      out.indexOf('작업하라')
    );
  });
});

describe('runner/preamble PR-submit directive (worker-phase2 §1)', () => {
  test('injects the PR-submit directive with no options at all', () => {
    const out = applyPreamble('작업하라');

    expect(out).toContain(PR_SUBMIT_DIRECTIVE);
  });

  test('injects the PR-submit directive under fast_track too', () => {
    const out = applyPreamble('작업하라', { fast_track: true });

    expect(out).toContain(PR_SUBMIT_DIRECTIVE);
  });

  test('states PR submission and forbids merging', () => {
    expect(PR_SUBMIT_DIRECTIVE).toContain('PR 제출');
    expect(PR_SUBMIT_DIRECTIVE).toContain('머지하지 말 것');
  });

  test('no longer names the retired merge_policy key', () => {
    expect(PR_SUBMIT_DIRECTIVE).not.toContain('merge_policy');
  });

  test('orders preamble → fast_track → PR-submit → prompt', () => {
    const out = applyPreamble('작업하라', { fast_track: true });

    const idx = (/** @type {string} */ part) => out.indexOf(part);

    expect(idx(UNATTENDED_PREAMBLE)).toBeLessThan(idx(FAST_TRACK_DIRECTIVE));
    expect(idx(FAST_TRACK_DIRECTIVE)).toBeLessThan(idx(PR_SUBMIT_DIRECTIVE));
    expect(idx(PR_SUBMIT_DIRECTIVE)).toBeLessThan(idx('작업하라'));
  });
});

describe('runner/preamble guard-contract directive (UI-t3wk)', () => {
  test('injects the guard-contract directive with no options at all', () => {
    const out = applyPreamble('작업하라');

    expect(out).toContain(GUARD_CONTRACT_DIRECTIVE);
  });

  test('injects the guard-contract directive under fast_track too', () => {
    const out = applyPreamble('작업하라', { fast_track: true });

    expect(out).toContain(GUARD_CONTRACT_DIRECTIVE);
  });

  test('states the merge prohibition and the background-task warning', () => {
    expect(GUARD_CONTRACT_DIRECTIVE).toContain('git merge` 절대 금지');
    expect(GUARD_CONTRACT_DIRECTIVE).toContain('턴을 끝내지 말 것');
  });
});

describe('runner/preamble merge axis removal (worker-phase2 §2)', () => {
  test('exports no merge-lock protocol or drift directive', () => {
    expect(/** @type {any} */ (preamble).mergeLockProtocol).toBeUndefined();
    expect(/** @type {any} */ (preamble).DRIFT_HALT_DIRECTIVE).toBeUndefined();
    expect(/** @type {any} */ (preamble).PR_STOP_DIRECTIVE).toBeUndefined();
  });

  test('emits no merge-lock protocol block for any input', () => {
    const out = applyPreamble('작업하라', { fast_track: true });

    expect(out).not.toContain('merge-lock');
    expect(out).not.toContain('머지 락 프로토콜');
    expect(out).not.toContain('BDUI_WORKER_TOKEN');
  });

  test('ignores retired policy options instead of branching on them', () => {
    const plain = applyPreamble('작업하라');

    const with_retired = applyPreamble(
      '작업하라',
      /** @type {any} */ ({
        merge_policy: 'auto_merge',
        drift_policy: 'halt',
        merge_lock: { port: 4100, repo: '/r', target_base: 'trunk' }
      })
    );

    expect(with_retired).toBe(plain);
  });
});
