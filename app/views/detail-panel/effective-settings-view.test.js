/**
 * The summary header's 복잡 chip as a rendered element (UI-8x90 §5.1).
 *
 * The panel wiring — which store the click reaches and what it does NOT send —
 * is asserted in `effective-card.test.js` over the whole panel. This file owns
 * the template's own contract: a judgement chip that opens a 사유 팝업 and
 * writes nothing.
 */
import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  effectiveSettingsCardTemplate,
  summaryHeaderTemplate
} from './effective-settings-view.js';

const COMPLEX_META = {
  complex_reason: 'hard_diagnosis+invariant_reasoning'
};

/**
 * @param {Record<string, unknown>} metadata
 * @param {any} [handlers]
 * @param {string[]} [labels]
 * @returns {HTMLElement}
 */
function renderHeader(metadata, handlers = {}, labels = ['complex']) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  render(
    summaryHeaderTemplate(
      { id: 'UI-1', status: 'open', metadata, labels },
      /** @type {any} */ (handlers)
    ),
    mount
  );
  return mount;
}

/**
 * @param {HTMLElement} mount
 * @returns {HTMLButtonElement|null}
 */
function complexChip(mount) {
  return /** @type {HTMLButtonElement|null} */ (
    mount.querySelector('.detail-summary__chip--complex')
  );
}

beforeEach(() => {
  document.body.innerHTML = '<div id="m"></div>';
});

describe('detail header 복잡 chip (UI-8x90 §5.1, UI-7nhi §4)', () => {
  test('draws the chip as a judgement chip button', () => {
    const mount = renderHeader(COMPLEX_META);

    const chip = /** @type {HTMLButtonElement} */ (complexChip(mount));

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.classList.contains('judgement-chip')).toBe(true);
    expect(chip.dataset.chipKey).toBe('complex');
  });

  test('leaves the chip enabled and carries no state attribute', () => {
    const mount = renderHeader(COMPLEX_META);

    const chip = /** @type {HTMLButtonElement} */ (complexChip(mount));

    expect(chip.dataset.state).toBeUndefined();
    expect(chip.disabled).toBe(false);
  });

  test('names the 복잡 판정 in the chip tooltip without a 상태 line', () => {
    const mount = renderHeader(COMPLEX_META);

    const chip = /** @type {HTMLButtonElement} */ (complexChip(mount));

    expect(chip.title).toBe(
      '복잡한 작업으로 판정됨\n사유: 원인이 불명확하거나 재현이 불안정해 가설-검증 루프가 필요하다 · 정합성이 상태기계·동시성·불변식 추론에 달려 있다'
    );
  });

  test('asks the view to toggle the complex popup on click', () => {
    const onChipToggle = vi.fn();
    const mount = renderHeader(COMPLEX_META, { onChipToggle });

    /** @type {HTMLButtonElement} */ (complexChip(mount)).click();

    expect(onChipToggle).toHaveBeenCalledWith('complex');
  });

  test('opens the 사유 팝업 under the chips line while the chip is open', () => {
    const mount = renderHeader(COMPLEX_META, {
      isChipOpen: (/** @type {string} */ key) => key === 'complex'
    });

    const popover = /** @type {HTMLElement} */ (
      mount.querySelector('.chip-popover')
    );

    expect(popover.textContent).toContain('복잡한 작업으로 판정됨');
    expect(popover.textContent).toContain(
      '원인이 불명확하거나 재현이 불안정해 가설-검증 루프가 필요하다'
    );
    expect(popover.textContent).toContain(
      '적용은 이슈 상세의 실행 설정 편집기에서'
    );
  });

  test('marks the open chip with aria-expanded', () => {
    const mount = renderHeader(COMPLEX_META, {
      isChipOpen: (/** @type {string} */ key) => key === 'complex'
    });

    expect(complexChip(mount)?.getAttribute('aria-expanded')).toBe('true');
  });

  test('draws no popup while no chip is open', () => {
    const mount = renderHeader(COMPLEX_META);

    expect(mount.querySelector('.chip-popover')).toBe(null);
    expect(complexChip(mount)?.getAttribute('aria-expanded')).toBe('false');
  });

  test('omits the chip for a bead carrying the reason without the label', () => {
    const mount = renderHeader(COMPLEX_META, {}, []);

    expect(complexChip(mount)).toBe(null);
  });

  test('omits the chip for a bead carrying the label without a reason', () => {
    const mount = renderHeader({});

    expect(complexChip(mount)).toBe(null);
  });

  test('omits the chip for an issue record with no labels field', () => {
    const mount = renderHeader(COMPLEX_META, {}, /** @type {any} */ (null));

    expect(complexChip(mount)).toBe(null);
  });
});

