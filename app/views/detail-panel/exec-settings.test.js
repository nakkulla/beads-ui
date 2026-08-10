import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { execSettingsTemplate, normalizeImplTarget } from './exec-settings.js';

/**
 * The catalog shape the server ships on the queue snapshot (`runner_catalog`).
 *
 * @returns {any}
 */
function catalogFixture() {
  return {
    runners: {
      claude: {
        command: 'claude',
        models: {
          opus: { id: 'opus' },
          sonnet: { id: 'sonnet' },
          haiku: { id: 'haiku' },
          fable: { id: 'fable' }
        },
        efforts: ['low', 'medium', 'high', 'xhigh'],
        default_model: 'opus'
      },
      codex: {
        command: 'codex',
        models: {
          sol: { id: 'gpt-5.6-sol', efforts: ['low', 'medium', 'high'] },
          terra: { id: 'gpt-5.6-terra', efforts: ['low', 'medium', 'high'] },
          luna: {
            id: 'gpt-5.6-luna',
            efforts: ['low', 'medium', 'high', 'xhigh', 'max']
          }
        },
        efforts: ['minimal', 'low', 'medium', 'high', 'xhigh']
      }
    },
    model_index: {
      opus: 'claude',
      sonnet: 'claude',
      haiku: 'claude',
      fable: 'claude',
      sol: 'codex',
      terra: 'codex',
      luna: 'codex'
    }
  };
}

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

/**
 * Optgroup labels → member option values, in DOM order.
 *
 * @param {HTMLSelectElement} sel
 * @returns {{ label: string, values: string[] }[]}
 */
function optionGroups(sel) {
  return Array.from(sel.querySelectorAll('optgroup')).map((g) => ({
    label: g.getAttribute('label') || '',
    values: Array.from(g.querySelectorAll('option')).map((o) => o.value)
  }));
}

/**
 * @param {Record<string, any>} [metadata]
 * @param {Record<string, any>} [exec_defaults]
 * @param {any} [catalog]
 * @param {{ onChange: (key: string, value: string) => void }} [handlers]
 * @returns {HTMLElement}
 */
function mountTemplate(metadata, exec_defaults, catalog, handlers) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  render(
    execSettingsTemplate(
      { metadata: metadata || {} },
      handlers || { onChange: vi.fn() },
      exec_defaults || {},
      catalog === undefined ? catalogFixture() : catalog
    ),
    mount
  );
  return mount;
}

describe('views/detail-panel/exec-settings key surface (dotfiles-mqcj)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('renders the 11 exec keys plus workflow_mode and drops review_model', () => {
    const mount = mountTemplate();

    for (const key of [
      'orchestration_model',
      'orchestration_effort',
      'spec_review_model',
      'spec_review_effort',
      'impl_review_model',
      'impl_review_effort',
      'impl_runtime',
      'plan_review_model',
      'plan_review_effort',
      'impl_model',
      'impl_effort',
      'workflow_mode'
    ]) {
      expect(selectFor(mount, key)).not.toBeNull();
    }
    expect(selectFor(mount, 'review_model')).toBe(null);
    expect(selectFor(mount, 'worker_runner')).toBe(null);
  });

  test('renders semantic Korean labels in workflow order with code keys', () => {
    const mount = mountTemplate();

    const labels = Array.from(
      mount.querySelectorAll('[data-exec-setting-label]')
    ).map((node) => ({
      label: node.querySelector('[data-exec-setting-title]')?.textContent,
      key: node.querySelector('[data-exec-setting-key]')?.textContent
    }));

    expect(labels).toEqual([
      { label: '워커 실행 모델', key: 'orchestration_model' },
      { label: '워커 reasoning effort', key: 'orchestration_effort' },
      { label: '스펙 리뷰어', key: 'spec_review_model' },
      { label: '스펙 리뷰 reasoning effort', key: 'spec_review_effort' },
      { label: '계획 리뷰어', key: 'plan_review_model' },
      { label: '계획 리뷰 reasoning effort', key: 'plan_review_effort' },
      { label: '구현 리뷰어', key: 'impl_review_model' },
      { label: '구현 리뷰 reasoning effort', key: 'impl_review_effort' },
      { label: '구현 runtime', key: 'impl_runtime' },
      { label: '구현 모델', key: 'impl_model' },
      { label: '구현 reasoning effort', key: 'impl_effort' },
      { label: '워크플로 모드', key: 'workflow_mode' }
    ]);
  });

  test('the review model vocabularies follow the contract, plan narrowed', () => {
    const mount = mountTemplate();

    expect(optionValues(selectFor(mount, 'spec_review_model'))).toEqual([
      '',
      'codex',
      'opus',
      'fable',
      'self',
      'skip'
    ]);
    expect(optionValues(selectFor(mount, 'impl_review_model'))).toEqual([
      '',
      'codex',
      'opus',
      'fable',
      'self',
      'skip'
    ]);
    expect(optionValues(selectFor(mount, 'plan_review_model'))).toEqual([
      '',
      'codex',
      'fable',
      'skip'
    ]);
  });

  test('every review effort selector offers the fixed four levels', () => {
    const mount = mountTemplate();

    for (const key of [
      'spec_review_effort',
      'impl_review_effort',
      'plan_review_effort'
    ]) {
      expect(optionValues(selectFor(mount, key))).toEqual([
        '',
        'low',
        'medium',
        'high',
        'xhigh'
      ]);
    }
  });

  test('each step key emits its own mutation', () => {
    const onChange = vi.fn();
    const mount = mountTemplate({ impl_runtime: 'codex' }, {}, undefined, {
      onChange
    });

    for (const [key, value] of [
      ['spec_review_model', 'codex'],
      ['spec_review_effort', 'high'],
      ['impl_review_model', 'self'],
      ['impl_review_effort', 'low'],
      ['plan_review_model', 'skip'],
      ['plan_review_effort', 'xhigh'],
      ['impl_model', 'sol'],
      ['impl_effort', 'medium']
    ]) {
      const sel = selectFor(mount, key);
      sel.value = value;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      expect(onChange).toHaveBeenCalledWith(key, value);
    }
  });
});

