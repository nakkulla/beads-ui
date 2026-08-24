import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
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

/**
 * Stage fixture with the server's three axes defaulted.
 *
 * @param {'none'|'dim'|'full'} fill
 * @param {'review'|'skip'|null} [glyph]
 * @param {boolean} [stale]
 * @returns {any}
 */
function stage(fill, glyph = null, stale = false) {
  return { fill, glyph, stale, receipt: null };
}

const NONE = stage('none');

describe('views/board/stepper', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('spec_backed renders 4 segments (no plan); full_plan renders 5', () => {
    const four = mountStepper(
      wf({ spec: stage('dim'), impl: NONE, pr: NONE, merge: NONE })
    );
    expect(four.querySelectorAll('.seg').length).toBe(4);
    expect(four.textContent).not.toContain('plan');

    const five = mountStepper(
      wf(
        {
          spec: stage('dim'),
          plan: NONE,
          impl: NONE,
          pr: NONE,
          merge: NONE
        },
        'full_plan'
      )
    );
    expect(five.querySelectorAll('.seg').length).toBe(5);
    expect(five.textContent).toContain('plan');
  });

  test('quick_fix renders impl and close with the merge color', () => {
    const m = mountStepper(
      wf({ impl: stage('dim'), close: stage('full') }, 'quick_fix'),
      'in_progress'
    );
    const segments = Array.from(m.querySelectorAll('.seg'));

    expect(segments).toHaveLength(2);
    expect(segments[0].textContent).toContain('impl');
    expect(segments[1].textContent).toContain('close');
    expect(segments[1].querySelector('.bar')?.classList.contains('b-mrg')).toBe(
      true
    );
  });

  test('unknown routes fall back to the spec_backed order', () => {
    const m = mountStepper(
      wf({ spec: NONE, impl: NONE, pr: NONE, merge: NONE }, 'foo')
    );

    expect(m.querySelectorAll('.seg')).toHaveLength(4);
    expect(m.textContent).toContain('spec');
    expect(m.textContent).not.toContain('close');
  });

  test('fill=none: bar has no color/fill class, label not colored', () => {
    const m = mountStepper(
      wf({ spec: NONE, impl: NONE, pr: NONE, merge: NONE })
    );

    const specBar = m.querySelector('.seg .bar');

    expect(specBar?.className).toBe('bar');
    expect(m.querySelector('.seg .lbl')?.classList.contains('on')).toBe(false);
  });

  test('fill=dim: b-spec dim, label l-spec on', () => {
    const m = mountStepper(
      wf({ spec: stage('dim'), impl: NONE, pr: NONE, merge: NONE }),
      'open'
    );

    const bar = m.querySelector('.seg .bar');

    expect(bar?.classList.contains('b-spec')).toBe(true);
    expect(bar?.classList.contains('dim')).toBe(true);
    expect(m.querySelector('.seg .lbl')?.classList.contains('l-spec')).toBe(
      true
    );
  });

  test('fill=full + glyph=review: b-spec full + ✓', () => {
    const m = mountStepper(
      wf({
        spec: stage('full', 'review'),
        impl: NONE,
        pr: NONE,
        merge: NONE
      })
    );

    const bar = m.querySelector('.seg .bar');

    expect(bar?.classList.contains('full')).toBe(true);
    expect(bar?.textContent?.trim()).toBe('✓');
  });

  test('fill=full + glyph=skip: b-spec full + ⊘', () => {
    const m = mountStepper(
      wf({ spec: stage('full', 'skip'), impl: NONE, pr: NONE, merge: NONE })
    );

    const bar = m.querySelector('.seg .bar');

    expect(bar?.classList.contains('full')).toBe(true);
    expect(bar?.textContent?.trim()).toBe('⊘');
  });

  test('fill=full + glyph=null: filled with no glyph', () => {
    const m = mountStepper(
      wf({
        spec: stage('full', 'skip'),
        impl: stage('full', 'review'),
        pr: stage('full'),
        merge: NONE
      })
    );

    const prBar = m.querySelectorAll('.seg .bar')[2];

    expect(prBar.classList.contains('b-pr')).toBe(true);
    expect(prBar.classList.contains('full')).toBe(true);
    expect(prBar.textContent?.trim()).toBe('');
  });

  test('stale cell keeps its faded stage color plus the stale class', () => {
    const m = mountStepper(
      wf({
        spec: stage('dim', 'review', true),
        impl: NONE,
        pr: NONE,
        merge: NONE
      })
    );

    const bar = m.querySelector('.seg .bar');

    expect(bar?.classList.contains('b-spec')).toBe(true);
    expect(bar?.classList.contains('dim')).toBe(true);
    expect(bar?.classList.contains('stale')).toBe(true);
    expect(bar?.classList.contains('full')).toBe(false);
    expect(bar?.textContent?.trim()).toBe('✓');
  });

  test('renders a stale skip cell as ⊘ with the stale class', () => {
    const m = mountStepper(
      wf({
        spec: stage('dim', 'skip', true),
        impl: NONE,
        pr: NONE,
        merge: NONE
      })
    );

    const bar = m.querySelector('.seg .bar');

    expect(bar?.classList.contains('stale')).toBe(true);
    expect(bar?.textContent?.trim()).toBe('⊘');
  });

  test('cur lands on first dim cell only while active (in_progress)', () => {
    const m = mountStepper(
      wf(
        {
          spec: stage('full', 'review'),
          plan: stage('full'),
          impl: stage('dim'),
          pr: NONE,
          merge: NONE
        },
        'full_plan'
      ),
      'in_progress'
    );

    const bars = Array.from(m.querySelectorAll('.seg .bar'));

    expect(bars.filter((b) => b.classList.contains('cur')).length).toBe(1);
    // impl is index 2 in full_plan order.
    expect(bars[2].classList.contains('cur')).toBe(true);
    expect(bars[2].getAttribute('style')).toContain('--stage-impl-on');
  });

  test('cur skips a stale dim cell and lands on the next fresh one', () => {
    const m = mountStepper(
      wf({
        spec: stage('dim', 'review', true),
        impl: stage('dim'),
        pr: NONE,
        merge: NONE
      }),
      'in_progress'
    );

    const bars = Array.from(m.querySelectorAll('.seg .bar'));

    expect(bars[0].classList.contains('cur')).toBe(false);
    expect(bars[1].classList.contains('cur')).toBe(true);
  });

  test('no cur when status is not active (open), even with a dim cell', () => {
    const m = mountStepper(
      wf({ spec: stage('dim'), impl: NONE, pr: NONE, merge: NONE }),
      'open'
    );

    expect(m.querySelectorAll('.seg .bar.cur').length).toBe(0);
  });

  test('container aria-label spells out every stage state', () => {
    const m = mountStepper(
      wf({
        spec: stage('full', 'review'),
        impl: stage('dim'),
        pr: NONE,
        merge: NONE
      }),
      'in_progress'
    );

    expect(m.querySelector('.stp')?.getAttribute('aria-label')).toBe(
      '워크플로우 진행: spec 검토 완료 · impl 진행 중 · pr 미도달 · merge 미도달'
    );
  });

  test('plan aria-label distinguishes draft review from native approval', () => {
    const m = mountStepper(
      wf(
        {
          spec: stage('full', 'review'),
          plan: {
            ...stage('full', 'skip'),
            approval_receipt: 'user@' + 'a'.repeat(40),
            approval_state: 'fresh'
          },
          impl: NONE,
          pr: NONE,
          merge: NONE
        },
        'full_plan'
      ),
      'in_progress'
    );

    expect(m.querySelector('.stp')?.getAttribute('aria-label')).toContain(
      'plan 검토 생략 · 승인 완료'
    );
  });

  test('plan aria-label treats an empty plan stage as unreached', () => {
    const m = mountStepper(
      wf(
        {
          spec: stage('full', 'review'),
          plan: {
            ...stage('none'),
            approval_receipt: null,
            approval_state: 'missing'
          },
          impl: NONE,
          pr: NONE,
          merge: NONE
        },
        'full_plan'
      ),
      'in_progress'
    );

    expect(m.querySelector('.stp')?.getAttribute('aria-label')).toContain(
      'plan 미도달'
    );
  });

  test('plan aria-label exposes reviewed-but-unapproved and stale approval', () => {
    const pending = mountStepper(
      wf(
        {
          spec: stage('full', 'review'),
          plan: {
            ...stage('dim', 'review'),
            approval_receipt: null,
            approval_state: 'missing'
          },
          impl: NONE,
          pr: NONE,
          merge: NONE
        },
        'full_plan'
      ),
      'in_progress'
    );
    expect(pending.querySelector('.stp')?.getAttribute('aria-label')).toContain(
      'plan 검토 완료 · 승인 필요'
    );

    const stale = mountStepper(
      wf(
        {
          spec: stage('full', 'review'),
          plan: {
            ...stage('dim', 'review', true),
            approval_receipt: 'user@' + 'a'.repeat(40),
            approval_state: 'stale'
          },
          impl: NONE,
          pr: NONE,
          merge: NONE
        },
        'full_plan'
      ),
      'resolved'
    );
    expect(stale.querySelector('.stp')?.getAttribute('aria-label')).toContain(
      'plan 검토 완료 · 재승인 필요'
    );
  });

  test('aria-label uses 재검토 필요 for stale and 완료 for a glyphless full', () => {
    const m = mountStepper(
      wf({
        spec: stage('dim', 'review', true),
        impl: stage('full'),
        pr: stage('full', 'skip'),
        merge: NONE
      }),
      'resolved'
    );

    expect(m.querySelector('.stp')?.getAttribute('aria-label')).toBe(
      '워크플로우 진행: spec 재검토 필요 · impl 완료 · pr 검토 생략 · merge 미도달'
    );
  });

  test('missing workflow renders nothing', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(stepperTemplate(null, 'open'), mount);

    expect(mount.querySelector('.stp')).toBeNull();
  });
});

