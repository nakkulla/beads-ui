import { describe, expect, test } from 'vitest';
import {
  formatAttemptOrchestrationChip,
  formatOrchestrationChip,
  formatWorkerChip
} from './exec-settings-chip.js';
import { resolveExecutionSettings } from './execution-defaults.js';

const PROJECTION = {
  supported: true,
  schema_version: 1,
  session: {
    workflow_mode_default: 'standard',
    review: {
      default: 'codex',
      reviewers: {
        codex: { model: 'gpt-5.6-sol', effort: 'xhigh' },
        opus: { model: 'opus', effort: 'high' },
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
      model_catalog: {
        claude: ['opus', 'fable'],
        codex: { sol: 'gpt-5.6-sol', terra: 'gpt-5.6-terra' }
      },
      effort_by_transport: {
        'codex-native-spawn': { auto: 'provider-tier-or-runtime-model-default' }
      }
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

const RUNNER_CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'opus' }, fable: { id: 'fable' } } },
    codex: {
      models: { sol: { id: 'gpt-5.6-sol' }, terra: { id: 'gpt-5.6-terra' } }
    }
  }
};

/**
 * @param {Record<string, any>} input
 * @returns {Record<string, import('./execution-defaults.js').ExecutionValue>}
 */
function resolve(input) {
  return resolveExecutionSettings({
    execution_defaults: PROJECTION,
    runner_catalog: RUNNER_CATALOG,
    ...input
  });
}

describe('formatAttemptOrchestrationChip', () => {
  test('passes the recorded attempt tuple through as chip text', () => {
    const attempt = {
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      speed: 'fast'
    };

    const chip = formatAttemptOrchestrationChip(attempt);

    expect(chip?.text).toBe('claude · opus · high · Fast');
  });

  test('returns null when the attempt records no tuple', () => {
    expect(formatAttemptOrchestrationChip({})).toBeNull();
    expect(formatAttemptOrchestrationChip(null)).toBeNull();
  });

  test('names the recorded values without a source layer in the tooltip', () => {
    const attempt = {
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      speed: 'fast'
    };

    const chip = formatAttemptOrchestrationChip(attempt);

    expect(chip?.title).toBe(
      [
        '오케스트레이션 — 이 attempt에 기록된 실행값',
        'runner: claude',
        '오케스트레이션 모델: opus',
        '오케스트레이션 effort: high',
        '오케스트레이션 속도: fast'
      ].join('\n')
    );
  });

  test('omits tooltip lines whose value is absent', () => {
    const chip = formatAttemptOrchestrationChip({
      runner: 'claude',
      model: 'opus'
    });

    expect(chip?.title).toBe(
      [
        '오케스트레이션 — 이 attempt에 기록된 실행값',
        'runner: claude',
        '오케스트레이션 모델: opus'
      ].join('\n')
    );
  });
});

describe('formatOrchestrationChip', () => {
  test('derives the runner token from the resolved model', () => {
    const rows = resolve({});

    const chip = formatOrchestrationChip(rows, RUNNER_CATALOG);

    expect(chip?.text).toBe('claude · opus');
  });

  test('omits the runner token when no catalog owns the model', () => {
    const rows = resolve({});

    const chip = formatOrchestrationChip(rows, null);

    expect(chip?.text).toBe('opus');
  });

  test('omits the effort token while the CLI default is unspecified', () => {
    const rows = resolve({});

    const chip = formatOrchestrationChip(rows, RUNNER_CATALOG);

    expect(chip?.text).not.toContain('CLI 기본');
  });

  test('adds Fast only when the speed resolves to fast', () => {
    const fast = resolve({
      global: { orchestration_effort: 'high', orchestration_speed: 'fast' }
    });
    const normal = resolve({ global: { orchestration_effort: 'high' } });

    const fast_chip = formatOrchestrationChip(fast, RUNNER_CATALOG);
    const normal_chip = formatOrchestrationChip(normal, RUNNER_CATALOG);

    expect(fast_chip?.text).toBe('claude · opus · high · Fast');
    expect(normal_chip?.text).toBe('claude · opus · high');
  });

  test('returns null when the model resolution is unavailable', () => {
    const rows = resolveExecutionSettings({ execution_defaults: null });

    const chip = formatOrchestrationChip(rows, RUNNER_CATALOG);

    expect(chip).toBeNull();
  });

  test('returns null for rows that lack the orchestration keys', () => {
    expect(formatOrchestrationChip(null, RUNNER_CATALOG)).toBeNull();
    expect(formatOrchestrationChip({}, RUNNER_CATALOG)).toBeNull();
  });

  test('labels each orchestration key with its source layer in the tooltip', () => {
    const rows = resolve({ pin: { orchestration_model: 'fable' } });

    const chip = formatOrchestrationChip(rows, RUNNER_CATALOG);

    expect(chip?.title).toBe(
      [
        '오케스트레이션 — 현재 해석값 (핀 > 큐 기본값)',
        '오케스트레이션 모델: fable (핀)',
        '오케스트레이션 effort: CLI 기본 (미지정) (기본)',
        '오케스트레이션 속도: default (일반) (기본)'
      ].join('\n')
    );
  });
});

