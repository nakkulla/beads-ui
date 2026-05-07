import { describe, expect, test } from 'vitest';
import {
  createLabelBadge,
  filterCardLabels,
  filterVisibleLabels
} from './label-badge.js';

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

    test('adds pr modifier for pr label', () => {
      const element = createLabelBadge('pr');

      expect(element.classList.contains('label-badge--pr')).toBe(true);
      expect(element.textContent).toBe('pr');
    });

    test('sets title and aria-label', () => {
      const element = createLabelBadge('has:spec');

      expect(element.getAttribute('title')).toBe('has:spec');
      expect(element.getAttribute('aria-label')).toBe('Label: has:spec');
    });

    test('applies exact color rule before prefix rule', () => {
      const element = createLabelBadge('followup:scope-boundary', {
        prefix: {
          'followup:': { fg: '#b45309' }
        },
        exact: {
          'followup:scope-boundary': { fg: '#dc2626' }
        }
      });

      expect(element.style.getPropertyValue('--label-badge-fg')).toBe(
        '#dc2626'
      );
    });

    test('applies longest matching prefix color rule', () => {
      const element = createLabelBadge('followup:scope-boundary', {
        prefix: {
          'followup:': { fg: '#b45309' },
          'followup:scope-': { fg: '#2563eb' }
        },
        exact: {}
      });

      expect(element.style.getPropertyValue('--label-badge-fg')).toBe(
        '#2563eb'
      );
    });

    test('keeps fallback classes without color config', () => {
      const element = createLabelBadge('has:spec');

      expect(element.classList.contains('label-badge--has')).toBe(true);
      expect(element.style.getPropertyValue('--label-badge-fg')).toBe('');
    });
  });

  describe('filterVisibleLabels', () => {
    test('keeps only labels matching configured prefixes', () => {
      expect(
        filterVisibleLabels(
          ['has:spec', 'reviewed:plan', 'area:auth', 'component:api'],
          ['area:', 'component:']
        )
      ).toEqual(['area:auth', 'component:api']);
    });

    test('keeps prefix and exact matches', () => {
      const result = filterVisibleLabels(
        ['has:spec', 'lane:plan', 'pr', 'human', 'quick_edit', 'misc'],
        ['has:', 'lane:'],
        ['pr', 'human']
      );

      expect(result).toEqual(['has:spec', 'lane:plan', 'pr', 'human']);
    });

    test('ignores color config when filtering hidden labels', () => {
      const result = filterVisibleLabels(
        ['lane:plan', 'followup:scope-boundary'],
        ['followup:'],
        []
      );

      expect(result).toEqual(['followup:scope-boundary']);
    });
  });
});
