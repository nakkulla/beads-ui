import { describe, expect, test } from 'vitest';
import {
  IMPL_DISPATCHES,
  SESSION_DEFAULT_KEYS,
  buildOrchestrationPatch,
  buildSessionDefaultsPatch,
  implEffortOptions,
  implModelOptions,
  isDelegationDisabled,
  orchestrationModelOptions
} from './session-model.js';

/** A minimal two-runner catalog in the worker snapshot's shape. */
const CATALOG = {
  runners: {
    claude: {
      models: {
        opus: { efforts: ['low', 'high'] },
        haiku: { efforts: ['low'] }
      }
    },
    codex: {
      models: {
        sol: { efforts: ['medium', 'xhigh'] },
        terra: { efforts: ['high'] }
      }
    }
  }
};

describe('SESSION_DEFAULT_KEYS', () => {
  test('names the twelve contract keys and no orchestration key', () => {
    expect(SESSION_DEFAULT_KEYS).toHaveLength(12);
    expect(SESSION_DEFAULT_KEYS).toContain('impl_dispatch');
    expect(SESSION_DEFAULT_KEYS).toContain('impl_speed');
    expect(
      SESSION_DEFAULT_KEYS.some((key) => key.startsWith('orchestration_'))
    ).toBe(false);
  });

  test('offers 위임 and 메인 as the two execution modes', () => {
    expect(IMPL_DISPATCHES).toEqual(['delegated', 'main']);
  });
});

describe('isDelegationDisabled', () => {
  test('disables the delegation rows when the mode is 메인', () => {
    expect(isDelegationDisabled({ impl_dispatch: 'main' })).toBe(true);
  });

  test('keeps the delegation rows enabled for 위임', () => {
    expect(isDelegationDisabled({ impl_dispatch: 'delegated' })).toBe(false);
  });

  test('keeps the delegation rows enabled when no mode is chosen', () => {
    expect(isDelegationDisabled({})).toBe(false);
  });
});

describe('implModelOptions', () => {
  test('offers 자동 plus every model of the chosen delegation target', () => {
    expect(implModelOptions(CATALOG, 'codex')).toEqual([
      'auto',
      'sol',
      'terra'
    ]);
  });

  test('offers every catalog model when the target is inherit', () => {
    expect(implModelOptions(CATALOG, 'inherit')).toEqual([
      'auto',
      'opus',
      'haiku',
      'sol',
      'terra'
    ]);
  });

  test('offers only 자동 when the catalog is unknown', () => {
    expect(implModelOptions(null, 'codex')).toEqual(['auto']);
  });
});

describe('implEffortOptions', () => {
  test('narrows the efforts to the chosen model', () => {
    expect(implEffortOptions(CATALOG, 'codex', 'sol')).toEqual([
      'auto',
      'medium',
      'xhigh'
    ]);
  });

  test('falls back to the target runtime union when the model is 자동', () => {
    expect(implEffortOptions(CATALOG, 'codex', 'auto')).toEqual([
      'auto',
      'medium',
      'xhigh',
      'high'
    ]);
  });
});

describe('orchestrationModelOptions', () => {
  test('filters the model list by the UI-only runtime choice', () => {
    expect(orchestrationModelOptions(CATALOG, 'claude')).toEqual([
      'opus',
      'haiku'
    ]);
  });

  test('lists every model when no runtime filter is chosen', () => {
    expect(orchestrationModelOptions(CATALOG, null)).toEqual([
      'opus',
      'haiku',
      'sol',
      'terra'
    ]);
  });
});

describe('buildSessionDefaultsPatch', () => {
  test('sends only the keys whose value changed', () => {
    const patch = buildSessionDefaultsPatch(
      { workflow_mode: 'standard', impl_dispatch: 'main' },
      { workflow_mode: 'fast_track', impl_dispatch: 'main' }
    );

    expect(patch).toEqual({ workflow_mode: 'fast_track' });
  });

  test('sends null for a key the draft cleared back to (기본)', () => {
    const patch = buildSessionDefaultsPatch({ impl_speed: 'fast' }, {});

    expect(patch).toEqual({ impl_speed: null });
  });

  test('returns an empty patch when nothing changed', () => {
    const patch = buildSessionDefaultsPatch(
      { workflow_mode: 'standard' },
      { workflow_mode: 'standard' }
    );

    expect(patch).toEqual({});
  });

  test('keeps workflow_mode=standard as an explicit value, not a deletion', () => {
    const patch = buildSessionDefaultsPatch({}, { workflow_mode: 'standard' });

    expect(patch).toEqual({ workflow_mode: 'standard' });
  });
});

describe('buildOrchestrationPatch', () => {
  test('sends only the changed orchestration values', () => {
    const patch = buildOrchestrationPatch(
      { orchestration_model: 'opus', orchestration_effort: 'high' },
      { orchestration_model: 'sol', orchestration_effort: 'high' }
    );

    expect(patch).toEqual({ orchestration_model: 'sol' });
  });

  test('never carries a session key into the orchestration payload', () => {
    const patch = buildOrchestrationPatch(
      {},
      /** @type {any} */ ({ orchestration_model: 'sol', impl_model: 'sol' })
    );

    expect(patch).toEqual({ orchestration_model: 'sol' });
  });
});
