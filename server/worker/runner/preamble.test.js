import { describe, expect, test } from 'vitest';
import {
  DRIFT_HALT_DIRECTIVE,
  FAST_TRACK_DIRECTIVE,
  PR_STOP_DIRECTIVE,
  UNATTENDED_PREAMBLE,
  applyPreamble,
  mergeLockProtocol
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
    expect(out).toContain(UNATTENDED_PREAMBLE);
    expect(out).toContain(FAST_TRACK_DIRECTIVE);
    expect(out.indexOf(UNATTENDED_PREAMBLE)).toBeLessThan(
      out.indexOf(FAST_TRACK_DIRECTIVE)
    );
    expect(out.indexOf(FAST_TRACK_DIRECTIVE)).toBeLessThan(
      out.indexOf('작업하라')
    );
  });

  test('mergeLockProtocol injects the concrete port, repo and target_base [F3]', () => {
    const block = mergeLockProtocol({
      port: 3007,
      repo: '/repo/x',
      target_base: 'main'
    });
    expect(block).toContain('http://127.0.0.1:3007/api/worker/merge-lock');
    expect(block).toContain('Authorization: Bearer $BDUI_WORKER_TOKEN');
    expect(block).toContain('"repo":"/repo/x"');
    expect(block).toContain('"target_base":"main"');
    expect(block).toContain('"action":"release"');
  });

  test('applyPreamble embeds the merge-lock protocol when merge_lock is given [F3]', () => {
    const out = applyPreamble('작업하라', {
      fast_track: true,
      merge_lock: { port: 4100, repo: '/r', target_base: 'trunk' }
    });
    expect(out).toContain(UNATTENDED_PREAMBLE);
    expect(out).toContain(FAST_TRACK_DIRECTIVE);
    expect(out).toContain('http://127.0.0.1:4100/api/worker/merge-lock');
    expect(out).toContain('"target_base":"trunk"');
    // Protocol precedes the base prompt.
    expect(out.indexOf('merge-lock')).toBeLessThan(out.indexOf('작업하라'));
  });

  test('applyPreamble omits the merge-lock block when merge_lock is absent', () => {
    const out = applyPreamble('작업하라', { fast_track: true });
    expect(out).not.toContain('merge-lock');
  });
});

describe('runner/preamble policy directives (worker-autorun-policy §2)', () => {
  const LOCK = { port: 4321, repo: '/repo', target_base: 'main' };

  test('pr_stop injects the PR-stop directive and OMITS the merge-lock block', () => {
    const out = applyPreamble('작업하라', {
      merge_policy: 'pr_stop',
      merge_lock: LOCK
    });
    expect(out).toContain(PR_STOP_DIRECTIVE);
    expect(out).not.toContain('merge-lock');
    expect(out).not.toContain('머지 락 프로토콜');
  });

  test('auto_merge keeps the merge-lock block and adds no policy directive', () => {
    const out = applyPreamble('작업하라', {
      merge_policy: 'auto_merge',
      merge_lock: LOCK
    });
    expect(out).toContain('머지 락 프로토콜');
    expect(out).not.toContain(PR_STOP_DIRECTIVE);
    expect(out).not.toContain(DRIFT_HALT_DIRECTIVE);
  });

  test('drift halt injects the halt directive; auto_rereview does not', () => {
    const halt = applyPreamble('작업하라', { drift_policy: 'halt' });
    expect(halt).toContain(DRIFT_HALT_DIRECTIVE);
    const rereview = applyPreamble('작업하라', {
      drift_policy: 'auto_rereview'
    });
    expect(rereview).not.toContain(DRIFT_HALT_DIRECTIVE);
  });

  test('fast_track + pr_stop + halt compose in preamble order before the prompt', () => {
    const out = applyPreamble('작업하라', {
      fast_track: true,
      merge_policy: 'pr_stop',
      drift_policy: 'halt',
      merge_lock: LOCK
    });
    const idx = (/** @type {string} */ part) => out.indexOf(part);
    expect(idx(UNATTENDED_PREAMBLE)).toBeLessThan(idx(FAST_TRACK_DIRECTIVE));
    expect(idx(FAST_TRACK_DIRECTIVE)).toBeLessThan(idx(PR_STOP_DIRECTIVE));
    expect(idx(PR_STOP_DIRECTIVE)).toBeLessThan(idx(DRIFT_HALT_DIRECTIVE));
    expect(idx(DRIFT_HALT_DIRECTIVE)).toBeLessThan(idx('작업하라'));
    expect(out).not.toContain('머지 락 프로토콜');
  });
});
