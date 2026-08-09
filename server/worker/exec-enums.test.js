import { describe, expect, test } from 'vitest';
import * as enums from './exec-enums.js';
import {
  PLAN_REVIEW_MODELS,
  REVIEW_EFFORTS,
  REVIEW_STEP_MODELS,
  execSettingEnums
} from './exec-enums.js';
import { resolveCatalog } from './runner-catalog.js';

/** The 10 workspace-global-capable exec keys (workflow_mode excluded). */
const EXPECTED_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'spec_review_model',
  'spec_review_effort',
  'impl_review_model',
  'impl_review_effort',
  'plan_review_model',
  'plan_review_effort',
  'impl_model',
  'impl_effort'
];

describe('worker/exec-enums static vocabularies (dotfiles-mqcj)', () => {
  test('exposes the step-review model vocabulary', () => {
    expect(REVIEW_STEP_MODELS).toEqual([
      'codex',
      'opus',
      'fable',
      'self',
      'skip'
    ]);
  });

  test('narrows plan_review to codex/fable/skip (no self, no opus)', () => {
    expect(PLAN_REVIEW_MODELS).toEqual(['codex', 'fable', 'skip']);
    expect(PLAN_REVIEW_MODELS).not.toContain('self');
    expect(PLAN_REVIEW_MODELS).not.toContain('opus');
  });

  test('fixes the review effort vocabulary at four levels', () => {
    expect(REVIEW_EFFORTS).toEqual(['low', 'medium', 'high', 'xhigh']);
  });

  test('drops the retired review_model surface entirely', () => {
    expect(/** @type {any} */ (enums).REVIEW_MODELS).toBeUndefined();
    expect(/** @type {any} */ (enums).EXEC_SETTING_ENUMS).toBeUndefined();
    expect(/** @type {any} */ (enums).IMPL_MODELS).toBeUndefined();
    expect(Object.hasOwn(execSettingEnums(), 'review_model')).toBe(false);
  });
});

describe('worker/exec-enums execSettingEnums (catalog-driven)', () => {
  test('covers exactly the 10 workspace-global exec keys', () => {
    expect(Object.keys(execSettingEnums()).sort()).toEqual(
      EXPECTED_KEYS.slice().sort()
    );
  });

  test('takes the model keys from the injected catalog model index', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const table = execSettingEnums(catalog);

    expect(table.orchestration_model).toEqual(Object.keys(catalog.model_index));
    expect(table.impl_model).toEqual(Object.keys(catalog.model_index));
    expect(table.impl_model).toContain('sol');
    expect(table.impl_model).toContain('opus');
  });

  test('the effort keys are the union of what the MODELS accept, incl. codex-only max', () => {
    const table = execSettingEnums(resolveCatalog({ warn: () => {} }));

    expect(table.orchestration_effort).toEqual(table.impl_effort);
    expect(table.impl_effort).toEqual([
      'low',
      'medium',
      'high',
      'xhigh',
      'max'
    ]);
    // `minimal` is on the codex runner-wide list but every builtin codex model
    // pins its own efforts, so no model actually accepts it.
    expect(table.impl_effort).not.toContain('minimal');
  });

  test('a runner-wide effort reaches the union through a model that pins nothing', () => {
    const catalog = resolveCatalog({
      overrides: { codex: { models: { nova: { id: 'gpt-5.7-nova' } } } },
      warn: () => {}
    });

    expect(execSettingEnums(catalog).impl_effort).toContain('minimal');
  });

  test('a config-added model reaches the model keys through the catalog', () => {
    const catalog = resolveCatalog({
      overrides: {
        codex: { models: { nova: { id: 'gpt-5.7-nova', efforts: ['ultra'] } } }
      },
      warn: () => {}
    });

    const table = execSettingEnums(catalog);

    expect(table.orchestration_model).toContain('nova');
    expect(table.impl_effort).toContain('ultra');
  });

  test('the review keys are catalog-independent contract vocabularies', () => {
    const table = execSettingEnums(resolveCatalog({ active: ['claude'] }));

    expect(table.spec_review_model).toEqual(REVIEW_STEP_MODELS);
    expect(table.impl_review_model).toEqual(REVIEW_STEP_MODELS);
    expect(table.plan_review_model).toEqual(PLAN_REVIEW_MODELS);
    expect(table.spec_review_effort).toEqual(REVIEW_EFFORTS);
    expect(table.impl_review_effort).toEqual(REVIEW_EFFORTS);
    expect(table.plan_review_effort).toEqual(REVIEW_EFFORTS);
  });
});