/**
 * @param {Partial<Parameters<typeof effectiveSettingsCardTemplate>[0]>} [model_overrides]
 * @param {Partial<Parameters<typeof effectiveSettingsCardTemplate>[1]>} [handler_overrides]
 * @returns {HTMLElement}
 */
function renderCard(model_overrides = {}, handler_overrides = {}) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  render(
    effectiveSettingsCardTemplate(
      /** @type {any} */ ({
        metadata: {},
        workspace_values: {},
        catalog: null,
        execution_defaults: null,
        controller_runtime: null,
        expanded: true,
        presets: [{ id: 'p1', name: '메인 구현', compatible: true }],
        presets_loaded: true,
        preset_id: '',
        preset_busy: false,
        ...model_overrides
      }),
      /** @type {any} */ ({
        onToggle: vi.fn(),
        onEdit: vi.fn(),
        onPresetSelect: vi.fn(),
        onPresetApply: vi.fn(),
        ...handler_overrides
      })
    ),
    mount
  );
  return mount;
}

describe('effective-settings card route visibility', () => {
  test.each([
    ['quick_fix', ['impl']],
    ['spec_backed', ['spec', 'impl']],
    ['full_plan', ['spec', 'plan', 'impl']],
    [undefined, ['spec', 'impl']],
    ['unknown', ['spec', 'impl']]
  ])('shows only applicable review settings for %s', (route, reviews) => {
    const mount = renderCard({ metadata: { route } });

    const keys = Array.from(
      mount.querySelectorAll('.detail-effective__row[data-key]'),
      (row) => row.getAttribute('data-key')
    );

    expect(keys.filter((key) => key?.includes('_review_'))).toEqual(
      /** @type {string[]} */ (reviews).flatMap((step) =>
        ['model', 'effort', 'speed'].map((axis) => `${step}_review_${axis}`)
      )
    );
    expect(keys).toContain('impl_model');
    expect(keys).toContain('orchestration_model');
  });

  test('excludes hidden pins and global values from collapsed counts', () => {
    const mount = renderCard({
      expanded: false,
      metadata: { route: 'quick_fix', spec_review_model: 'opus' },
      workspace_values: { plan_review_model: 'fable' }
    });

    const counts = mount.querySelector('.detail-effective__counts');

    expect(counts?.textContent).toContain('핀 0');
    expect(counts?.textContent).toContain('전역 0');
    expect(counts?.textContent).toContain('기본 11');
  });

  test('restores hidden pins when the route changes without editing metadata', () => {
    const metadata = { spec_review_model: 'opus', plan_review_model: 'fable' };
    const onEdit = vi.fn();
    renderCard({ metadata, route: 'quick_fix' }, { onEdit });

    const mount = renderCard({ metadata, route: 'full_plan' }, { onEdit });

    expect(
      mount.querySelector('[data-edit-key="plan_review_model"]')
    ).toHaveProperty('value', 'fable');
    expect(
      mount.querySelector('[data-edit-key="spec_review_model"]')
    ).toHaveProperty('value', 'opus');
    expect(onEdit).not.toHaveBeenCalled();
    expect(metadata).toEqual({
      spec_review_model: 'opus',
      plan_review_model: 'fable'
    });
  });
});

describe('effective-settings card preset head (UI-7yh2 §3.7-3.9)', () => {
  test('places the preset select inside the card head', () => {
    const mount = renderCard();

    const head = mount.querySelector('.detail-effective__head');

    expect(head?.querySelector('[data-impl-preset-select]')).not.toBe(null);
  });

  test('places the preset apply button inside the card head', () => {
    const mount = renderCard();

    const head = mount.querySelector('.detail-effective__head');

    expect(head?.querySelector('[data-apply-impl-preset]')).not.toBe(null);
  });

  test('renders no foot element', () => {
    const mount = renderCard();

    expect(mount.querySelector('.detail-effective__foot')).toBe(null);
  });

  test('describes all 17 pin keys in the select title', () => {
    const mount = renderCard();

    const select = mount.querySelector('[data-impl-preset-select]');

    expect(select?.getAttribute('title')).toBe(
      '오케스트레이션 3키와 세션 14키를 핀으로 기록'
    );
  });

  test('does not toggle the details when the preset select changes', () => {
    const onToggle = vi.fn();
    const mount = renderCard({}, { onToggle });

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-impl-preset-select]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(onToggle).not.toHaveBeenCalled();
  });

  test('does not toggle the details when the apply button is clicked', () => {
    const onToggle = vi.fn();
    const mount = renderCard({ preset_id: 'p1' }, { onToggle });

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-apply-impl-preset]')
    );
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onToggle).not.toHaveBeenCalled();
  });
});

