import { describe, expect, test } from 'vitest';
import { deckExecChips } from './deck-exec-chips.js';

const CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'opus', efforts: ['low', 'high'] } } },
    codex: { models: { sol: { id: 'gpt-5.6-sol', efforts: ['medium'] } } }
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
      reviewers: { codex: { model: 'gpt-5.6-sol', effort: 'xhigh' } }
    },
    implementation: {
      default: {
        dispatch: 'delegated',
        runtime: 'codex',
        model: 'sol',
        model_id: 'gpt-5.6-sol',
        effort: 'auto',
        speed: 'default'
      },
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
 * @param {Record<string, any>} [patch]
 * @returns {Record<string, any>}
 */
function row(patch = {}) {
  return {
    root_dir: '/tmp/example/repo-a',
    runner_catalog: CATALOG,
    execution_defaults: EXECUTION_DEFAULTS,
    session_defaults: {},
    orchestration_model: 'opus',
    orchestration_effort: 'high',
    ...patch
  };
}

describe('deckExecChips', () => {
  test('resolves the orchestration chip from the row override', () => {
    const chips = deckExecChips(row());

    expect(chips?.orchestration?.text).toBe('claude · opus · high');
    expect(chips?.orchestration?.title).toContain(
      '오케스트레이션 — 현재 해석값'
    );
  });

  test('resolves the worker chip from the session defaults', () => {
    const chips = deckExecChips(
      row({ session_defaults: { impl_runtime: 'codex', impl_model: 'sol' } })
    );

    expect(chips?.worker?.text).toContain('codex');
    expect(chips?.worker?.title).toContain('워커(구현 위임)');
  });

  test.each(['execution_defaults', 'runner_catalog', 'session_defaults'])(
    'returns null without the %s projection',
    (key) => {
      const input = row();
      delete input[key];

      const chips = deckExecChips(input);

      expect(chips).toBeNull();
    }
  );

  test('returns null for a non-record row', () => {
    const chips = deckExecChips(null);

    expect(chips).toBeNull();
  });
});
