import { describe, expect, test, vi } from 'vitest';
import {
  ACTIVE_RUNNERS,
  builtinCatalog,
  catalogOrchestrationEfforts,
  catalogSpeedTiers,
  modelEfforts,
  modelOrchestrationEfforts,
  modelRunner,
  modelSpeedTiers,
  resolveCatalog
} from './runner-catalog.js';

describe('worker/runner-catalog builtin defaults', () => {
  test('lists claude and codex as the active runners', () => {
    expect(ACTIVE_RUNNERS).toEqual(['claude', 'codex']);
  });

  test('returns a fresh deep copy each call', () => {
    const first = builtinCatalog();

    first.claude.models.opus.id = 'mutated';
    first.codex.models.sol.orchestration_efforts?.push('mutated');
    first.codex.models.sol.speed_tiers?.push('turbo');

    expect(builtinCatalog().claude.models.opus.id).toBe('opus');
    expect(
      builtinCatalog().codex.models.sol.orchestration_efforts
    ).not.toContain('mutated');
    expect(builtinCatalog().codex.models.sol.speed_tiers).not.toContain(
      'turbo'
    );
  });

  test('resolves claude models to their own key as id', () => {
    const { runners } = resolveCatalog();

    expect(Object.keys(runners.claude.models)).toEqual([
      'opus',
      'sonnet',
      'haiku',
      'fable'
    ]);
    expect(runners.claude.models.sonnet.id).toBe('sonnet');
  });

  test('carries the claude command, efforts and default model', () => {
    const { runners } = resolveCatalog();

    expect(runners.claude.command).toBe('claude');
    expect(runners.claude.efforts).toEqual(['low', 'medium', 'high', 'xhigh']);
    expect(runners.claude.default_model).toBe('opus');
  });

  test('resolves codex short names to full model ids', () => {
    const { runners } = resolveCatalog();

    expect(runners.codex.command).toBe('codex');
    expect(runners.codex.models.sol.id).toBe('gpt-5.6-sol');
    expect(runners.codex.models.terra.id).toBe('gpt-5.6-terra');
    expect(runners.codex.models.luna.id).toBe('gpt-5.6-luna');
  });

  test('gives luna the max effort the other codex models lack', () => {
    const catalog = resolveCatalog();

    expect(modelEfforts(catalog, 'luna')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh',
      'max'
    ]);
    expect(modelEfforts(catalog, 'sol')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
  });

  test('exposes the builtin outer effort and speed capability matrix', () => {
    const catalog = resolveCatalog();

    expect(modelOrchestrationEfforts(catalog, 'sol')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh',
      'max',
      'ultra'
    ]);
    expect(modelOrchestrationEfforts(catalog, 'luna')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh',
      'max'
    ]);
    expect(modelSpeedTiers(catalog, 'sol')).toEqual(['default', 'fast']);
    expect(modelSpeedTiers(catalog, 'opus')).toEqual(['default']);
    expect(catalogOrchestrationEfforts(catalog)).toContain('ultra');
    expect(catalogSpeedTiers(catalog)).toEqual(['default', 'fast']);
  });

  test('keeps a codex-wide effort list distinct from the per-model lists', () => {
    const { runners } = resolveCatalog();

    expect(runners.codex.efforts).toEqual([
      'minimal',
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
  });

  test('indexes every builtin model to its owning runner', () => {
    const { model_index } = resolveCatalog();

    expect(model_index).toEqual({
      opus: 'claude',
      sonnet: 'claude',
      haiku: 'claude',
      fable: 'claude',
      sol: 'codex',
      terra: 'codex',
      luna: 'codex'
    });
  });
});

