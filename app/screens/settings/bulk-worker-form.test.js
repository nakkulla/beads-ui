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
  /** Draw the general groups into the host; lit owns false state. */
  function draw() {
    render(form.template(), host);
  }
  draw();
  return { host, form };
}

/**
 * Mount BOTH profile forms the way the bulk pane does: two hosts, one redraw
 * of each per change, and the quick_fix labels resolving against the general
 * screen values.
 *
 * @param {Array<Record<string, any>>} [rows]
 */
function mountPair(rows = [row()]) {
  const host = document.createElement('div');
  const quick_fix_host = document.createElement('div');
  document.body.appendChild(host);
  document.body.appendChild(quick_fix_host);
  const form = createBulkWorkerForm({
    rows: () => rows,
    profile: 'general',
    onChange: () => draw()
  });
  const quick_fix_form = createBulkWorkerForm({
    rows: () => rows,
    profile: 'quick_fix',
    resolutionValues: () => form.values(),
    onChange: () => draw()
  });
  /** Draw both tabs; each host holds one profile's groups only. */
  function draw() {
    render(form.template(), host);
    render(quick_fix_form.template(), quick_fix_host);
  }
  draw();
  return { host, quick_fix_host, form, quick_fix_form };
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

    expect(Object.keys(kv)).toHaveLength(13);
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
      orchestration_speed: null
    });
  });

  test('keeps the quick_fix storage keys out of the general payloads', () => {
    const { form } = mount();

    const keys = [
      ...Object.keys(form.kvValues()),
      ...Object.keys(form.queueValues())
    ];

    expect(keys.some((key) => key.startsWith('quick_fix_'))).toBe(false);
  });
});

