/**
 * The bulk window `전역` tab's `활성 모델` group (UI-ooc0 §5).
 *
 * One checkbox per catalog model, per runner; checked means the model shows in
 * selectors. The list is server-global, so this group reads and writes only
 * the `model-visibility-snapshot` material. A toggle IS the mutation: it sends
 * the whole disabled list under the snapshot's revision CAS, and on `conflict`
 * re-applies the same toggle once on the snapshot the server answered with.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../data/model-visibility-store.js').ModelVisibilityState} ModelVisibilityState
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { errorText } from '../../utils/error-text.js';

/** The info line under the group title. */
export const MODEL_VISIBILITY_INTRO =
  '끈 모델은 선택 목록에서만 빠집니다. 이미 저장된 값과 과거 비용은 그대로입니다.';

/** Tooltip of a runner's last enabled checkbox. */
const LAST_ENABLED_TITLE = '러너마다 하나 이상 켜 두어야 합니다.';

/**
 * What each `model-visibility-set` refusal means (server
 * `ModelVisibilityErrorCode`); an unknown code travels through raw.
 */
const REFUSAL_SENTENCES = /** @type {Record<string, string>} */ ({
  conflict:
    '다른 창에서 먼저 바뀌었습니다 — 새 목록으로 다시 시도해도 저장하지 못했습니다',
  unknown_model: '카탈로그에 없는 모델입니다',
  runner_all_disabled: '러너마다 하나 이상 켜 두어야 합니다',
  invalid_disabled_models: '끈 모델 목록 형식이 올바르지 않습니다'
});

/**
 * The refusal line: the sentence and, for tracing, the code itself.
 *
 * @param {unknown} err
 * @returns {string}
 */
function refusalText(err) {
  const code = /** @type {any} */ (err)?.code;
  if (typeof code !== 'string' || code.length === 0) {
    return `활성 모델 저장 실패: ${errorText(err)}`;
  }
  const sentence = REFUSAL_SENTENCES[code];
  return sentence
    ? `활성 모델 저장 실패 — ${sentence} (${code})`
    : `활성 모델 저장 실패: ${code}`;
}

/** Subheading per runner key. */
const RUNNER_LABELS = /** @type {Record<string, string>} */ ({
  claude: 'Claude',
  codex: 'Codex'
});

/**
 * The disabled list after flipping one model's enabled state.
 *
 * @param {ReadonlyArray<string>} disabled_models
 * @param {string} model
 * @param {boolean} enabled
 * @returns {string[]}
 */
function toggledList(disabled_models, model, enabled) {
  const rest = disabled_models.filter((name) => name !== model);
  return enabled ? rest : [...rest, model];
}

/**
 * Mount the group into `host`.
 *
 * @param {HTMLElement} host
 * @param {{
 *   transport: (type: any, payload?: unknown) => Promise<any>,
 *   modelVisibilityStore?: { get: () => ModelVisibilityState|null, set?: (state: ModelVisibilityState|null) => void, subscribe?: (fn: () => void) => () => void }
 * }} options
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createModelVisibilitySection(host, options) {
  /** @type {string} */
  let error = '';
  let busy = false;
  /** @type {(() => void)|null} */
  let unsubscribe = null;

  if (options.modelVisibilityStore?.subscribe) {
    unsubscribe = options.modelVisibilityStore.subscribe(() => doRender());
  }

  /** @returns {ModelVisibilityState|null} */
  function snapshot() {
    const state = options.modelVisibilityStore?.get() ?? null;
    return state &&
      typeof state.revision === 'number' &&
      Array.isArray(state.disabled_models) &&
      state.runners &&
      typeof state.runners === 'object'
      ? state
      : null;
  }

  /**
   * Adopt a server snapshot into the shared store.
   *
   * @param {any} next
   */
  function adopt(next) {
    if (
      next &&
      typeof next.revision === 'number' &&
      Array.isArray(next.disabled_models)
    ) {
      options.modelVisibilityStore?.set?.(next);
    }
  }

  /**
   * Send one list; resolves to the server's success reply or rejects with its
   * error (`{ code, details: { snapshot } }`).
   *
   * @param {ModelVisibilityState} base
   * @param {string} model
   * @param {boolean} enabled
   * @returns {Promise<any>}
   */
  function send(base, model, enabled) {
    return options.transport('model-visibility-set', {
      expected_revision: base.revision,
      disabled_models: toggledList(base.disabled_models, model, enabled)
    });
  }

  /**
   * @param {string} model
   * @param {boolean} enabled
   */
  async function onToggle(model, enabled) {
    const state = snapshot();
    if (!state || busy) {
      return;
    }
    busy = true;
    error = '';
    doRender();
    try {
      let res;
      try {
        res = await send(state, model, enabled);
      } catch (err) {
        const received = /** @type {any} */ (err)?.details?.snapshot;
        if (/** @type {any} */ (err)?.code !== 'conflict' || !received) {
          throw err;
        }
        adopt(received);
        res = await send(received, model, enabled);
      }
      adopt(res?.snapshot);
    } catch (err) {
      adopt(/** @type {any} */ (err)?.details?.snapshot);
      error = refusalText(err);
    } finally {
      busy = false;
      doRender();
    }
  }

  /**
   * @param {string} runner
   * @param {Array<{ name: string, id: string }>} models
   * @param {ReadonlyArray<string>} disabled_models
   * @returns {TemplateResult}
   */
  function runnerTemplate(runner, models, disabled_models) {
    const enabled_count = models.filter(
      (model) => !disabled_models.includes(model.name)
    ).length;
    return html`<div
      class="settings-dialog__model-runner"
      data-runner=${runner}
    >
      <div class="settings-dialog__model-runner-title">
        ${RUNNER_LABELS[runner] ?? runner}
      </div>
      <div class="settings-dialog__toggles">
        ${models.map((model) => {
          const enabled = !disabled_models.includes(model.name);
          const last = enabled && enabled_count <= 1;
          return html`<label
            class="settings-dialog__toggle"
            title=${last ? LAST_ENABLED_TITLE : ''}
          >
            <input
              type="checkbox"
              data-model=${model.name}
              .checked=${live(enabled)}
              ?disabled=${last || busy}
              @change=${(/** @type {Event} */ ev) =>
                void onToggle(
                  model.name,
                  /** @type {HTMLInputElement} */ (ev.target).checked
                )}
            />
            <span>${model.name}</span>
            <span class="settings-dialog__hint">${model.id}</span>
          </label>`;
        })}
      </div>
    </div>`;
  }

  function doRender() {
    const state = snapshot();
    if (!state) {
      render(html``, host);
      return;
    }
    render(
      html`<section
        class="settings-dialog__group"
        data-group="model-visibility"
      >
        <div class="settings-dialog__group-title">활성 모델</div>
        <p class="settings-dialog__hint">${MODEL_VISIBILITY_INTRO}</p>
        ${Object.entries(state.runners).map(([runner, models]) =>
          runnerTemplate(
            runner,
            Array.isArray(models) ? models : [],
            state.disabled_models
          )
        )}
        ${error ? html`<p class="settings-chips__error">${error}</p>` : ''}
      </section>`,
      host
    );
  }

  return {
    render: doRender,
    destroy() {
      unsubscribe?.();
      unsubscribe = null;
    }
  };
}
