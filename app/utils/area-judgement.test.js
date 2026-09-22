import { describe, expect, test } from 'vitest';
import { AREA_LABELS, areaLabels, areaTooltip } from './area-judgement.js';

describe('areaLabels (UI-wg68 §5.4)', () => {
  test('names the contract labels a bead carries, in contract order', () => {
    const labels = ['backend', 'complex', 'frontend'];

    const result = areaLabels(labels);

    expect(result).toEqual(['frontend', 'backend']);
  });

  test('drops a label outside the contract vocabulary', () => {
    const result = areaLabels(['fullstack', 'frontend']);

    expect(result).toEqual(['frontend']);
  });

  test('reads an unreadable attachment as no judgement', () => {
    const result = areaLabels(undefined);

    expect(result).toEqual([]);
  });

  test('exposes both area labels as the vocabulary', () => {
    expect([...AREA_LABELS]).toEqual(['frontend', 'backend']);
  });
});

describe('areaTooltip (UI-wg68 §5.4)', () => {
  test('states the acceptance question behind frontend', () => {
    expect(areaTooltip('frontend')).toBe(
      'frontend: 렌더된 화면으로 acceptance를 판정하는 작업'
    );
  });

  test('answers empty for a label outside the vocabulary', () => {
    expect(areaTooltip('fullstack')).toBe('');
  });
});
