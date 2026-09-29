import { describe, expect, test } from 'vitest';
import {
  visibleModelChoices,
  visibleReviewerChoices
} from './model-visibility.js';

const REVIEWERS = {
  codex: { model: 'sol', effort: 'xhigh' },
  astra: { model: 'astra', effort: 'xhigh' },
  fable: { model: 'fable', effort: 'high' }
};

describe('visibleModelChoices', () => {
  test('drops disabled names and keeps auto', () => {
    const choices = ['auto', 'astra', 'terra', 'sol'];

    const visible = visibleModelChoices(choices, ['terra', 'auto']);

    expect(visible).toEqual(['auto', 'astra', 'sol']);
  });

  test('returns the choices unchanged when the disabled list is null', () => {
    const choices = ['auto', 'terra'];

    const visible = visibleModelChoices(choices, null);

    expect(visible).toEqual(['auto', 'terra']);
  });
});

describe('visibleReviewerChoices', () => {
  test('drops codex when sol is disabled and keeps self, skip, and an unresolvable token', () => {
    const tokens = ['codex', 'astra', 'mystery', 'self', 'skip'];

    const visible = visibleReviewerChoices(tokens, REVIEWERS, ['sol']);

    expect(visible).toEqual(['astra', 'mystery', 'self', 'skip']);
  });
});
