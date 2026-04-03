import { describe, expect, test } from 'vitest';
import { createLabelBadge, filterCardLabels } from './label-badge.js';

describe('utils/label-badge', () => {
  describe('filterCardLabels', () => {
    test('keeps has and reviewed prefixes', () => {
      const input = ['has:spec', 'reviewed:plan', 'area:auth', 'has:plan'];

      expect(filterCardLabels(input)).toEqual([
        'has:spec',
        'reviewed:plan',
        'has:plan'
      ]);
    });

    test('returns empty array for no matches', () => {
      expect(filterCardLabels(['area:auth', 'component:api'])).toEqual([]);
    });

    test('handles undefined and null', () => {
      expect(filterCardLabels(undefined)).toEqual([]);
      expect(filterCardLabels(null)).toEqual([]);
    });

    test('handles empty array', () => {
      expect(filterCardLabels([])).toEqual([]);
    });
  });

  describe('createLabelBadge', () => {
    test('creates span with label-badge class', () => {
      const element = createLabelBadge('has:spec');

      expect(element.tagName).toBe('SPAN');
      expect(element.classList.contains('label-badge')).toBe(true);
    });

    test('adds has modifier for has prefix', () => {
      const element = createLabelBadge('has:plan');

      expect(element.classList.contains('label-badge--has')).toBe(true);
      expect(element.textContent).toBe('has:plan');
    });

    test('adds reviewed modifier for reviewed prefix', () => {
      const element = createLabelBadge('reviewed:code');

      expect(element.classList.contains('label-badge--reviewed')).toBe(true);
      expect(element.textContent).toBe('reviewed:code');
    });

    test('sets title and aria-label', () => {
      const element = createLabelBadge('has:spec');

      expect(element.getAttribute('title')).toBe('has:spec');
      expect(element.getAttribute('aria-label')).toBe('Label: has:spec');
    });
  });
});
