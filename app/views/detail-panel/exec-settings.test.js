import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { execSettingsTemplate, modelsForRunner } from './exec-settings.js';

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

  test('modelsForRunner is runner-specific (ccx reuses claude)', () => {
    expect(modelsForRunner('claude')).toContain('opus');
    expect(modelsForRunner('codex')).toContain('gpt-5.6');
    expect(modelsForRunner('codex')).not.toContain('opus');
    expect(modelsForRunner('ccx')).toEqual(modelsForRunner('claude'));
  });

  test('choosing codex changes the available orchestration_model options', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    // Local effective-metadata mirror + re-rendering handler, mimicking how the
    // detail panel applies an in-flight edit before the server round-trip.
    const md = /** @type {Record<string, string>} */ ({
      worker_runner: 'claude'
    });
    const onChange = vi.fn((key, value) => {
      md[key] = value;
      doRender();
    });
    function doRender() {
      render(execSettingsTemplate({ metadata: md }, { onChange }), mount);
    }
    doRender();

    // Initially claude models are offered.
    let modelSel = selectFor(mount, 'orchestration_model');
    expect(optionValues(modelSel)).toContain('opus');
    expect(optionValues(modelSel)).not.toContain('gpt-5.6');

    // Switch the runner to codex.
    const runnerSel = selectFor(mount, 'worker_runner');
    runnerSel.value = 'codex';
    runnerSel.dispatchEvent(new Event('change', { bubbles: true }));

    expect(onChange).toHaveBeenCalledWith('worker_runner', 'codex');
    modelSel = selectFor(mount, 'orchestration_model');
    expect(optionValues(modelSel)).toContain('gpt-5.6');
    expect(optionValues(modelSel)).not.toContain('opus');
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
    const runner = selectFor(mount, 'worker_runner');
    expect(runner.options[0].textContent).toContain('기본: claude');
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

  test('the orchestration_model catalog follows the effective runner (global when bead unset) (§3.2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    // Bead worker_runner unset; the global default runner (codex) drives the
    // model catalog just as a bead pin would.
    render(
      execSettingsTemplate(
        { metadata: {} },
        { onChange: vi.fn() },
        { worker_runner: 'codex' }
      ),
      mount
    );
    const model = selectFor(mount, 'orchestration_model');
    expect(optionValues(model)).toContain('gpt-5.6');
    expect(optionValues(model)).not.toContain('opus');
  });

  test('a set metadata value pre-selects and highlights (worker_runner)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      execSettingsTemplate(
        { metadata: { worker_runner: 'codex' } },
        {
          onChange: vi.fn()
        }
      ),
      mount
    );
    const runnerSel = selectFor(mount, 'worker_runner');
    expect(runnerSel.value).toBe('codex');
    expect(runnerSel.classList.contains('detail-kv__v--sel')).toBe(true);
  });
});