describe('worker/runner-catalog lookups', () => {
  test('maps a model to its runner', () => {
    const catalog = resolveCatalog();

    expect(modelRunner(catalog, 'opus')).toBe('claude');
    expect(modelRunner(catalog, 'terra')).toBe('codex');
  });

  test('returns null for an unknown model', () => {
    const catalog = resolveCatalog();

    expect(modelRunner(catalog, 'gpt-5.6')).toBe(null);
    expect(modelRunner(catalog, 'toString')).toBe(null);
  });

  test('falls back to the runner-wide efforts when the model pins none', () => {
    const catalog = resolveCatalog();

    expect(modelEfforts(catalog, 'opus')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
  });

  test('returns an empty effort list for an unknown model', () => {
    const catalog = resolveCatalog();

    expect(modelEfforts(catalog, 'gpt-5.6')).toEqual([]);
  });
});

describe('worker/runner-catalog config overrides', () => {
  test('overrides the runner command', () => {
    const warn = vi.fn();

    const { runners } = resolveCatalog({
      overrides: { codex: { command: '/opt/bin/codex' } },
      warn
    });

    expect(runners.codex.command).toBe('/opt/bin/codex');
    expect(warn).not.toHaveBeenCalled();
  });

  test('overrides a builtin model id without touching its siblings', () => {
    const { runners } = resolveCatalog({
      overrides: { codex: { models: { sol: { id: 'gpt-5.7-sol' } } } }
    });

    expect(runners.codex.models.sol.id).toBe('gpt-5.7-sol');
    expect(runners.codex.models.sol.efforts).toEqual([
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
    expect(runners.codex.models.terra.id).toBe('gpt-5.6-terra');
  });

  test('adds a new model and indexes it to its runner', () => {
    const catalog = resolveCatalog({
      overrides: {
        codex: { models: { nova: { id: 'gpt-5.7-nova', efforts: ['high'] } } }
      }
    });

    expect(catalog.runners.codex.models.nova.id).toBe('gpt-5.7-nova');
    expect(modelRunner(catalog, 'nova')).toBe('codex');
    expect(modelEfforts(catalog, 'nova')).toEqual(['high']);
  });

  test('defaults an added model id to its key', () => {
    const catalog = resolveCatalog({
      overrides: { claude: { models: { zeta: {} } } }
    });

    expect(catalog.runners.claude.models.zeta.id).toBe('zeta');
    expect(modelEfforts(catalog, 'zeta')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
  });

  test('replaces the runner effort list wholesale', () => {
    const { runners } = resolveCatalog({
      overrides: { claude: { efforts: ['medium', 'max'] } }
    });

    expect(runners.claude.efforts).toEqual(['medium', 'max']);
  });

  test('overrides the runner default model', () => {
    const { runners } = resolveCatalog({
      overrides: { claude: { default_model: 'sonnet' } }
    });

    expect(runners.claude.default_model).toBe('sonnet');
  });

  test('leaves the builtin catalog unmutated by an override', () => {
    resolveCatalog({ overrides: { codex: { command: '/opt/bin/codex' } } });

    expect(resolveCatalog().runners.codex.command).toBe('codex');
  });
});

describe('worker/runner-catalog fail-quiet validation', () => {
  test('ignores only invalid speed fields while preserving valid model overrides', () => {
    const warn = vi.fn();
    const catalog = resolveCatalog({
      overrides: {
        codex: {
          models: {
            sol: {
              id: 'gpt-5.7-sol',
              orchestration_efforts: ['high'],
              speed_tiers: ['fast']
            },
            terra: {
              speed_tiers: ['default', 'turbo']
            }
          }
        },
        claude: { models: { opus: { speed_tiers: ['default', 'fast'] } } }
      },
      warn
    });

    expect(catalog.runners.codex.models.sol.id).toBe('gpt-5.7-sol');
    expect(modelOrchestrationEfforts(catalog, 'sol')).toEqual(['high']);
    expect(modelSpeedTiers(catalog, 'sol')).toEqual(['default', 'fast']);
    expect(modelSpeedTiers(catalog, 'terra')).toEqual(['default', 'fast']);
    expect(modelSpeedTiers(catalog, 'opus')).toEqual(['default']);
    expect(warn).toHaveBeenCalledTimes(3);
  });

  test('ignores an empty outer effort override without dropping other data', () => {
    const warn = vi.fn();
    const catalog = resolveCatalog({
      overrides: {
        codex: { models: { luna: { orchestration_efforts: [] } } }
      },
      warn
    });

    expect(modelOrchestrationEfforts(catalog, 'luna')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh',
      'max'
    ]);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test('keeps empty legacy efforts while ignoring an empty outer effort field', () => {
    const warn = vi.fn();
    const catalog = resolveCatalog({
      overrides: {
        codex: {
          models: {
            sol: { efforts: [], orchestration_efforts: [] },
            nova: { efforts: ['high'] }
          }
        }
      },
      warn
    });

    expect(modelEfforts(catalog, 'sol')).toEqual([]);
    expect(modelOrchestrationEfforts(catalog, 'sol')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh',
      'max',
      'ultra'
    ]);
    expect(modelOrchestrationEfforts(catalog, 'nova')).toEqual(['high']);
    expect(modelSpeedTiers(catalog, 'nova')).toEqual(['default']);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test('ignores a non-object overrides value with one warning', () => {
    const warn = vi.fn();

    const catalog = resolveCatalog({ overrides: 'nope', warn });

    expect(catalog.runners.claude.command).toBe('claude');
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test('ignores an array overrides value', () => {
    const warn = vi.fn();

    const catalog = resolveCatalog({ overrides: [{ claude: {} }], warn });

    expect(Object.keys(catalog.runners)).toEqual(['claude', 'codex']);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test('warns without throwing on absent overrides', () => {
    const warn = vi.fn();

    resolveCatalog({ warn });

    expect(warn).not.toHaveBeenCalled();
  });

  test('ignores only the mistyped field and keeps the rest of the section', () => {
    const warn = vi.fn();

    const { runners } = resolveCatalog({
      overrides: {
        claude: { command: 42, efforts: 'high', default_model: 'sonnet' }
      },
      warn
    });

    expect(runners.claude.command).toBe('claude');
    expect(runners.claude.efforts).toEqual(['low', 'medium', 'high', 'xhigh']);
    expect(runners.claude.default_model).toBe('sonnet');
    expect(warn).toHaveBeenCalledTimes(2);
  });

  test('ignores a mistyped model entry', () => {
    const warn = vi.fn();

    const { runners } = resolveCatalog({
      overrides: { codex: { models: { sol: 'gpt-5.7-sol' } } },
      warn
    });

    expect(runners.codex.models.sol.id).toBe('gpt-5.6-sol');
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test('ignores a mistyped model effort list', () => {
    const warn = vi.fn();

    const catalog = resolveCatalog({
      overrides: { codex: { models: { sol: { efforts: ['high', 7] } } } },
      warn
    });

    expect(modelEfforts(catalog, 'sol')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
    expect(warn).toHaveBeenCalledTimes(1);
  });
});

describe('worker/runner-catalog active runner gate', () => {
  test('drops a config section for a runner with no adapter', () => {
    const warn = vi.fn();

    const catalog = resolveCatalog({
      overrides: { grok: { command: 'grok', models: { grok4: {} } } },
      warn
    });

    expect(catalog.runners.grok).toBe(undefined);
    expect(modelRunner(catalog, 'grok4')).toBe(null);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test('excludes a builtin runner left out of the active list', () => {
    const catalog = resolveCatalog({ active: ['claude'] });

    expect(Object.keys(catalog.runners)).toEqual(['claude']);
    expect(modelRunner(catalog, 'sol')).toBe(null);
  });
});

describe('worker/runner-catalog global model-name uniqueness', () => {
  test('drops a config model that collides with another runner builtin', () => {
    const warn = vi.fn();

    const catalog = resolveCatalog({
      overrides: { codex: { models: { opus: { id: 'gpt-5.6-opus' } } } },
      warn
    });

    expect(catalog.runners.codex.models.opus).toBe(undefined);
    expect(modelRunner(catalog, 'opus')).toBe('claude');
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test('drops the collision regardless of section declaration order', () => {
    const forward = resolveCatalog({
      overrides: {
        claude: { models: { sol: {} } },
        codex: { models: { nova: {} } }
      },
      warn: () => {}
    });
    const reversed = resolveCatalog({
      overrides: {
        codex: { models: { nova: {} } },
        claude: { models: { sol: {} } }
      },
      warn: () => {}
    });

    expect(modelRunner(forward, 'sol')).toBe('codex');
    expect(modelRunner(reversed, 'sol')).toBe('codex');
    expect(forward.runners.claude.models.sol).toBe(undefined);
    expect(reversed.runners.claude.models.sol).toBe(undefined);
  });

  test('drops the later of two config models added under the same name', () => {
    const warn = vi.fn();

    const catalog = resolveCatalog({
      overrides: {
        claude: { models: { nova: {} } },
        codex: { models: { nova: { id: 'gpt-5.7-nova' } } }
      },
      warn
    });

    expect(modelRunner(catalog, 'nova')).toBe('claude');
    expect(catalog.runners.codex.models.nova).toBe(undefined);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test('treats a same-runner builtin override as no collision', () => {
    const warn = vi.fn();

    const catalog = resolveCatalog({
      overrides: { claude: { models: { opus: { efforts: ['max'] } } } },
      warn
    });

    expect(modelRunner(catalog, 'opus')).toBe('claude');
    expect(modelEfforts(catalog, 'opus')).toEqual(['max']);
    expect(warn).not.toHaveBeenCalled();
  });
});