describe('views/detail-panel/exec-settings catalog-driven selectors', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('groups the orchestration models by their runner', () => {
    const mount = mountTemplate();

    expect(optionGroups(selectFor(mount, 'orchestration_model'))).toEqual([
      { label: 'claude', values: ['opus', 'sonnet', 'haiku', 'fable'] },
      { label: 'codex', values: ['sol', 'terra', 'luna'] }
    ]);
  });

  test('impl_model renders the explicit runtime catalog', () => {
    const mount = mountTemplate({ impl_runtime: 'codex' });

    expect(optionGroups(selectFor(mount, 'impl_model'))).toEqual([
      { label: 'codex', values: ['sol', 'terra', 'luna'] }
    ]);
  });

  test('shows the runner derived from the selected orchestration model', () => {
    const claude_row = mountTemplate();
    expect(
      claude_row.querySelector('[data-runner-for="orchestration_model"]')
        ?.textContent
    ).toContain('claude');

    document.body.innerHTML = '<div id="m"></div>';
    const codex_row = mountTemplate({ orchestration_model: 'luna' });
    expect(
      codex_row.querySelector('[data-runner-for="orchestration_model"]')
        ?.textContent
    ).toContain('codex');
  });

  test('the orchestration_effort vocabulary follows the resolved model', () => {
    const fallback = mountTemplate();
    // Nothing set anywhere → the hardcoded `opus` fallback's claude efforts.
    expect(optionValues(selectFor(fallback, 'orchestration_effort'))).toEqual([
      '',
      'low',
      'medium',
      'high',
      'xhigh'
    ]);

    document.body.innerHTML = '<div id="m"></div>';
    const luna = mountTemplate({ orchestration_model: 'luna' });
    expect(optionValues(selectFor(luna, 'orchestration_effort'))).toContain(
      'max'
    );

    document.body.innerHTML = '<div id="m"></div>';
    const from_global = mountTemplate({}, { orchestration_model: 'sol' });
    // sol pins low/medium/high — no xhigh, no max.
    expect(
      optionValues(selectFor(from_global, 'orchestration_effort'))
    ).toEqual(['', 'low', 'medium', 'high']);
  });

  test('impl_effort is the catalog union until an impl model is chosen', () => {
    const unpinned = mountTemplate();
    // The union is what any MODEL accepts; `minimal` sits on the codex
    // runner-wide list that every codex model in the fixture overrides.
    expect(optionValues(selectFor(unpinned, 'impl_effort'))).toEqual([
      '',
      'low',
      'medium',
      'high',
      'xhigh',
      'max'
    ]);

    document.body.innerHTML = '<div id="m"></div>';
    const pinned = mountTemplate({ impl_model: 'opus' });
    expect(optionValues(selectFor(pinned, 'impl_effort'))).toEqual([
      '',
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
  });

  test('a stored value outside the current vocabulary shows as (비호환)', () => {
    const mount = mountTemplate({ orchestration_effort: 'max' });

    const sel = selectFor(mount, 'orchestration_effort');
    expect(sel.value).toBe('max');
    expect(sel.options[sel.selectedIndex].textContent).toContain('비호환');
  });

  test('an absent catalog degrades to the stored value plus (기본) — fail-quiet', () => {
    const mount = mountTemplate({ orchestration_model: 'sol' }, {}, null);

    const sel = selectFor(mount, 'orchestration_model');
    expect(optionValues(sel)).toEqual(['', 'sol']);
    expect(sel.querySelector('optgroup')).toBe(null);
    expect(mount.querySelector('[data-runner-for="orchestration_model"]')).toBe(
      null
    );
  });
});

describe('views/detail-panel/exec-settings self/skip effort gating (mqcj §4.4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('disables the paired effort when the review model is self', () => {
    const mount = mountTemplate({ spec_review_model: 'self' });

    expect(selectFor(mount, 'spec_review_effort').disabled).toBe(true);
    expect(selectFor(mount, 'impl_review_effort').disabled).toBe(false);
  });

  test('disables the paired effort when the review model is skip', () => {
    const mount = mountTemplate({
      impl_review_model: 'skip',
      plan_review_model: 'skip'
    });

    expect(selectFor(mount, 'impl_review_effort').disabled).toBe(true);
    expect(selectFor(mount, 'plan_review_effort').disabled).toBe(true);
  });

  test('a workspace-global self/skip gates the effort too', () => {
    const mount = mountTemplate({}, { spec_review_model: 'skip' });

    expect(selectFor(mount, 'spec_review_effort').disabled).toBe(true);
  });

  test('a bead value overrides a self/skip global and re-enables the effort', () => {
    const mount = mountTemplate(
      { spec_review_model: 'codex' },
      { spec_review_model: 'skip' }
    );

    expect(selectFor(mount, 'spec_review_effort').disabled).toBe(false);
  });
});

