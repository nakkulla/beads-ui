import { render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import { mergeStepGauge } from './mini-row.js';

/**
 * Render one merge-step gauge into a detached host.
 *
 * @param {any} step
 * @param {{ coarse?: boolean }} [options]
 * @returns {HTMLElement}
 */
function gauge(step, options = {}) {
  const host = document.createElement('div');
  render(mergeStepGauge(step, options), host);
  return host;
}

/**
 * @param {HTMLElement} host
 * @returns {string[]}
 */
function beadStates(host) {
  return Array.from(host.querySelectorAll('.pl-step .ui-strand__bead')).map(
    (bead) =>
      ['is-lit', 'is-current', 'is-failed']
        .filter((cls) => bead.classList.contains(cls))
        .join(' ') || 'none'
  );
}

const VERIFYING = {
  step: 'verify',
  label: '검증 중',
  index: 3,
  total: 7,
  percent: 43,
  active: true,
  failed: false
};

describe('merge-step strand (UI-dbn6 design-system round)', () => {
  test('draws the seven merge steps with the earlier ones done', () => {
    const host = gauge(VERIFYING);

    const states = beadStates(host);

    expect(states).toEqual([
      'is-lit',
      'is-lit',
      'is-current',
      'none',
      'none',
      'none',
      'none'
    ]);
  });

  test('pulses the current bead while the step is active', () => {
    const host = gauge(VERIFYING);

    const current = host.querySelectorAll('.ui-strand__bead')[2];

    expect(current.classList.contains('is-live')).toBe(true);
  });

  test('marks the current bead failed for a failed step', () => {
    const host = gauge({
      ...VERIFYING,
      step: 'deploy',
      label: '배포 실패',
      index: 4,
      active: false,
      failed: true
    });

    const states = beadStates(host);

    expect(states[3]).toBe('is-failed');
    expect(
      host.querySelector('.pl-step')?.classList.contains('is-failed')
    ).toBe(true);
  });

  test('names every step in the bead title', () => {
    const host = gauge(VERIFYING);

    const titles = Array.from(host.querySelectorAll('.ui-strand__bead')).map(
      (bead) => bead.getAttribute('title')
    );

    expect(titles).toEqual([
      '머지 · 완료',
      'base · 완료',
      '검증 · 진행 중',
      '배포 · 남음',
      '자식 · 남음',
      '브랜치 · 남음',
      'close · 남음'
    ]);
  });

  test('prints the step names under the beads on a coarse pointer', () => {
    const host = gauge(VERIFYING, { coarse: true });

    const names = Array.from(host.querySelectorAll('.ui-strand__name')).map(
      (node) => node.textContent
    );

    expect(names).toEqual([
      '머지',
      'base',
      '검증',
      '배포',
      '자식',
      '브랜치',
      'close'
    ]);
  });

  test('keeps the label and n/7 next to the strand', () => {
    const host = gauge(VERIFYING);

    const label = host.querySelector('.pl-step__label');

    expect(label?.textContent?.replace(/\s+/g, ' ').trim()).toBe('검증 중3/7');
  });

  test('keeps an unpositioned step as its label alone', () => {
    const host = gauge({
      label: '저장소 작업',
      index: 0,
      total: 7,
      percent: 0
    });

    const beads = host.querySelectorAll('.ui-strand__bead');

    expect(beads).toHaveLength(0);
    expect(host.textContent?.trim()).toBe('저장소 작업');
  });
});
