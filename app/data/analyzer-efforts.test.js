import { describe, expect, test } from 'vitest';
import { analyzerEfforts, isAnalyzerEffortValid } from './analyzer-efforts.js';

function catalogFixture() {
  return {
    runners: {
      claude: {
        models: { opus: { id: 'opus' }, sonnet: { id: 'sonnet' } },
        efforts: ['low', 'medium', 'high', 'xhigh']
      },
      codex: {
        models: {
          sol: {
            id: 'gpt-5.6-sol',
            efforts: ['low', 'medium', 'high', 'xhigh']
          },
          luna: {
            id: 'gpt-5.6-luna',
            efforts: ['low', 'medium', 'high', 'xhigh', 'max']
          }
        },
        efforts: ['minimal', 'low', 'medium', 'high', 'xhigh']
      }
    }
  };
}

describe('analyzer effort vocabulary (UI-yqw9 §2)', () => {
  test('prefers the per-model effort list over the runner list', () => {
    const efforts = analyzerEfforts(catalogFixture(), 'codex', 'sol');

    expect(efforts).toEqual(['low', 'medium', 'high', 'xhigh']);
  });

  test('falls back to the runner list for a model without its own', () => {
    const efforts = analyzerEfforts(catalogFixture(), 'claude', 'opus');

    expect(efforts).toEqual(['low', 'medium', 'high', 'xhigh']);
  });

  test('returns no effort for a model the runner does not own', () => {
    const efforts = analyzerEfforts(catalogFixture(), 'claude', 'sol');

    expect(efforts).toEqual([]);
  });

  test('returns no effort for an unknown runner', () => {
    const efforts = analyzerEfforts(catalogFixture(), 'gemini', 'opus');

    expect(efforts).toEqual([]);
  });

  test('returns no effort without a catalog', () => {
    expect(analyzerEfforts(null, 'claude', 'opus')).toEqual([]);
  });

  test('rejects a runner-wide effort the model does not accept', () => {
    const valid = isAnalyzerEffortValid(catalogFixture(), {
      runner: 'codex',
      model: 'sol',
      effort: 'minimal'
    });

    expect(valid).toBe(false);
  });

  test('accepts xhigh for sol', () => {
    expect(
      isAnalyzerEffortValid(catalogFixture(), {
        runner: 'codex',
        model: 'sol',
        effort: 'xhigh'
      })
    ).toBe(true);
  });

  test('accepts max for luna', () => {
    expect(
      isAnalyzerEffortValid(catalogFixture(), {
        runner: 'codex',
        model: 'luna',
        effort: 'max'
      })
    ).toBe(true);
  });

  test('accepts xhigh for opus but rejects max', () => {
    const catalog = catalogFixture();

    expect(
      isAnalyzerEffortValid(catalog, {
        runner: 'claude',
        model: 'opus',
        effort: 'xhigh'
      })
    ).toBe(true);
    expect(
      isAnalyzerEffortValid(catalog, {
        runner: 'claude',
        model: 'opus',
        effort: 'max'
      })
    ).toBe(false);
  });
});
