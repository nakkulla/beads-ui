import { describe, expect, test } from 'vitest';
import { laneMismatchOf, laneOfRoute } from './quickfix-lane.js';

describe('execution lane', () => {
  test.each([
    ['quick_fix', 'quick_fix'],
    ['spec_backed', 'pr'],
    ['full_plan', 'pr'],
    [null, 'pr'],
    [undefined, 'pr'],
    ['unknown', 'pr'],
    [true, 'pr']
  ])('derives %s as %s', (route, expected) => {
    expect(laneOfRoute(route)).toBe(expected);
  });

  test.each([
    [true, 'quick_fix'],
    [false, 'spec_backed'],
    [undefined, 'full_plan'],
    [false, null]
  ])('accepts recorded flag %s with route %s', (quickfix_lane, route) => {
    expect(laneMismatchOf({ quickfix_lane }, { route })).toBeNull();
  });

  test.each([
    [true, 'spec_backed', 'quick_fix'],
    [false, 'quick_fix', 'pr'],
    [true, null, 'quick_fix']
  ])(
    'refuses recorded flag %s with route %s',
    (quickfix_lane, route, prior_lane) => {
      expect(laneMismatchOf({ quickfix_lane }, { route })).toEqual({
        ok: false,
        reason: 'route_changed',
        route_change: { prior_lane, current_route: route }
      });
    }
  );
});