describe('formatWorkerChip', () => {
  test('collapses a main dispatch to a single token', () => {
    const rows = resolve({ route: 'quick_fix' });

    const chip = formatWorkerChip(rows, null);

    expect(chip?.text).toBe('메인');
  });

  test('names the controller runtime an inherited runtime resolves to', () => {
    const rows = resolve({
      pin: { impl_runtime: 'inherit' },
      controller_runtime: 'claude'
    });

    const chip = formatWorkerChip(rows, 'claude');

    expect(chip?.text).toBe('inherit→claude · sol (비호환) · auto');
  });

  test('leaves a bare inherit alone when no controller runtime is known', () => {
    const rows = resolve({ pin: { impl_runtime: 'inherit' } });

    const chip = formatWorkerChip(rows, null);

    expect(chip?.text).toBe('inherit · 5.6-sol · auto');
  });

  test('shortens the auto effort the resolver spells out', () => {
    const rows = resolve({});

    const chip = formatWorkerChip(rows, 'codex');

    expect(chip?.text).toBe('codex · 5.6-sol · auto');
  });

  test('adds Fast only when the speed resolves to fast', () => {
    const rows = resolve({ global: { impl_speed: 'fast' } });

    const chip = formatWorkerChip(rows, 'codex');

    expect(chip?.text).toBe('codex · 5.6-sol · auto · Fast');
  });

  test('returns null when every token is missing', () => {
    const rows = resolveExecutionSettings({ execution_defaults: null });

    const chip = formatWorkerChip(rows, null);

    expect(chip).toBeNull();
  });

  test('returns null for rows that are absent entirely', () => {
    expect(formatWorkerChip(null, 'codex')).toBeNull();
    expect(formatWorkerChip(undefined, 'codex')).toBeNull();
  });

  test('enumerates exactly the five worker keys with their source layers', () => {
    const rows = resolve({ global: { impl_speed: 'fast' } });

    const chip = formatWorkerChip(rows, 'codex');

    expect(chip?.title).toBe(
      [
        '워커(구현 위임) — 현재 해석값 (핀 > 전역 kv > 기본). 실행 중이면 세션이 시작 시 고정한 값과 다를 수 있음',
        '실행 방식: 위임 (기본)',
        '위임 대상: codex (기본)',
        '모델: 5.6-sol (기본)',
        'effort: auto (실행 시 결정) (기본)',
        '속도: fast (전역)'
      ].join('\n')
    );
  });

  test('keeps the resolver 해당 없음 wording for a main dispatch tooltip', () => {
    const rows = resolve({ route: 'quick_fix' });

    const chip = formatWorkerChip(rows, null);

    expect(chip?.title).toContain('실행 방식: 메인 (기본)');
    expect(chip?.title).toContain('위임 대상: 해당 없음 (기본)');
  });

  test('never mentions the quick_fix_impl_model row the labels cannot name', () => {
    const rows = resolve({ global: { quick_fix_impl_model: 'sol' } });

    const chip = formatWorkerChip(rows, 'codex');

    expect(chip?.title).not.toContain('undefined');
  });
});
