import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import { bannersTemplate, runningGridTemplate } from './running-grid.js';

describe('worker failed running tile template', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('renders failed controls and an ineligible resume tooltip', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-1',
          attempt_id: 'attempt-1',
          title: 'failed work',
          runner: 'claude',
          model: 'opus',
          started_at: null,
          failed: true,
          status: 'failed',
          status_label: '실패',
          resume_eligible: false,
          resume_reason: 'session_id 없는 구 attempt — 이어하기 불가',
          discard: {
            action: true,
            enabled: true,
            label: '폐기',
            title: '복구 archive 생성 후 폐기',
            operation: null
          }
        }
      ]),
      mount
    );

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    const resume = /** @type {HTMLButtonElement} */ (
      tile.querySelector('.rtile__resume')
    );

    expect(tile.classList.contains('rtile--failed')).toBe(true);
    expect(tile.querySelector('.rtile__elapsed')?.textContent).toBe('실패');
    expect(resume.disabled).toBe(true);
    expect(resume.title).toBe('session_id 없는 구 attempt — 이어하기 불가');
    expect(tile.querySelector('.rtile__dismiss')).not.toBeNull();
    expect(tile.querySelector('.rtile__session')).toBeNull();
    expect(tile.querySelector('.rtile__pause')).toBeNull();
    expect(tile.querySelector('.rtile__stop')).toBeNull();
    expect(tile.querySelector('.rtile__discard')).not.toBeNull();
    expect(tile.querySelector('.rtile__accent')).toBeNull();
  });

  test('labels orphaned tiles as 중단됨', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-2',
          attempt_id: 'attempt-2',
          title: 'orphaned work',
          runner: null,
          model: null,
          started_at: null,
          failed: true,
          status: 'orphaned',
          status_label: '중단됨',
          resume_eligible: true,
          resume_reason: null
        }
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__elapsed')?.textContent).toBe('중단됨');
  });

  test('renders effort, Fast, and fresh-session lineage from the attempt', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-3',
          attempt_id: 'attempt-3',
          title: 'continued work',
          runner: 'codex',
          model: 'sol',
          effort: 'ultra',
          speed: 'fast',
          started_at: null,
          resumed_from: 'attempt-2',
          continuation_mode: 'fresh'
        }
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__runner')?.textContent).toBe(
      'codex · sol · ultra · Fast'
    );
    expect(mount.querySelector('.rtile__resumed')?.getAttribute('title')).toBe(
      '새 session으로 이어받음 (from attempt-2)'
    );
  });

  test('keeps cleanup failure evidence without rendering AI diagnosis controls', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      bannersTemplate({
        cleanupFailures: /** @type {any[]} */ ([
          {
            bead_id: 'UI-3',
            step: 'post_merge_verify',
            reason: 'verify_cmd_failed',
            detail: 'verify output retained for operator review',
            diagnosis: {
              verdict: 'regression',
              evidence: 'historical diagnosis must not become an active surface'
            },
            diagnosis_pending: true
          }
        ])
      }),
      mount
    );

    const banner = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--cleanup')
    );

    expect(banner.textContent).toContain('verify output retained');
    expect(banner.textContent).not.toContain('AI 정리');
    expect(banner.querySelector('.worker-banner__cleanup-diagnose')).toBeNull();
    expect(banner.textContent).not.toContain('historical diagnosis');
  });
});

describe('repo deployment strip template (UI-lb58 Phase 4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('does not render the retired deployment strip in the banners area', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(bannersTemplate({}), mount);

    expect(mount.querySelector('.worker-deployment-strip')).toBeNull();
  });
});
