import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import { stepperTemplate } from './stepper.js';

/**
 * @param {any} workflow
 * @param {string} [status]
 * @returns {HTMLElement}
 */
function mountStepper(workflow, status) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  render(stepperTemplate(workflow, status), mount);
  return mount;
}

/**
 * @param {any} stages
 * @param {string} [route]
 * @returns {any}
 */
function wf(stages, route = 'spec_backed') {
  return { route, stages };
}

describe('views/board/stepper', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('spec_backed renders 4 segments (no plan); full_plan renders 5', () => {
    const four = mountStepper(
      wf({
        spec: { state: 'dim' },
        impl: { state: 'empty' },
        pr: { state: 'empty' },
        merge: { state: 'empty' }
      })
    );
    expect(four.querySelectorAll('.seg').length).toBe(4);
    expect(four.textContent).not.toContain('plan');

    const five = mountStepper(
      wf(
        {
          spec: { state: 'dim' },
          plan: { state: 'empty' },
          impl: { state: 'empty' },
          pr: { state: 'empty' },
          merge: { state: 'empty' }
        },
        'full_plan'
      )
    );
    expect(five.querySelectorAll('.seg').length).toBe(5);
    expect(five.textContent).toContain('plan');
  });

  test('empty state: bar has no color/state class, label not colored', () => {
    const m = mountStepper(
      wf({
        spec: { state: 'empty' },
        impl: { state: 'empty' },
        pr: { state: 'empty' },
        merge: { state: 'empty' }
      })
    );
    const specBar = m.querySelector('.seg .bar');
    expect(specBar?.className).toBe('bar');
    const specLbl = m.querySelector('.seg .lbl');
    expect(specLbl?.classList.contains('on')).toBe(false);
  });

  test('dim state: b-spec dim, label l-spec on', () => {
    const m = mountStepper(
      wf({
        spec: { state: 'dim' },
        impl: { state: 'empty' },
        pr: { state: 'empty' },
        merge: { state: 'empty' }
      }),
      'open'
    );
    const bar = m.querySelector('.seg .bar');
    expect(bar?.classList.contains('b-spec')).toBe(true);
    expect(bar?.classList.contains('dim')).toBe(true);
    expect(m.querySelector('.seg .lbl')?.classList.contains('l-spec')).toBe(
      true
    );
  });

  test('reviewed state: b-spec on + ✓ glyph', () => {
    const m = mountStepper(
      wf({
        spec: { state: 'reviewed' },
        impl: { state: 'empty' },
        pr: { state: 'empty' },
        merge: { state: 'empty' }
      })
    );
    const bar = m.querySelector('.seg .bar');
    expect(bar?.classList.contains('on')).toBe(true);
    expect(bar?.textContent?.trim()).toBe('✓');
  });

  test('skip state: b-spec on + ⊘ glyph', () => {
    const m = mountStepper(
      wf({
        spec: { state: 'skip' },
        impl: { state: 'empty' },
        pr: { state: 'empty' },
        merge: { state: 'empty' }
      })
    );
    const bar = m.querySelector('.seg .bar');
    expect(bar?.classList.contains('on')).toBe(true);
    expect(bar?.textContent?.trim()).toBe('⊘');
  });

  test('on (blank) state: b-pr on, no glyph', () => {
    const m = mountStepper(
      wf({
        spec: { state: 'skip' },
        impl: { state: 'reviewed' },
        pr: { state: 'on' },
        merge: { state: 'empty' }
      })
    );
    const bars = m.querySelectorAll('.seg .bar');
    const prBar = bars[2];
    expect(prBar.classList.contains('b-pr')).toBe(true);
    expect(prBar.classList.contains('on')).toBe(true);
    expect(prBar.textContent?.trim()).toBe('');
  });

  test('stale state downgrades ✓ to grey (bar.stale, no on class)', () => {
    const m = mountStepper(
      wf({
        spec: { state: 'stale', stale: true },
        impl: { state: 'empty' },
        pr: { state: 'empty' },
        merge: { state: 'empty' }
      })
    );
    const bar = m.querySelector('.seg .bar');
    expect(bar?.classList.contains('stale')).toBe(true);
    expect(bar?.classList.contains('on')).toBe(false);
    expect(bar?.textContent?.trim()).toBe('✓');
  });

  test('glow lands on first dim cell only while active (in_progress)', () => {
    const m = mountStepper(
      wf(
        {
          spec: { state: 'reviewed' },
          plan: { state: 'on' },
          impl: { state: 'dim' },
          pr: { state: 'empty' },
          merge: { state: 'empty' }
        },
        'full_plan'
      ),
      'in_progress'
    );
    const bars = Array.from(m.querySelectorAll('.seg .bar'));
    const glowing = bars.filter((b) => b.classList.contains('glow'));
    expect(glowing.length).toBe(1);
    // impl is index 2 in full_plan order.
    expect(bars[2].classList.contains('glow')).toBe(true);
    expect(bars[2].getAttribute('style')).toContain('--stage-impl-on');
  });

  test('no glow when status is not active (open), even with a dim cell', () => {
    const m = mountStepper(
      wf({
        spec: { state: 'dim' },
        impl: { state: 'empty' },
        pr: { state: 'empty' },
        merge: { state: 'empty' }
      }),
      'open'
    );
    expect(m.querySelectorAll('.seg .bar.glow').length).toBe(0);
  });

  test('missing workflow renders nothing', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(stepperTemplate(null, 'open'), mount);
    expect(mount.querySelector('.stp')).toBeNull();
  });
});