describe('views/board/stepper doc cells (UI-ajkn §3)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  const SPEC_DOC = { path: 'docs/spec.md', missing_state: null };

  /**
   * @param {any} [doc]
   * @returns {any}
   */
  function withSpecDoc(doc = SPEC_DOC) {
    return wf({
      spec: { ...stage('full'), doc },
      impl: NONE,
      pr: NONE,
      merge: NONE
    });
  }

  /**
   * @param {any} workflow
   * @param {any} [options]
   * @returns {HTMLElement}
   */
  function mountWithOptions(workflow, options) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(stepperTemplate(workflow, 'in_progress', options), mount);
    return mount;
  }

  test('renders no buttons and keeps role=img without a handler', () => {
    const m = mountWithOptions(withSpecDoc());

    expect(m.querySelectorAll('button').length).toBe(0);
    expect(m.querySelector('.stp')?.getAttribute('role')).toBe('img');
  });

  test('turns only the cell that has a doc into a button', () => {
    const m = mountWithOptions(withSpecDoc(), { onOpenDoc: vi.fn() });

    const buttons = m.querySelectorAll('button.seg.seg--doc');
    expect(buttons.length).toBe(1);
    expect(buttons[0].querySelector('.lbl')?.textContent?.trim()).toBe('spec');
    expect(m.querySelectorAll('div.seg').length).toBe(3);
  });

  test('switches the container to role=group when a button exists', () => {
    const m = mountWithOptions(withSpecDoc(), { onOpenDoc: vi.fn() });

    const stp = /** @type {HTMLElement} */ (m.querySelector('.stp'));
    expect(stp.getAttribute('role')).toBe('group');
    expect(stp.getAttribute('aria-label')).toContain('워크플로우 진행:');
  });

  test('leaves a doc-less cell as a div even with a handler', () => {
    const m = mountWithOptions(
      wf({ spec: stage('full'), impl: NONE, pr: NONE, merge: NONE }),
      { onOpenDoc: vi.fn() }
    );

    expect(m.querySelectorAll('button').length).toBe(0);
    expect(m.querySelector('.stp')?.getAttribute('role')).toBe('img');
  });

  test('labels the button with the stage name and the document path', () => {
    const m = mountWithOptions(withSpecDoc(), { onOpenDoc: vi.fn() });

    const button = /** @type {HTMLElement} */ (m.querySelector('.seg--doc'));
    expect(button.getAttribute('aria-label')).toBe(
      'spec 문서 열기 · docs/spec.md'
    );
    expect(button.getAttribute('title')).toBe('spec 문서 열기 · docs/spec.md');
  });

  test('calls onOpenDoc with the event, doc and stage key on click', () => {
    const onOpenDoc = vi.fn();
    const m = mountWithOptions(withSpecDoc(), { onOpenDoc });

    /** @type {HTMLElement} */ (m.querySelector('.seg--doc')).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    expect(onOpenDoc).toHaveBeenCalledTimes(1);
    const [ev, doc, key] = onOpenDoc.mock.calls[0];
    expect(ev.type).toBe('click');
    expect(doc).toEqual(SPEC_DOC);
    expect(key).toBe('spec');
  });

  test('stops the click from reaching an ancestor click handler', () => {
    const outer = vi.fn();
    const m = mountWithOptions(withSpecDoc(), { onOpenDoc: vi.fn() });
    m.addEventListener('click', outer);

    /** @type {HTMLElement} */ (m.querySelector('.seg--doc')).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    expect(outer).not.toHaveBeenCalled();
  });

  test('renders a plan cell button from its own doc', () => {
    const m = mountWithOptions(
      wf(
        {
          spec: stage('full'),
          plan: {
            ...stage('dim'),
            doc: { path: 'docs/plan.md', missing_state: 'plan_pending' }
          },
          impl: NONE,
          pr: NONE,
          merge: NONE
        },
        'full_plan'
      ),
      { onOpenDoc: vi.fn() }
    );

    const button = /** @type {HTMLElement} */ (m.querySelector('.seg--doc'));
    expect(button.getAttribute('aria-label')).toBe(
      'plan 문서 열기 · docs/plan.md'
    );
  });
});