describe('effective-settings preset dropdown profile (design §6.3)', () => {
  const PROFILE_PRESETS = [
    { id: 'g1', name: '일반 하나', compatible: true, applies_to: 'general' },
    {
      id: 'q1',
      name: 'quick fix 기본',
      compatible: true,
      applies_to: 'quick_fix'
    },
    { id: 'legacy', name: '계열 없는 옛 항목', compatible: true }
  ];

  /**
   * @param {HTMLElement} mount
   * @returns {string[]}
   */
  function optionValues(mount) {
    return Array.from(
      mount.querySelectorAll('[data-impl-preset-select] option'),
      (option) => /** @type {HTMLOptionElement} */ (option).value
    );
  }

  test('lists only the general presets for an issue outside quick_fix', () => {
    const mount = renderCard({
      metadata: { route: 'spec_backed' },
      presets: PROFILE_PRESETS
    });

    expect(optionValues(mount)).toEqual(['', 'g1', 'legacy']);
  });

  test('lists only the quick fix presets for a quick_fix issue', () => {
    const mount = renderCard({
      metadata: { route: 'quick_fix' },
      presets: PROFILE_PRESETS
    });

    expect(optionValues(mount)).toEqual(['', 'q1']);
  });

  test('lists the general presets for an issue whose route is not pinned yet', () => {
    const mount = renderCard({ metadata: {}, presets: PROFILE_PRESETS });

    expect(optionValues(mount)).toEqual(['', 'g1', 'legacy']);
  });

  test('disables the select when this issue profile has no preset', () => {
    const mount = renderCard({
      metadata: { route: 'quick_fix' },
      presets: [PROFILE_PRESETS[0]]
    });

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-impl-preset-select]')
    );

    expect(select.disabled).toBe(true);
  });

  test('says which issue has no preset to use in the empty profile', () => {
    const mount = renderCard({
      metadata: { route: 'quick_fix' },
      presets: [PROFILE_PRESETS[0]]
    });

    const select = mount.querySelector('[data-impl-preset-select]');

    expect(select?.textContent?.trim()).toBe('이 이슈에 쓸 프리셋이 없습니다');
  });

  test('stays silent about an empty profile while the list has not arrived', () => {
    const mount = renderCard({
      metadata: { route: 'quick_fix' },
      presets: [],
      presets_loaded: false
    });

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-impl-preset-select]')
    );

    expect(select.disabled).toBe(false);
    expect(select.textContent?.trim()).toBe('실행 프리셋…');
  });

  test('names the quick fix key count in the select title', () => {
    const mount = renderCard({
      metadata: { route: 'quick_fix' },
      presets: PROFILE_PRESETS
    });

    const select = mount.querySelector('[data-impl-preset-select]');

    expect(select?.getAttribute('title')).toBe(
      '오케스트레이션 3키와 구현 5키를 핀으로 기록'
    );
  });
});

