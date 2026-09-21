import { render } from 'lit-html';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createBulkWorkerForm } from './bulk-worker-form.js';

const CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'opus', efforts: ['low', 'high'] } } },
    codex: {
      models: {
        sol: {
          id: 'gpt-5.6-sol',
          efforts: ['medium'],
          orchestration_efforts: ['medium', 'ultra'],
          speed_tiers: ['default', 'fast']
        }
      }
    }
  },
  model_index: { opus: 'claude', sol: 'codex' }
};

const EXECUTION_DEFAULTS = {
  supported: true,
  schema_version: 1,
  session: {
    workflow_mode_default: 'standard',
    review: {
      default: 'codex',
      reviewers: {
        codex: { model: 'gpt-5.6-sol', effort: 'xhigh' },
        fable: { model: 'fable', effort: 'high' }
      }
    },
    plan_review: { standard_recommended: 'codex', fast_track_default: 'fable' },
    implementation: {
      default: {
        dispatch: 'delegated',
        runtime: 'codex',
        model: 'sol',
        model_id: 'gpt-5.6-sol',
        effort: 'auto',
        speed: 'default'
      },
      route_defaults: { quick_fix: { dispatch: 'main' } },
      model_catalog: { codex: { sol: 'gpt-5.6-sol' } },
      effort_by_transport: {}
    }
  },
  orchestration: {
    runtime: 'claude',
    model: 'opus',
    model_id: 'opus',
    effort: null,
    speed: 'default'
  }
};

/**
 * A monitor row carrying the catalog and the harness projection.
 *
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function row(patch = {}) {
  return {
    root_dir: '/tmp/example/repo-a',
    name: 'repo-a',
    revision: 1,
    runner_catalog: CATALOG,
    execution_defaults: EXECUTION_DEFAULTS,
    quick_fix_orchestration_model: null,
    ...patch
  };
}

/**
 * Mount the form the way the pane does: one host, one redraw per change.
 *
 * @param {Array<Record<string, any>>} [rows]
 */
function mount(rows = [row()]) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const form = createBulkWorkerForm({
    rows: () => rows,
    onChange: () => draw()
  });
  /** Draw the four groups into the host. */
  function draw() {
    render(form.template(), host);
  }
  draw();
  return { host, form };
}

/**
 * @param {HTMLElement} host
 * @param {string} selector
 * @returns {any}
 */
function el(host, selector) {
  return /** @type {any} */ (host.querySelector(selector));
}

/**
 * @param {HTMLElement} host
 * @param {string} key
 * @param {string} value
 */
function choose(host, key, value) {
  const select = /** @type {HTMLSelectElement} */ (
    el(host, `[data-bulk-key="${key}"]`)
  );
  select.value = value;
  select.dispatchEvent(new Event('change', { bubbles: true }));
}

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('createBulkWorkerForm preset fill (UI-628r §2.2)', () => {
  test('takes the keys a preset names and clears the ones it omits', () => {
    const { host, form } = mount();
    choose(host, 'impl_review_model', 'fable');

    form.applyPreset({
      impl_runtime: 'codex',
      impl_model: 'sol',
      orchestration_model: 'opus',
      impl_dispatch: 'main'
    });

    expect(form.values()).toEqual({
      impl_runtime: 'codex',
      impl_model: 'sol',
      orchestration_model: 'opus',
      impl_dispatch: 'main'
    });
  });

  test('matches the preset it was just filled from', () => {
    const { form } = mount();
    const settings = { impl_runtime: 'codex', impl_model: 'sol' };

    form.applyPreset(settings);

    expect(form.equalsPreset(settings)).toBe(true);
  });

  test('stops matching the preset once one row moves', () => {
    const { host, form } = mount();
    const settings = { impl_runtime: 'codex', impl_model: 'sol' };
    form.applyPreset(settings);

    choose(host, 'impl_effort', 'medium');

    expect(form.equalsPreset(settings)).toBe(false);
  });
});

