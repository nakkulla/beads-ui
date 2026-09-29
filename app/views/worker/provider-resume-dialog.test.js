import { render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import {
  providerResumeDialogTemplate,
  providerResumeDraft,
  providerResumeDraftChange
} from './provider-resume-dialog.js';

/**
 * @param {Record<string, any>} [attempt]
 * @returns {Record<string, any>}
 */
function queueWith(attempt = {}) {
  return {
    attempts: {
      a1: { runner: 'claude', model: 'opus', ...attempt }
    },
    runner_catalog: {
      runners: {
        claude: {
          default_model: 'opus',
          models: {
            opus: { id: 'opus' },
            'opus-4.8': { id: 'claude-opus-4-8' }
          }
        },
        codex: {
          default_model: 'terra',
          models: {
            terra: { id: 'gpt-5.6-terra' },
            astra: { id: 'gpt-6-astra' },
            sol: { id: 'gpt-6-sol' }
          }
        }
      }
    }
  };
}

/**
 * @param {any} draft
 * @param {Record<string, any>} queue
 * @param {string[]} disabled_models
 * @returns {HTMLSelectElement}
 */
function modelSelect(draft, queue, disabled_models) {
  const root = document.createElement('div');
  render(providerResumeDialogTemplate(draft, queue, disabled_models), root);
  return /** @type {HTMLSelectElement} */ (
    root.querySelector('.provider-resume-dialog__model')
  );
}

describe('provider resume dialog model visibility (UI-ooc0 §4.2)', () => {
  test('omits disabled models from the model choices', () => {
    const queue = queueWith();
    const draft = providerResumeDraft('a1', queue, ['opus-4.8', 'terra']);

    const select = modelSelect(draft, queue, ['opus-4.8', 'terra']);

    const labels = Array.from(select.options).map((option) =>
      option.textContent?.trim()
    );
    expect(labels).toEqual(['opus', 'astra', 'sol']);
  });

  test('keeps the original attempt disabled model selected as (비활성)', () => {
    const queue = queueWith({ model: 'opus-4.8' });
    const draft = providerResumeDraft('a1', queue, ['opus-4.8']);

    const select = modelSelect(draft, queue, ['opus-4.8']);

    const chosen = select.options[select.selectedIndex];
    expect(draft?.model).toBe('opus-4.8');
    expect(chosen.textContent?.trim()).toBe('opus-4.8 (비활성)');
  });

  test('picks the first enabled model when the new runner default is disabled', () => {
    const queue = queueWith();
    const draft = /** @type {any} */ (
      providerResumeDraft('a1', queue, ['terra'])
    );
    const runner_select = document.createElement('select');
    runner_select.className = 'provider-resume-dialog__runner';
    runner_select.innerHTML = '<option value="codex" selected>codex</option>';

    const next = providerResumeDraftChange(draft, runner_select, queue, [
      'terra'
    ]);

    expect(next?.runner).toBe('codex');
    expect(next?.model).toBe('astra');
  });
});
