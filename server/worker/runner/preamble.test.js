import { describe, expect, test } from 'vitest';
import {
  FAST_TRACK_DIRECTIVE,
  UNATTENDED_PREAMBLE,
  applyPreamble
} from './preamble.js';

describe('runner/preamble', () => {
  test('prepends the unattended preamble to the base prompt', () => {
    const out = applyPreamble('작업하라');
    expect(out.startsWith(UNATTENDED_PREAMBLE)).toBe(true);
    expect(out.endsWith('작업하라')).toBe(true);
    expect(out).not.toContain(FAST_TRACK_DIRECTIVE);
  });

  test('injects the fast_track directive between preamble and prompt', () => {
    const out = applyPreamble('작업하라', { fast_track: true });
    expect(out).toContain(UNATTENDED_PREAMBLE);
    expect(out).toContain(FAST_TRACK_DIRECTIVE);
    expect(out.indexOf(UNATTENDED_PREAMBLE)).toBeLessThan(
      out.indexOf(FAST_TRACK_DIRECTIVE)
    );
    expect(out.indexOf(FAST_TRACK_DIRECTIVE)).toBeLessThan(
      out.indexOf('작업하라')
    );
  });
});