describe('views/detail-panel/exec-settings default labels (§3.2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('the (기본) option uses the static fallback label per key', () => {
    const mount = mountTemplate();

    /** @type {[string, string][]} */
    const expected = [
      ['orchestration_model', '기본: opus'],
      ['orchestration_effort', '기본: CLI 기본'],
      ['spec_review_model', '기본: codex'],
      ['impl_review_model', '기본: codex'],
      ['plan_review_model', '기본: codex'],
      ['spec_review_effort', '기본: 프리셋'],
      ['impl_review_effort', '기본: 프리셋'],
      ['plan_review_effort', '기본: 프리셋'],
      ['impl_model', '기본: 작업 성격에 따라 구현 모델 자동 선택'],
      ['impl_effort', '기본: 선택된 구현 에이전트의 reasoning effort 사용']
    ];
    for (const [key, label] of expected) {
      const sel = selectFor(mount, key);
      expect(sel.options[0].value).toBe('');
      expect(sel.options[0].textContent).toContain(label);
    }
  });

  test('explains how the workflow chooses implementation model and effort', () => {
    const mount = mountTemplate();

    expect(
      mount.querySelector('[data-exec-setting-help="impl_model"]')?.textContent
    ).toContain(
      '워크플로가 복잡 구현인지, 범위가 한정된 구현인지 판단해 현재 runtime의 구현용 모델을 선택합니다.'
    );
    expect(
      mount.querySelector('[data-exec-setting-help="impl_effort"]')?.textContent
    ).toContain(
      '자동 선택이면 workflow tier에 선언된 effort를, 모델만 직접 지정했으면 해당 하위 에이전트 호출의 기본 effort를 사용합니다.'
    );
  });

  test('a selected workspace preset value names its source in the default label', () => {
    const mount = mountTemplate({}, { spec_review_model: 'opus' });

    const sel = selectFor(mount, 'spec_review_model');
    expect(sel.options[0].textContent).toContain('기본: opus');
    expect(sel.options[0].textContent).toContain('워크스페이스 프리셋');
  });
});