const CATALOG = {
  runners: {
    claude: {
      command: 'claude',
      models: { opus: { id: 'opus', efforts: ['high'] } }
    },
    codex: {
      command: 'codex',
      models: {
        sol: {
          id: 'gpt-5.6-sol',
          efforts: ['medium'],
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
        effort: 'medium',
        speed: 'default'
      },
      route_defaults: {},
      model_catalog: { codex: { sol: 'gpt-5.6-sol' } },
      effort_by_transport: {}
    }
  },
  orchestration: {
    runtime: 'claude',
    model: 'opus',
    model_id: 'opus',
    effort: 'high',
    speed: 'default'
  }
};

/**
 * @param {Partial<Parameters<typeof effectiveSettingsCardTemplate>[0]>} [model_overrides]
 * @returns {HTMLElement}
 */
function renderResolvedCard(model_overrides = {}) {
  return renderCard({
    catalog: CATALOG,
    execution_defaults: EXECUTION_DEFAULTS,
    expanded: false,
    ...model_overrides
  });
}

/**
 * @param {HTMLElement} mount
 * @returns {string[]}
 */
function groupTexts(mount) {
  return Array.from(mount.querySelectorAll('.detail-effective__grp'), (group) =>
    (group.textContent || '').replace(/\s+/g, ' ').trim()
  );
}

describe('effective-settings collapsed value line (UI-xq3h §3.2-3.3)', () => {
  test('renames the card title to 이 이슈 실행 설정', () => {
    const mount = renderResolvedCard();

    expect(mount.querySelector('.detail-effective__t')?.textContent).toBe(
      '이 이슈 실행 설정'
    );
  });

  test('splits the value line into an 오케 group and a 워커 group', () => {
    const mount = renderResolvedCard();

    expect(
      Array.from(
        mount.querySelectorAll('.detail-effective__role'),
        (role) => role.textContent
      )
    ).toEqual(['오케', '워커']);
  });

  test('puts the orchestration model and effort in the 오케 group', () => {
    const mount = renderResolvedCard({
      metadata: { orchestration_effort: 'high' }
    });

    expect(groupTexts(mount)[0]).toBe('오케 opus · high');
  });

  test('puts the delegation target, model and effort in the 워커 group', () => {
    const mount = renderResolvedCard();

    expect(groupTexts(mount)[1]).toBe('워커 위임 codex · 5.6-sol · medium');
  });

  test('gives the value line its own row of the card head', () => {
    const mount = renderResolvedCard();

    const line = /** @type {HTMLElement} */ (
      mount.querySelector('.detail-effective__summary')
    );

    expect(line.previousElementSibling?.className).toBe(
      'detail-effective__chev'
    );
    expect(line.nextElementSibling?.className).toBe('detail-effective__preset');
  });

  test('keeps the full model ids reachable in the value line title', () => {
    const mount = renderResolvedCard();

    expect(
      mount.querySelector('.detail-effective__summary')?.getAttribute('title')
    ).toContain('gpt-5.6-sol');
  });

  test('omits a speed token that resolved to default', () => {
    const mount = renderResolvedCard();

    expect(groupTexts(mount).join(' ')).not.toContain('default');
  });

  test('keeps a speed token the issue pinned to fast', () => {
    const mount = renderResolvedCard({
      metadata: { orchestration_effort: 'high', orchestration_speed: 'fast' }
    });

    expect(groupTexts(mount)[0]).toBe('오케 opus · high · fast');
  });

  test('collapses the 워커 group to 메인 when the issue runs on the controller', () => {
    const mount = renderResolvedCard({ metadata: { impl_dispatch: 'main' } });

    expect(groupTexts(mount)[1]).toBe('워커 메인');
  });

  test('draws only the 워커 group when no orchestration key resolves', () => {
    const mount = renderResolvedCard({
      execution_defaults: { ...EXECUTION_DEFAULTS, orchestration: null }
    });

    expect(
      Array.from(
        mount.querySelectorAll('.detail-effective__role'),
        (role) => role.textContent
      )
    ).toEqual(['워커']);
  });

  test('draws no value line at all when neither role resolves', () => {
    const mount = renderCard({ expanded: false });

    expect(mount.querySelector('.detail-effective__summary')).toBe(null);
  });
});

describe('effective-settings mode token (UI-xq3h §3.3)', () => {
  test('omits the mode token when the issue pins fast_track itself', () => {
    const mount = renderResolvedCard({
      metadata: { workflow_mode: 'fast_track' }
    });

    expect(mount.querySelector('.detail-effective__mode')).toBe(null);
  });

  test('ends the value line with the mode inherited from the workspace', () => {
    const mount = renderResolvedCard({
      workspace_values: { workflow_mode: 'fast_track' }
    });

    expect(mount.querySelector('.detail-effective__mode')?.textContent).toBe(
      'fast_track'
    );
  });

  test('never puts standard on the value line, pinned or inherited', () => {
    const pinned = renderResolvedCard({
      metadata: { workflow_mode: 'standard' }
    });
    const inherited = renderResolvedCard({
      workspace_values: { workflow_mode: 'standard' }
    });

    expect(pinned.querySelector('.detail-effective__mode')).toBe(null);
    expect(inherited.querySelector('.detail-effective__mode')).toBe(null);
  });
});

describe('effective-settings applied preset token (UI-xq3h §3.4)', () => {
  const PRESET = {
    id: 'p1',
    name: '페이블 기본',
    compatible: true,
    applies_to: 'general',
    settings: {
      orchestration_model: 'opus',
      impl_runtime: 'codex',
      impl_model: 'sol'
    }
  };

  test('draws no token for an issue that records no preset', () => {
    const mount = renderResolvedCard({ presets: [PRESET] });

    expect(mount.querySelector('.detail-effective__applied')).toBe(null);
  });

  test('draws no token while the preset list has not arrived', () => {
    const mount = renderResolvedCard({
      metadata: { applied_exec_preset: 'p1' },
      presets: [],
      presets_loaded: false
    });

    expect(mount.querySelector('.detail-effective__applied')).toBe(null);
  });

  const QUICK_FIX_PRESET = {
    id: 'p1',
    name: '페이블 기본',
    compatible: true,
    applies_to: 'quick_fix',
    settings: { impl_model: 'sol' }
  };

  const QUICK_FIX_METADATA = {
    route: 'quick_fix',
    applied_exec_preset: 'p1',
    impl_runtime: 'codex',
    impl_model: 'sol'
  };

  test('draws no token while the runner catalog has not arrived', () => {
    const mount = renderResolvedCard({
      catalog: null,
      metadata: QUICK_FIX_METADATA,
      presets: [QUICK_FIX_PRESET]
    });

    expect(mount.querySelector('.detail-effective__applied')).toBe(null);
  });

  test('reports no drift once the catalog can derive the runtime', () => {
    const mount = renderResolvedCard({
      metadata: QUICK_FIX_METADATA,
      presets: [QUICK_FIX_PRESET]
    });

    expect(mount.querySelector('.detail-effective__applied')?.textContent).toBe(
      '프리셋 페이블 기본'
    );
  });

  test('reports no drift on a review-pinned issue a quick fix preset just took', () => {
    const mount = renderResolvedCard({
      metadata: {
        ...QUICK_FIX_METADATA,
        impl_review_model: 'fable',
        impl_review_effort: 'high'
      },
      presets: [QUICK_FIX_PRESET]
    });

    expect(mount.querySelector('.detail-effective__applied')?.textContent).toBe(
      '프리셋 페이블 기본'
    );
  });

  test('names the preset when the issue still matches it', () => {
    const mount = renderResolvedCard({
      metadata: {
        applied_exec_preset: 'p1',
        orchestration_model: 'opus',
        impl_runtime: 'codex',
        impl_model: 'sol'
      },
      presets: [PRESET]
    });

    expect(mount.querySelector('.detail-effective__applied')?.textContent).toBe(
      '프리셋 페이블 기본'
    );
  });

  test('counts the keys that drifted away from the preset', () => {
    const mount = renderResolvedCard({
      metadata: {
        applied_exec_preset: 'p1',
        orchestration_model: 'fable',
        impl_runtime: 'codex',
        impl_model: 'sol'
      },
      presets: [PRESET]
    });

    expect(
      mount
        .querySelector('.detail-effective__applied')
        ?.textContent?.replace(/\s+/g, ' ')
    ).toBe('프리셋 페이블 기본 · 1개 변경');
  });

  test('lists each drifted key with both values in the token title', () => {
    const mount = renderResolvedCard({
      metadata: {
        applied_exec_preset: 'p1',
        impl_runtime: 'codex',
        impl_model: 'sol'
      },
      presets: [PRESET]
    });

    expect(
      mount.querySelector('.detail-effective__applied')?.getAttribute('title')
    ).toBe('오케스트레이션 모델: 없음 (프리셋 opus)');
  });

  test('names the preset side as 비움 when only the issue carries the key', () => {
    const mount = renderResolvedCard({
      metadata: { applied_exec_preset: 'p1', impl_effort: 'high' },
      presets: [{ ...PRESET, settings: {} }]
    });

    expect(
      mount.querySelector('.detail-effective__applied')?.getAttribute('title')
    ).toBe('effort: high (프리셋 비움)');
  });

  test('reports a preset that is gone from the arrived list as deleted', () => {
    const mount = renderResolvedCard({
      metadata: { applied_exec_preset: 'gone' },
      presets: [PRESET]
    });

    const token = mount.querySelector('.detail-effective__applied');

    expect(token?.textContent).toBe('프리셋 삭제됨');
    expect(token?.getAttribute('title')).toBe(null);
  });

  test('places the token between the title and the layer counts', () => {
    const mount = renderResolvedCard({
      metadata: { applied_exec_preset: 'p1' },
      presets: [PRESET]
    });

    const token = /** @type {HTMLElement} */ (
      mount.querySelector('.detail-effective__applied')
    );

    expect(token.previousElementSibling?.className).toBe('detail-effective__t');
    expect(token.nextElementSibling?.className).toBe(
      'detail-effective__counts'
    );
  });
});

describe('effective-settings expanded group headings (UI-xq3h §4)', () => {
  test('titles the groups in role order', () => {
    const mount = renderCard({
      metadata: { route: 'full_plan' },
      catalog: CATALOG,
      execution_defaults: EXECUTION_DEFAULTS
    });

    expect(
      Array.from(
        mount.querySelectorAll('.detail-effective__subhead'),
        (head) => head.textContent
      )
    ).toEqual(['워크플로우', '오케스트레이션', '워커 구현', '리뷰']);
  });
});