describe('createBulkWorkerForm rows (UI-e1ta §4)', () => {
  test('draws the preset-only Bead 실행 방식 row among the seventeen', () => {
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

describe('createBulkWorkerForm quick_fix tab (UI-uohc §6.2)', () => {
  test('omits the delegation rows while the resolved dispatch is main', () => {
    const { quick_fix_host } = mountPair();

    const delegation_row = el(
      quick_fix_host,
      '[data-bulk-key="quick_fix_impl_runtime"]'
    );

    expect(delegation_row).toBe(null);
    expect(el(quick_fix_host, '[data-bulk-quick-fix-main]')).not.toBe(null);
  });

  test('shows the general value an empty quick_fix row inherits', () => {
    const { host, quick_fix_host } = mountPair();
    choose(quick_fix_host, 'quick_fix_impl_dispatch', 'delegated');
    const harness_label = el(
      quick_fix_host,
      '[data-bulk-key="quick_fix_impl_model"]'
    ).options[0].textContent;

    choose(host, 'impl_runtime', 'claude');
    choose(host, 'impl_model', 'opus');

    expect(harness_label.trim()).toBe('기본값 사용 — 5.6-sol');
    expect(
      el(
        quick_fix_host,
        '[data-bulk-key="quick_fix_impl_model"]'
      ).options[0].textContent.trim()
    ).toBe('기본값 사용 — opus');
  });

  test('keeps the general rows out of the quick_fix tab', () => {
    const { quick_fix_host } = mountPair();

    expect(el(quick_fix_host, '[data-bulk-key="impl_model"]')).toBe(null);
    expect(el(quick_fix_host, '[data-bulk-key="impl_review_model"]')).toBe(
      null
    );
    expect(el(quick_fix_host, '[data-bulk-key="orchestration_model"]')).toBe(
      null
    );
  });

  test('keeps the quick_fix rows out of the worker tab', () => {
    const { host } = mountPair();

    expect(el(host, '[data-bulk-key="quick_fix_impl_dispatch"]')).toBe(null);
    expect(el(host, '[data-bulk-key="quick_fix_orchestration_model"]')).toBe(
      null
    );
  });

  test('writes eight rows across its two payloads', () => {
    const { quick_fix_form } = mountPair();

    const kv = quick_fix_form.kvValues();
    const queue = quick_fix_form.queueValues();

    expect(Object.keys(kv)).toEqual([
      'quick_fix_impl_dispatch',
      'quick_fix_impl_runtime',
      'quick_fix_impl_model',
      'quick_fix_impl_effort',
      'quick_fix_impl_speed'
    ]);
    expect(Object.keys(queue)).toEqual([
      'quick_fix_orchestration_model',
      'quick_fix_orchestration_effort',
      'quick_fix_orchestration_speed'
    ]);
  });

  test('saves its rows under canonical preset key names', () => {
    const { quick_fix_host, quick_fix_form } = mountPair();

    choose(quick_fix_host, 'quick_fix_orchestration_model', 'opus');

    expect(quick_fix_form.presetSettings()).toEqual({
      orchestration_model: 'opus'
    });
  });

  test('fills its rows from a preset written in canonical names', () => {
    const { quick_fix_form } = mountPair();

    quick_fix_form.applyPreset({
      orchestration_model: 'opus',
      impl_dispatch: 'delegated',
      impl_model: 'sol'
    });

    expect(quick_fix_form.values()).toEqual({
      quick_fix_orchestration_model: 'opus',
      quick_fix_impl_dispatch: 'delegated',
      quick_fix_impl_model: 'sol'
    });
  });

  test('leaves the worker tab untouched when a preset fills it', () => {
    const { form, quick_fix_form } = mountPair();

    quick_fix_form.applyPreset({ impl_model: 'sol' });

    expect(form.values()).toEqual({});
  });
});

describe('createBulkWorkerForm quick_fix observation (UI-uohc §6.2)', () => {
  /**
   * One ticked repo whose session-defaults layer is read, carrying whatever
   * quick_fix values the case needs. The boolean `ready` marker is what keeps
   * the rows out of `미확인`.
   *
   * @param {string} name
   * @param {Record<string, any>} session_defaults
   * @param {Record<string, any>} [patch]
   * @returns {Record<string, any>}
   */
  function readRow(name, session_defaults, patch = {}) {
    return row({
      root_dir: `/tmp/example/${name}`,
      name,
      session_defaults_state: 'ready',
      session_defaults,
      ...patch
    });
  }

  test('stands a row on the value every repo agrees on', () => {
    const rows = [
      readRow('repo-a', { quick_fix_impl_model: 'sol' }),
      readRow('repo-b', { quick_fix_impl_model: 'sol' })
    ];
    const { quick_fix_form } = mountPair(rows);

    quick_fix_form.observe();

    expect(quick_fix_form.observationOf('quick_fix_impl_model')?.state).toBe(
      'same'
    );
    expect(quick_fix_form.values().quick_fix_impl_model).toBe('sol');
  });

  test('stands a row nobody has set on 비어 있음', () => {
    const { quick_fix_form } = mountPair([readRow('repo-a', {})]);

    quick_fix_form.observe();

    expect(quick_fix_form.observationOf('quick_fix_impl_model')?.state).toBe(
      'empty'
    );
  });

  test('holds a row whose repos disagree at 갈림', () => {
    const rows = [
      readRow('repo-a', { quick_fix_impl_model: 'sol' }),
      readRow('repo-b', { quick_fix_impl_model: 'opus' })
    ];
    const { quick_fix_form } = mountPair(rows);

    quick_fix_form.observe();

    expect(quick_fix_form.holdStateOf('quick_fix_impl_model')).toBe('mixed');
  });

  test('holds a row whose layer one repo has not read at 미확인', () => {
    const rows = [
      readRow('repo-a', { quick_fix_impl_model: 'sol' }),
      row({
        root_dir: '/tmp/example/repo-b',
        name: 'repo-b',
        session_defaults_state: 'pending'
      })
    ];
    const { quick_fix_form } = mountPair(rows);

    quick_fix_form.observe();

    expect(quick_fix_form.holdStateOf('quick_fix_impl_model')).toBe('pending');
  });

  test('leaves a held quick_fix row out of the kv payload', () => {
    const rows = [
      readRow('repo-a', { quick_fix_impl_model: 'sol' }),
      readRow('repo-b', { quick_fix_impl_model: 'opus' })
    ];
    const { quick_fix_form } = mountPair(rows);

    quick_fix_form.observe();

    expect(
      Object.hasOwn(quick_fix_form.kvValues(), 'quick_fix_impl_model')
    ).toBe(false);
  });

  test('takes every held row into the payload once a preset fills them', () => {
    const rows = [
      readRow('repo-a', { quick_fix_impl_model: 'sol' }),
      readRow('repo-b', { quick_fix_impl_model: 'opus' })
    ];
    const { quick_fix_form } = mountPair(rows);
    quick_fix_form.observe();

    quick_fix_form.applyPreset({ impl_model: 'sol' });

    expect(quick_fix_form.kvValues().quick_fix_impl_model).toBe('sol');
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
