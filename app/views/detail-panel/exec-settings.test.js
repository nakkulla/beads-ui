import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { MODELS, execSettingsTemplate } from './exec-settings.js';

/**
 * @param {HTMLElement} mount
 * @param {string} key
 * @returns {HTMLSelectElement}
 */
function selectFor(mount, key) {
  return /** @type {HTMLSelectElement} */ (
    mount.querySelector(`select[data-key="${key}"]`)
  );
}

/**
 * @param {HTMLSelectElement} sel
 * @returns {string[]}
 */
function optionValues(sel) {
  return Array.from(sel.options).map((o) => o.value);
}

describe('views/detail-panel/exec-settings', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('the model catalog is the claude one, with no runner row (worker-phase1 §4)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      execSettingsTemplate({ metadata: {} }, { onChange: vi.fn() }),
      mount
    );
    expect(selectFor(mount, 'worker_runner')).toBe(null);
    const model = selectFor(mount, 'orchestration_model');
    expect(optionValues(model)).toEqual(['', ...MODELS]);
    expect(optionValues(model)).not.toContain('gpt-5.6');
  });

  test('workflow_mode defaults to standard and emits standard/fast_track', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const onChange = vi.fn();
    render(execSettingsTemplate({ metadata: {} }, { onChange }), mount);
    const wfSel = selectFor(mount, 'workflow_mode');
    expect(wfSel.value).toBe('standard');
    expect(optionValues(wfSel)).toEqual(['standard', 'fast_track']);

    wfSel.value = 'fast_track';
    wfSel.dispatchEvent(new Event('change', { bubbles: true }));
    expect(onChange).toHaveBeenCalledWith('workflow_mode', 'fast_track');
  });

  test('the (기본) option uses the static fallback label when no global default exists (§3.2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      execSettingsTemplate({ metadata: {} }, { onChange: vi.fn() }),
      mount
    );
    const review = selectFor(mount, 'review_model');
    expect(review.options[0].value).toBe('');
    expect(review.options[0].textContent).toContain('기본: codex');
    const impl = selectFor(mount, 'impl_model');
    expect(impl.options[0].textContent).toContain('기본: 티어 자동');
  });

  test('a workspace-global exec default surfaces as the (기본: <값> — 전역) label (§3.2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      execSettingsTemplate(
        { metadata: {} },
        { onChange: vi.fn() },
        { review_model: 'opus' }
      ),
      mount
    );
    const review = selectFor(mount, 'review_model');
    expect(review.options[0].textContent).toContain('기본: opus');
    expect(review.options[0].textContent).toContain('전역');
  });

  test('a set metadata value pre-selects and highlights (workflow_mode)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      execSettingsTemplate(
        { metadata: { workflow_mode: 'fast_track' } },
        { onChange: vi.fn() }
      ),
      mount
    );
    const wfSel = selectFor(mount, 'workflow_mode');
    expect(wfSel.value).toBe('fast_track');
    expect(wfSel.classList.contains('detail-kv__v--sel')).toBe(true);
  });

  test('an edit emits the key/value pair for the server mutation', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const onChange = vi.fn();
    render(execSettingsTemplate({ metadata: {} }, { onChange }), mount);
    const model = selectFor(mount, 'orchestration_model');
    model.value = 'sonnet';
    model.dispatchEvent(new Event('change', { bubbles: true }));
    expect(onChange).toHaveBeenCalledWith('orchestration_model', 'sonnet');
  });
});