describe('views/detail-panel/exec-settings implementation runtime target', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('narrows exact models to the explicit implementation runtime', () => {
    const mount = mountTemplate({ impl_runtime: 'codex' });

    expect(optionGroups(selectFor(mount, 'impl_model'))).toEqual([
      { label: 'codex', values: ['sol', 'terra', 'luna'] }
    ]);
  });

  test('inherits the orchestration provider when runtime is inherit', () => {
    const mount = mountTemplate({
      impl_runtime: 'inherit',
      orchestration_model: 'opus'
    });

    expect(optionGroups(selectFor(mount, 'impl_model'))).toEqual([
      { label: 'claude', values: ['opus', 'sonnet', 'haiku', 'fable'] }
    ]);
  });

  test('permits only auto when inherit cannot resolve an orchestration provider', () => {
    const mount = mountTemplate({
      impl_runtime: 'inherit',
      orchestration_model: 'unknown'
    });

    const model = selectFor(mount, 'impl_model');
    expect(model.disabled).toBe(true);
    expect(optionValues(model)).toEqual(['']);
  });

  test('preserves an unknown stored implementation model as incompatible', () => {
    const mount = mountTemplate({
      impl_runtime: 'codex',
      impl_model: 'retired'
    });

    const model = selectFor(mount, 'impl_model');
    expect(model.value).toBe('retired');
    expect(model.options[model.selectedIndex].textContent).toContain('비호환');
  });

  test('resets an exact model and effort when the explicit provider changes', () => {
    expect(
      normalizeImplTarget(
        {
          impl_runtime: 'claude',
          impl_model: 'terra',
          impl_effort: 'high'
        },
        catalogFixture(),
        'codex'
      )
    ).toEqual({
      impl_runtime: 'claude',
      impl_model: '',
      impl_effort: ''
    });
  });

  test('keeps an inherited exact model when orchestration resolves its provider', () => {
    expect(
      normalizeImplTarget(
        {
          impl_runtime: 'inherit',
          impl_model: 'terra',
          impl_effort: 'high'
        },
        catalogFixture(),
        'codex'
      )
    ).toEqual({
      impl_runtime: 'inherit',
      impl_model: 'terra',
      impl_effort: 'high'
    });
  });

  test('resets auto-model effort when an inherited provider is unknown', () => {
    expect(
      normalizeImplTarget(
        {
          impl_runtime: 'inherit',
          impl_model: '',
          impl_effort: 'high'
        },
        catalogFixture(),
        null
      )
    ).toEqual({
      impl_runtime: 'inherit',
      impl_model: '',
      impl_effort: ''
    });
  });

  test('resets auto-model effort outside the effective provider union', () => {
    expect(
      normalizeImplTarget(
        {
          impl_runtime: 'claude',
          impl_model: '',
          impl_effort: 'max'
        },
        catalogFixture(),
        'claude'
      )
    ).toEqual({
      impl_runtime: 'claude',
      impl_model: '',
      impl_effort: ''
    });
  });
});

describe('views/detail-panel/exec-settings workflow_mode', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('defaults to standard and emits standard/fast_track', () => {
    const onChange = vi.fn();
    const mount = mountTemplate({}, {}, undefined, { onChange });

    const wfSel = selectFor(mount, 'workflow_mode');
    expect(wfSel.value).toBe('standard');
    expect(optionValues(wfSel)).toEqual(['standard', 'fast_track']);

    wfSel.value = 'fast_track';
    wfSel.dispatchEvent(new Event('change', { bubbles: true }));
    expect(onChange).toHaveBeenCalledWith('workflow_mode', 'fast_track');
  });

  test('a set metadata value pre-selects and highlights', () => {
    const mount = mountTemplate({ workflow_mode: 'fast_track' });

    const wfSel = selectFor(mount, 'workflow_mode');
    expect(wfSel.value).toBe('fast_track');
    expect(wfSel.classList.contains('detail-kv__v--sel')).toBe(true);
  });

  test('an orchestration edit emits the key/value pair for the server mutation', () => {
    const onChange = vi.fn();
    const mount = mountTemplate({}, {}, undefined, { onChange });

    const model = selectFor(mount, 'orchestration_model');
    model.value = 'sonnet';
    model.dispatchEvent(new Event('change', { bubbles: true }));
    expect(onChange).toHaveBeenCalledWith('orchestration_model', 'sonnet');
  });
});