describe('createBulkWorkerForm payloads (UI-628r §4.1)', () => {
  test('carries an untouched key as null in the kv values', () => {
    const { form } = mount();
    form.applyPreset({ impl_model: 'sol' });

    const kv = form.kvValues();

    expect(Object.keys(kv)).toHaveLength(18);
    expect(kv.impl_model).toBe('sol');
    expect(kv.impl_effort).toBe(null);
  });

  test('carries an untouched key as null in the queue values', () => {
    const { form } = mount();
    form.applyPreset({ orchestration_model: 'opus' });

    const queue = form.queueValues();

    expect(queue).toEqual({
      orchestration_model: 'opus',
      orchestration_effort: null,
      orchestration_speed: null,
      quick_fix_orchestration_model: null,
      quick_fix_orchestration_effort: null,
      quick_fix_orchestration_speed: null
    });
  });
});

describe('createBulkWorkerForm rows (UI-e1ta §4)', () => {
  test('draws the preset-only Bead 실행 방식 row among the twenty-five', () => {
    const { host } = mount();

    expect(el(host, '[data-bulk-key="impl_dispatch"]')).not.toBe(null);
    expect(
      el(host, '[data-bulk-badge="impl_dispatch"]').textContent.trim()
    ).toBe('프리셋에만 담김 · 저장소에는 안 씀');
  });

  test('keeps Bead 실행 방식 out of both apply payloads', () => {
    const { host, form } = mount();

    choose(host, 'impl_dispatch', 'main');

    expect(Object.hasOwn(form.kvValues(), 'impl_dispatch')).toBe(false);
    expect(Object.hasOwn(form.queueValues(), 'impl_dispatch')).toBe(false);
    expect(form.presetSettings().impl_dispatch).toBe('main');
  });
});

describe('createBulkWorkerForm narrowing (UI-628r §3.4)', () => {
  test('drops the model and effort a newly chosen provider cannot run', () => {
    const { host, form } = mount();
    choose(host, 'orchestration_runtime', 'codex');
    choose(host, 'orchestration_model', 'sol');
    choose(host, 'orchestration_effort', 'ultra');

    choose(host, 'orchestration_runtime', 'claude');

    expect(form.values()).toEqual({});
  });
});

describe('createBulkWorkerForm quick_fix lane (UI-628r §3.2)', () => {
  test('omits the delegation rows while the resolved dispatch is main', () => {
    const { host } = mount();

    const delegation_row = el(host, '[data-bulk-key="quick_fix_impl_runtime"]');

    expect(delegation_row).toBe(null);
    expect(el(host, '[data-bulk-quick-fix-main]')).not.toBe(null);
  });

  test('shows the general value an empty quick_fix row inherits', () => {
    const { host } = mount();
    choose(host, 'quick_fix_impl_dispatch', 'delegated');
    const harness_label = el(host, '[data-bulk-key="quick_fix_impl_model"]')
      .options[0].textContent;

    choose(host, 'impl_runtime', 'claude');
    choose(host, 'impl_model', 'opus');

    expect(harness_label.trim()).toBe('기본값 사용 — 5.6-sol');
    expect(
      el(
        host,
        '[data-bulk-key="quick_fix_impl_model"]'
      ).options[0].textContent.trim()
    ).toBe('기본값 사용 — opus');
  });
});

describe('createBulkWorkerForm holds (UI-e1ta §3.1, §3.2)', () => {
  /**
   * Two ticked repos that disagree about `impl_model`, so that row observes
   * `갈림` while the rest observe `비어 있음`. Both carry `ready`.
   *
   * @returns {Array<Record<string, any>>}
   */
  function mixedModelRows() {
    return [
      row({
        root_dir: '/tmp/example/repo-a',
        name: 'repo-a',
        session_defaults_state: 'ready',
        session_defaults: { impl_model: 'opus' }
      }),
      row({
        root_dir: '/tmp/example/repo-b',
        name: 'repo-b',
        session_defaults_state: 'ready',
        session_defaults: { impl_model: 'sol' }
      })
    ];
  }

  test('stops matching a preset once a row it omits goes back to its hold', () => {
    const { host, form } = mount(mixedModelRows());
    form.observe();
    const settings = { impl_review_model: 'fable' };
    form.applyPreset(settings);

    choose(host, 'impl_model', '__bulk_hold__');

    expect(form.equalsPreset(settings)).toBe(false);
  });

  test('keeps an untouched coupled row on its hold when another one changes', () => {
    const { host, form } = mount(mixedModelRows());
    form.observe();

    choose(host, 'impl_effort', 'high');

    const kv = form.kvValues();
    expect(Object.hasOwn(kv, 'impl_model')).toBe(false);
    expect(kv.impl_effort).toBe('high');
  });
});
